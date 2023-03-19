<template>
  <!-- <Spin :spinning="isLoading"> -->
  <div class="tab_inner">
    <div class="tab_calendar">
      <p class="calendar_title mr10">Select Date :</p>
      <RangePicker @change="onChangeDate" v-model:value="currentDate" />
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
      <p class="table_description ml15">{{ pagination.total }} Videos</p>
    </div>

    <Table
      class="table_video mt8"
      :loading="{ spinning: isLoading, size: 'large' }"
      :data-source="dataSource"
      :columns="columns"
      :pagination="pagination"
      :row-class-name="rowClassName"
      :custom-row="customRow"
      @change="onChangeTable"
    >
      <template v-slot:bodyCell="{ column, record, index }">
        <template v-if="column.key === 'videoId'">
          {{ index + 1 + pagination.pageSize * (pagination.current - 1) }}
        </template>
        <template v-if="column.dataIndex === 'video'">
          <!-- 클릭시 영상플레이어 모달 표출 -->
          <div v-if="record.video" class="still_img video_ready">
            <img
              alt=""
              :src="record.video"
              @click="onClickPlayerModal(record, index)"
            />
          </div>
          <!-- 이미지 없을때 -->
          <div v-else class="still_img">
            <img src="/src/assets/images/common/icon_noimage.png" alt="" />
          </div>
        </template>
        <template v-if="column.dataIndex === 'eventType'">
          <!-- <template v-if="dataSource[index].stillCut === false"> -->
          <span :style="{ color: getEventColor(record.eventType) }">
            {{ getEventCategoryName(record.eventType) }}
          </span>
          <!-- </template> -->
          <!-- <template v-else>
            <span :style="{ color: 'gray' }">{{ 'Still Cut' }}</span>
          </template> -->
        </template>

        <template v-if="column.dataIndex === 'eventTag'">
          <!-- <template v-if="dataSource[index].stillCut === false"> -->
          <EventTag :type="record.eventType" />
          <!-- </template> -->
          <!-- <template v-else>
            <EventTag :type="record.eventType" :stillCut="record.stillCut" />
          </template> -->
        </template>

        <template v-if="column.dataIndex === 'Video'">
          <!-- <button
            class="btn btn_md btn_blue"
            @click="onClickDownloadVideo(index)"
          >
            Download
          </button> -->
          <template v-if="record.encodedFiles">
            <img
              class="playlist_btn"
              src="/src/assets/images/common/icon_video.png"
              alt=""
              @click="onClickPlayerModal(record, index)"
            />
          </template>
          <template v-else>
            <span class="no_video"></span>
          </template>
        </template>
      </template>
    </Table>
  </div>
  <!-- </Spin> -->

  <Modal
    v-model:visible="isShowPlayerModal"
    centered
    class="contents_modal still_cut_modal"
    width="80%"
    :destroy-on-close="true"
  >
    <template #title>
      <div class="modal_title">
        <p>{{ device?.serial }}</p>
        <p class="ml15">
          <EventTag :type="modalTitle.eventType" class="title_tag" />
        </p>
        <p class="title_date">{{ modalTitle.time }}</p>

        <!-- <li>
          <span :style="{ color: getEventColor(modalTitle.eventType) }">
            {{ modalTitle.eventTag }}
          </span>
        </li> -->
      </div>
    </template>
    <PlayerModal :video-id="selectedVideoId" />
  </Modal>
</template>

<script lang="ts">
import DatePicker from 'ant-design-vue/es/date-picker';
import Table, { TableProps } from 'ant-design-vue/es/table';
import dayjs, { Dayjs } from 'dayjs';
import Modal from 'ant-design-vue/es/modal';

import {
  computed,
  defineComponent,
  ref,
  toRefs,
  watch,
  onUnmounted,
} from 'vue';

import { useStore } from 'vuex';
import { RootState } from '@/store';

import EventTag from '@/common/Tag/EventTag.vue';
import { getEventCategoryName, getEventColor } from '@/helpers/eventType';
import { videoDownload } from '@/utils/videoPlayer';
import PlayerModal from '@/common/Player/PlayerModal.vue';
import { TablePaginationConfig } from 'ant-design-vue/lib/table/Table';
import {
  EventVideoListContent,
  FetchEventVideoListPayload,
} from '@/types/service/device/eventVideo';
import { MutationTypes as PlayListMutations } from '@/store/modules/service/device/eventVideo';
import { ROUTE_NAMES } from '@/constants/common';

const { RangePicker } = DatePicker;
const DATE_FORMAT = 'YYYY-MM-DD';
type TableType = TableProps<EventVideoListContent>;

export default defineComponent({
  name: 'PlayList',
  components: {
    RangePicker,
    Table,
    Modal,
    EventTag,
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
    const store = useStore<RootState>();
    const device = computed(() => store.state.device.deviceDetail);
    const dataSource = computed(
      () => store.state.eventVideoList.eventVideoList
    );
    const totalElements = computed(
      () => store.state.eventVideoList.totalElements
    );
    const isLoading = computed(() => store.state.eventVideoList.isLoading);
    const selectedPlayListInfo = computed(
      () => store.state.eventVideoList.selectedPlayList
    );

    const today = dayjs(new Date());
    const currentDate = ref<[Dayjs, Dayjs]>([today.subtract(7, 'days'), today]);
    const startDate = currentDate.value[0].format(DATE_FORMAT);
    const endDate = currentDate.value[1].format(DATE_FORMAT);
    const isShowPlayerModal = ref(false);
    const selectedVideoId = ref<number>(null);
    const selectedRowIndex = ref();

    const classNameToggle = ref(0);
    const pagination = ref<TablePaginationConfig>({
      total: totalElements.value,
      current: 1,
      pageSize: 10,
      showSizeChanger: true,
      'onUpdate:current': (current: number): void => {
        // state.pagination.current = current;
      },
      position: ['bottomCenter'],
      pageSizeOptions: ['10', '30', '50'],
    });

    let fetchEventVideoListPayload: FetchEventVideoListPayload = {
      variables: {
        startDate,
        endDate,
        serial: '',
        pageNum: 1,
        pageSize: 10,
      },
    };

    const fetchEventVideoList = async (): Promise<void> => {
      await store.dispatch(
        'eventVideoList/fetchEventVideoList',
        fetchEventVideoListPayload
      );
    };

    watch(
      [serial, routeName],
      async (currentProps) => {
        const serial = currentProps[0];
        const route = currentProps[1];

        if (route === ROUTE_NAMES.PLAYLIST && serial) {
          fetchEventVideoListPayload = {
            variables: {
              ...fetchEventVideoListPayload.variables,
              serial,
            },
          };

          await fetchEventVideoList();
        }
      },
      {
        immediate: true,
      }
    );

    watch(
      () => totalElements.value,
      (total) => {
        pagination.value.total = total;
      },
      {
        immediate: true,
      }
    );

    const onChangeTable: TableType['onChange'] = async (pag): Promise<void> => {
      const { current, pageSize } = pag;
      const params = { current, pageSize };
      const isChangePageSize = pagination.value.pageSize !== pag.pageSize;

      if (isChangePageSize) {
        params.current = 1;
      }

      fetchEventVideoListPayload.variables = {
        ...fetchEventVideoListPayload.variables,
        pageNum: params.current,
        pageSize,
      };

      await fetchEventVideoList();

      pagination.value.current = params.current;
      pagination.value.pageSize = params.pageSize;
    };
    const customRow = (record: EventVideoListContent, index: number) => {
      return {
        onClick: async () => {
          store.commit(
            'eventVideoList/' + PlayListMutations.SET_SELECTED_PLAY_LIST,
            {
              rowIndex: index,
              rowPage: pagination.value.current,
            }
          );
        },
      };
    };

    const rowClassName = (_, index: number): string => {
      if (
        selectedPlayListInfo.value.rowPage === pagination.value.current &&
        index === selectedRowIndex.value
      ) {
        return 'table_row_select';
      }
    };

    const onClickRefresh = async (): Promise<void> => {
      fetchEventVideoListPayload.variables.pageNum = 1;
      pagination.value.current = 1;

      await fetchEventVideoList();
    };

    const modalTitle = ref();

    const onClickPlayerModal = (
      record: EventVideoListContent,
      index: number
    ) => {
      const { eventType, eventTag, time, videoId } = record;
      selectedVideoId.value = videoId;
      isShowPlayerModal.value = true;

      modalTitle.value = {
        eventType,
        eventTag,
        time,
      };
      classNameToggle.value = index + 1;
      selectedRowIndex.value = dataSource.value.findIndex(
        (e: EventVideoListContent) => e.videoId === record.videoId
      );
    };

    const onClickDownloadVideo = async (index: number): Promise<void> => {
      const frontDownloadUrl = dataSource.value[index].frontVideoUrl;

      await videoDownload({
        url: frontDownloadUrl,
        fileName: getDownloadVideoFileName(frontDownloadUrl),
      });
    };

    const onChangeDate = async (
      value: [string, string] | [dayjs.Dayjs, dayjs.Dayjs],
      dateString: [string, string]
    ): Promise<void> => {
      const [startDate, endDate] = dateString;

      fetchEventVideoListPayload.variables.startDate = startDate;
      fetchEventVideoListPayload.variables.endDate = endDate;
      fetchEventVideoListPayload.variables.pageNum = 1;
      pagination.value.current = 1;

      store.commit(
        'eventVideoList/' + PlayListMutations.SET_SELECTED_PLAY_LIST,
        {
          rowPage: 1,
        }
      );
      selectedRowIndex.value = null;
      await fetchEventVideoList();
    };

    const getDownloadVideoFileName = (url: string): string => {
      return url.split('/').pop() as string;
    };

    onUnmounted(() => {
      store.commit(
        'eventVideoList/' + PlayListMutations.SET_SELECTED_PLAY_LIST,
        {
          rowIndex: undefined,
          rowPage: 1,
        }
      );
      classNameToggle.value = 0;
    });

    return {
      isLoading,
      device,
      modalTitle,
      dataSource,
      currentDate,
      pagination,
      isShowPlayerModal,
      selectedVideoId,

      customRow,
      rowClassName,
      onChangeDate,
      getEventCategoryName,
      getEventColor,
      onChangeTable,
      onClickDownloadVideo,
      onClickPlayerModal,
      onClickRefresh,
      columns: [
        {
          title: 'NO',
          dataIndex: 'videoId',
          key: 'videoId',
          width: '10%',
        },
        {
          title: 'Video',
          dataIndex: 'video',
          key: 'Video',
          width: '15%',
        },
        {
          title: 'Event type',
          dataIndex: 'eventType',
          key: 'eventType',
          width: '20%',
          className: 'font_bold',
        },
        {
          title: 'Event tag',
          dataIndex: 'eventTag',
          key: 'eventTag',
          width: '20%',
        },
        {
          title: 'Time',
          dataIndex: 'time',
          key: 'Time',
          width: '20%',
        },
        {
          title: 'Play',
          dataIndex: 'Video',
          key: 'Video',
          width: '15%',
        },
      ],
    };
  },
});
</script>

<style lang="scss" scoped>
.playlist_btn {
  cursor: pointer;
}
</style>
