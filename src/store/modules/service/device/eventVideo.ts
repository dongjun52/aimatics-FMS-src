import { GET_EVENT_VIDEO_LIST } from '@/graphql/service/device/eventVideo';
import { RootState } from '@/store';
import {
  EventVideoListContent,
  FetchEventVideoListPayload,
  FetchEventVideoListResponse,
} from '@/types/service/device/eventVideo';
import graphqlClient from '@/utils/graphql';
import { ActionTree, MutationTree, Module } from 'vuex';
export interface EventVideoListState {
  isLoading: boolean;
  size: number | undefined;
  pageNum: number;
  pageSize: number;
  totalPages: number;
  totalElements: number;
  eventVideoList: EventVideoListContent[];
  selectedPlayList: {
    rowPage: number;
  };
}

const state = (): EventVideoListState => ({
  isLoading: false,
  size: undefined,
  pageNum: 1,
  pageSize: 10,
  totalPages: 1,
  totalElements: 0,
  eventVideoList: [],
  selectedPlayList: {
    rowPage: 1,
  },
});

export enum MutationTypes {
  GET_EVENT_VIDEO_LIST = 'GET_EVENT_VIDEO_LIST',
  SET_SELECTED_PLAY_LIST = 'SET_SELECTED_PLAY_LIST',
  INIT_EVENT_VIDEO_LIST = 'INIT_EVENT_VIDEO_LIST',
  SET_PAGENUM = 'SET_PAGENUM',
}

const mutations: MutationTree<EventVideoListState> = {
  [MutationTypes.INIT_EVENT_VIDEO_LIST](state: EventVideoListState) {
    state.eventVideoList = [];
  },
  [MutationTypes.SET_SELECTED_PLAY_LIST](
    state: EventVideoListState,
    payload: EventVideoListState['selectedPlayList']
  ) {
    state.selectedPlayList.rowPage = payload.rowPage;
  },
  [MutationTypes.SET_PAGENUM](state: EventVideoListState, payload: number[]) {
    state.pageNum = payload[0];
    state.pageSize = payload[1];
  },
  [MutationTypes.GET_EVENT_VIDEO_LIST](
    state: EventVideoListState,
    payload: FetchEventVideoListResponse['getEventVideoList']
  ) {
    const dataSource: EventVideoListContent[] = payload.content.map((row) => {
      return {
        videoId: row.videoId,
        video: row.thumbnails,
        eventType: row.eventType,
        eventTag: row.eventTag,
        time: row.eventTime,
        eventTypeName: row.eventTypeName,
        frontVideoUrl: row.frontVideoUrl,
        backVideoUrl: row.backVideoUrl,
        encodedFiles: row.encodedFiles,
        serial: row.serialNumber,
        stillCut: row.isStillCutRequest,
      };
    });

    state.totalElements = payload.totalElements;
    state.eventVideoList = dataSource;
    state.totalPages = payload.totalPages;
    state.size = payload.size;
  },
};

const actions: ActionTree<EventVideoListState, RootState> = {
  async fetchEventVideoList(
    { commit, state },
    payload: FetchEventVideoListPayload
  ) {
    state.isLoading = true;

    const {
      data: { getEventVideoList },
    } = await graphqlClient.query<FetchEventVideoListResponse>({
      query: GET_EVENT_VIDEO_LIST,
      variables: payload.variables,
      fetchPolicy: 'network-only',
    });

    if (getEventVideoList) {
      commit(MutationTypes.GET_EVENT_VIDEO_LIST, getEventVideoList);
    }

    state.isLoading = false;
  },
};

export const eventVideoList: Module<EventVideoListState, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
};
