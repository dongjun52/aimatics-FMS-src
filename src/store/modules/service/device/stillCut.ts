import type { ApolloQueryResult } from 'apollo-client';
import type { ActionTree, Module, MutationTree } from 'vuex';
import type { RootState } from '@/store';
import type {
  AdditionalStillCutContent,
  GetStillCutList,
  GetStillCutOne,
  StillCutList,
  StillCutContent,
  StillCutListVariables,
  StillCutOneVariables,
  RequestImgVariables,
  RequestJpgCmd,
  RequestVideoVariables,
  RequestVideoCmd,
} from '@/types/service/device/stillCut';
import type { REQUEST_STATUS_RETURN } from '@/helpers/stillCut';

import {
  REQUEST_STILL_CUT_IMAGE,
  REQUEST_STILL_CUT_VIDEO,
  STILL_CUT_LIST,
  STILL_CUT_LIST_ONLY_ONE,
} from '@/graphql/service/device/stillCut';
import { requestStatus } from '@/helpers/stillCut';
import graphqlClient from '@/utils/graphql';
import dayjs from 'dayjs';

export interface StillCutStoreState {
  loading: boolean;
  stillCutListVariables: StillCutListVariables;
  stillCut: {
    dataSource: AdditionalStillCutContent[];
    total: number;
    pages: number;
  };
}

export const stillCutState = (): StillCutStoreState => ({
  ...defaultStillCutState(),
});

export const MutationTypes = {
  RESET: 'RESET',
  SET_STILL_CUT_VARIABLES: 'SET_STILL_CUT_VARIABLES',
  SET_STILL_CUT_LIST: 'SET_STILL_CUT_LIST',
  SET_STILL_CUT_LIST_ONLY_ONE: 'SET_STILL_CUT_LIST_ONLY_ONE',
} as const;

const mutations: MutationTree<StillCutStoreState> = {
  [MutationTypes.RESET](state: StillCutStoreState) {
    const { stillCutListVariables, stillCut } = defaultStillCutState();

    state.stillCut = stillCut;
    state.stillCutListVariables = stillCutListVariables;
  },
  [MutationTypes.SET_STILL_CUT_VARIABLES](
    state: StillCutStoreState,
    payload: StillCutListVariables
  ) {
    state.stillCutListVariables = payload;
  },
  [MutationTypes.SET_STILL_CUT_LIST](
    state: StillCutStoreState,
    payload: StillCutList
  ) {
    const { content, totalElements, totalPages } = payload;

    const dataSource: AdditionalStillCutContent[] =
      totalElements === 0
        ? []
        : content.map((data: StillCutContent): AdditionalStillCutContent => {
            const requestCheck: ReturnType<() => REQUEST_STATUS_RETURN> =
              requestStatus(data.stillCutStatus, data.videoStatus);

            return {
              ...data,
              status: requestCheck.status,
              btnClass: requestCheck.btnClass,
              btnName: requestCheck.btnName,
              event: requestCheck.event,
              fontColor: requestCheck.fontColor,
            };
          });

    state.stillCut = {
      dataSource,
      total: totalElements,
      pages: totalPages,
    };
  },
  [MutationTypes.SET_STILL_CUT_LIST_ONLY_ONE](
    state: StillCutStoreState,
    payload: { stillCutOne: StillCutContent }
  ) {
    const { stillCutOne } = payload;

    const index: number = state.stillCut.dataSource.findIndex(
      (stateData: StillCutContent) =>
        stateData.lastKey === stillCutOne.lastKey &&
        stateData.jpgTime === stillCutOne.jpgTime
    );

    if (index === -1) {
      return;
    }

    const requestCheck: ReturnType<() => REQUEST_STATUS_RETURN> = requestStatus(
      stillCutOne.stillCutStatus,
      stillCutOne.videoStatus
    );

    const oneDataSource: AdditionalStillCutContent = {
      ...stillCutOne,
      status: requestCheck.status,
      btnClass: requestCheck.btnClass,
      btnName: requestCheck.btnName,
      event: requestCheck.event,
      fontColor: requestCheck.fontColor,
    };

    state.stillCut.dataSource.splice(index, 1, oneDataSource);
  },
};

export const ActionTypes = {
  GET_STILL_CUT_LIST: 'GET_STILL_CUT_LIST',
  GET_STILL_CUT_LIST_ONLY_ONE: 'GET_STILL_CUT_LIST_ONLY_ONE',
  REQUEST_STILL_CUT_IMAGE: 'REQUEST_STILL_CUT_IMAGE',
  REQUEST_STILL_CUT_VIDEO: 'REQUEST_STILL_CUT_VIDEO',
} as const;

const actions: ActionTree<StillCutStoreState, RootState> = {
  async [ActionTypes.GET_STILL_CUT_LIST]({ state, commit }): Promise<void> {
    state.loading = true;

    const {
      data: { getStillCutList },
    } = await graphqlClient.query<GetStillCutList>({
      query: STILL_CUT_LIST,
      variables: state.stillCutListVariables,
      fetchPolicy: 'network-only',
    });

    if (getStillCutList) {
      commit(MutationTypes.SET_STILL_CUT_LIST, getStillCutList);
    }

    state.loading = false;
  },
  async [ActionTypes.GET_STILL_CUT_LIST_ONLY_ONE](
    { commit },
    payload: StillCutOneVariables
  ): Promise<void> {
    await graphqlClient
      .query<GetStillCutOne>({
        query: STILL_CUT_LIST_ONLY_ONE,
        variables: {
          serial: payload.serial,
          time: payload.time,
        },
        fetchPolicy: 'network-only',
      })
      .then((response: ApolloQueryResult<GetStillCutOne>) => {
        commit(MutationTypes.SET_STILL_CUT_LIST_ONLY_ONE, {
          stillCutOne: response.data.getStillCutOne,
        });
      });
  },
  async [ActionTypes.REQUEST_STILL_CUT_IMAGE](
    { dispatch },
    payload: RequestImgVariables
  ): Promise<void> {
    await graphqlClient
      .mutate<RequestJpgCmd>({
        mutation: REQUEST_STILL_CUT_IMAGE,
        variables: payload,
      })
      .then((response: ApolloQueryResult<RequestJpgCmd>) => {
        if (response.data.requestJpgCmd.success) {
          dispatch(ActionTypes.GET_STILL_CUT_LIST_ONLY_ONE, payload);
        }
      });
  },
  async [ActionTypes.REQUEST_STILL_CUT_VIDEO](
    { dispatch },
    payload: RequestVideoVariables
  ): Promise<void> {
    await graphqlClient
      .mutate<RequestVideoCmd>({
        mutation: REQUEST_STILL_CUT_VIDEO,
        variables: payload,
      })
      .then((response: ApolloQueryResult<RequestVideoCmd>) => {
        if (response.data.requestVideoCmd.success) {
          dispatch(ActionTypes.GET_STILL_CUT_LIST_ONLY_ONE, payload);
        }
      });
  },
};

export const defaultStillCutState = (): StillCutStoreState => {
  return {
    loading: false,
    stillCutListVariables: {
      serial: '', // 테스트: AR9DEV3001, AR9TEST001
      from: dayjs().format('YYYY-MM-DD'),
      pageNum: 1,
      size: 10,
    },
    stillCut: {
      dataSource: [],
      total: 0,
      pages: 1,
    },
  };
};

export const stillCut: Module<StillCutStoreState, RootState> = {
  namespaced: true,
  state: stillCutState,
  mutations,
  actions,
};
