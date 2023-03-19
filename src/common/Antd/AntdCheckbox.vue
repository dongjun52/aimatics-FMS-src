<template>
  <Checkbox :checked="check" @change="onChange">
    {{ checkBoxName }}
  </Checkbox>
</template>

<script lang="ts">
import Checkbox from 'ant-design-vue/es/checkbox';
import { defineComponent, PropType, ref, watch } from 'vue';

export default defineComponent({
  name: 'AntdCheckbox',
  components: {
    Checkbox,
  },
  props: {
    checked: {
      type: Boolean,
      default: false,
      required: true,
    },
    checkBoxName: {
      type: String,
      required: true,
    },
    checkBoxKeyName: {
      type: [String, Array], // string | string[]
      required: true,
    },
  },
  emits: ['change'],
  setup(props, { emit }) {
    const check = ref<boolean>(props.checked);

    const onChange = () => {
      check.value = !check.value;
      emit('change', props.checkBoxKeyName, check.value);
    };

    watch(
      () => props.checked,
      (checked: boolean) => {
        check.value = checked;
      }
    );

    return {
      check,
      onChange,
    };
  },
});
</script>

<style scoped></style>
