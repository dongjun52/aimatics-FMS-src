<template>
  <div class="tab_inner">
    <Spin :spinning="isLoading" size="large">
      <DeviceStatusTable />
      <DeviceSettingPanel />
    </Spin>
  </div>
</template>

<script lang="ts">
import type { RootState } from '@/store';
import type {
  FetchDeviceSettingPayload,
  FetchDeviceStatusPayload,
} from '@/types/service/device/deviceSetting';
import { computed, defineComponent, toRefs, watch } from 'vue';
import { useStore } from 'vuex';
// import Spin from '@/common/Spin/Spin.vue';
import Spin from 'ant-design-vue/es/spin';
import DeviceSettingPanel from './DeviceSettingPanel.vue';
import DeviceStatusTable from './Table/DeviceStatusTable.vue';
import { ROUTE_NAMES } from '@/constants/common';
import { MODULE_PATH, ActionTypes as DeviceSettingActions } from '@/store/modules/service/device/deviceSetting';

export default defineComponent({
  name: 'DeviceSetting',
  components: {
    DeviceStatusTable,
    DeviceSettingPanel,
    Spin,
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
    const { state, dispatch } = useStore<RootState>();
    const isLoading = computed(() => state.deviceSetting.isLoading);

    watch(
      [serial, routeName],
      async ([serial, routeName]) => {
        if (routeName === ROUTE_NAMES.DEVICE_SETTING && serial !== '') {
          await dispatch(MODULE_PATH + DeviceSettingActions.FETCH_DEVICE_STATUS, {
            variables: {
              serial,
            },
          } as FetchDeviceStatusPayload);

          await dispatch(MODULE_PATH + DeviceSettingActions.FETCH_DEVICE_SETTING, {
            variables: {
              serial,
            },
          } as FetchDeviceSettingPayload);
        }
      },
      {
        immediate: true,
      }
    );

    return {
      isLoading,
      serial
    };
  },
});
</script>

<style scoped>
</style>
