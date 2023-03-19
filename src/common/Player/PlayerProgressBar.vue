<template>
  <div class="progress_inner">
    <div class="play_stop_btn">
      <img
        v-if="!isPlay"
        src="@/assets/images/common/icon_play.png"
        class="vm"
        alt=""
        @click="onClickButton(true)"
      />
      <img
        v-else
        src="@/assets/images/common/icon_stop.png"
        class="vm"
        alt=""
        @click="onClickButton(false)"
      />
    </div>

    <div id="custom-seekbar" ref="progressBar" @click="onClickProgressBar">
      <span :style="{ width: `${percentage}%` }"></span>
    </div>
  </div>

  <div class="video_timer">
    <span class="ft_gray">
      {{ convertSecondToMinutes(current) }} /
      {{ convertSecondToMinutes(Math.floor(duration)) }}
    </span>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue';
import { useStore } from 'vuex';
import type { RootState } from '@/store';
import { convertSecondToMinutes } from '@/utils/dateFormat';

export default defineComponent({
  name: 'PlayerProgressBar',
  components: {},
  setup() {
    const { state, commit } = useStore<RootState>();
    const progressBar = ref();

    const percentage = computed(() => state.player.percentage);
    const current = computed(() => state.player.graphAndMapCurrent);
    const duration = computed(() => state.player.duration);
    const isPlay = computed(() => state.player.isPlay);

    const onClickProgressBar = (e: any) => {
      const offset = progressBar.value.offsetWidth;

      const current =
        duration.value * ((offset - (offset - e.offsetX)) / offset);

      commit('player/SET_CURRENT', current);
    };

    const onClickButton = (isPlay: boolean): void => {
      commit('player/SET_PLAY_STATUS', isPlay);
    };

    return {
      progressBar,
      percentage,
      current,
      duration,
      isPlay,
      onClickProgressBar,
      onClickButton,
      convertSecondToMinutes,
    };
  },
});
</script>

<style lang="scss" scoped>
.progress_inner {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .play_stop_btn {
    padding-left: 10px;

    > img {
      cursor: pointer;
    }
  }

  #custom-seekbar {
    cursor: pointer;
    height: 8px;
    border-radius: 12px;
    background-color: #eee;
    overflow: hidden;
    position: relative;
    width: 97%;

    > span {
      background-color: #01afde;
      position: absolute;
      top: 0;
      left: 0;
      height: 8px;
      width: 300px;
    }
  }
}

.video_timer {
  padding-top: 5px;
  padding-left: 45px;
}
</style>
