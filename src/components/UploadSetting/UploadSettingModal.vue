<template>
  <Spin :spinning="isLoading">
    <div class="modal_inner">
      <div class="tr mb10">
        <button class="btn btn_xs btn_blue ml6" @click="onSelectAll">
          Select all
        </button>
      </div>
      <ul class="onDemand_list">
        <li v-for="item in ondemandSettings" :key="item.type">
          <span>{{ item.name }}</span>
          <div class="onDemand_chk">
            <Switch
              type="primary"
              v-model:checked="item.isUse"
              checked-children="ON"
              un-checked-children="OFF"
            />
          </div>
        </li>
      </ul>
      <div class="align_right pt30">
        <div>
          <button class="btn btn_md btn_gray ml6" @click="$emit('close')">
            Cancel
          </button>
          <!-- 저장 클릭 후 alert 표출 
        Do you want to change to the group setting?
        (Does not apply to devices with personal settings)-->
          <button class="btn btn_md btn_blue ml6" @click="onSave">Save</button>
        </div>
      </div>
    </div>
  </Spin>
</template>

<script lang="ts">
import { RootState } from '@/store';
import Switch from 'ant-design-vue/es/switch';
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import Spin from '@/common/Spin/Spin.vue';
import useConfirmAlert from '@/composables/useConfirmAlert';
import { notification } from '@/common/Notification/notification';
import {
  MODULE_PATH,
  ActionTypes as OndemandActions,
} from '@/store/modules/service/setting/uploadSetting';

export default defineComponent({
  name: 'UploadSettingModal',
  components: {
    Switch,
    Spin,
  },
  emits: ['close'],
  setup() {
    const { state, dispatch } = useStore<RootState>();
    const { open, loadingAlert, closeAlert } = useConfirmAlert();
    const ondemandSettings = computed(
      () => state.uploadSetting.ondemandSettings
    );
    const isLoading = computed(() => state.uploadSetting.isSettingLoading);

    function onSave(): void {
      open({
        title: 'Save',
        type: 'success',
        content: `<p>Do you want to change to the group setting?</p> 
                <p>(Does not apply to devices with personal settings)</p>`,
        confirm: true,
        ok: async (): Promise<void> => {
          loadingAlert();

          const { success, message } = await dispatch(
            MODULE_PATH + OndemandActions.UPDATE_ONDEMAND_SETTING,
            ondemandSettings.value
          );

          closeAlert({
            close: (): void => {
              notification({
                type: success ? 'success' : 'error',
                message: success ? 'Success' : 'Failed',
                description: !success && message,
              });
            },
          });
        },
      });
    }

    function onSelectAll(): void {
      const checkStatuses = ondemandSettings.value.map((setting) => {
        return setting.isUse;
      });

      ondemandSettings.value.map((d) => {
        const isHaveOffStatus = checkStatuses.includes(false);

        if (!d.isUse && isHaveOffStatus) {
          d.isUse = true;
        } else if (d.isUse && !isHaveOffStatus) {
          d.isUse = false;
        }
      });
    }

    return {
      isLoading,
      ondemandSettings,
      onSave,
      onSelectAll,
    };
  },
});
</script>

<style lang="scss" scoped>
.onDemand_list {
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  border-top: 1px solid #e7e9f6;

  > li {
    width: 33.333333%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e7e9f6;

    > span {
      color: #8289a3;
      width: 50%;
      display: inline-block;
      line-height: 55px;
      padding-left: 30px;
      background-color: #f8f9fd;
    }

    > .onDemand_chk {
      width: 50%;
      text-align: center;
    }
  }
}
</style>
