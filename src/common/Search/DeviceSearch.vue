<template>
  <div class="global_search_wrap">
    <div class="global_search_inner" id="nav" ref="target">
      <h2 class="search_title">Search Device Number</h2>
      <p class="search_sub_text">
        You can search the current status of devices. enter the device number.
      </p>

      <div class="search_area">
        <div class="search_icon">
          <img src="/src/assets/images/common/icon_search.svg" alt="" />
        </div>
        <input
          class="global_search"
          ref="searchRef"
          placeholder="Enter the device number"
          v-model="keyword"
          @keyup.enter="onSearch"
        />
        <button class="search_btn" @click="onSearch">Search</button>

        <!-- <div class="related_search"> -->
        <!-- 검색 리스트 -->
        <!-- <ul class="related_list">
            <li>DR8WC30041</li>
            <li>DR8WC30041</li>
            <li>DR8WC30041</li>
            <li>DR8WC30041</li>
            <li>DR8WC30041</li>
            <li>DR8WC30041</li>
            <li>DR8WC30041</li>
            <li>DR8WC30041</li>
            <li>DR8WC30041</li>
            <li>DR8WC30041</li>
            <li>DR8WC30041</li>
            <li>DR8WC30041</li>
            <li>DR8WC30041</li>
          </ul> -->

        <!-- 검색 결과를 찾을 수 없음 -->
        <!-- <div class="related_not_found">
            <p>No search results found.</p>
          </div> -->
        <!-- </div> -->
      </div>
      <div class="sticky_menu" :class="{ sticky }">
        <div class="sticky_search">
          <div class="search_icon">
            <img src="/src/assets/images/common/icon_search.svg" alt="" />
          </div>
          <input
            class="global_search"
            ref="stickySearchRef"
            placeholder="Enter the device number"
            v-model="keyword"
            @keyup.enter="onSearch"
            autofocus
          />
          <button class="search_btn" @click="onSearch">Search</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import { useStore } from 'vuex';

import { MutationTypes as DeviceMutations } from '@/store/modules/service/device/device';
import { RootState } from '@/store';

export default defineComponent({
  name: 'DeviceSearch',
  components: {},
  props: {
    value: {
      type: String,
      required: false,
      default: () => '',
    },
  },
  emits: ['search'],
  setup(props, { emit }) {
    const target = ref();
    const sticky = ref(false);
    const observer = new IntersectionObserver(
      ([entry]) => {
        sticky.value = !entry.isIntersecting;
      },
      { threshold: 0.0 }
    );
    const { state, commit } = useStore<RootState>();
    const isActiveSticyMenu = computed(() => state.common.isActiveStickyMenu);
    const keyword = ref(props.value);
    const searchRef = ref();
    const stickySearchRef = ref();

    onMounted(() => {
      observer.observe(target.value);
      // searchbar autofocus
      searchRef.value.focus();
      stickySearchRef.value.focus();
    });

    const onSearch = (): void => {
      commit('device/' + DeviceMutations.INIT_SELECTED_DEVICE_INFO);
      commit('device/' + DeviceMutations.SET_SEARCHED_KEYWORD, keyword.value);
      emit('search', keyword.value);
    };

    return {
      target,
      sticky,
      keyword,
      searchRef,
      onSearch,
      stickySearchRef,
    };
  },
});
</script>

<style lang="scss" scoped>
.search_area:focus-within {
  border: 1px solid #01afde;
}
</style>
