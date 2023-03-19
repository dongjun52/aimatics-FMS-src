<template>
  <div class="calendar_wrap">
    <DatePicker v-model:value="month" :picker="'month'" :format="monthFormat" />
  </div>

  <div class="calendar_wrap ml6">
    <RangePicker
      class="ml6"
      v-model:value="day"
      :format="dateFormat"
      :disabled-date="disabledDate"
      @change="onChange"
    />
  </div>
</template>

<script lang="ts">
import 'ant-design-vue/lib/date-picker/style/index.css';

import DatePicker from 'ant-design-vue/es/date-picker';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { defineComponent, ref, watch } from 'vue';

const { RangePicker } = DatePicker;

const monthFormat = 'YYYY-MM';
const dateFormat = 'YYYY-MM-DD';

export default defineComponent({
  name: 'MonthAndRangePicker',
  components: {
    DatePicker,
    RangePicker,
  },
  emits: ['change'],
  setup(props, { emit }) {
    const month = ref<Dayjs>(dayjs());
    const day = ref<[Dayjs, Dayjs]>();

    const disabledDate = (currentDate: Dayjs) => {
      const monthFromMonthValue = dayjs(month.value)
        .format(monthFormat)
        .split('-')[1];
      const monthFromDateValue = dayjs(currentDate)
        .format(dateFormat)
        .split('-')[1];

      return monthFromMonthValue !== monthFromDateValue;
    };

    const onChange = (date: [Dayjs, Dayjs]) => {
      const startDt = dayjs(date[0]).format('YYYY-MM-DD');
      const endDt = dayjs(date[1]).format('YYYY-MM-DD');

      emit('change', { from: startDt, to: endDt });
    };

    watch(
      () => month.value,
      (date: any) => {
        day.value = [dayjs(date).subtract(7, 'days'), date];

        // onChange(day.value);
      },
      {
        immediate: true,
      }
    );

    return {
      month,
      day,
      monthFormat,
      dateFormat,
      onChange,
      disabledDate,
    };
  },
});
</script>

<style lang="scss" scoped></style>
