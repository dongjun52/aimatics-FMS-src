import type { ActionTree, Module, MutationTree } from 'vuex';
import type { RootState } from '@/store';
import type {
  DeviceList,
  MapDeviceList,
  MapDeviceTableList,
  MapTabCounts,
} from '@/types/service/map/map';

import {
  MAP_DEVICE_LIST,
  MAP_DEVICE_LIST_TABLE,
  MAP_DEVICE_COUNT_INFO_BY_STATUS,
  MAP_GET_DEVICE_INFO,
} from '@/graphql/service/map/map';
import graphqlClient from '@/utils/graphql';

export interface MapStoreState {
  loadingTabCounts: boolean;
  loadingMap: boolean;
  loadingTable: boolean;
  variables: {
    tab: {
      companyIds: number[];
    };
    map: {
      companyIds: number[];
      type: number;
    };
    table: {
      companyIds: number[];
      pageNo: number;
      pageSize: number;
      vehiclesName: string;
      type: number;
    };
  };
  markerPosition: {
    lat: number;
    lng: number;
    serial: string;
  };
  tabCounts: {
    whole: number;
    driving: number;
    stop: number;
  };
  tooltipInfo: {
    deviceType: 'R8' | 'R9' | 'No Data';
    lastUpdate: string;
    installDate: string;
  };
  tableTotal: number;
  deviceList: DeviceList[];
  mapDeviceList: DeviceList[];
}

const state = (): MapStoreState => ({
  ...defaultMapStoreState(),
});

export const MutationTypes = {
  INIT_VARIABLES: 'INIT_VARIABLES',
  INIT_MARKER_WHEN_EXIST_QUERY_SERIAL: 'INIT_MARKER_WHEN_EXIST_QUERY_SERIAL',
  RESET_MAP_DEVICE_LIST: 'RESET_MAP_DEVICE_LIST',
  SET_MARKER_POSITION: 'SET_MARKER_POSITION',
  SET_MAP_VARIABLES: 'SET_MAP_VARIABLES',
  SET_TABLE_VARIABLES: 'SET_TABLE_VARIABLES',
  SET_DEVICE_STATUS_COUNTS: 'SET_DEVICE_STATUS_COUNTS',
  SET_MAP_DEVICE_LIST: 'SET_MAP_DEVICE_LIST',
  SET_TABLE_LIST: 'SET_TABLE_LIST',
  SET_DEVICE_INFO: 'SET_DEVICE_INFO',
};

const mutations: MutationTree<MapStoreState> = {
  [MutationTypes.INIT_VARIABLES](
    state: MapStoreState,
    payload: MapStoreState['variables']['table']
  ) {
    const { companyIds, type } = payload;

    state.variables.tab = {
      companyIds,
    };
    state.variables.map = {
      companyIds,
      type,
    };
    state.variables.table = {
      ...payload,
    };
  },
  [MutationTypes.INIT_MARKER_WHEN_EXIST_QUERY_SERIAL](
    state: MapStoreState,
    payload: { serial: string }
  ) {
    const index = state.mapDeviceList.findIndex(
      (device: DeviceList) => device.serial === payload.serial
    );

    if (index === -1) {
      return;
    }

    const { serial, lat, lng } = state.mapDeviceList[index];
    state.markerPosition = {
      serial,
      lat,
      lng,
    };
  },
  [MutationTypes.RESET_MAP_DEVICE_LIST](state: MapStoreState) {
    state.deviceList = [];
  },
  [MutationTypes.SET_MARKER_POSITION](
    state: MapStoreState,
    payload: MapStoreState['markerPosition']
  ) {
    state.markerPosition = payload;
  },
  [MutationTypes.SET_MAP_VARIABLES](
    state: MapStoreState,
    payload: MapStoreState['variables']['map']
  ) {
    state.variables.map = {
      ...state.variables.map,
      ...payload,
    };
  },
  [MutationTypes.SET_TABLE_VARIABLES](
    state: MapStoreState,
    payload: MapStoreState['variables']['table']
  ) {
    state.variables.table = {
      ...state.variables.table,
      ...payload,
    };
  },
  [MutationTypes.SET_DEVICE_STATUS_COUNTS](
    state: MapStoreState,
    payload: MapTabCounts['getTripCard']
  ) {
    state.tabCounts = payload;
  },
  [MutationTypes.SET_MAP_DEVICE_LIST](
    state: MapStoreState,
    payload: DeviceList[]
  ) {
    state.mapDeviceList = payload;
  },
  [MutationTypes.SET_TABLE_LIST](
    state: MapStoreState,
    payload: MapDeviceTableList['lastTripPage']
  ) {
    const { totalPages, content } = payload;

    state.tableTotal = totalPages;

    if (content) {
      state.deviceList = state.deviceList.concat(content);
    }
  },
  [MutationTypes.SET_DEVICE_INFO](state: MapStoreState, payload) {
    const { deviceType, devices, installerRegistrations } = payload;
    state.tooltipInfo = {
      deviceType,
      installDate: installerRegistrations.installDate,
      lastUpdate: devices.lastUpdate,
    };
  },
};

export const ActionTypes = {
  INIT_MAP: 'graphql/all',
  GET_MAP_DEVICE_LIST: 'graphql/lastTripList',
  GET_TABLE_LIST: 'graphql/lastTripPage',
  GET_MAP_DEVICE_COUNTS: 'graphql/getTripCard',
  GET_DEVICE_INFO: 'graphql/getDeviceInfoData',
};

const actions: ActionTree<MapStoreState, RootState> = {
  async [ActionTypes.INIT_MAP]({ dispatch }) {
    await dispatch(ActionTypes.GET_MAP_DEVICE_COUNTS);
    await dispatch(ActionTypes.GET_MAP_DEVICE_LIST);
    await dispatch(ActionTypes.GET_TABLE_LIST);
  },
  async [ActionTypes.GET_MAP_DEVICE_COUNTS]({ state, commit }) {
    state.loadingTabCounts = true;

    const {
      data: { getTripCard },
    } = await graphqlClient.query<MapTabCounts>({
      query: MAP_DEVICE_COUNT_INFO_BY_STATUS,
      variables: state.variables.tab,
      fetchPolicy: 'network-only',
    });

    if (getTripCard) {
      commit(MutationTypes.SET_DEVICE_STATUS_COUNTS, getTripCard);
    }

    state.loadingTabCounts = false;
  },
  async [ActionTypes.GET_MAP_DEVICE_LIST]({ state, commit }) {
    state.loadingMap = true;

    const {
      data: { lastTripList },
    } = await graphqlClient.query<MapDeviceList>({
      query: MAP_DEVICE_LIST,
      variables: state.variables.map,
      fetchPolicy: 'network-only',
    });

    if (lastTripList) {
      commit(MutationTypes.SET_MAP_DEVICE_LIST, lastTripList);
    }

    state.loadingMap = false;
  },
  async [ActionTypes.GET_TABLE_LIST]({ state, commit }) {
    state.loadingTable = true;

    const {
      data: { lastTripPage },
    } = await graphqlClient.query<MapDeviceTableList>({
      query: MAP_DEVICE_LIST_TABLE,
      variables: state.variables.table,
      fetchPolicy: 'network-only',
    });

    if (lastTripPage) {
      commit(MutationTypes.SET_TABLE_LIST, lastTripPage);
    }

    state.loadingTable = false;
  },
  async [ActionTypes.GET_DEVICE_INFO]({ commit }, payload: { serial: string }) {
    const {
      data: { getDeviceInfoData },
    } = await graphqlClient.query({
      query: MAP_GET_DEVICE_INFO,
      variables: payload,
    });

    if (getDeviceInfoData) {
      commit(MutationTypes.SET_DEVICE_INFO, getDeviceInfoData);
    }
  },
};

const defaultMapStoreState = (): MapStoreState => {
  return {
    loadingTabCounts: false,
    loadingMap: false,
    loadingTable: false,
    variables: {
      tab: {
        companyIds: [],
      },
      map: {
        companyIds: [],
        type: 0,
      },
      table: {
        companyIds: [],
        pageNo: 1,
        pageSize: 20,
        vehiclesName: '',
        type: 0,
      },
    },
    markerPosition: {
      lat: 0,
      lng: 0,
      serial: '',
    },
    tabCounts: {
      whole: 0,
      driving: 0,
      stop: 0,
    },
    tooltipInfo: {
      deviceType: 'No Data',
      lastUpdate: 'No Data',
      installDate: 'No Data',
    },
    tableTotal: 0,
    deviceList: [],
    mapDeviceList: [],
  };
};

export const map: Module<MapStoreState, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
};
