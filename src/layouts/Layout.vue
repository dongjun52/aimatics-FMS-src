<template>
  <component :is="layout">
    <slot />
  </component>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

import DefaultLayout from './DefaultLayout.vue';
import FMSLayout from './FMSLayout.vue';
import LoginLayout from './LoginLayout.vue';

export default defineComponent({
  name: 'Layout',
  components: {
    DefaultLayout,
    LoginLayout,
    FMSLayout,
  },
  setup() {
    const router = useRouter();
    const layout: Ref<string | unknown> = ref('');

    watch(
      () => router.currentRoute.value.meta.layout,
      (value): void => {
        layout.value = value;
      }
    );

    return {
      layout,
    };
  },
});
</script>
