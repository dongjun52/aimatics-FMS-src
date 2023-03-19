<template>
  <Spin :spinning="isLoading">
    <DeviceSearch @search="onSearch" />
    <DeviceInfo />

    <div class="device_detail_tabs">
      <Tabs v-model:activeKey="activeTab" type="line" @tabClick="onClickTab">
        <TabPane v-for="tab in tabs" :key="tab.routeName" :tab="tab.title">
          <router-view v-slot="{ Component }">
            <keep-alive>
              <component
                :is="Component"
                :serial="device?.serial"
                :routeName="tab.routeName"
              />
            </keep-alive>
          </router-view>
        </TabPane>
      </Tabs>
    </div>
  </Spin>
</template>

<script lang="ts">
// import 'ant-design-vue/es/spin/style/index.css';
import Tabs from 'ant-design-vue/es/tabs';
import { computed, defineComponent, onUnmounted, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import type { RootState } from '@/store';
import type { FetchDevicePayload } from '@/types/service/device/device';
import { ROUTE_NAMES } from '@/constants/common';
import { MutationTypes as EventVideoMutations } from '@/store/modules/service/device/eventVideo';
import { MutationTypes as StillCutMutations } from '@/store/modules/service/device/stillCut';
import DeviceSearch from '@/common/Search/DeviceSearch.vue';
import Spin from '@/common/Spin/Spin.vue';
import DeviceInfo from './components/DeviceInfo.vue';

const { TabPane } = Tabs;

interface Tab {
  title: string;
  routeName: string;
}

const tabs: Tab[] = [
  {
    title: 'Play List',
    routeName: ROUTE_NAMES.PLAYLIST,
  },
  {
    title: 'Still Cut',
    routeName: ROUTE_NAMES.STILLCUT,
  },
  {
    title: 'DCA',
    routeName: ROUTE_NAMES.DCA,
  },
  {
    title: 'Device Setting',
    routeName: ROUTE_NAMES.DEVICE_SETTING,
  },
];

export default defineComponent({
  name: 'DeviceDetail',
  components: {
    Tabs,
    TabPane,
    DeviceSearch,
    DeviceInfo,
    Spin,
  },
  setup() {
    const { state, commit, dispatch } = useStore<RootState>();
    const router = useRouter();
    const isLoading = computed(() => state.device.isDetailLoading);
    const device = computed(() => state.device.deviceDetail);
    const activeTab = ref<Tab['routeName']>('');

    watch(
      () => router.currentRoute.value.query.serial,
      async (serial) => {
        if (serial) {
          await dispatch('device/fetchDevice', {
            variables: {
              serial,
            },
          } as FetchDevicePayload);
        }
      },
      {
        immediate: true,
      }
    );

    watch(
      () => router.currentRoute.value.name,
      (routeName) => {
        activeTab.value = routeName as string;
      },
      {
        immediate: true,
      }
    );

    function onSearch(): void {
      router.push({
        name: ROUTE_NAMES.DEVICES,
      });
    }

    function onClickTab(
      name: Tab['routeName'],
      e: KeyboardEvent | MouseEvent
    ): void {
      router.push({
        name,
        query: {
          serial: device.value?.serial,
        },
      });
    }

    function clearData(): void {
      commit(`eventVideoList/${EventVideoMutations.INIT_EVENT_VIDEO_LIST}`);
      commit(`stillCut/${StillCutMutations.RESET}`);
    }

    onUnmounted((): void => {
      clearData();
    });

    return {
      router,
      tabs,
      onClickTab,
      isLoading,
      device,
      onSearch,
      activeTab,
    };
  },
});
</script>

<style scoped></style>
