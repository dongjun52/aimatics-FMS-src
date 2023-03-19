<template>
  <nav>
    <!-- 클릭 시 is-current 클래스 적용 -->
    <!-- <a href="/device" class="is-current">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="18px"
            viewBox="0 0 24 24"
            width="18px"
            fill="#FFFFFF"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path
              d="M15.5 14h-.79l-.28-.27c1.2-1.4 1.82-3.31 1.48-5.34-.47-2.78-2.79-5-5.59-5.34-4.23-.52-7.79 3.04-7.27 7.27.34 2.8 2.56 5.12 5.34 5.59 2.03.34 3.94-.28 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
            />
          </svg>
          Device
        </a>
        <a href="/map">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="18px"
            viewBox="0 0 24 24"
            width="18px"
            fill="#FFFFFF"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path
              d="M14.65 4.98l-5-1.75c-.42-.15-.88-.15-1.3-.01L4.36 4.56C3.55 4.84 3 5.6 3 6.46v11.85c0 1.41 1.41 2.37 2.72 1.86l2.93-1.14c.22-.09.47-.09.69-.01l5 1.75c.42.15.88.15 1.3.01l3.99-1.34c.81-.27 1.36-1.04 1.36-1.9V5.69c0-1.41-1.41-2.37-2.72-1.86l-2.93 1.14c-.22.08-.46.09-.69.01zM15 18.89l-6-2.11V5.11l6 2.11v11.67z"
            />
          </svg>
          Map
        </a>
        <a href="/setting">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            enable-background="new 0 0 24 24"
            height="18px"
            viewBox="0 0 24 24"
            width="18px"
            fill="#FFFFFF"
          >
            <rect fill="none" height="24" width="24" />
            <path
              d="M19.5,12c0-0.23-0.01-0.45-0.03-0.68l1.86-1.41c0.4-0.3,0.51-0.86,0.26-1.3l-1.87-3.23c-0.25-0.44-0.79-0.62-1.25-0.42 l-2.15,0.91c-0.37-0.26-0.76-0.49-1.17-0.68l-0.29-2.31C14.8,2.38,14.37,2,13.87,2h-3.73C9.63,2,9.2,2.38,9.14,2.88L8.85,5.19 c-0.41,0.19-0.8,0.42-1.17,0.68L5.53,4.96c-0.46-0.2-1-0.02-1.25,0.42L2.41,8.62c-0.25,0.44-0.14,0.99,0.26,1.3l1.86,1.41 C4.51,11.55,4.5,11.77,4.5,12s0.01,0.45,0.03,0.68l-1.86,1.41c-0.4,0.3-0.51,0.86-0.26,1.3l1.87,3.23c0.25,0.44,0.79,0.62,1.25,0.42 l2.15-0.91c0.37,0.26,0.76,0.49,1.17,0.68l0.29,2.31C9.2,21.62,9.63,22,10.13,22h3.73c0.5,0,0.93-0.38,0.99-0.88l0.29-2.31 c0.41-0.19,0.8-0.42,1.17-0.68l2.15,0.91c0.46,0.2,1,0.02,1.25-0.42l1.87-3.23c0.25-0.44,0.14-0.99-0.26-1.3l-1.86-1.41 C19.49,12.45,19.5,12.23,19.5,12z M12.04,15.5c-1.93,0-3.5-1.57-3.5-3.5s1.57-3.5,3.5-3.5s3.5,1.57,3.5,3.5S13.97,15.5,12.04,15.5z"
            />
          </svg>
          Group setting
        </a>
        <div class="nav-underline"></div> -->

    <template v-for="item in menus" :key="item.key">
      <router-link
        :to="{ path: item.path }"
        :class="item.isSelected ? 'is-current' : ''"
        @click="onClickMenu(item)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="18px"
          viewBox="0 0 24 24"
          width="18px"
          fill="#FFFFFF"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <!-- <rect fill="none" height="24" width="24" /> -->
          <path :d="item.d" />
        </svg>
        {{ item.title }}
      </router-link>
    </template>
    <div class="nav-underline"></div>
  </nav>
</template>

<script lang="ts">
import Menu from 'ant-design-vue/es/menu';
import { defineComponent, onMounted, computed, watch } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { RootState } from '@/store';
import { IMenu } from '@/store/modules/common';
const { Item } = Menu;

export default defineComponent({
  name: 'Header',
  components: {
    Menu,
    Item,
  },
  emits: ['init'],
  setup(_, { emit }) {
    const { state } = useStore<RootState>();
    const router = useRouter();
    const menus = computed(() => state.common.menus).value;

    onMounted((): void => {
      onFocusMenu();
    });

    watch(
      () => router.currentRoute.value.path,
      (currentPath) => {
        menus.map((menu) => {
          if (currentPath.includes(menu.path)) {
            menu.isSelected = true;
          } else {
            menu.isSelected = false;
          }
        });
      }
    );

    const onFocusMenu = (): void => {
      const currentPath = router.currentRoute.value.path;

      menus.map((menu) => {
        if (menu.path === currentPath) {
          menu.isSelected = true;
        }
      });
    };
    ``;
    const onClickMenu = (item: IMenu): void => {
      // 메뉴를 클릭해서 device lis 이동 시, keyword 정보 초기화
      if (item.path === '/devices') {
        emit('init');
      }
    };

    return {
      menus,
      onClickMenu,
    };
  },
});
</script>

<style scoped>
</style>
