<template>
  <apexchart
    width="100%"
    :height="height"
    :type="'donut'"
    :options="donutOptions"
    :series="series"
  />
</template>

<script lang="ts">
import { ApexOptions } from 'apexcharts';
import { defineComponent, reactive, ref, toRefs, watch } from 'vue';

import { piePlotOptions } from '@/types/common/graph/graphPlotOptions';
import { tool } from '@/types/common/graph/graphToolbar';
import { stateType } from '@/types/common/graph/graphType';

export default defineComponent({
  name: 'DonutGraph',
  components: {},
  props: {
    onToolbar: {
      type: Boolean,
      default: false,
    },
    labelsValue: {
      type: Array,
      required: true,
    },
    seriesValue: {
      type: Array,
      required: true,
    },
    colorValue: {
      type: Array,
      default: () => ['#01AFDE', '#32DEA9', '#E7E9F6'],
    },
    legend: {
      type: String,
      default: 'bottom',
    },
    height: {
      type: String,
      default: '100%',
    },
  },
  setup(props: any, { emit }) {
    const state = reactive<stateType>({
      _onToolbar: props.onToolbar,
      graph: 'donutGraph',
      table: 'donutTable',
    });
    const { toolbar } = tool(toRefs(state), emit);
    const { options } = piePlotOptions(
      props.labelsValue[0],
      props.colorValue[0]
    );
    const series = ref<number[]>(props.seriesValue);
    const donutOptions = reactive<ApexOptions>({
      chart: {
        id: 'donut',
        toolbar: toolbar,
        fontFamily: 'Noto Sans KR, sans-serif',
        height: props.height,
      },
      labels: props.labelsValue,
      legend: {
        position: props.legend,
        offsetX: 0,
        fontSize: '14px',
        fontFamily: 'Noto Sans KR, sans-serif',
        fontWeight: 400,
      },
      plotOptions: options,
      colors: props.colorValue,
      stroke: {
        show: false,
      },
      tooltip: {
        style: {
          fontSize: '14px',
          fontFamily: 'Noto Sans KR, sans-serif',
        },
      },
      dataLabels: {
        enabled: false,
      },
    });

    watch(
      () => props.labelsValue,
      (label: string[] | undefined) => {
        donutOptions.labels = label;
      }
    );

    watch(
      () => props.seriesValue,
      (seriesValue: number[]) => {
        series.value = seriesValue;
      }
    );

    return {
      series,
      donutOptions,
    };
  },
});
</script>

<style scoped></style>
