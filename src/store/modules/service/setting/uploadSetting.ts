import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';
import { RootState } from '@/store';
import graphqlClient from '@/utils/graphql';
import {
  GET_ONDEMAND_GROUPS_QUERY,
  GET_ONDEMAND_SETTING_QUERY,
  UPDATE_ONDEMAND_SETTING_QUERY,
} from '@/graphql/service/setting/uploadSetting';
import {
  FetchOndemandGroupsPayload,
  FetchOndemandGroupsResponse,
  FetchOndemandSetingPayload,
  FetchOndemandSettingResponse,
  OndemandGroupsContent,
  OndemandParams,
  OndemandSetting,
  UpdateOndemandSettingPayload,
  UpdateOndemandSettingResponse,
  UpdateOndemandSettingVariables,
} from '@/types/service/setting/uploadSetting';
import { DEFINE_SETTINGS } from '@/constants/deviceSetting';
import { FMS_EVENTS } from '@/constants/eventType';
import { SettingKey } from '@/types/service/device/deviceSetting';
import { EventKey } from '@/types/common/eventType';
import { LOGIN_MESSAGE } from '@/constants/auth';

export const MODULE_PATH = 'uploadSetting/';

export interface UploadSetttingStoreState {
  isLoading: boolean;
  isSettingLoading: boolean;
  totalElements: number | null;
  ondemandGroups: OndemandGroupsContent[];
  ondemandSettings: OndemandSetting[];
  originOndemandSetting: OndemandSetting[];
}

const state = (): UploadSetttingStoreState => ({
  isLoading: false,
  isSettingLoading: false,
  totalElements: 0,
  ondemandGroups: [],
  ondemandSettings: [],
  originOndemandSetting: [],
});

const getters: GetterTree<UploadSetttingStoreState, RootState> = {};

export enum MutationTypes {
  SET_ONDEMAND_GROUPS = 'SET_ONDEMAND_GROUPS',
  SET_ONDEMEND_SETTING = 'SET_ONDEMEND_SETTING',
}

const mutations: MutationTree<UploadSetttingStoreState> = {
  [MutationTypes.SET_ONDEMEND_SETTING](
    state,
    payload: FetchOndemandSettingResponse['readOndemandPartset']
  ) {
    const ondemandSettings: OndemandSetting[] = [];

    if (payload.ondemandPartset) {
      Object.entries(payload.ondemandPartset).map(([key, value]) => {
        const ondemandEventKey = key as EventKey;
        const eventRow = FMS_EVENTS[key];

        ondemandSettings.push({
          type: eventRow ? eventRow.type : ondemandEventKey,
          name: eventRow ? eventRow.name : '-',
          isUse: value === null || value === 0 ? false : true,
        });
      });

      state.ondemandSettings = ondemandSettings;
      state.originOndemandSetting = ondemandSettings;
    }
  },
  [MutationTypes.SET_ONDEMAND_GROUPS](
    state,
    payload: FetchOndemandGroupsResponse['getOndemandGroupInfoList']
  ) {
    const { content, totalElements } = payload;

    state.totalElements = totalElements;
    state.ondemandGroups = content.map(({ companyName, deviceCnt }, index) => {
      return { key: index, companyName, deviceCnt };
    });
  },
};

export enum ActionTypes {
  FETCH_ONDEMAND_GROUPS = 'FETCH_ONDEMAND_GROUPS',
  FETCH_ONDEMAND_SETTING = 'FETCH_ONDEMAND_SETTING',
  UPDATE_ONDEMAND_SETTING = 'UPDATE_ONDEMAND_SETTING',
}

const actions: ActionTree<UploadSetttingStoreState, RootState> = {
  async [ActionTypes.UPDATE_ONDEMAND_SETTING](
    { rootState },
    payload: UpdateOndemandSettingPayload
  ): Promise<{ success: boolean; message: string }> {
    const variables: UpdateOndemandSettingVariables = {
      partnersId: rootState.auth.user.partnersId,
      partitionType: 0,
      ...parseOndemandSettings(payload),
    };

    try {
      const {
        data: { registOndemandPartset },
      } = await graphqlClient.mutate<UpdateOndemandSettingResponse>({
        mutation: UPDATE_ONDEMAND_SETTING_QUERY,
        variables: variables,
      });

      if (registOndemandPartset) {
        const { success, message } = registOndemandPartset;

        return {
          success,
          message,
        };
      } else {
        return {
          success: false,
          message: LOGIN_MESSAGE.CONTACT_ADMIN,
        };
      }
    } catch (err) {
      console.error(err);

      return {
        success: false,
        message: LOGIN_MESSAGE.CONTACT_ADMIN,
      };
    }
  },
  async [ActionTypes.FETCH_ONDEMAND_SETTING]({ rootState, state, commit }) {
    state.isSettingLoading = true;

    const payload: FetchOndemandSetingPayload = {
      variables: {
        partnersId: rootState.auth.user.partnersId,
        partitionType: 0,
      },
    };

    const {
      data: { readOndemandPartset },
    } = await graphqlClient.query<FetchOndemandSettingResponse>({
      query: GET_ONDEMAND_SETTING_QUERY,
      variables: payload.variables,
      fetchPolicy: 'network-only',
    });

    if (readOndemandPartset) {
      commit(MutationTypes.SET_ONDEMEND_SETTING, readOndemandPartset);
    }

    state.isSettingLoading = false;
  },
  async [ActionTypes.FETCH_ONDEMAND_GROUPS](
    { state, commit },
    payload: FetchOndemandGroupsPayload
  ) {
    state.isLoading = true;

    const {
      data: { getOndemandGroupInfoList },
    } = await graphqlClient.query<FetchOndemandGroupsResponse>({
      query: GET_ONDEMAND_GROUPS_QUERY,
      variables: payload.variables,
      fetchPolicy: 'network-only',
    });

    if (getOndemandGroupInfoList) {
      commit(MutationTypes.SET_ONDEMAND_GROUPS, getOndemandGroupInfoList);
    }

    state.isLoading = false;
  },
};

function parseOndemandSettings(
  ondemandSettings: OndemandSetting[]
): OndemandParams {
  const result = {} as OndemandParams;

  ondemandSettings.map((d) => {
    result[d.type] = d.isUse ? 1 : 0;
  });

  return result;
}

export const uploadSetting: Module<UploadSetttingStoreState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
