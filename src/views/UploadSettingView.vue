<template>
  <UploadSetting />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import UploadSetting from '@/components/UploadSetting/UploadSetting.vue';

export default defineComponent({
  name: 'UploadSettingView',
  components: {
    UploadSetting,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
