<template>
  <apexchart
    width="100%"
    height="100%"
    :type="'bar'"
    :options="barOptions"
    :series="series"
  />
</template>

<script lang="ts">
import { ApexOptions } from 'apexcharts';
import { defineComponent, reactive, ref, toRefs, watch } from 'vue';

import { tool } from '@/types/common/graph/graphToolbar';
import { SeriesType, stateType } from '@/types/common/graph/graphType';

export default defineComponent({
  name: 'BarGraph',
  components: {},
  props: {
    onToolbar: {
      type: Boolean,
      default: false,
    },
    horizontal: {
      type: Boolean,
      default: false,
    },
    columnWidth: {
      type: String,
      default: '30%',
    },
    barHeight: {
      type: String,
      default: '50%',
    },
    stacked: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      required: true,
    },
    chartList: {
      type: Object,
      required: true,
    },
    strokeWidth: {
      type: Number,
      default: 2,
    },
    colorsValue: {
      type: Array,
      default: () => ['#01afde', '#00E396', '#FEB019', '#FF4560', '#775DD0'],
    },
    tooltipValue: {
      type: Array,
      default: () => [],
    },
    intersect: {
      type: Boolean,
      default: true,
    },
    shared: {
      type: Boolean,
      default: false,
    },
  },
  setup(props: any, { emit }) {
    const state = reactive<stateType>({
      _onToolbar: props.onToolbar,
      graph: 'barGraph',
      table: 'barTable',
    });
    const { toolbar } = tool(toRefs(state), emit);
    const data = ref(props.data);
    const seriesOption = reactive<SeriesType>({
      series: data,
    });
    let barOptions = reactive<ApexOptions>({
      chart: {
        id: 'test',
        stacked: props.stacked,
        toolbar: toolbar,
        dropShadow: {
          enabled: true,
          color: '#000',
          top: 14,
          left: 3,
          blur: 5,
          opacity: 0.15,
        },
      },
      colors: props.colorsValue,
      xaxis: {
        axisBorder: {
          show: true,
        },
        axisTicks: {
          show: true,
        },
        categories: props.chartList,
      },
      yaxis: {
        show: true,
        tickAmount: 4,
      },
      legend: {
        position: 'top',
        offsetX: 0,
      },
      dataLabels: {
        enabled: false,
        style: {
          fontSize: '4px',
        },
      },
      plotOptions: {
        bar: {
          borderRadius: 6,
          horizontal: props.horizontal,
          columnWidth: props.columnWidth,
          barHeight: props.horizontal ? props.barHeight : '',
        },
      },
      tooltip: {
        shared: props.shared,
        intersect: props.intersect,
      },
    });
    const { series } = toRefs(seriesOption);

    watch(
      () => props.data,
      () => {
        seriesOption.series = props.data;
      },
      {
        deep: true,
      }
    );
    watch(
      () => props.chartList,
      () => {
        barOptions = {
          ...barOptions,
          xaxis: { categories: props.chartList },
        };
      },
      {
        deep: true,
      }
    );

    return {
      series,
      barOptions,
    };
  },
});
</script>

<style scoped></style>
