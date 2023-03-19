<template>
  <Spin :spinning="isLoading" size="large">
    <div class="tab_inner">
      <div class="tab_calendar">
        <p class="calendar_title mr10">Select Date :</p>
        <!--      <MonthAndRangePicker @change="onChangeDate" />-->
        <DatePicker v-model:value="day" :format="dateFormat" @change="onChangeDay" />
      </div>

      <DCATable :serial="serial" />
      <!-- <LastUploadTable /> -->
      <AlertTable :serial="serial" />
    </div>
  </Spin>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, toRefs, watch } from 'vue';
import { useStore } from 'vuex';
import Spin from 'ant-design-vue/es/spin';
import { ROUTE_NAMES } from '@/constants/common';
import AlertTable from './Table/AlertTable.vue';
import DCATable from './Table/DCATable.vue';
import DatePicker from 'ant-design-vue/es/date-picker';
// import MonthAndRangePicker from '@/common/DatePicker/MonthAndRangePicker.vue';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import type { RootState } from '@/store';
import type { DcaStatisticsAndAlertsPayload } from '@/types/service/device/dca';
// import LastUploadTable from './Table/LastUploadTable.vue';

type fetchDcaStatisticsAndAlertsPayload = {
  fetchDcaStatisticsAndAlertsPayload: {
    variables: DcaStatisticsAndAlertsPayload;
  };
};

export default defineComponent({
  name: 'DCA',
  components: {
    Spin,
    AlertTable,
    DatePicker,
    DCATable,
    // MonthAndRangePicker,
  },
  props: {
    serial: {
      type: String,
      required: true,
      default: '',
    },
    routeName: {
      type: String,
      required: false,
      default: '',
    },
  },
  setup(props) {
    const { state, dispatch } = useStore<RootState>();
    const { serial, routeName } = toRefs(props);
    const isLoading = computed(() => state.dca.dcaData.isLoading);

    const day = ref<Dayjs>(dayjs());
    const dateFormat = 'YYYY-MM-DD';

    const initState = reactive<fetchDcaStatisticsAndAlertsPayload>({
      fetchDcaStatisticsAndAlertsPayload: {
        variables: {
          startDate: dayjs().format('YYYY-MM-DD'),
          endDate: dayjs().format('YYYY-MM-DD'),
          serial: props.serial,
        },
      },
    });

    // const selectedDate = ref<{ startDt: string; endDt: string }>({
    //   startDt: '',
    //   endDt: '',
    // });
    //
    // const onChangeDate = (date: { from: string; to: string }) => {
    //   selectedDate.value = { startDt: date.from, endDt: date.to };
    // };

    const initDispatch = async (): Promise<void> => {
      await dispatch(
        'dca/fetchDcaStatisticsAndAlerts',
        initState.fetchDcaStatisticsAndAlertsPayload.variables
      );
    };

    watch(
      [serial, routeName],
      async (currentProps) => {
        const serial = currentProps[0];
        const route = currentProps[1];

        if (route === ROUTE_NAMES.DCA && serial) {
          initState.fetchDcaStatisticsAndAlertsPayload.variables = {
            ...initState.fetchDcaStatisticsAndAlertsPayload.variables,
            serial: props.serial,
          };

          await initDispatch();
        }
      },
      {
        immediate: true,
      }
    );

    const onChangeDay = async (day: Dayjs): Promise<void> => {
      initState.fetchDcaStatisticsAndAlertsPayload.variables = {
        ...initState.fetchDcaStatisticsAndAlertsPayload.variables,
        startDate: dayjs(day).format(dateFormat),
        endDate: dayjs(day).format(dateFormat),
      };

      await initDispatch();
    };

    return {
      day,
      isLoading,
      dateFormat,
      onChangeDay,
      // selectedDate,
      // onChangeDate,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>
