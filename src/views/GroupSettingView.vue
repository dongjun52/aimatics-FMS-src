<template>
  <GroupSetting />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import GroupSetting from '@/components/GroupSetting/GroupSetting.vue';

export default defineComponent({
  name: 'GroupSettingView',
  components: {
    GroupSetting,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
