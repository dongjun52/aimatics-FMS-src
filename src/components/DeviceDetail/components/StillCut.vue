<template>
  <div class="tab_inner">
    <div class="tab_calendar">
      <p class="calendar_title mr10">Select Date :</p>
      <DayPicker @change="onChangeDate" />
    </div>

    <div class="list_table_info">
      <span class="refresh_btn ft_blueL fw_m" @click="onClickRefresh">
        <img
          class="refresh_img vm"
          src="/src/assets/images/common/icon_refresh2.png"
          alt=""
        />
        Refresh Lists
      </span>
      <p class="table_description ml15">{{ stillCutData.total }} Lists</p>
    </div>
    <Table
      class="table_video cursor_disable mt8"
      :data-source="stillCutData.dataSource"
      :columns="columns"
      :pagination="{
        total: stillCutData.total,
        current: variables.pageNum,
        pageSize: variables.size,
        pageSizeOptions: ['10', '30', '50'],
        position: ['bottomCenter'],
      }"
      :loading="{ spinning: stillCutLoading, size: 'large' }"
      @change="onChangePagination"
    >
      <template #bodyCell="{ column, record, index }">
        <template v-if="column.title === 'NO'">
          {{ index + 1 + variables.size * (variables.pageNum - 1) }}
        </template>
        <template v-if="column.dataIndex === 'Preview'">
          <!-- 클릭시 영상플레이어 모달 표출 -->
          <div
            class="still_img"
            :class="
              record.videoStatus === REQUEST_STATUS.SUCCESS ? 'video_ready' : ''
            "
            :style="{
              cursor: !record.preSignedThumbnail ? 'default' : 'pointer',
            }"
          >
            <!--{{ record.preSignedThumbnail }}-->
            <img
              v-show="record.preSignedThumbnail"
              :key="index"
              :src="record.preSignedThumbnail"
              alt="Thumbnail"
              @mouseover="onHoverImage"
              @mouseleave="onHoverCloseImage"
              @click="openVideoModal(record)"
            />

            <img
              v-show="!record.preSignedThumbnail"
              src="/src/assets/images/common/icon_noimage.png"
              alt="no_stillCut"
            />

            <Popover
              overlay-class-name="still_cut_popover"
              v-model:visible="seePopover"
              placement="right"
              v-if="
                targetImage.includes(record.preSignedThumbnail) &&
                record.videoStatus !== REQUEST_STATUS.SUCCESS
              "
            >
              <template #content>
                <img
                  :key="index"
                  :src="record.preSignedThumbnail"
                  alt="preSignedThumbnail"
                  style="width: 400px"
                />
              </template>
            </Popover>
          </div>
        </template>
        <template v-if="column.dataIndex === 'status'">
          <span :class="record.fontColor">{{ record.status }}</span>
        </template>
        <template v-if="column.dataIndex === 'Request'">
          <button :class="record.btnClass" @click="onRequest(record)">
            {{ record.btnName }}
          </button>
        </template>
      </template>
    </Table>
  </div>

  <Modal
    v-model:visible="isOpenVideoModal"
    centered
    class="contents_modal still_cut_modal"
    width="80%"
    :title="device?.serial"
    :destroy-on-close="true"
  >
    <PlayerModal :video-id="getVideoId" />
  </Modal>
</template>

<script lang="ts">
import Modal from 'ant-design-vue/es/modal';
import Popover from 'ant-design-vue/es/popover';
import Table from 'ant-design-vue/es/table';
import { computed, defineComponent, ref, toRefs, watch } from 'vue';
import { useStore } from 'vuex';

import DayPicker from '@/common/DatePicker/DayPicker.vue';
import PlayerModal from '@/common/Player/PlayerModal.vue';
import { REQUEST_STATUS } from '@/helpers/stillCut';
import { ROUTE_NAMES } from '@/constants/common';

import {
  ActionTypes,
  MutationTypes,
} from '@/store/modules/service/device/stillCut';

import type { RootState } from '@/store';
import type {
  AdditionalStillCutContent,
  StillCutListVariables,
  RequestImgVariables,
  RequestVideoVariables,
} from '@/types/service/device/stillCut';

export default defineComponent({
  name: 'StillCut',
  components: {
    Modal,
    Popover,
    Table,
    DayPicker,
    PlayerModal,
  },
  props: {
    serial: {
      type: String,
      required: true,
      default: '',
    },
    routeName: {
      type: String,
      required: true,
      default: '',
    },
  },
  setup(props) {
    const { serial, routeName } = toRefs(props);
    const { state, commit, dispatch } = useStore<RootState>();

    const device = computed(() => state.device.deviceDetail);
    const stillCutData = computed(() => state.stillCut.stillCut);
    const stillCutLoading = computed(() => state.stillCut.loading);
    const stillCutVariables = computed(
      () => state.stillCut.stillCutListVariables
    );

    const variables: StillCutListVariables = {
      // serial: props.serial,
      // from: dayjs().format('YYYY-MM-DD'),
      // pageNum: 1,
      // size: 10,
      ...stillCutVariables.value,
    };

    const fetchStillCutList = async (
      variables: StillCutListVariables
    ): Promise<void> => {
      commit(`stillCut/${MutationTypes.SET_STILL_CUT_VARIABLES}`, {
        ...variables,
      });
      await dispatch(`stillCut/${ActionTypes.GET_STILL_CUT_LIST}`);
    };

    watch(
      [serial, routeName],
      async ([serial, routeName]) => {
        if (routeName === ROUTE_NAMES.STILLCUT && serial !== '' && serial) {
          variables.serial = serial;
          await fetchStillCutList(variables);
        }
      },
      {
        immediate: true,
      }
    );

    const onChangeDate = async ({ from }: { from: string }): Promise<void> => {
      variables.from = from;
      variables.pageNum = 1;

      await fetchStillCutList(variables);
    };

    const onChangePagination = async (pagination: any): Promise<void> => {
      const { current, pageSize } = pagination;

      variables.pageNum = variables.size !== pageSize ? 1 : current;
      variables.size = pageSize;

      await fetchStillCutList(variables);
    };

    const seePopover = ref<boolean>(false);
    const targetImage = ref<string>('');

    const onHoverImage = (e: any): void => {
      targetImage.value = e.target.currentSrc;
      seePopover.value = true;
    };

    const onHoverCloseImage = (): void => {
      seePopover.value = false;
    };

    const isOpenVideoModal = ref<boolean>(false);
    const getVideoId = ref<number | null>(0);

    const openVideoModal = (record: AdditionalStillCutContent): void => {
      getVideoId.value = record.videoId;
      seePopover.value = false;

      isOpenVideoModal.value =
        record.videoStatus === REQUEST_STATUS.SUCCESS &&
        record.stillCutStatus === REQUEST_STATUS.SUCCESS;
    };

    const onClickRefresh = async (): Promise<void> => {
      variables.pageNum = 1;
      await fetchStillCutList(variables);
    };

    const onRequest = async (
      record: AdditionalStillCutContent
    ): Promise<void> => {
      const requestEvent = record.event;
      let type = '';
      let variables:
        | string // for init
        | RequestImgVariables
        | RequestVideoVariables = '';

      if (requestEvent === '') {
        return;
      }

      if (requestEvent === 'play') {
        openVideoModal(record);
        return;
      }

      if (requestEvent === 'image') {
        variables = {
          serial: record.serialNumber,
          jpgTime: record.jpgTime,
          lastKey: record.lastKey,
          time: record.dateTime,
        };

        type = `stillCut/${ActionTypes.REQUEST_STILL_CUT_IMAGE}`;
      }

      if (requestEvent === 'video') {
        variables = {
          serial: record.serialNumber,
          currentVideo: record.currentVideo,
          time: record.dateTime,
        };

        type = `stillCut/${ActionTypes.REQUEST_STILL_CUT_VIDEO}`;
      }

      await dispatch(type, variables);
    };

    return {
      REQUEST_STATUS,
      device,
      variables,
      stillCutData,
      stillCutLoading,
      seePopover,
      targetImage,
      isOpenVideoModal,
      getVideoId,
      fetchStillCutList,
      onChangeDate,
      onChangePagination,
      onClickRefresh,
      onRequest,
      onHoverImage,
      onHoverCloseImage,
      openVideoModal,
      columns: [
        {
          title: 'NO',
          dataIndex: 'key',
          width: '10%',
        },
        {
          title: 'Preview',
          dataIndex: 'Preview',
          key: 'Preview',
          width: '25%',
        },
        {
          title: 'Event time',
          dataIndex: 'dateTime',
          key: 'EventTime',
          width: '25%',
        },
        {
          title: 'Status',
          dataIndex: 'status',
          key: 'status',
          width: '20%',
        },
        {
          title: 'Request',
          dataIndex: 'Request',
          key: 'Request',
          width: '20%',
        },
      ],
    };
  },
});
</script>

<style lang="scss" scoped></style>
