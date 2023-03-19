<template>
  <Spin :spinning="isLoading">
    <DeviceSearch @search="onSearch" :value="searchedKeyword" />
    <DeviceListTable ref="compRef" />
  </Spin>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import DeviceSearch from '@/common/Search/DeviceSearch.vue';
import Spin from '@/common/Spin/Spin.vue';
import type { RootState } from '@/store';
import DeviceListTable from './components/DeviceListTable.vue';

export default defineComponent({
  name: 'DeviceList',
  components: {
    DeviceSearch,
    DeviceListTable,
    Spin,
  },
  setup() {
    const { state } = useStore<RootState>();
    const isLoading = computed(() => state.device.isLoading);
    const compRef = ref<InstanceType<typeof DeviceListTable>>();
    const searchedKeyword = computed(() => state.device.searchedKeyword).value;

    onMounted(async (): Promise<void> => {
      await compRef.value?.fetchDeviceList(searchedKeyword);
    });

    const onSearch = async (keyword: string): Promise<void> => {
      await compRef.value?.fetchDeviceList(keyword);
    };

    return {
      searchedKeyword,
      compRef,
      isLoading,
      onSearch,
    };
  },
});
</script>

<style scoped></style>
