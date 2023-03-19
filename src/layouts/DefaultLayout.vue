<template>
  <div class="wrap">
    <TopBar />

    <div class="container">
      <div class="contents_wrap" :class="currentPathName?.toLowerCase()">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

// import Spin from '@/common/Spin/Spin.vue';
import TopBar from '@/layouts/components/TopBar/TopBar.vue';
import { IUser } from '@/types/common/auth';

export default defineComponent({
  name: 'DefaultLayout',
  components: {
    TopBar,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const isLoading = computed<boolean>(() => store.state.common.isLoading);
    const currentPathName = computed(
      () => router.currentRoute.value.name
    ) as ComputedRef<string>;
    const user = computed<IUser>(() => store.state.auth.user);
    const refreshCount = ref<number>(30);

    onMounted(() => {
      if (!user.value.isCRM) {
        popupInterval();
      }
    });

    const popupInterval = (): void => {
      setInterval(() => {
        if (refreshCount.value <= 0) {
          refreshCount.value = 30;
        } else {
          refreshCount.value = refreshCount.value - 1;
        }
      }, 1000);
    };

    return {
      isLoading,
      currentPathName,
    };
  },
});
</script>
