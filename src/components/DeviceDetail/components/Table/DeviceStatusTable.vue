<template>
  <p class="list_title">Device Status</p>
  <ul class="custom_list_type3 mt6">
    <!-- <li>
      <div class="left_title">Serial No.</div>
      <div class="right_cont">
        <span>DFC8D20113</span>
      </div>
    </li> -->
    <li>
      <div class="left_title">Current F/W Ver.</div>
      <div class="right_cont">
        <span>{{ status.fwVersion || '-' }}</span>
        <!--새로운 버전의 업데이트가 있을 경우 표시 -->
        <span class="ft_blue" v-if="status.isUpdateFW">
          <img class="vt" src="/src/assets/images/common/new_update.png" alt="" />
          New update available
        </span>
      </div>
    </li>
    <li>
      <div class="left_title">Current Stm F/W Ver.</div>
      <div class="right_cont">
        <span>{{ status.stmVersion || '-' }}</span>
        <!--새로운 버전의 업데이트가 있을 경우 표시 -->
        <span class="ft_blue" v-if="status.isUpdateSTM">
          <img class="vt" src="/src/assets/images/common/new_update.png" alt="" />
          New update available
        </span>
      </div>
    </li>
    <li>
      <div class="left_title">WiFi Mode</div>
      <div class="right_cont">
        <span>{{ status.wifiMode || '-' }}</span>
        <button class="btn btn_xs btn_blue" @click="onResetWifi">
          Reset WiFi
        </button>
      </div>
    </li>
    <li>
      <div class="left_title">Memory Status</div>
      <div class="right_cont">
        <span>{{ status.memoryStatus || '-' }}</span>
        <button class="btn btn_xs btn_blue" @click="onFormatSD">
          Format SD
        </button>
      </div>
    </li>
    <li>
      <div class="left_title">Calibration</div>
      <div class="right_cont">
        <span></span>
        <button class="btn btn_xs2 btn_blue" @click="onSetCalibration">
          Set Calibration
        </button>
      </div>
    </li>
    <li>
      <div class="left_title">UMS Memory Status</div>
      <div class="right_cont">
        <span>{{ status.umsMemomryStatus || '-' }}</span>
        <button class="btn btn_xs btn_blue" v-if="deviceModelName === 'R8'" @click="onFormatUMS">
          Format
        </button>
      </div>
    </li>
    <li>
      <div class="left_title">2nd Camera Status</div>
      <div class="right_cont">
        <ul class="camera_status_list">
          <li v-for="(item, index) in status.subCameraStatus" :key="index">
            <span>- {{ item.title }} :</span>
            <span class="fw_m ml6" :class="item.color">{{ item.text }}</span>
          </li>
        </ul>
      </div>
    </li>
    <li>
      <div class="left_title">Error Code</div>
      <div class="right_cont">
        <span v-for="(item, index) in status.errorCodes" :key="index">{{
            item
        }}</span>
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import useConfirmAlert from '@/composables/useConfirmAlert';
import type { RootState } from '@/store';
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import { notification } from '@/common/Notification/notification';
import type {
  ResetWifiPayload,
  FetchDeviceStatusPayload,
  SetCalibrationPayload,
  FormatMemoryPayload,
} from '@/types/service/device/deviceSetting';

export default defineComponent({
  name: 'DeviceStatusTable',
  components: {},
  setup() {
    const { state, dispatch } = useStore<RootState>();
    const { open, loadingAlert, closeAlert } = useConfirmAlert();
    const isLoading = computed(() => state.deviceSetting.isLoading);
    const status = computed(() => state.deviceSetting.deviceStatus);
    const deviceModelName = computed(
      () => state.device.deviceDetail?.deviceModelName
    );
    const accountsId = computed(() => state.auth.user.accountsId);

    async function fetchDeviceStatus() {
      const payload: FetchDeviceStatusPayload = {
        variables: {
          serial: status.value.serial,
        },
      };

      await dispatch('deviceSetting/fetchDeviceStatus', payload);
    }

    function onResetWifi(): void {
      open({
        title: 'Reset WiFi',
        type: 'warning',
        content: 'Do you want to reset Wi-Fi information?',
        confirm: true,
        ok: async () => {
          loadingAlert();

          const { success, message } = await dispatch(
            'deviceSetting/resetWifi',
            {
              variables: {
                serial: status.value.serial,
              },
            } as ResetWifiPayload
          );

          if (success) {
            await fetchDeviceStatus();
          }

          closeAlert({
            close: (): void => {
              notification({
                type: success ? 'success' : 'error',
                message: success ? 'Success' : 'Failed',
              });
            },
          });
        },
      });
    }

    function onSetCalibration(): void {
      open({
        title: 'Set Calibration',
        type: 'warning',
        content: 'Do you want to set up calibration?',
        confirm: true,
        ok: async () => {
          loadingAlert();

          const payload: SetCalibrationPayload = {
            variables: {
              serial: status.value.serial,
            },
          };

          const { success, message } = await dispatch(
            'deviceSetting/setCalibration',
            payload
          );

          if (success) {
            await fetchDeviceStatus();
          }

          closeAlert({
            close: (): void => {
              notification({
                type: success ? 'success' : 'error',
                message: success ? 'Success' : 'Failed',
              });
            },
          });
        },
      });
    }

    function onFormatSD(): void {
      open({
        title: 'Format SD',
        type: 'warning',
        content: `<p>Are you sure you want to format the SD card?</p> 
                <p>It cannot be recovered when formatted.</p>`,
        confirm: true,
        ok: async () => {
          loadingAlert();

          const payload: FormatMemoryPayload = {
            variables: {
              serial: status.value.serial,
              accountsId: accountsId.value,
              formatType: 1,
            },
          };

          const { success, message } = await dispatch(
            'deviceSetting/formatMemory',
            payload
          );

          if (success) {
            await fetchDeviceStatus();
          }

          closeAlert({
            close: (): void => {
              notification({
                type: success ? 'success' : 'error',
                message: success ? 'Success' : 'Failed',
              });
            },
          });
        },
      });
    }

    function onFormatUMS(): void {
      open({
        title: 'Format UMS',
        type: 'warning',
        content: `<p>Are you sure you want to format the USB memory?</p> 
                <p>It cannot be recovered when formatted.</p>`,
        confirm: true,
        ok: async () => {
          loadingAlert();

          const payload: FormatMemoryPayload = {
            variables: {
              serial: status.value.serial,
              accountsId: accountsId.value,
              formatType: 2,
            },
          };

          const { success, message } = await dispatch(
            'deviceSetting/formatMemory',
            payload
          );

          if (success) {
            await fetchDeviceStatus();
          }

          closeAlert({
            close: (): void => {
              notification({
                type: success ? 'success' : 'error',
                message: success ? 'Success' : 'Failed',
              });
            },
          });
        },
      });
    }

    return {
      isLoading,
      status,
      deviceModelName,
      onResetWifi,
      onSetCalibration,
      onFormatSD,
      onFormatUMS,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>
