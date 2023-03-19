<template>
  <DatePicker v-model:value="day" :format="dateFormat" @change="onChangeDate" />
</template>

<script lang="ts">
import 'ant-design-vue/lib/date-picker/style/index.css';

import DatePicker from 'ant-design-vue/es/date-picker';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
  name: 'DayPicker',
  // props: {},
  components: {
    DatePicker,
  },
  emits: ['change'],
  setup(props, { emit }) {
    const dateFormat = 'YYYY-MM-DD';
    const day = ref<Dayjs>(dayjs());

    const onChangeDate = (current: Dayjs) => {
      const selectedDay = dayjs(current).format(dateFormat);
      emit('change', { from: selectedDay });
    };

    return {
      dateFormat,
      day,
      onChangeDate,
    };
  },
});
</script>

<style lang="scss" scoped></style>
