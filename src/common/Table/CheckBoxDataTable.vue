<template>
  <Table
    class="table_basic dashboard_table"
    :columns="columns"
    :data-source="dataSource"
    :row-selection="{
      selectedRowKeys: selectedRowKeys,
      onChange: onSelectChange,
    }"
  >
    <template #video="{ record }">
      <img
        alt=""
        src="@/assets/images/common/icon_play_danger.png"
        style="width: 26px; cursor: pointer"
        @click="open(record.video)"
      />
      <!-- 아이콘 분류 필요
      사고영상: icon_play_accident.png
      위험영상: icon_play_danger.png
      영상없음: icon_play_value.png
      -->
      <!--Modal-->
      <Modal
        v-if="record.video[0] === frontVideo"
        v-model:visible="isShowVideoPlayerModal"
        centered
        width="95%"
        title="영상플레이어"
        class="contents_modal video_player"
        @ok="isShowVideoPlayerModal = false"
      >
        <VideoPlayer :videos="[frontVideo, backVideo]" />
      </Modal>
    </template>
  </Table>
</template>

<script lang="ts">
import Modal from 'ant-design-vue/es/modal';
import Table from 'ant-design-vue/es/table';
import { computed, defineComponent, inject, reactive, toRefs } from 'vue';

import VideoPlayer from '@/common/Video/VideoPlayer.vue';

export default defineComponent({
  name: 'CheckBoxDataTable',
  components: {
    Table,
    Modal,
    VideoPlayer,
  },
  props: {
    dataSource: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const state = reactive<{
      selectedRowKeys: any;
      frontVideo: string;
      backVideo: string;
      isShowVideoPlayerModal: boolean;
    }>({
      selectedRowKeys: [],
      frontVideo: '',
      backVideo: '',
      isShowVideoPlayerModal: false,
    });
    const columns = inject('columns');
    const hasSelected = computed(() => state.selectedRowKeys.length > 0);
    const onSelectChange = (selectedRowKeys: any) => {
      state.selectedRowKeys = selectedRowKeys;
    };
    const open = (param: string[]) => {
      state.frontVideo = param[0];
      state.backVideo = param[1];
      state.isShowVideoPlayerModal = true;
    };
    return {
      columns,
      hasSelected,
      onSelectChange,
      open,
      ...toRefs(state),
    };
  },
});
</script>

<style scoped></style>
