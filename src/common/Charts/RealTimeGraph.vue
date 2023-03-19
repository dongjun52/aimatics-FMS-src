<template>
  <VueApexCharts
    v-if="series"
    ref="real"
    width="100%"
    height="100%"
    :type="'line'"
    :options="realTimeOption"
    :series="series"
  />
  <LineGraph v-else :series="[]" :categories="[]" />
</template>

<script lang="ts">
import { ApexOptions } from 'apexcharts';
import moment from 'moment';
import { defineComponent, onUpdated, reactive, ref, watch } from 'vue';
import VueApexCharts from 'vue3-apexcharts';

import LineGraph from '@/common/Charts/LineGraph.vue';
import { dateTime, graphData } from '@/common/Video/driveLogs';

export default defineComponent({
  name: 'RealTimeGraph',
  components: {
    LineGraph,
    VueApexCharts,
  },
  props: {
    data: {
      type: Object,
    },
    time: {
      type: Object,
    },
  },
  setup(props) {
    const real = ref<any>(null);
    const updateTime = ref<any | undefined>([]);
    const stest = ref<any>([
      {
        data: [],
      },
    ]);
    const series = ref<any>([
      {
        name: 'test',
        data: [[moment(dateTime[0].dateTime).unix(), 0]],
      },
    ]);
    onUpdated(() => {
      updateTime.value = props.time;
    });
    watch(
      () => updateTime.value.current,
      () => {
        const current = updateTime.value.current;
        const x = moment(dateTime[current].dateTime).unix();
        const y = Math.floor(Math.random() * 10);
        if (current !== updateTime.value.duration) {
          const dataSet = [x, y];
          real.value.updateSeries(
            [
              {
                data: [dataSet],
              },
            ],
            true
          );
        } else if (current === updateTime.value.duration) {
          real.value.updateSeries(
            [
              {
                data: [[moment(dateTime[0].dateTime).unix(), 0]],
              },
            ],
            true
          );
        }
      }
    );
    const realTimeOption = reactive<ApexOptions>({
      chart: {
        id: 'realTime',
        height: 350,
        type: 'line',
        animations: {
          enabled: true,
          easing: 'linear',
          dynamicAnimation: {
            speed: 1000,
          },
        },
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      markers: {
        size: 0,
      },
      xaxis: {
        type: 'datetime',
        // range: XAXISRANGE,
        labels: {
          formatter(value: string): string | string[] {
            const unixtime = moment.unix(Number(value));
            return unixtime.format('HH:mm:ss');
          },
        },
      },
      yaxis: {
        max: 10,
      },
      legend: {
        show: true,
        position: 'top',
      },
    });
    return {
      real,
      series,
      realTimeOption,
    };
  },
});
</script>

<style scoped></style>
