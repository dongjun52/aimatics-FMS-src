<template>
  <div class="device_info_wrap">
    <div class="device_info_inner">
      <div class="prev_page_btn">
        <a @click="onClickPrev">
          <img src="/src/assets/images/device/device_prev.png" alt="" />
        </a>
      </div>

      <div class="info_top">
        <div class="device_num">
          <h3 class="serial_number">{{ device?.serial }}</h3>
          <span class="serial_location">
            <img
              src="/src/assets/images/device/device_location.png"
              alt=""
              @click="onClickLocationImg"
            />
          </span>
        </div>
      </div>

      <div class="info_bottom">
        <ul class="serial_description">
          <li>
            <img src="/src/assets/images/device/device_update.png" alt="" />
            <span>{{ device?.lastLogDate || '-' }}</span>
          </li>
          <li>
            <img src="/src/assets/images/device/device_install.png" alt="" />
            <span>{{ device?.updatedAt || '-' }}</span>
          </li>
          <li>
            <img src="/src/assets/images/device/device_version.png" alt="" />
            <span>{{ device?.deviceModelName || '-' }}</span>
          </li>

          <!-- TODO -->
          <!-- <li>
            <img src="/src/assets/images/device/device_company.png" alt="" />
            <span>Fedex</span>
          </li> 
          <li>
            <img
              src="/src/assets/images/device/device_changeGroup.png"
              alt=""
            />
            <span class="change_group">Change Group</span>
          </li>-->
        </ul>

        <div class="device_status">
          <p :class="device?.isConnected ? 'blob_blue' : 'bul_gray'">
            Device {{ device?.isConnected ? 'On' : 'Off' }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import 'ant-design-vue/lib/date-picker/style/index.css';

import { computed, defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { MutationTypes as PlayListMutations } from '@/store/modules/service/device/eventVideo';
// import RangePicker from '@/common/DatePicker/RangePicker.vue';
import { RootState } from '@/store';
import { ROUTE_NAMES } from '@/constants/common';

export default defineComponent({
  name: 'DeviceInfo',
  components: {
    // RangePicker,
  },
  setup() {
    const store = useStore<RootState>();
    const router = useRouter();
    const device = computed(() => store.state.device.deviceDetail);

    const onClickLocationImg = (): void => {
      router.push({
        name: ROUTE_NAMES.OVERVIEW,
        query: {
          serial: device.value?.serial,
        },
      });
    };

    const onClickPrev = (): void => {
      router.push({
        name: ROUTE_NAMES.DEVICES,
        // query: {
        //   serial: device.value?.serial,
        // },
        // params: {
        //   keyword: device.value?.serial,
        // },
      });
      store.commit(
        'eventVideoList/' + PlayListMutations.SET_SELECTED_PLAY_LIST,
        {
          rowIndex: undefined,
          rowPage: 1,
        }
      );
    };

    return {
      device,
      onClickLocationImg,
      onClickPrev,
    };
  },
});
</script>

<style lang="scss" scoped>
.device_info_wrap {
  width: 100%;
  background-color: #f5f5f5;

  .device_info_inner {
    position: relative;
    width: 1300px;
    margin: 0 auto;
    padding: 45px 0;

    .prev_page_btn {
      position: absolute;
      top: 50%;
      left: -80px;
      transform: translateY(-50%);
      cursor: pointer;
    }

    .info_top {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .device_num {
        .serial_number {
          display: inline-block;
          font-size: 25px;
          font-weight: $font-medium;
          letter-spacing: -1px;
        }

        .serial_location {
          vertical-align: text-bottom;
          margin-left: 8px;
          cursor: pointer;

          > img {
            &:hover,
            &:focus {
              animation: locationShake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97)
                both;
              backface-visibility: hidden;
              transform-origin: bottom;
            }
          }
        }
      }
    }

    .info_bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 14px;

      .serial_description {
        display: flex;
        gap: 35px;

        > li {
          display: flex;
          align-items: center;

          > img {
            margin-right: 5px;
          }

          > span {
            margin-top: 2px;
            font-size: $font-14;
            color: #717171;

            &.change_group {
              cursor: pointer;

              &:hover {
                text-decoration: underline;
              }
            }
          }
        }
      }

      .device_status {
        color: #717171;
      }
    }
  }
}

@keyframes locationShake {
  0% {
    transform: rotate(0);
  }

  15% {
    transform: rotate(4deg);
  }

  30% {
    transform: rotate(-4deg);
  }

  45% {
    transform: rotate(3deg);
  }

  60% {
    transform: rotate(-3deg);
  }

  75% {
    transform: rotate(2deg);
  }

  85% {
    transform: rotate(-2deg);
  }

  92% {
    transform: rotate(1deg);
  }

  100% {
    transform: rotate(0);
  }
}
</style>
