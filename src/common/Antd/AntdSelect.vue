<template>
  <Select
    ref="select"
    v-model:value="selectValue"
    :mode="modeSelect"
    @change="onChange"
  >
    <Option
      :key="index"
      v-for="(list, index) in selectObject"
      :value="list.value"
    >
      {{ list.name }}
    </Option>
  </Select>
</template>

<script lang="ts">
import Select from 'ant-design-vue/es/select';
import { defineComponent, ref } from 'vue';

const { Option } = Select;

export default defineComponent({
  name: 'AntdSelect',
  emits: ['change'],
  components: {
    Select,
    Option,
  },
  props: {
    selectObject: {
      type: Object,
      required: true,
    },
    selectedValue: {
      type: null,
      default: null,
      required: false,
    },
    modeSelect: {
      type: String, // '' -> 일반, multiple -> 멀티셀렉트, tags -> 태그선택
      default: '',
      required: false,
    },
  },
  setup(props, { emit }) {
    const select = ref();
    const selectValue = ref<any>(props.selectedValue || undefined);

    const onChange = (value: any): void => {
      emit('change', value);
    };
    return {
      select,
      selectValue,
      onChange,
    };
  },
});
</script>

<style scoped></style>
