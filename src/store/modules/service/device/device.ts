import { useRouter } from 'vue-router';
import { ActionTree, Module, MutationTree } from 'vuex';

import {
  GET_DEVICE_BY_SERIAL,
  GET_DEVICE_INFO_LIST,
} from '@/graphql/service/device/device';
import router from '@/router';
import { RootState } from '@/store';
import {
  DeviceDetail,
  DeviceListContent,
  FetchDeviceListPayload,
  FetchDeviceListResponse,
  FetchDevicePayload,
  FetchDeviceResponse,
} from '@/types/service/device/device';
import graphqlClient from '@/utils/graphql';
import { ROUTE_NAMES } from '@/constants/common';

export const MODULE_PATH = 'device/';

export interface DeviceStoreState {
  isLoading: boolean;
  isDetailLoading: boolean;
  size: number;
  totalPages: number;
  totalElements: number;
  deviceLists: DeviceListContent[];
  prevSelectedRow: boolean;
  selectedDeviceInfo: {
    rowIndex: number | undefined;
    rowPage: number;
    serial?: string;
    sort: {
      order: string;
      by: string;
    } | null;
    filteredValue: Array<{
      name: string;
      valueList?: string[];
      valueIntList?: number[];
    }> | null;
  };
  deviceDetail: DeviceDetail | null;
  searchedKeyword: string;
}

const state = (): DeviceStoreState => ({
  isLoading: false,
  isDetailLoading: false,
  size: 1,
  totalPages: 0,
  totalElements: 0,
  deviceLists: [],
  prevSelectedRow: false,
  selectedDeviceInfo: {
    rowIndex: undefined,
    rowPage: 1,
    sort: null,
    filteredValue: null,
  },
  deviceDetail: null,
  searchedKeyword: '',
});

export enum MutationTypes {
  SET_DEVICE_LIST = 'SET_DEVICE_LIST',
  SET_SELECTED_DEVICE_INFO = 'device/SET_SELECTED_DEVICE_INFO',
  SET_DEVICE_DETAIL = 'SET_DEVICE_DETAIL',
  SET_SEARCHED_KEYWORD = 'SET_SEARCHED_KEYWORD',
  INIT_DEVICE_DETAIL = 'INIT_DEVICE_DETAIL',
  INIT_SELECTED_DEVICE_INFO = 'INIT_SELECTED_DEVICE_INFO',
}

const mutations: MutationTree<DeviceStoreState> = {
  [MutationTypes.SET_SEARCHED_KEYWORD](state, payload: string) {
    state.searchedKeyword = payload;
  },
  [MutationTypes.INIT_SELECTED_DEVICE_INFO](state) {
    state.selectedDeviceInfo = {
      rowIndex: undefined,
      rowPage: 1,
      serial: '',
      sort: {
        order: '',
        by: '',
      },
      filteredValue: [],
    };
  },
  [MutationTypes.INIT_DEVICE_DETAIL](state) {
    state.deviceDetail = null;
  },
  [MutationTypes.SET_DEVICE_DETAIL](
    state,
    payload: FetchDeviceResponse['getDeviceInfoData']
  ) {
    const {
      devicesId,
      deviceModelName,
      installerRegistrations,
      isConnected,
      serial,
      devices: { lastLogDate },
    } = payload;

    state.deviceDetail = {
      devicesId,
      serial,
      deviceModelName,
      updatedAt: installerRegistrations?.updatedAt,
      lastLogDate,
      isConnected: isConnected === 0 ? false : true,
    };
  },
  [MutationTypes.SET_SELECTED_DEVICE_INFO](
    state,
    payload: DeviceStoreState['selectedDeviceInfo']
  ) {
    state.selectedDeviceInfo = payload;
  },
  [MutationTypes.SET_DEVICE_LIST](
    state: DeviceStoreState,
    payload: FetchDeviceListResponse['getDeviceInfoList']
  ) {
    const dataSource: DeviceStoreState['deviceLists'] = payload.content.map(
      (row) => {
        return {
          serial: row.serial,
          deviceModel: row.deviceModelName,
          lastLogDate: row.devices?.lastLogDate,
          updatedAt: row.installerRegistrations?.updatedAt,
          status: row.isConnected,
        };
      }
    );

    state.size = payload.size;
    state.totalElements = payload.totalElements;
    state.totalPages = payload.totalPages;
    state.deviceLists = dataSource;
  },
};

const actions: ActionTree<DeviceStoreState, RootState> = {
  async fetchDevice({ commit, state }, { variables }: FetchDevicePayload) {
    const router = useRouter();
    state.isDetailLoading = true;
    state.deviceDetail = null;

    const {
      data: { getDeviceInfoData },
    } = await graphqlClient.query<FetchDeviceResponse>({
      query: GET_DEVICE_BY_SERIAL,
      variables,
      fetchPolicy: 'network-only',
    });

    if (getDeviceInfoData) {
      commit(MutationTypes.SET_DEVICE_DETAIL, getDeviceInfoData);
    } else {
      alert('The serial does not exist.');

      router.push({
        name: ROUTE_NAMES.DEVICES,
      });
    }

    state.isDetailLoading = false;
  },
  async fetchDeviceList(
    { commit, state },
    payload: FetchDeviceListPayload
  ): Promise<void> {
    state.isLoading = true;
    const {
      data: { getDeviceInfoList },
    } = await graphqlClient.query<FetchDeviceListResponse>({
      query: GET_DEVICE_INFO_LIST,
      variables: payload.variables,
      fetchPolicy: 'network-only',
    });
    if (getDeviceInfoList) {
      commit(MutationTypes.SET_DEVICE_LIST, getDeviceInfoList);
      state.searchedKeyword = payload.variables.keyword;

      // if (payload.variables.keyword) {
      //   window.history.replaceState(
      //     { serial: payload.variables.keyword },
      //     '/devices',
      //     '/devices'
      //   );
      //   // router.push({
      //   //   query: {
      //   //     serial: payload.variables.keyword,
      //   //   },
      //   // });
      // } else {
      //   router.push('/devices');
      // }
    }

    state.isLoading = false;
  },
};

export const device: Module<DeviceStoreState, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
};
