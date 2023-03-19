<template>
  <Switch
    v-model:checked="isChecked"
    :checked-children="checkedText"
    :un-checked-children="unCheckedText"
    @change="onChangeChecked"
  />
</template>

<script lang="ts">
import Switch from 'ant-design-vue/es/switch';
import { defineComponent, reactive, toRefs } from 'vue';

interface SwtichState {
  isChecked: boolean;
  checkedText: string | unknown;
  unCheckedText: string | unknown;
}

export default defineComponent({
  name: 'CommonSwitch',
  components: {
    Switch,
  },
  props: {
    checked: {
      type: Boolean,
      default: false,
      required: true,
    },
    text: {
      type: Array,
      default: () => ['', ''],
      required: false,
    },
  },
  emits: ['onChange'],
  setup(props, { emit }) {
    const state = reactive<SwtichState>({
      isChecked: props.checked,
      checkedText: props.text[0],
      unCheckedText: props.text[1],
    });

    const onChangeChecked = (isChecked: SwtichState['isChecked']): void => {
      emit('onChange', isChecked);
    };

    return {
      ...toRefs(state),
      onChangeChecked,
    };
  },
});
</script>

<style scoped></style>
