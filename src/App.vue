<template>
  <ConfigProvider :locale="lang">
    <Layout>
      <router-view />
    </Layout>
  </ConfigProvider>
  <AleartConfirm />
</template>

<script lang="ts">
import { ConfigProvider } from 'ant-design-vue';
import enUS from 'ant-design-vue/lib/locale-provider/en_US';
import koKR from 'ant-design-vue/lib/locale-provider/ko_KR';
import { computed, defineComponent, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import AleartConfirm from '@/common/AlertConfirm.vue';
import useConfirmAlert from '@/composables/useConfirmAlert';
import Layout from '@/layouts/Layout.vue';
import { Locale } from 'ant-design-vue/lib/locale-provider';

export default defineComponent({
  name: 'App',
  components: {
    Layout,
    AleartConfirm,
    ConfigProvider,
  },
  setup() {
    const { currentRoute } = useRouter();
    const { closeAlert } = useConfirmAlert();
    const lang = ref<Locale>();

    if (navigator.language === 'ko-KR' || navigator.language === 'ko') {
      lang.value = koKR;
      import('moment/dist/locale/ko' as string);
    } else {
      lang.value = enUS;
    }

    watch(
      () => currentRoute.value,
      () => {
        closeAlert();
      }
    );

    // const store = useStore();
    // const user = computed<IUser>(() => store.state.auth.user);

    // watch(
    //   () => user.value.locale,
    //   async (locale) => {
    //     // 사용자 locale 정보에 따른 moment dynamic import
    //     if (locale) {
    //       if (locale === Locale.KO) {
    //         await import('moment/dist/locale/ko' as string);
    //       } else {
    //         await import('moment/dist/locale/en-gb' as string);
    //       }
    //     }
    //   },
    //   {
    //     immediate: true,
    //   }
    // );

    return {
      lang,
    };
  },
});
</script>
<style lang="scss">
@import './assets/scss/main.scss';
</style>
