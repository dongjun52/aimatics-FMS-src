<template>
  <div class="map_tabs">
    <Tabs v-model:activeKey="activeKey" @change="onChangeDeviceStatus">
      <TabPane :key="DRIVE_TYPE.WHOLE" :tab="`All ${tabCounts.whole}`" />
      <TabPane :key="DRIVE_TYPE.DRIVE">
        <template #tab>
          <span class="bul_blue">ON {{ tabCounts.driving }}</span>
        </template>
      </TabPane>
      <TabPane :key="DRIVE_TYPE.STOP">
        <template #tab>
          <span class="bul_gray">OFF {{ tabCounts.stop }}</span>
        </template>
      </TabPane>
    </Tabs>
  </div>
</template>

<script lang="ts">
import 'ant-design-vue/lib/tabs/style/index.css';

import Tabs from 'ant-design-vue/es/tabs';
import { computed, defineComponent, ref } from 'vue';
import { useStore } from 'vuex';

import { DRIVE_TYPE } from '@/constants/mapOverview';
import { ActionTypes, MutationTypes } from '@/store/modules/service/map/map';
import type { RootState } from '@/store';

const { TabPane } = Tabs;

export default defineComponent({
  components: {
    Tabs,
    TabPane,
  },
  emits: ['change'],
  setup(props, { emit }) {
    const { state, commit, dispatch } = useStore<RootState>();

    const activeKey = ref<number>(0);
    const tabCounts = computed(() => state.map.tabCounts);

    const mapVariablesCommit = (type: number): void => {
      commit(`map/${MutationTypes.RESET_MAP_DEVICE_LIST}`);
      commit(`map/${MutationTypes.SET_MAP_VARIABLES}`, {
        type,
      });
      commit(`map/${MutationTypes.SET_TABLE_VARIABLES}`, {
        type,
        pageNo: 1,
        vehiclesName: '',
      });
    };

    const onChangeDeviceStatus = async (activeKey: number): Promise<void> => {
      mapVariablesCommit(activeKey);

      await dispatch(`map/${ActionTypes.GET_MAP_DEVICE_COUNTS}`);
      await dispatch(`map/${ActionTypes.GET_MAP_DEVICE_LIST}`);
      await dispatch(`map/${ActionTypes.GET_TABLE_LIST}`).then((): void => {
        emit('change');
      });
    };

    return {
      DRIVE_TYPE,
      activeKey,
      tabCounts,
      onChangeDeviceStatus,
    };
  },
});
</script>

<style lang="scss" scoped></style>
