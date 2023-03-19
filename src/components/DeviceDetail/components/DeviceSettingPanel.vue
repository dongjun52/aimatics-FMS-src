<template>
  <p class="list_title mt40">Device Setting</p>
  <div class="device_setting_collapse device_setting mt6">
    <collapse>
      <Panel v-for="(panel, index) in panelCategory" :key="index" :header="panel.title">
        <DeviceSettingGroup :data="panel" />

        <div class="btn_group tr mt40">
          <Button class="btn btn_md btn_white" @click="onReset(panel)">Reset</Button>
          <Button class="btn btn_md btn_blue ml8" @click="onUpdate(panel)">Modify</Button>
        </div>
      </Panel>
    </collapse>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import type { RootState } from '@/store';
import { computed } from '@vue/reactivity';
import Button from 'ant-design-vue/es/button';
import collapse from 'ant-design-vue/es/collapse';
import DeviceSettingGroup from './DeviceSettingGroup.vue';
import type { FetchDeviceSettingPayload, PanelCategory, UpdateDeviceSettingPayload } from '@/types/service/device/deviceSetting';
import useConfirmAlert from '@/composables/useConfirmAlert';
import { notification } from '@/common/Notification/notification';
import { MODULE_PATH, ActionTypes as DeviceSettingActions } from '@/store/modules/service/device/deviceSetting';
const { Panel } = collapse;

export default defineComponent({
  name: 'DeviceSettingPanel',
  components: {
    collapse,
    Panel,
    Button,
    DeviceSettingGroup,
  },
  setup() {
    const { dispatch, state } = useStore<RootState>();
    const { open, loadingAlert, closeAlert } = useConfirmAlert();
    const panelCategory = computed(() => state.deviceSetting.panelCategory);
    const serial = computed(() => state.deviceSetting.deviceStatus.serial);

    const onReset = (panel: PanelCategory): void => {
      open({
        title: 'Reset',
        type: 'error',
        content: `Initialize the '${panel.title}' value by default.`,
        confirm: true,
        ok: async () => {
          await updateDeviceSetting(panel, true);
        },
      });
    };

    const onUpdate = (panel: PanelCategory): void => {
      open({
        title: 'Save',
        type: 'success',
        content: `Do you want to save ${panel.title}?`,
        confirm: true,
        ok: async () => {
          await updateDeviceSetting(panel, false);
        },
      });
    };

    const initDeviceSetting = (panel: PanelCategory): void => {
      panel.data.map((group) => {
        group.fields.map((field) => {
          field.value = field.defaultValue;
        });
      });
    };

    const updateDeviceSetting = async (
      panel: PanelCategory,
      isInit: boolean
    ): Promise<void> => {
      loadingAlert();

      await dispatch(MODULE_PATH + DeviceSettingActions.UPDATE_DEVICE_SETTING, {
        panel,
        isInit,
      } as UpdateDeviceSettingPayload)
        .then(({ success }) => {
          setTimeout(async () => {
            closeAlert();

            if (success) {
              await dispatch(MODULE_PATH + DeviceSettingActions.FETCH_DEVICE_SETTING, {
                variables: {
                  serial: serial.value,
                },
              } as FetchDeviceSettingPayload);

              isInit && initDeviceSetting(panel);

              notification({
                type: 'success',
                message: `Completion of saving ${panel.title}`,
              });
            } else {
              notification({
                type: 'error',
                message: `Failed to save ${panel.title}`,
              });
            }
          }, 300);
        })
        .catch((err) => {
          setTimeout(() => {
            closeAlert();

            notification({
              type: 'error',
              message: `Failed to save ${panel.title}`,
            });
          }, 300);
        });
    };

    return {
      panelCategory,
      onReset,
      onUpdate,
    };
  },
});
</script>
