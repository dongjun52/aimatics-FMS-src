import dayjs from 'dayjs';
import type { ActionTree, Module, MutationTree } from 'vuex';

import { GOOGLE_MAP_POLYLINE_ICON } from '@/constants/mapOverview';
import {
  GET_RECOG_VIDEO_DATA,
  GET_WATERMARK_VIDEO_DATA,
  CONFIRM_DEVICE_TYPE,
} from '@/graphql/service/common/player';
import type { RootState } from '@/store';
import graphqlClient from '@/utils/graphql';
import type { ApolloQueryResult } from 'apollo-client';
import type {
  DriveLogs,
  GetVideoData,
  GetRecogVideoData,
  WaterMarkResponse,
  RecogResponse,
  VideoDeviceDividor,
} from '@/types/common/player';

interface VideoData {
  map: { lat: number; lng: number }[];
  polylineOptions: any;
  graph: {
    xaxis: string[] | number[];
    series: {
      rpm: number[];
      speed: number[];
      // brake: number[];
    };
  };
}

export interface PlayerStoreState {
  playerLoading: boolean;
  isShowVideo: boolean;
  percentage: number;
  duration: number;
  current: number;
  graphAndMapCurrent: number;
  isPlay: boolean;
  isR9: boolean;
  networkState: number;
  canPlayThrough: {
    front: boolean;
    rear: boolean;
  };
  screenControl: {
    isFrontFullScreen: boolean;
    isRearFullScreen: boolean;
  };
  videoSource: {
    front: string;
    rear: string;
  };
  videoDownloadQueueing: string[];
  videoData: VideoData;
}

export const defineModule = 'player/';

const state = (): PlayerStoreState => ({
  ...defaultMapStoreState(),
});

export const MutationTypes = {
  RESET: 'RESET',
  SET_PLAY_STATUS: 'SET_PLAY_STATUS',
  SET_PERCENTAGE: 'SET_PERCENTAGE',
  SET_DURATION: 'SET_DURATION',
  SET_CURRENT: 'SET_CURRENT',
  SET_NETWORK_STATE: 'SET_NETWORK_STATE',
  SET_MAP_AND_GRAPH_CURRENT: 'SET_MAP_AND_GRAPH_CURRENT',
  SET_MAP_AND_GRAPH_DATA: 'SET_MAP_AND_GRAPH_DATA',
  SET_VIDEO_CAN_PLAY_THROUGH: 'SET_VIDEO_CAN_PLAY_THROUGH',
  SET_WATER_MARK_VIDEO_DATA: 'SET_WATER_MARK_VIDEO_DATA',
  SET_RECOG_VIDEO_DATA: 'SET_RECOG_VIDEO_DATA',
  SET_DEVICE_TYPE: 'SET_DEVICE_TYPE',
  CONTROL_SCREEN: 'CONTROL_SCREEN',
  SET_VIDEO_DOWNLOAD_QUEUEING: 'SET_VIDEO_DOWNLOAD_QUEUEING',
};

const mutations: MutationTree<PlayerStoreState> = {
  [MutationTypes.RESET](state: PlayerStoreState) {
    const {
      canPlayThrough,
      current,
      duration,
      isPlay,
      screenControl,
      networkState,
    } = defaultMapStoreState();

    state.isShowVideo = false;
    state.canPlayThrough = canPlayThrough;
    state.isPlay = isPlay;

    state.current = current;
    state.percentage = 0;
    state.duration = duration;
    state.graphAndMapCurrent = 0;
    state.networkState = networkState;

    state.videoSource = {
      front: '',
      rear: '',
    };

    state.screenControl = screenControl;
  },
  [MutationTypes.SET_DEVICE_TYPE](
    state: PlayerStoreState,
    payload: 'R9' | 'R8'
  ) {
    state.isR9 = payload === 'R9';
  },
  [MutationTypes.SET_PLAY_STATUS](state: PlayerStoreState, payload: boolean) {
    state.isPlay = payload;
  },
  [MutationTypes.SET_VIDEO_CAN_PLAY_THROUGH](
    state: PlayerStoreState,
    payload: { front?: boolean; rear?: boolean }
  ) {
    if (payload.front) {
      state.canPlayThrough.front = payload.front;
    } else if (payload.rear) {
      state.canPlayThrough.rear = payload.rear;
    }
  },
  [MutationTypes.SET_PERCENTAGE](state: PlayerStoreState, payload: number) {
    state.percentage = payload;
  },
  [MutationTypes.SET_CURRENT](state: PlayerStoreState, payload: number) {
    state.current = payload;
  },
  [MutationTypes.SET_NETWORK_STATE](state: PlayerStoreState, payload: number) {
    state.networkState = payload;
  },
  [MutationTypes.SET_DURATION](state: PlayerStoreState, payload: number) {
    state.duration = payload;
  },
  [MutationTypes.SET_MAP_AND_GRAPH_CURRENT](
    state: PlayerStoreState,
    payload: number
  ) {
    state.graphAndMapCurrent = payload;
  },
  [MutationTypes.CONTROL_SCREEN](
    state: PlayerStoreState,
    payload: { isFrontFullScreen: boolean; isRearFullScreen: boolean }
  ) {
    const { isFrontFullScreen, isRearFullScreen } = payload;

    state.screenControl = {
      isFrontFullScreen,
      isRearFullScreen,
    };
  },
  [MutationTypes.SET_VIDEO_DOWNLOAD_QUEUEING](
    state: PlayerStoreState,
    payload: { push: true; fileName: string }
  ) {
    const { push, fileName } = payload;

    push
      ? state.videoDownloadQueueing.push(fileName)
      : state.videoDownloadQueueing.shift();
  },
  [MutationTypes.SET_WATER_MARK_VIDEO_DATA](
    state: PlayerStoreState,
    payload: WaterMarkResponse
  ) {
    const { videos } = payload;

    if (!videos) {
      return;
    }

    if (videos.length < 1) {
      return;
    }

    const videoData = videos[0];

    const mapPath: PlayerStoreState['videoData']['map'] = [];
    const rpm: number[] = [];
    const speed: number[] = [];
    // const brake: number[] = [];
    const xaxis: string[] = [];

    const lineSymbol = {
      path: GOOGLE_MAP_POLYLINE_ICON.FORWARD_CLOSED_ARROW,
      scale: 1.5,
      strokeColor: '#fff',
      fillColor: '#fff',
      fillOpacity: 1,
    };

    const polylineOptions = {
      icons: [{ icon: lineSymbol, repeat: '100px', offset: '100%' }],
      strokeColor: 'black',
      strokeWeight: 6,
      strokeOpacity: 1,
      geodesic: true,
    };

    videoData.driveLogs.map((logs: DriveLogs, index: number): void => {
      mapPath[index] = { lat: logs.lat, lng: logs.lng };
      rpm[index] = logs.rpmVal;
      speed[index] = logs.speed;
      // brake[index] = logs.breakVal;
      xaxis[index] = dayjs(logs.dateTime).format('HH:mm:ss');
    });

    state.videoSource = {
      front: videoData.frontUrl,
      rear: videoData.rearUrl,
    };
    state.videoData = {
      map: mapPath,
      polylineOptions: polylineOptions,
      graph: {
        series: {
          rpm,
          speed,
          // brake,
        },
        xaxis,
      },
    };
    state.current = 0;
    state.graphAndMapCurrent = 0;
    state.percentage = 0;
    state.isShowVideo = true;
  },
  [MutationTypes.SET_RECOG_VIDEO_DATA](
    state: PlayerStoreState,
    payload: RecogResponse
  ) {
    const { recogVideo } = payload;

    if (!recogVideo) {
      return;
    }

    if (recogVideo.length < 1) {
      return;
    }

    const videoData = recogVideo[0];

    const mapPath: PlayerStoreState['videoData']['map'] = [];
    const rpm: number[] = [];
    const speed: number[] = [];
    // const brake: number[] = [];
    const xaxis: string[] = [];

    const lineSymbol = {
      path: GOOGLE_MAP_POLYLINE_ICON.FORWARD_CLOSED_ARROW,
      scale: 1.5,
      strokeColor: '#fff',
      fillColor: '#fff',
      fillOpacity: 1,
    };

    const polylineOptions = {
      icons: [{ icon: lineSymbol, repeat: '100px', offset: '100%' }],
      strokeColor: 'black',
      strokeWeight: 6,
      strokeOpacity: 1,
      geodesic: true,
    };

    videoData.driveLogs.map((logs: DriveLogs, index: number): void => {
      mapPath[index] = { lat: logs.lat, lng: logs.lng };
      rpm[index] = logs.rpmVal;
      speed[index] = logs.speed;
      // brake[index] = logs.breakVal;
      xaxis[index] = dayjs(logs.dateTime).format('HH:mm:ss');
    });

    state.videoSource = {
      front: videoData.recogFrontUrl,
      rear: videoData.recogRearUrl,
    };
    state.videoData = {
      map: mapPath,
      polylineOptions: polylineOptions,
      graph: {
        series: {
          rpm,
          speed,
          // brake,
        },
        xaxis,
      },
    };
    state.current = 0;
    state.graphAndMapCurrent = 0;
    state.percentage = 0;
    state.isShowVideo = true;
  },
};

export const ActionTypes = {
  GET_WATERMARK_VIDEO_DATA: 'GET_WATERMARK_VIDEO_DATA',
  GET_RECOG_VIDEO_DATA: 'GET_RECOG_VIDEO_DATA',
  GET_VIDEO_WATER_OR_RECOG: 'GET_VIDEO_WATER_OR_RECOG',
  GET_DEVICE_TYPE: 'GET_DEVICE_TYPE',
};

const actions: ActionTree<PlayerStoreState, RootState> = {
  async [ActionTypes.GET_WATERMARK_VIDEO_DATA](
    { state, commit },
    payload: { videoId: number }
  ) {
    state.playerLoading = true;

    const {
      data: { getVideoData },
    } = await graphqlClient.query<GetVideoData>({
      query: GET_WATERMARK_VIDEO_DATA,
      variables: payload,
      fetchPolicy: 'network-only',
    });

    if (getVideoData) {
      commit(MutationTypes.SET_WATER_MARK_VIDEO_DATA, getVideoData);
    }

    state.playerLoading = false;
  },
  async [ActionTypes.GET_RECOG_VIDEO_DATA](
    { state, commit },
    payload: { videoId: number }
  ) {
    state.playerLoading = true;

    const {
      data: { getRecogVideoData },
    } = await graphqlClient.query<GetRecogVideoData>({
      query: GET_RECOG_VIDEO_DATA,
      variables: payload,
      fetchPolicy: 'network-only',
    });

    if (getRecogVideoData) {
      commit(MutationTypes.SET_RECOG_VIDEO_DATA, getRecogVideoData);
    }

    state.playerLoading = false;
  },
  async [ActionTypes.GET_VIDEO_WATER_OR_RECOG](
    { dispatch },
    payload: { type: string; videoId: number }
  ) {
    const { type, videoId } = payload;

    if (type === 'water') {
      dispatch(ActionTypes.GET_WATERMARK_VIDEO_DATA, { videoId: videoId });
    } else if (type === 'recog') {
      dispatch(ActionTypes.GET_RECOG_VIDEO_DATA, { videoId: videoId });
    }
  },
  async [ActionTypes.GET_DEVICE_TYPE](
    { commit },
    payload: { videoId: number }
  ): Promise<void> {
    await graphqlClient
      .query<VideoDeviceDividor>({
        query: CONFIRM_DEVICE_TYPE,
        variables: payload,
        fetchPolicy: 'network-only',
      })
      .then((response: ApolloQueryResult<VideoDeviceDividor>) => {
        commit(
          MutationTypes.SET_DEVICE_TYPE,
          response.data.videoDeviceDividor.deviceType
        );
      });
  },
};

const defaultMapStoreState = (): PlayerStoreState => {
  return {
    playerLoading: false,
    isShowVideo: false,
    percentage: 0,
    duration: 0,
    current: 0,
    graphAndMapCurrent: 0,
    isPlay: false,
    isR9: false,
    networkState: 0,
    canPlayThrough: {
      front: false,
      rear: false,
    },
    screenControl: {
      isFrontFullScreen: false,
      isRearFullScreen: false,
    },
    videoSource: {
      front: '',
      rear: '',
    },
    videoDownloadQueueing: [],
    videoData: {
      map: [
        {
          lat: 36.903876529771686,
          lng: 130.1810075584544,
        },
      ],
      polylineOptions: [],
      graph: {
        series: {
          rpm: [],
          speed: [],
          // brake: [],
        },
        xaxis: [],
      },
    },
  };
};

export const player: Module<PlayerStoreState, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
};
