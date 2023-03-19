<template>
  <apexchart
    width="100%"
    height="100%"
    :type="'line'"
    :options="options"
    :series="series"
  />
</template>

<script lang="ts">
import { ApexOptions } from 'apexcharts';
import { defineComponent, PropType, reactive, ref, toRefs, watch } from 'vue';

import { tool } from '@/types/common/graph/graphToolbar';
import { getUUID } from '@/utils/utils';
// import { SeriesType, stateType } from '@/types/common/graph/graphType';

const getDefaultLineChartOptions = (): ApexOptions => {
  return {
    chart: {
      id: '',
      toolbar: {
        show: false,
        tools: {
          selection: false,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: false,
        },
      },
      type: 'line',
      zoom: {
        enabled: false,
      },
    },
    markers: {
      size: 2,
    },
    xaxis: {
      categories: [],
      tooltip: {
        enabled: true,
      },
      labels: {
        show: false,
        rotate: 0,
      },
    },
    yaxis: {},
    colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0'],
    stroke: {
      width: 2,
      curve: 'smooth',
    },
    legend: {
      position: 'bottom',
      offsetX: 0,
    },
  };
};

export default defineComponent({
  name: 'LineGraph',
  components: {},
  props: {
    onToolbar: {
      type: Boolean,
      default: false,
    },
    series: {
      type: Array,
      required: true,
    },
    categories: {
      type: Array as PropType<string[] | number[]>,
      default: () => [],
      required: false,
    },
    colors: {
      type: Array,
      default: () => ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0'],
    },
    tooltip: {
      type: Array,
      default: () => [],
    },
    yaxisShow: {
      type: Boolean,
      default: false,
    },
    yaxis: {
      type: Object,
      default: () => [],
    },
    chartId: {
      type: String,
      default: () => getUUID(),
      required: false,
    },
    isShowLabel: {
      type: Boolean,
      default: true,
      required: false,
    },
    immediate: {
      type: Boolean,
      default: false,
      required: false,
    },
    legendPosition: {
      type: String as PropType<'top' | 'bottom' | 'left' | 'right' | undefined>,
      default: 'bottom',
      required: false,
    },
    yaxisText: {
      type: String,
      default: '',
    },
    yaxisUnit: {
      type: String,
      default: '',
    },
    // yaxisTick: {
    //   type: Number,
    //   default: '',
    // },
  },
  setup(props) {
    const series = ref<ApexOptions['series']>([]);
    const options = ref<ApexOptions>({
      chart: {
        id: props.chartId,
        type: 'line',
        zoom: {
          enabled: false,
        },
        // dropShadow: {
        //   enabled: true,
        //   color: '#000',
        //   top: 18,
        //   left: 7,
        //   blur: 10,
        //   opacity: 0.2,
        // },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: props.categories,
        tooltip: {
          enabled: true,
        },
        labels: {
          show: props.isShowLabel,
          style: {
            colors: '#041241',
          },
          // rotate: 0,
        },
        title: {},
      },
      yaxis: props.yaxis,
      colors: props.colors,
      stroke: {
        width: 1.7,
        curve: 'smooth',
      },
      legend: {
        position: 'bottom',
        offsetX: 0,
      },
    });

    watch(
      () => props.series,
      (data) => {
        if (data && data.length > 0) {
          series.value = JSON.parse(JSON.stringify(data));
        } else {
          series.value = [];
        }
      },
      {
        immediate: props.immediate,
      }
    );

    watch(props, (data: any) => {
      if (data.categories && data.categories.length > 0) {
        let tickAmount = 0;

        if (data.categories.length < 4) {
          tickAmount = data.categories.length;
        } else if (data.categories.length >= 90) {
          tickAmount = data.categories.length / 30;
        } else {
          tickAmount = 4;
        }

        options.value = {
          ...getDefaultLineChartOptions(),
          colors: data.colors,
          xaxis: {
            categories: data.categories,
            tickAmount: tickAmount,
            labels: {
              rotate: 0,
              style: {
                colors: '#8289a3',
                fontFamily: 'Noto Sans KR, sans-serif',
                fontWeight: 300,
              },
            },
          },
          legend: {
            position: data.legendPosition,
            onItemClick: {
              toggleDataSeries: false,
            },
          },
          stroke: {
            width: 1.7,
            curve: 'smooth',
          },
          yaxis: {
            tickAmount: tickAmount,
            // min: 0,
            labels: {
              offsetY: 3,
              style: {
                colors: ['#041241'],
                fontSize: '13px',
                fontWeight: 400,
                fontFamily: 'Noto Sans KR, sans-serif',
              },
              formatter: (value: number): string => {
                // TODO: 개선 필요 ( max 값이 2일 경우 value 값에 이상현상 )
                return value.toString().includes('.')
                  ? ``
                  : `${value.toFixed()}${props.yaxisUnit}`;
              },
            },
            title: {
              text: props.yaxisText,
              rotate: 0,
              offsetX: -10,
              style: {
                color: '#041241',
                fontSize: '13px',
                fontWeight: 400,
                fontFamily: 'Noto Sans KR, sans-serif',
                cssClass: 'apexcharts-yaxis-title',
              },
            },
          },
          markers: {
            size: data.categories.length === 1 ? 5 : 0,
          },
        };
      }
    });

    return {
      series,
      options,
    };
  },
});
</script>

<style scoped></style>
