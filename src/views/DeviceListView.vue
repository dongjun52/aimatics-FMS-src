<template>
  <DeviceList />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import DeviceList from '@/components/DeviceList/DeviceList.vue';

export default defineComponent({
  name: 'DeviceListView',
  components: {
    DeviceList,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
