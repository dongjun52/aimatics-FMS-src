<template>
  <Spin :spinning="loading">
    <video ref="videoPlayer" :id="videoName" class="video-js" />
  </Spin>
</template>

<script lang="ts">
import 'video.js/dist/video-js.css';

import videojs from 'video.js';
import type { VideoJsPlayerOptions } from 'video.js';
import type { RootState } from '@/store';
import type { PlayerStoreState } from '@/store/modules/service/common/player';
import {
  computed,
  defineComponent,
  onMounted,
  onUnmounted,
  ref,
  watch,
} from 'vue';
import { useStore } from 'vuex';
import {
  MutationTypes,
  defineModule,
} from '@/store/modules/service/common/player';
import Spin from 'ant-design-vue/es/spin';

const setCanPlayThrough = `${defineModule}${MutationTypes.SET_VIDEO_CAN_PLAY_THROUGH}`;
const setDuration = `${defineModule}${MutationTypes.SET_DURATION}`;
const setMapAndGraphCurrent = `${defineModule}${MutationTypes.SET_MAP_AND_GRAPH_CURRENT}`;
const setPercentage = `${defineModule}${MutationTypes.SET_PERCENTAGE}`;
const setPlayStatus = `${defineModule}${MutationTypes.SET_PLAY_STATUS}`;

export default defineComponent({
  name: 'Player',
  props: {
    videoName: {
      type: String,
      required: false,
      default: 'video-player',
    },
    isFront: {
      type: Boolean,
      required: false,
      default: false,
    },
    videoSource: {
      type: String,
      required: false,
      default: '',
    },
    isUseDefaultUi: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  components: {
    Spin,
  },
  setup(props) {
    const { state, commit } = useStore<RootState>();
    const player = ref<videojs.Player | null>(null);
    const videoPlayer = ref<string>(props.videoName);
    const loading = ref<boolean>(true);

    const options = ref<VideoJsPlayerOptions>({
      autoplay: false,
      controls: props.isUseDefaultUi,
      muted: true,
      sources: [
        {
          src: props.videoSource,
          type: 'video/mp4',
        },
      ],
      userActions: {
        hotkeys: (event: any) => {
          if (event.which === 32) {
            commit(setPlayStatus, !player.value?.paused());
          }
        },
      },
    });

    const videoSource = computed(() => state.player.videoSource);

    onMounted((): void => {
      player.value = null;

      let src = '';
      if (props.isUseDefaultUi) {
        src = props.videoSource;
      } else {
        src = props.isFront ? videoSource.value.front : videoSource.value.rear;
      }

      const playerOptions = {
        ...options.value,
        sources: [
          {
            src: src,
            type: 'video/mp4',
          },
        ],
      };

      player.value = videojs(videoPlayer.value, playerOptions, onPlayerReady);
    });

    const playFromOneVideo = (): boolean => {
      const { front, rear } = videoSource.value;

      switch (true) {
        case !front || front === '':
          commit(setPlayStatus, { front: true });
          return !props.isFront;
        case !rear || rear === '':
          commit(setPlayStatus, { rear: true });
          return props.isFront;
        case !front && !rear:
          return false;
        default:
          return props.isFront;
      }
    };

    const onCanPlayThrough = (): void => {
      player.value?.on('canplaythrough', (): void => {
        commit(setDuration, player.value?.duration());
        commit(
          setCanPlayThrough,
          props.isFront ? { front: true } : { rear: true }
        );
      });
    };

    const nowPlaying = (): void => {
      player.value?.on('timeupdate', (): void => {
        const current = player.value?.currentTime();
        const duration = player.value?.duration();

        if (current && duration) {
          const percentage = (current / duration) * 100;

          commit(setMapAndGraphCurrent, Math.floor(current));
          commit(setPercentage, percentage);
        }
      });
    };

    const playEnded = (): void => {
      player.value?.on('ended', (): void => {
        commit(setPlayStatus, false);
      });
    };

    const onPlayerReady = (): void => {
      if (!player.value) {
        return;
      }

      if (props.isUseDefaultUi) {
        return;
      }

      // 재생 시작 가능 체크
      onCanPlayThrough();

      // 전방 또는 후방 어느 영상을 기준으로 재생 시킬 지
      if (!playFromOneVideo()) {
        return;
      }

      // 재생 중
      nowPlaying();

      // 재생 끝
      playEnded();
    };

    // 재생 가능 체크
    const canPlayThrough = computed(() => state.player.canPlayThrough);

    let lazyLoading;

    watch(
      () => canPlayThrough.value,
      (canPlayThrough: PlayerStoreState['canPlayThrough']) => {
        const { front, rear } = canPlayThrough;

        if (front && rear) {
          lazyLoading = setTimeout(() => {
            loading.value = false;
            commit(setPlayStatus, true);
          }, 5000);
        }
      },
      {
        deep: true,
      }
    );

    // 재생 상태 체크 (재생, 일시정지)
    const isPlay = computed(() => state.player.isPlay);
    watch(
      () => isPlay.value,
      (isPlay: boolean) => {
        if (player.value?.ended() && isPlay) {
          player.value?.currentTime(0);
        }
        isPlay ? player.value?.play() : player.value?.pause();
      }
    );

    // 재생바 위치 체크 및 시간 이동 적용
    const current = computed(() => state.player.current);
    watch(
      () => current.value,
      (current: number) => {
        player.value?.currentTime(current);

        if (!player.value?.paused()) {
          // 멈춰 있으면 재생시키지 않음
          player.value?.play();
        }
      }
    );

    const requestFullScreen = async () => {
      await player.value?.requestFullscreen();
    };

    const requestPip = async () => {
      await player.value?.requestPictureInPicture();
    };

    const isFullScreenAndPipMode = computed(() => state.player.screenControl);
    watch(
      () => isFullScreenAndPipMode.value,
      (isFullScreenAndPipMode: PlayerStoreState['screenControl']) => {
        const { isFrontFullScreen, isRearFullScreen } = isFullScreenAndPipMode;

        if (isFrontFullScreen && props.isFront) {
          requestFullScreen();
        }

        if (isRearFullScreen && !props.isFront) {
          requestFullScreen();
        }
      },
      {
        deep: true,
      }
    );

    document.addEventListener('fullscreenchange', (e: any) => {
      if (document.fullscreenElement === null) {
        commit(`player/CONTROL_SCREEN`, {
          isFrontFullScreen: false,
          isRearFullScreen: false,
        });
        // player.value?.exitPictureInPicture();
      }
    });

    // 플레이어 파기 및 데이터 초기화
    onUnmounted((): void => {
      commit('player/RESET');
      clearTimeout(lazyLoading);
      player.value?.dispose();
    });

    return {
      loading,
    };
  },
});
</script>

<style lang="scss">
//.vjs-control-bar {
//  display: none !important;
//}
</style>
