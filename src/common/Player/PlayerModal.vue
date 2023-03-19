<template>
  <Spin :spinning="initLoading">
    <div class="video_modal_wrap">
      <div class="top_btn_group">
        <div class="btn_left analysis_video_btn">
          <Group
            v-show="isR9"
            v-model:value="radioButtonValue"
            button-style="solid"
            @change="onChangeVideoType"
          >
            <Button value="water">General Video</Button>
            <Button value="recog">Analysis Video</Button>
          </Group>
        </div>
        <div class="btn_right">
          <AntdButton
            v-if="videoSource.front"
            class="btn btn_xxl btn_blue"
            :loading="isFrontDownloadStarted"
            :disabled="isFrontDownloadStarted"
            @click="onDownloadVideo('front')"
          >
            Front Video Download
          </AntdButton>
          <AntdButton
            v-if="videoSource.rear"
            class="btn btn_xxl btn_blue ml6"
            :loading="isRearDownloadStarted"
            :disabled="isRearDownloadStarted"
            @click="onDownloadVideo('rear')"
          >
            Rear Video Download
          </AntdButton>
        </div>
      </div>
      <div class="contents border_box" v-if="isShowVideo">
        <div class="video_section">
          <div id="video_inner" class="video_inner">
            <Player
              :video-name="
                radioButtonValue === 'water'
                  ? 'front-player'
                  : 'front-recog-player'
              "
              :is-front="true"
            />
          </div>
          <div id="video_inner2" class="video_inner2">
            <Player
              :video-name="
                radioButtonValue === 'water'
                  ? 'rear-player'
                  : 'rear-recog-player'
              "
            />
          </div>
        </div>

        <div class="graph_map_section">
          <div class="inner_graph">
            <VideoLineGraph class="graph_inbox" />
          </div>
          <div class="inner_map">
            <PlayerMap />
          </div>
        </div>

        <div class="player_progress">
          <PlayerProgressBar />
        </div>

        <div class="full_screen_btn">
          <button
            class="btn btn_xs btn_blue"
            @click="onClickFullScreenAndPip('front')"
          >
            Main Cam
            <img
              class="ml3"
              src="/src/assets/images/common/icon_full_window.png"
              alt=""
            />
          </button>
          <button
            class="btn btn_xs btn_blue ml6"
            @click="onClickFullScreenAndPip('rear')"
          >
            Sub Cam
            <img
              class="ml3"
              src="/src/assets/images/common/icon_full_window.png"
              alt=""
            />
          </button>
        </div>
      </div>
      <!-- <div class="video_paging">
        <div class="prev_video"></div>
        <div class="next_video"></div>
      </div> -->
    </div>
  </Spin>
</template>

<script lang="ts">
import Radio from 'ant-design-vue/es/radio';
import AntdButton from 'ant-design-vue/es/button';
import { computed, defineComponent, reactive, ref, toRefs, watch } from 'vue';
import { useStore } from 'vuex';

import VideoLineGraph from '@/common/Charts/VideoLineGraph.vue';
import Player from '@/common/Player/Player.vue';
import PlayerMap from '@/common/Player/PlayerMap.vue';
import PlayerProgressBar from '@/common/Player/PlayerProgressBar.vue';
import Spin from '@/common/Spin/Spin.vue';
import type { RootState } from '@/store';
import { ActionTypes } from '@/store/modules/service/common/player';
import { videoDownload } from '@/utils/videoPlayer';

const { Group, Button } = Radio;

export default defineComponent({
  name: 'PlayerModal',
  props: {
    videoId: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  components: {
    AntdButton,
    VideoLineGraph,
    Player,
    PlayerMap,
    PlayerProgressBar,
    Spin,
    Group,
    Button,
  },
  setup(props) {
    const { state, commit, dispatch } = useStore<RootState>();
    const radioButtonValue = ref<string>('water');

    const loadingState = reactive({
      initLoading: true,
      isFrontDownloadStarted: false,
      isRearDownloadStarted: false,
    });

    const isR9 = computed(() => state.player.isR9);
    const isPlayerLoading = computed(() => state.player.playerLoading);
    const isShowVideo = computed(() => state.player.isShowVideo);
    const downloadQueueing = computed(() => state.player.videoDownloadQueueing);
    const videoSource = computed(() => state.player.videoSource);

    (async () => {
      commit(`player/SET_DEVICE_TYPE`, 'R8');
      await dispatch(`player/${ActionTypes.GET_DEVICE_TYPE}`, {
        videoId: props.videoId,
      });
      await dispatch(`player/${ActionTypes.GET_VIDEO_WATER_OR_RECOG}`, {
        type: radioButtonValue.value,
        videoId: props.videoId,
      });
    })();

    watch(
      () => isPlayerLoading.value,
      (isPlayerLoading: boolean) => {
        if (!isPlayerLoading) {
          loadingState.initLoading = false;
        }
      }
    );

    watch(
      [videoSource, downloadQueueing],
      (sourceAndQueueing) => {
        const { front, rear } = sourceAndQueueing[0];
        const queueing = sourceAndQueueing[1];

        if (front) {
          const frontVideoName = front.split('/').pop();
          loadingState.isFrontDownloadStarted =
            queueing.includes(frontVideoName);
        }

        if (rear) {
          const rearVideoName = rear.split('/').pop();
          loadingState.isRearDownloadStarted = queueing.includes(rearVideoName);
        }
      },
      {
        immediate: true,
        deep: true,
      }
    );

    const onChangeVideoType = async (e: any): Promise<void> => {
      commit('player/RESET');

      const videoType = e.target.value;
      await dispatch(`player/${ActionTypes.GET_VIDEO_WATER_OR_RECOG}`, {
        type: videoType,
        videoId: props.videoId,
      });
    };

    const onDownloadVideo = async (type: string): Promise<void> => {
      const downloadParam = {
        url: videoSource.value[type],
        fileName: videoSource.value[type].split('/').pop(),
      };

      commit('player/SET_VIDEO_DOWNLOAD_QUEUEING', {
        push: true,
        fileName: videoSource.value[type].split('/').pop(),
      });

      await videoDownload(downloadParam).then(() => {
        commit('player/SET_VIDEO_DOWNLOAD_QUEUEING', {
          push: false,
          fileName: '',
        });
      });
    };

    const onClickFullScreenAndPip = (select: string) => {
      commit(`player/CONTROL_SCREEN`, {
        isFrontFullScreen: select === 'front',
        isRearFullScreen: select === 'rear',
      });
    };

    return {
      isR9,
      isShowVideo,
      videoSource,
      radioButtonValue,
      isPlayerLoading,
      ...toRefs(loadingState),
      onChangeVideoType,
      onDownloadVideo,
      onClickFullScreenAndPip,
    };
  },
});
</script>
