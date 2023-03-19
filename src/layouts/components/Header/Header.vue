<template>
  <header>
    <div class="header_left">
      <h1><a @click="initSearchedKeyword">FMS Management</a></h1>
    </div>

    <div class="header_right">
      <Navigation @init="initSearchedKeyword" />

      <div class="user_section">
        <p class="login_user" v-if="!isHoverUserSection" @mouseover="isHoverUserSection = !isHoverUserSection">
          <img src="@/assets/images/header/icon_user.png" class="vb mr5" alt="" />
          <!-- Hello, {{ user.name.charAt(0).toUpperCase() + user.name.slice(1) }} -->
          <span class="user_name">Hello, {{ user.name }}</span>
        </p>
        <p class="logout" v-else @mouseleave="isHoverUserSection = !isHoverUserSection" @click="onLogout">
          <img src="@/assets/images/header/icon_logout.png" class="vm mr5" alt="" width="20" />
          <span class="user_name">Logout</span>
        </p>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { MutationTypes as DeviceMutations } from '@/store/modules/service/device/device';
import { MutationTypes as AuthMutations } from '@/store/modules/auth';
import { RootState } from '@/store';
import Navigation from './Navigation.vue';
import { ROUTE_NAMES } from '@/constants/common';

export default defineComponent({
  name: 'Header',
  components: {
    Navigation,
  },
  setup() {
    const { commit, state } = useStore<RootState>();
    const router = useRouter();
    const user = computed(() => state.auth.user);
    const isHoverUserSection = ref(false);

    const onLogout = (): void => {
      commit('auth/' + AuthMutations.OUT_USER);
      commit('device/' + DeviceMutations.SET_SEARCHED_KEYWORD, '');
    };

    const initSearchedKeyword = (): void => {
      commit('device/' + DeviceMutations.SET_SEARCHED_KEYWORD, '');
      commit('device/' + DeviceMutations.INIT_SELECTED_DEVICE_INFO);

      router.push({
        name: ROUTE_NAMES.DEVICES,
      });
    };

    return {
      user,
      isHoverUserSection,
      initSearchedKeyword,
      onLogout,
    };
  },
});
</script>

<style scoped>
.header_left a {
  cursor: pointer;
}
</style>
