<template>
  <p class="list_title mt60">Alert</p>
  <div class="dca_list_wrap dca_alert">
    <perfect-scrollbar class="dca_list_scroll">
      <ul class="dca_list">
        <template v-if="dataSource.length === 0">
          <div class="alert_no_data">
            <p>No Data</p>
          </div>
        </template>
        <template v-for="(item, index) in dataSource" :key="index" v-else>
          <li
            :class="selectedEventIndex === index ? 'selected' : ''"
            @click="onClickAlertRow(item, index)"
          >
            <span class="fw_m">{{ item.eventTime }} </span>
            <!-- 스타일 수정용 태그 -->
            <!--            <EventTag :type="item.eventType" />-->
            <span
              class="alert_name"
              :class="item.encodedFiles ? 'video_active' : ''"
            >
              {{ item.alertType }}
            </span>
          </li>
        </template>
      </ul>
    </perfect-scrollbar>

    <div class="dca_map">
      <GMapMap
        class="map_hide_interface"
        ref="mapRef"
        :center="center"
        :zoom="14"
        :options="MAP_OPTIONS"
      >
        <template v-for="(item, index) in dataSource" :key="index">
          <GMapMarker
            :icon="'/images/common/icon_marker.png'"
            :position="{ lat: item.lat, lng: item.lng }"
            @click="onClickAlertRow(item, index)"
          >
            <GMapInfoWindow
              v-if="selectedEventIndex === index"
              :opened="isOpenInfoWindow"
              :options="{
                pixelOffset: {
                  width: 0,
                  height: -5,
                },
              }"
            >
              <div class="tooltip_map alert_tooltip tc">
                <p class="alert_event_tag">
                  <EventTag :type="item.eventType" />
                </p>
                <p class="alert_event_time">
                  {{ item.eventTime }}
                </p>
                <p v-if="item.encodedFiles" class="video_on">
                  <button
                    class="btn_tooltip btn_blue"
                    @click="openVideoModal(item)"
                  >
                    Play Video
                    <!-- {{ !item.encodedFiles ? 'No Video' : 'Play Video' }} -->
                  </button>
                </p>
              </div>
            </GMapInfoWindow>
          </GMapMarker>
        </template>
      </GMapMap>
    </div>
  </div>

  <Modal
    v-model:visible="options.isOpenVideoModal"
    centered
    class="contents_modal still_cut_modal"
    width="80%"
    :destroy-on-close="true"
  >
    <template #title>
      <div class="modal_title">
        <p>{{ options.serial }}</p>
        <p class="ml15">
          <EventTag :type="options.eventType" class="title_tag" />
        </p>
        <p class="title_date">{{ options.eventTime }}</p>
      </div>
    </template>
    <PlayerModal :video-id="options.videoId" />
  </Modal>
</template>

<script lang="ts">
import type { RootState } from '@/store';
import type { onDemandElements } from '@/types/service/device/dca';

import Modal from 'ant-design-vue/es/modal';
import Button from 'ant-design-vue/es/button';
import PlayerModal from '@/common/Player/PlayerModal.vue';
import EventTag from '@/common/Tag/EventTag.vue';
import {
  VideoCameraOutlined,
  VideoCameraFilled,
  StopOutlined,
} from '@ant-design/icons-vue';

import { computed, defineComponent, ref, reactive, toRefs, watch } from 'vue';
import { useStore } from 'vuex';
import { MAP_OPTIONS } from '@/constants/mapOverview';

interface stateType {
  center: { lat: number; lng: number };
  isOpenInfoWindow: boolean;
  selectedEventIndex: number | null;
}

interface ModalOptions extends Partial<onDemandElements> {
  isOpenVideoModal: boolean;
}

export default defineComponent({
  name: 'AlertTable',
  components: {
    Button,
    Modal,
    EventTag,
    PlayerModal,
    VideoCameraOutlined,
    VideoCameraFilled,
    StopOutlined,
  },
  props: {
    serial: {
      type: String,
      required: true,
      default: '',
    },
    changedDate: {
      type: String, // Object as PropType<{ startDt: string; endDt: string }>,
      required: false,
      default: '',
    },
  },
  setup() {
    const mapRef = ref();
    const store = useStore<RootState>();

    const state = reactive<stateType>({
      center: { lat: 35.194588, lng: 129.05438 },
      isOpenInfoWindow: false,
      selectedEventIndex: 0,
    });

    const dataSource = computed(() => store.state.dca.dcaData.dcaEventAlerts);

    watch(
      () => dataSource.value,
      (dataSource) => {
        if (dataSource.length > 0) {
          const { lat, lng } = dataSource[0];
          state.center = { lat, lng };
          state.isOpenInfoWindow = true;
          state.selectedEventIndex = 0;
        }
      }
    );

    const onClickAlertRow = (eventInfo, index) => {
      const { lat, lng, eventTime } = eventInfo;
      state.center = { lat, lng };
      state.isOpenInfoWindow = true;
      state.selectedEventIndex = index;
    };

    const videoModalOptions = reactive<{ options: ModalOptions }>({
      options: {
        isOpenVideoModal: false,
        videoId: 0,
        serial: '',
        eventType: '',
        eventTime: '',
      },
    });

    const openVideoModal = (item: ModalOptions) => {
      const { videoId, serial, eventType, eventTime, encodedFiles } = item;

      if (!encodedFiles) {
        return;
      }

      videoModalOptions.options = {
        ...videoModalOptions.options,
        isOpenVideoModal: true,
        videoId,
        serial,
        eventType,
        eventTime,
      };
    };

    return {
      MAP_OPTIONS,
      mapRef,
      dataSource,
      onClickAlertRow,
      openVideoModal,
      ...toRefs(state),
      ...toRefs(videoModalOptions),
    };
  },
});
</script>

<style lang="scss" scoped>
.alert_tooltip {
  padding: 0 0;

  .alert_event_tag {
    .event_tag {
      width: 100% !important;
      height: auto !important;
      line-height: initial;
      border-radius: 0 0 0 0;
      padding: 5px 10px;
      font-size: $font-14;
    }
  }

  .alert_event_time {
    padding: 7px 12px;
    color: #333;
    font-size: $font-13;
    font-weight: $font-medium;

    &::before {
      content: '';
      display: inline-block;
      position: relative;
      top: 2px;
      width: 12px;
      height: 12px;
      margin-right: 4px;
      background-image: url('@/assets/images/common/icon_time.png');
      background-repeat: no-repeat;
    }
  }

  .video_on {
    padding: 0 10px 10px 10px;
  }
}
</style>
