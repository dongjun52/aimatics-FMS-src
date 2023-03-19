<template>
  <DeviceDetail />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import DeviceDetail from '@/components/DeviceDetail/DeviceDetail.vue';

export default defineComponent({
  name: 'DeviceDetailView',
  components: {
    DeviceDetail,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
