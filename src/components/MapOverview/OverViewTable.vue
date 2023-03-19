<template>
  <div class="map_serial_list_wrap">
    <div class="top_search">
      <img class="ml10" src="/src/assets/images/header/gnb_device.svg" alt="" />
      <Input v-model:value="searchValue" class="serial_search" placeholder="Search" @keyup.enter="onSubmit" />
    </div>
    <perfect-scrollbar class="map_list_scroll" @scroll="onScrollSerialList">
      <ul class="map_serial_list">
        <li :key="index" :class="serialCheck === item.serial ? 'selected_row' : ''" v-for="(item, index) in deviceList"
          @click="
            onClickSerial({ lat: item.lat, lng: item.lng, serial: item.serial })
          ">
          <span>{{ item.serial }}</span>
          <i :class="item.status === 100 ? 'bul_blue' : 'bul_gray'"></i>
        </li>
      </ul>
    </perfect-scrollbar>
  </div>
</template>

<script lang="ts">
import 'ant-design-vue/lib/table/style/index.css';

import Input from 'ant-design-vue/es/input';
import { computed, defineComponent, ref, watch } from 'vue';
import { useStore } from 'vuex';

import type { RootState } from '@/store';
import type { MapStoreState } from '@/store/modules/service/map/map';
import { ActionTypes, MutationTypes } from '@/store/modules/service/map/map';
import useConfirmAlert from '@/composables/useConfirmAlert';

const resetMapDeviceList = `map/${MutationTypes.RESET_MAP_DEVICE_LIST}`;
const variablesForTable = `map/${MutationTypes.SET_TABLE_VARIABLES}`;

export default defineComponent({
  components: {
    Input,
  },
  emits: ['change'],
  setup(_, { emit }) {
    const { state, commit, dispatch } = useStore<RootState>();
    const { open } = useConfirmAlert();

    const variables = computed(() => state.map.variables.table);
    const deviceList = computed(() => state.map.deviceList);
    const totalPages = computed(() => state.map.tableTotal);

    const serialCheck = ref<string | string[]>('');

    const fetchTableList = async (): Promise<void> => {
      await dispatch(`map/${ActionTypes.GET_MAP_DEVICE_COUNTS}`);
      await dispatch(`map/${ActionTypes.GET_TABLE_LIST}`);
    };

    // 첫 로딩 시, 20개를 불러오기 때문, 그래서 2로 시작
    let pageNo = 2;

    watch(
      () => variables.value,
      (variables) => {
        if (variables.pageNo === 1) {
          pageNo = 1;
        }

        if (variables.vehiclesName === '') {
          searchValue.value = variables.vehiclesName;
        }
      }
    );

    const onScrollSerialList = async (e: any): Promise<void> => {
      const { scrollHeight, scrollTop, clientHeight } = e.target;
      const isAtTheBottom = scrollHeight === scrollTop + clientHeight;

      if (isAtTheBottom) {
        if (pageNo < totalPages.value) {
          pageNo++;

          commit(variablesForTable, {
            pageNo,
          });

          await fetchTableList();
        }
      }
    };

    const searchValue = ref<string>('');

    const onSubmit = async (): Promise<void> => {
      commit(resetMapDeviceList);
      commit(variablesForTable, {
        vehiclesName: searchValue.value,
        pageNo: 1,
        pageSize: 20,
      });

      await fetchTableList().then((): void => {
        emit('change');
      });
    };

    const onClickSerial = (position: MapStoreState['markerPosition']): void => {
      if (isExistPosition(position.lat, position.lng)) {
        commit(`map/SET_MARKER_POSITION`, position);
      } else {
        open({
          title: 'Not Found',
          type: 'warning',
          content: `No driving records found for "${position.serial}"`,
        });
      }
    };

    const isExistPosition = (lat: number, lng: number): boolean => {
      const NOT_EXIST_POSITION_VALUE = {
        LAT: 99,
        LNG: 199
      }

      return !(lat === NOT_EXIST_POSITION_VALUE.LAT && lng === NOT_EXIST_POSITION_VALUE.LNG);
    }

    const selectedMarker = computed(() => state.map.markerPosition);
    watch(
      () => selectedMarker.value,
      (position: MapStoreState['markerPosition']) => {
        serialCheck.value = position.serial;
      }
    );

    return {
      deviceList,
      serialCheck,
      searchValue,
      onScrollSerialList,
      onSubmit,
      onClickSerial,
    };
  },
});
</script>

<style lang="scss" scoped>
.selected_row {
  background-color: lightgray;
}
</style>
