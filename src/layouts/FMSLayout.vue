<template>
  <div class="wrap">
    <Header />

    <div id="container" class="container" :class="currentPathName?.toLowerCase()">
      <slot />
    </div>
  </div>

  <transition name="fade" v-show="isScrollTop" class="scroll_top">
    <i @click="scrollToTop">
      <img src="@/assets/images/common/scroll_top.png" alt="" />
    </i>
  </transition>
</template>

<script lang="ts">
import 'ant-design-vue/es/spin/style/index.css';
import {
  computed,
  ComputedRef,
  defineComponent,
  onMounted,
  ref,
  onBeforeUnmount,
  watch,
} from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import Header from '@/layouts/components/Header/Header.vue';
import type { RootState } from '@/store';
import { MODULE_PATH, ActionTypes as AuthActions } from '@/store/modules/auth';
import { getToken } from '@/helpers/auth'


export default defineComponent({
  name: 'FMSLayout',
  components: {
    Header,
  },
  setup() {
    const { state, dispatch } = useStore<RootState>();
    const { currentRoute } = useRouter();
    const currentPathName = computed(() => currentRoute.value.name as string);
    // const isLoginEnter = computed(() => state.auth.isLoginEnter);
    const isScrollTop = ref(false);

    // (async () => {
    //   const token = getToken();
    //   console.log('isLoginEnter ', isLoginEnter.value)

    //   if (token && !isLoginEnter.value) {
    //     await dispatch(MODULE_PATH + AuthActions.FETCH_USER_BY_TOKEN, token);
    //   }
    // })();

    onMounted(() => {
      window.addEventListener('scroll', handleScroll);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('scroll', handleScroll);
    });

    const scrollToTop = (): void => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleScroll = (): void => {
      if (window.scrollY > 150) {
        isScrollTop.value = true;
      } else {
        isScrollTop.value = false;
      }
    };

    return {
      currentPathName,
      isScrollTop,
      handleScroll,
      scrollToTop,
    };
  },
});
</script>
