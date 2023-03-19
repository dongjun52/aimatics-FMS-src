<template>
  <template v-for="group in data.data" :key="group.group">
    <template v-if="group.fields.length > 0">
      <p class="panel_title">{{ group.group }}</p>
      <ul class="panel_group">
        <li v-for="field in group.fields" :key="field.key">
          <div class="label_title">
            <span class="fw_m">{{ field.name }}</span>
            <!-- <span>(1st Autocalibration activating start speed)</span> -->
          </div>
          <div class="label_option">
            <template v-if="field.options !== null">
              <Select
                ref="select"
                :value="field.value"
                class="select_basic2"
                :options="field.options"
                :getPopupContainer="(trigger) => trigger.parentNode"
                @change="onChangeValue($event, field)"
              />
            </template>

            <Input
              v-else
              type="text"
              class="ant-input input_basic device_input"
              v-model:value="field.value"
              :suffix="field.unit"
            />
          </div>
        </li>
      </ul>
    </template>
  </template>
</template>

<script lang="ts">
import type {
  PanelCategory,
  SettingField,
} from '@/types/service/device/deviceSetting';
import Button from 'ant-design-vue/es/button';
import { defineComponent, PropType } from 'vue';
import Select, { SelectValue } from 'ant-design-vue/es/select';
import Input from 'ant-design-vue/es/input';

export default defineComponent({
  name: 'DeviceSettingGroup',
  components: {
    Button,
    Select,
    Input,
  },
  props: {
    data: {
      type: Object as PropType<PanelCategory>,
      required: true,
    },
  },
  setup() {
    function onChangeValue(value: SelectValue, field: SettingField): void {
      field.value = value as number;
    }

    return {
      onChangeValue,
    };
  },
});
</script>

<style lang="scss" scoped>
.panel_title {
  font-size: 16px;
  font-weight: $font-medium;
  margin-top: 20px;
}

.device_input {
  width: 65%;
  height: 32px;
  display: inline-flex;
}
</style>
