<template>
  <!-- <Spin :spinning="isLoading"> -->
  <div class="login_wrap">
    <video class="video_bg" muted autoplay loop>
      <source src="@/assets/video/main_video.mp4" type="video/mp4" />
    </video>
    <div class="black_bg"></div>
    <Transition name="fade-login">
      <div v-show="animationValue" class="login_inner">
        <div class="login_form">
          <!-- <p class="login_title">LOGIN</p> -->
          <p href="#" class="ag-loader-car login_title">
            <svg
              class="ag-loader-car_img"
              xmlns="http://www.w3.org/2000/svg"
              width="40px"
              height="40px"
              viewBox="0 0 24 24"
              fill="rgba(255,255,255,1)"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path
                d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"
              />
            </svg>
            <!-- <svg
              class="ag-loader-car_img"
              width="44"
              height="24"
              viewBox="0 0 44 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M42.7692 14.8401V12.908C42.7692 12.908 42.7692 12.0459 42.7692 11.6111H42.7762V11.1733C42.7762 9.66273 41.4468 8.43941 39.8045 8.43941H31.4184C31.4184 8.43941 25.4177 0.495601 25.4151 0.492077C25.4151 0.492077 24.7957 -0.331685 24.0698 0.152442C23.4575 0.560799 23.9909 1.48059 24.0883 1.64006L27.1996 5.83333L24.6191 8.42708L13.0652 8.42929C13.7428 8.3566 14.274 7.78966 14.274 7.09232C14.274 6.34609 13.6679 5.7417 12.9225 5.7417H6.91697C6.17074 5.7417 5.56547 6.34609 5.56547 7.09232C5.56547 7.83855 6.17074 8.44382 6.91697 8.44382H6.98393C3.76332 8.61694 1.20261 11.2759 1.20261 14.5397C1.20261 14.6397 1.22683 14.7313 1.23212 14.8308L0 14.8401V17.2502C0 18.1012 0.427305 18.5299 1.28235 18.5299H2.46027C2.56247 17.096 3.22192 15.8731 4.4329 14.8648C5.64608 13.8595 7.00332 13.356 8.50724 13.356C10.0107 13.356 11.3763 13.8595 12.6067 14.8648C13.8362 15.8731 14.5018 17.096 14.6044 18.5299H29.3952C29.4982 17.096 30.1639 15.8731 31.3938 14.8648C32.6232 13.8595 33.9906 13.356 35.4928 13.356C36.9963 13.356 38.3535 13.8595 39.5667 14.8648C40.779 15.8731 41.438 17.096 41.5397 18.5299H42.7177C43.5718 18.5299 44 18.1008 44 17.2502V14.8401H42.7692ZM15.9066 12.5001C15.418 12.5001 15.0225 12.1049 15.0225 11.616C15.0225 11.127 15.418 10.7314 15.9066 10.7314C16.3951 10.7314 16.7907 11.1266 16.7907 11.616C16.7907 12.1045 16.3951 12.5001 15.9066 12.5001Z"
                fill="white"
              />
              <path
                d="M32.5222 16.5537C33.3301 15.7625 34.3116 15.3608 35.4411 15.3608C36.6031 15.3608 37.6035 15.7625 38.415 16.5537C39.2251 17.3519 39.6361 18.343 39.6361 19.5016C39.6361 20.632 39.2255 21.6161 38.415 22.4244C37.6053 23.2372 36.6053 23.6482 35.4411 23.6482C34.3116 23.6482 33.3266 23.2367 32.5187 22.4253C31.7099 21.617 31.2984 20.6337 31.2984 19.5016C31.2989 18.3417 31.7099 17.3501 32.5222 16.5537ZM34.2129 20.7377C34.5516 21.0795 34.9627 21.2452 35.4411 21.2452C35.9203 21.2452 36.3305 21.0795 36.6714 20.7377C37.0133 20.395 37.1828 19.9866 37.1828 19.5016C37.1828 19.0272 37.0133 18.6184 36.6714 18.2765C36.3305 17.9347 35.9203 17.7598 35.4411 17.7598C34.9627 17.7598 34.5512 17.9343 34.2129 18.2765C33.871 18.6184 33.6993 19.0272 33.6993 19.5016C33.6993 19.9866 33.871 20.395 34.2129 20.7377Z"
                fill="white"
              />
              <path
                d="M11.4773 16.5537C10.6702 15.7625 9.68788 15.3608 8.5584 15.3608C7.39676 15.3608 6.39636 15.7625 5.58405 16.5537C4.7757 17.3519 4.36294 18.343 4.36294 19.5016C4.36294 20.632 4.77438 21.6161 5.58405 22.4244C6.39416 23.2372 7.39368 23.6482 8.5584 23.6482C9.68832 23.6482 10.672 23.2367 11.4804 22.4253C12.2905 21.617 12.7006 20.6337 12.7006 19.5016C12.7006 18.3417 12.2905 17.3501 11.4773 16.5537ZM9.787 20.7377C9.44736 21.0795 9.03725 21.2452 8.55797 21.2452C8.07913 21.2452 7.669 21.0795 7.32804 20.7377C6.98532 20.395 6.81617 19.9866 6.81617 19.5016C6.81617 19.0272 6.98532 18.6184 7.32804 18.2765C7.669 17.9347 8.07913 17.7598 8.55797 17.7598C9.03725 17.7598 9.44692 17.9343 9.787 18.2765C10.1288 18.6184 10.2998 19.0272 10.2998 19.5016C10.2998 19.9866 10.1293 20.395 9.787 20.7377Z"
                fill="white"
              />
            </svg> -->
            <span class="ag-loader-car_text cabrio-text">
              <span class="fw_r">FMS</span> Management</span
            >
          </p>

          <div class="user_input">
            <div class="id_area">
              <Input
                v-model:value.trim="loginInput.email"
                type="text"
                placeholder="E-mail"
                class="login_input"
                @keyup.enter="onLogin"
              />
            </div>

            <div class="pw_area">
              <Input
                v-model:value.trim="loginInput.password"
                type="password"
                placeholder="Password"
                class="login_input"
                @keyup.enter="onLogin"
              />
            </div>
            <div class="user_submit">
              <Input
                type="submit"
                title="login"
                alt="login"
                value="Log in"
                class="login_btn"
                @click="onLogin"
              />
            </div>
          </div>
          <div class="bottom_copy">
            <img
              src="/src/assets/images/login/logo_aimatics.png"
              width="120"
              alt=""
            />
            <p class="copy">A.I.MATICS All right reserved.2022</p>
          </div>
        </div>
      </div>
    </Transition>
  </div>
  <!-- </Spin> -->
</template>

<script lang="ts">
import Input from 'ant-design-vue/es/input';
import notification from 'ant-design-vue/es/notification';
import {
  computed,
  defineComponent,
  onMounted,
  ref,
  reactive,
  toRefs,
} from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import type { FetchUserPayload, LoginInput } from '@/types/common/auth';
import type { RootState } from '@/store';
import { LOGIN_MESSAGE } from '@/constants/auth';
import { ROUTE_NAMES } from '@/constants/common';
import { MODULE_PATH, ActionTypes as AuthActions } from '@/store/modules/auth';

export default defineComponent({
  name: 'Login',
  components: {
    Input,
  },
  setup() {
    const router = useRouter();
    const store = useStore<RootState>();
    const isLoading = computed(() => store.state.auth.isLoading);
    const { dispatch } = useStore();
    const animationValue = ref(false);
    const loginInput = ref<LoginInput>({
      email: '',
      password: '',
    });
    const state = reactive<{
      animationValue: boolean;
    }>({
      animationValue: false,
    });

    onMounted(() => {
      state.animationValue = true;
    });

    const onLogin = async (): Promise<void> => {
      const { email, password } = loginInput.value;

      if (!email || !password) {
        return notification['error']({
          message: 'Error',
          description: LOGIN_MESSAGE.CHECK_LOGIN_INFO,
          duration: 2,
          class: 'failed_notification',
        });
      }

      const payload: FetchUserPayload = {
        variables: loginInput.value,
      };

      try {
        const { success, message } = await dispatch(
          MODULE_PATH + AuthActions.FETCH_USER,
          payload
        );

        if (success) {
          router.push({
            name: ROUTE_NAMES.DEVICES,
          });
        } else {
          return notification['error']({
            message: 'Error',
            description: message,
            duration: 2,
            class: 'failed_notification',
          });
        }
      } catch (err) {
        console.error(err);
      }
    };

    return {
      ...toRefs(state),
      isLoading,
      loginInput,
      router,
      onLogin,
    };
  },
});
</script>

<style lang="scss" scoped>
.ag-loader-car {
  height: 220px;
  width: 100%;
  overflow: hidden;
  z-index: 10;
  position: relative;
}
.ag-loader-car_img,
.ag-loader-car_text {
  position: absolute;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
.ag-loader-car_img {
  width: 44px;
  opacity: 0;
  -webkit-animation: an-loader-car_img 7s infinite;
  -moz-animation: an-loader-car_img 7s infinite;
  -o-animation: an-loader-car_img 7s infinite;
  animation: an-loader-car_img 7s infinite;
}
.ag-loader-car_text {
  display: inline-block;
  width: 100%;
  opacity: 0;
  left: 50%;
  font-size: 38px;
  font-weight: $font-thin;
  -webkit-animation: an-loader-car_text 7s infinite;
  -moz-animation: an-loader-car_text 7s infinite;
  -o-animation: an-loader-car_text 7s infinite;
  animation: an-loader-car_text 7s infinite;
}

@-webkit-keyframes an-loader-car_img {
  0% {
    opacity: 1;
    left: calc(0%);
  }
  25% {
    opacity: 1;
    left: 50%;
  }
  100%,
  50% {
    opacity: 0;
    left: calc(100%);
  }
}

@-moz-keyframes an-loader-car_img {
  0% {
    opacity: 1;
    left: calc(0%);
  }
  25% {
    opacity: 1;
    left: 50%;
  }
  100%,
  50% {
    opacity: 0;
    left: calc(100%);
  }
}

@-o-keyframes an-loader-car_img {
  0% {
    opacity: 1;
    left: calc(0%);
  }
  25% {
    opacity: 1;
    left: 50%;
  }
  100%,
  50% {
    opacity: 0;
    left: calc(100%);
  }
}

@keyframes an-loader-car_img {
  0% {
    opacity: 1;
    left: calc(0% - 24px);
  }
  25% {
    opacity: 1;
    left: 50%;
  }
  100%,
  50% {
    opacity: 0;
    left: calc(100% + 24px);
  }
}
@-webkit-keyframes an-loader-car_text {
  0%,
  100%,
  25% {
    opacity: 0;
  }
  60%,
  90% {
    opacity: 1;
  }
}
@-moz-keyframes an-loader-car_text {
  0%,
  100%,
  25% {
    opacity: 0;
  }
  60%,
  90% {
    opacity: 1;
  }
}
@-o-keyframes an-loader-car_text {
  0%,
  100%,
  25% {
    opacity: 0;
  }
  60%,
  90% {
    opacity: 1;
  }
}
@keyframes an-loader-car_text {
  0%,
  100%,
  25% {
    opacity: 0;
  }
  60%,
  90% {
    opacity: 1;
  }
}

@media all and (max-width: 767px) {
  .ag-loader-car_img,
  .ag-loader-car_text {
    -webkit-animation-duration: 4s;
    -moz-animation-duration: 4s;
    -o-animation-duration: 4s;
    animation-duration: 4s;
  }
}
</style>
