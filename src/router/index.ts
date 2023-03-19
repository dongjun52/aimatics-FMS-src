import {
  createRouter,
  createWebHistory,
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteRecordRaw,
} from 'vue-router';

import { ref } from 'vue';
import { routes } from './routes';
import { ROUTE_NAMES } from '@/constants/common';
import { getToken } from '@/helpers/auth';

let isExecuteScroll = ref(false);

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve, reject) => {
      const isDeviceDetail = to.matched[0].name === ROUTE_NAMES.DEVICE_DETAIL;

      // Device Detail 에서 Scroll 동작 한번만 하기위한 Flag 변경
      if (!isDeviceDetail) {
        isExecuteScroll.value = false;
      }

      if (isDeviceDetail && !isExecuteScroll.value) {
        isExecuteScroll.value = true;

        setTimeout(() => {
          resolve({ left: 0, top: 300, behavior: 'smooth' });
        }, 500);
      } else if (!isDeviceDetail) {
        resolve({ left: 0, top: 0 });
      }
    });
  },
  // strict: true, // applies to all routes
});

router.beforeEach(
  async (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    const token = getToken();
    const isAuthRequired: boolean = to.matched.some(
      (route) => route.meta.authRequired
    );

    if (isAuthRequired) {
      if (!token) {
        // 로그인 화면에서 뒤로가기 할 경우 로그인화면 redirect
        if (from.path === '/login') {
          router.replace('/login');
          next();
        }

        alert('This service requires login.');
        next('/login');
      } else {
        next();
      }
    } else {
      // 로그인 화면으로 이동
      if (to.path === '/login') {
        // if (token) {
        //   next('/devices')
        // }
        // url 입력 진입 제외 & token 존재
        // if (from.name && token) {
        //   // if (from.path === '/findid' || from.path === '/findpw') {
        //   //   store.commit('auth/OUT_USER');
        //   // } else if (from.path === '/registration') {
        //   //   // 토큰 존재할 경우, 로그인이 아닌 홈화면 이동에 대한 대응
        //   //   store.commit('auth/OUT_USER');
        //   // } else {
        //   // 뒤로가기를 위한 redirect
        //   router.replace(from.path);
        //   // }
        // }
      }

      next();
    }
  }
);
export default router;
