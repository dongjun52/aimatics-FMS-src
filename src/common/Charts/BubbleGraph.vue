<template>
  <apexchart
    ref="bubbleGraph"
    width="100%"
    height="100%"
    :type="'bubble'"
    :options="options"
    :series="series"
  />
</template>

<script lang="ts">
import { ApexOptions } from 'apexcharts';
import { defineComponent, PropType, reactive, ref, toRefs, watch } from 'vue';

import { tool } from '@/types/common/graph/graphToolbar';
import { getUUID } from '@/utils/utils';
import moment from 'moment';
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
      type: 'bubble',
      zoom: {
        enabled: false,
      },
    },
    // markers: {
    //   size: 2,
    // },
    // xaxis: {
    //   categories: [],
    //   tooltip: {
    //     enabled: true,
    //   },
    //   labels: {
    //     show: false,
    //     rotate: 0,
    //   },
    // },
    // yaxis: {},
    colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0'],
    // stroke: {
    //   width: 2,
    //   curve: 'smooth',
    // },
    legend: {
      position: 'bottom',
      offsetX: 0,
    },
  };
};

export default defineComponent({
  name: 'BubbleGraph',
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
    const bubbleGraph = ref();

    watch(
      () => bubbleGraph.value,
      (bubble: any) => {
        console.log(bubble);
      },
      {
        deep: true,
      }
    );

    const series = ref<ApexOptions['series']>([]);
    const options = ref<ApexOptions>({
      chart: {
        id: props.chartId,
        type: 'bubble',
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        opacity: 0.8,
      },
      xaxis: {
        type: 'datetime',
        tickAmount: 30,
        categories: props.categories,
        labels: {
          formatter: (value: any) => {
            return moment.unix(value).format('MM-DD');
          },
        },
        // tooltip: {
        //   enabled: true,
        // },
        // labels: {
        //   show: props.isShowLabel,
        //   style: {
        //     colors: '#041241',
        //   },
        //   // rotate: 0,
        // },
        // title: {},
      },
      yaxis: {
        labels: {
          formatter: (value: any) => {
            return moment.unix(value).format('HH:mm');
          },
        },
        // labels: {
        //   formatter: (value: any) => {
        //     let time = '';
        //     props.series.map((series: any) => {
        //       time = minTommss(series);
        //     });
        //     return time;
        //   },
        // },
      },
      colors: ['#f85656', '#feb14e', '#877afc', '#cf74fc'],
      // stroke: {
      //   width: 1.7,
      //   curve: 'smooth',
      // },
      legend: {
        position: 'bottom',
        offsetX: 0,
      },
      tooltip: {
        x: {
          show: true,
        },
        y: {
          title: {
            formatter: () => '발생시간',
          },
        },
        z: {
          title: '건수',
        },
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
        // let tickAmount = 0;

        // if (data.categories.length < 4) {
        //   tickAmount = data.categories.length;
        // } else if (data.categories.length >= 90) {
        //   tickAmount = data.categories.length / 30;
        // } else {
        //   tickAmount = 4;
        // }

        options.value = {
          ...getDefaultLineChartOptions(),
          colors: data.colors,
          xaxis: {
            categories: data.categories,
            tickAmount: 30,
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
            // min: 0,
            labels: {
              offsetY: 3,
              style: {
                colors: ['#041241'],
                fontSize: '13px',
                fontWeight: 400,
                fontFamily: 'Noto Sans KR, sans-serif',
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
      bubbleGraph,
      series,
      options,
    };
  },
});
</script>

<style scoped></style>
