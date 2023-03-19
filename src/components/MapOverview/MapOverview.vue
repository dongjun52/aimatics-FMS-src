<template>
  <Spin :spinning="loadingTabCounts || loadingMap || loadingTable">
    <OverViewTab @change="onChangeTabOrTable" />
    <GMapMap
      ref="mapRef"
      :center="options.center"
      :zoom="options.zoom"
      :options="MAP_OPTIONS"
      style="width: 100%; height: 100vh"
      @zoom_changed="onChangeZoom"
    >
      <GMapCluster
        :styles="CLUSTER_STYLES"
        :minimum-cluster-size="options.minCluster"
        :zoom-on-click="true"
      >
        <template v-for="item in mapDevices" :key="item">
          <GMapMarker
            :icon="item.status === 100 ? DrivingImage : StopImage"
            :position="{ lat: item.lat, lng: item.lng }"
            @click="openInfoWindow(item)"
          >
            <!-- 장치 on / off 클래스 적용
            ON : drive_on
            OFF : drive_off -->
            <GMapInfoWindow
              class="tooltip_map"
              :class="item.status === 300 ? 'drive_off' : 'drive_on'"
              :opened="options.isOpenInfoWindow"
              v-if="item.serial === options.serialCheck"
            >
              <div class="tooltip_inner">
                <div class="serial_num fw_m">{{ item.serial }}</div>
                <div class="serial_cont">
                  <!--                  Status: {{ DRIVE_STATUS[item.status] }}<br />-->
                  <ul class="serial_info">
                    <li>
                      <span class="fw_m">Model :</span>
                      <span>{{ tooltipInfo.deviceType }}</span>
                    </li>
                    <li>
                      <span class="fw_m">Install Date :</span>
                      <span>{{ tooltipInfo.installDate }}</span>
                    </li>
                    <li>
                      <span class="fw_m">Last Update :</span>
                      <span>{{ tooltipInfo.lastUpdate }}</span>
                    </li>
                  </ul>

                  <div class="serial_link">
                    <button @click="onMoveToDetails(item.serial)">
                      Device detail >
                    </button>
                  </div>
                </div>
              </div>
            </GMapInfoWindow>
          </GMapMarker>
        </template>
      </GMapCluster>
    </GMapMap>
    <OverViewTable @change="onChangeTabOrTable" />
  </Spin>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  ref,
  reactive,
  toRefs,
  watch,
} from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';

import OverViewTab from '@/components/MapOverview/OverViewTab.vue';
import OverViewTable from '@/components/MapOverview/OverViewTable.vue';
import {
  CLUSTER_STYLES,
  DRIVE_STATUS,
  MAP_OPTIONS,
} from '@/constants/mapOverview';
import Spin from '@/common/Spin/Spin.vue';
import type { RootState } from '@/store';
import type { MapStoreState } from '@/store/modules/service/map/map';
import type { DeviceList } from '@/types/service/map/map';
import { ActionTypes, MutationTypes } from '@/store/modules/service/map/map';
import { ROUTE_NAMES } from '@/constants/common';
import DrivingImage from '@/assets/images/common/car_driving.png';
import StopImage from '@/assets/images/common/car_stop.png';

type PickPosition = Pick<MapStoreState['markerPosition'], 'lat' | 'lng'>;

interface InitOptionsOfMap {
  options: {
    center: PickPosition;
    zoom: number;
    minCluster: number;
    serialCheck: string | null;
    isOpenInfoWindow: boolean;
  };
}

export default defineComponent({
  name: 'MapOverview',
  props: {},
  components: {
    OverViewTab,
    OverViewTable,
    Spin,
  },
  setup() {
    const router = useRouter();
    const { query } = useRoute();
    const { state, commit, dispatch } = useStore<RootState>();

    const loadingTabCounts = computed(() => state.map.loadingTabCounts);
    const loadingMap = computed(() => state.map.loadingMap);
    const loadingTable = computed(() => state.map.loadingTable);

    const mapDevices = computed(() => state.map.mapDeviceList);
    const selectedMarker = computed(() => state.map.markerPosition);
    const companyIds = computed(() => state.auth.user.partnerIds);
    const tooltipInfo = computed(() => state.map.tooltipInfo);

    const mapRef = ref();
    const initOptionsOfMap = reactive<InitOptionsOfMap>({
      options: {
        center: { lat: 36.255683, lng: -113.6613949 },
        zoom: 3,
        minCluster: 2,
        serialCheck: null,
        isOpenInfoWindow: false,
      },
    });

    const variablesForInit = {
      companyIds: companyIds.value,
      type: 0,
      pageNo: 1,
      pageSize: 20,
      vehiclesName: '',
    };

    const changeOptions = (
      options: Partial<InitOptionsOfMap['options']>
    ): void => {
      initOptionsOfMap.options = {
        ...initOptionsOfMap.options,
        ...options,
      };
    };

    const markerSelectedOff = (): void => {
      changeOptions({
        serialCheck: null,
        isOpenInfoWindow: false,
      });
    };

    onMounted(async (): Promise<void> => {
      commit(`map/${MutationTypes.RESET_MAP_DEVICE_LIST}`);
      commit(`map/${MutationTypes.INIT_VARIABLES}`, variablesForInit);

      await dispatch(`map/${ActionTypes.INIT_MAP}`).then(async () => {
        if (query.serial) {
          commit(`map/${MutationTypes.INIT_MARKER_WHEN_EXIST_QUERY_SERIAL}`, {
            serial: query.serial,
          });
        }
      });
    });

    const openInfoWindow = (item: DeviceList | null) => {
      const payload = !item
        ? {
            lat: undefined,
            lng: undefined,
            serial: null,
          }
        : {
            lat: item.lat,
            lng: item.lng,
            serial: item.serial,
          };

      changeOptions({
        serialCheck: payload.serial,
        isOpenInfoWindow:
          initOptionsOfMap.options.serialCheck === payload.serial,
      });

      commit(`map/${MutationTypes.SET_MARKER_POSITION}`, payload);
    };

    const onChangeTabOrTable = (): void => {
      openInfoWindow(null);
    };

    const onChangeZoom = (zoom: number): void => {
      changeOptions({
        zoom: zoom,
        minCluster: zoom >= 14 ? 999 : 2,
      });

      if (zoom < 14) {
        openInfoWindow(null);
      }
    };

    const onMoveToDetails = (serial: string): void => {
      router.push({
        name: ROUTE_NAMES.PLAYLIST,
        query: {
          serial,
        },
      });
    };

    watch(
      () => selectedMarker.value,
      (position: MapStoreState['markerPosition']) => {
        if (position.lat && position.lng) {
          const options = {
            center: { lat: position.lat, lng: position.lng },
            serialCheck: position.serial,
            isOpenInfoWindow: true,
            zoom:
              initOptionsOfMap.options.zoom > 14
                ? initOptionsOfMap.options.zoom
                : 14,
          };
          changeOptions(options);

          dispatch(`map/${ActionTypes.GET_DEVICE_INFO}`, {
            serial: position.serial,
          });
        } else {
          markerSelectedOff();
        }
      }
    );

    watch(
      () => mapRef.value,
      (googleMap: any) => {
        if (googleMap) {
          googleMap.$mapPromise.then((map: any) => {
            map.addListener('click', () => {
              openInfoWindow(null);
            });
          });
        }
      }
    );

    // onMounted(() => {
    //   mapRef.value.$mapPromise.then((map: any) => {
    //     const bounds = google.maps.LatLngBounds;
    //     console.log(bounds);
    //     google.maps.OverlayView();
    //   });
    // });

    return {
      CLUSTER_STYLES,
      DRIVE_STATUS,
      MAP_OPTIONS,
      mapRef,
      mapDevices,
      loadingMap,
      loadingTable,
      loadingTabCounts,
      DrivingImage,
      StopImage,
      tooltipInfo,
      openInfoWindow,
      onChangeTabOrTable,
      onChangeZoom,
      onMoveToDetails,
      ...toRefs(initOptionsOfMap),
    };
  },
});
</script>

<style scoped>
.infoWindow {
  width: 10vh;
  height: 5vh;
}
</style>
