<template>
  <RangePicker
    v-model:value="range"
    :format="dateFormat"
    @change="onChangeRange"
  />
</template>

<script lang="ts">
import 'ant-design-vue/lib/date-picker/style/index.css';

import DatePicker from 'ant-design-vue/es/date-picker';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { defineComponent, ref } from 'vue';

type RangeValue = [Dayjs, Dayjs];
const dateFormat = 'YYYY-MM-DD';

const { RangePicker } = DatePicker;

export default defineComponent({
  name: 'RangePicker',
  props: {},
  components: {
    DatePicker,
    RangePicker,
  },
  emits: ['change'],
  setup(props, { emit }) {
    const today = dayjs();
    const range = ref<RangeValue>([today, today]);

    const onChangeRange = (date: Dayjs[]) => {
      const startDt = dayjs(date[0]).format('YYYY-MM-DD');
      const endDt = dayjs(date[1]).format('YYYY-MM-DD');
    };

    return {
      today,
      range,
      dateFormat,
      onChangeRange,
    };
  },
});
</script>

<style scoped></style>
