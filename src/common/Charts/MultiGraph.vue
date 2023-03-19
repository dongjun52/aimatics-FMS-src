<template>
  <apexchart
    width="100%"
    height="100%"
    :type="'line'"
    :options="multiOptions"
    :series="series"
  />
</template>

<script lang="ts">
import { ApexOptions } from 'apexcharts';
import { defineComponent, reactive, toRefs } from 'vue';

import { tool } from '@/types/common/graph/graphToolbar';
import { SeriesType, stateType } from '@/types/common/graph/graphType';

export default defineComponent({
  name: 'MultiChart',
  components: {},
  props: {
    onToolbar: {
      type: Boolean,
      default: false,
    },
    stacked: {
      type: Boolean,
      default: false,
    },
    horizontal: {
      type: Boolean,
      default: false,
    },
  },
  setup(props: any, { emit }) {
    const categories = [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016];
    const data = [
      {
        name: 'Income',
        type: 'column',
        data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6],
      },
      {
        name: 'Cashflow',
        type: 'column',
        data: [1.1, 3, 3.1, 4, 4.1, 4.9, 6.5, 8.5],
      },
      {
        name: 'Revenue',
        type: 'line',
        data: [20, 29, 37, 36, 44, 45, 50, 58],
      },
    ];
    const state = reactive<stateType>({
      _onToolbar: props.onToolbar,
      graph: 'multiGraph',
      table: 'multiTable',
    });
    const { toolbar } = tool(toRefs(state), emit);
    const seriesOptions = reactive<SeriesType>({
      series: data,
    });
    const { series } = toRefs(seriesOptions);
    const multiOptions = reactive<ApexOptions>({
      chart: {
        id: 'multi',
        stacked: props.stacked,
        toolbar: toolbar,
      },
      xaxis: {
        categories: categories,
        labels: {
          show: true,
          formatter: (a: any) => {
            return a;
          },
        },
      },
      yaxis: {},
      stroke: {
        width: 2,
        curve: 'smooth',
      },
      legend: {
        position: 'bottom',
        offsetX: 0,
      },
      plotOptions: {
        bar: {
          horizontal: props.horizontal,
        },
      },
    });

    return {
      series,
      multiOptions,
    };
  },
});
</script>

<style scoped></style>
