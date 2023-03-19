<template>
  <apexchart
    width="100%"
    height="100%"
    :type="'area'"
    :options="options"
    :series="series"
  />
</template>

<script lang="ts">
import { ApexOptions } from 'apexcharts';
import { defineComponent, PropType, reactive, ref, toRefs, watch } from 'vue';
// import { tool } from '@/types/common/graph/graphToolbar';
import { getUUID } from '@/utils/utils';
import { addNumberComma } from '@/utils/formatter';

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
      type: 'area',
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0.1,
      },
    },
    xaxis: {
      categories: [],
      tooltip: {
        enabled: true,
      },
      labels: {
        show: false,
      },
    },
    yaxis: {
      tickAmount: 4,
    },
    colors: ['#01afde', '#00E396', '#FEB019', '#FF4560', '#775DD0'],
    stroke: {
      width: 1.2,
      curve: 'smooth',
      lineCap: 'butt',
    },
    legend: {
      position: 'bottom',
      offsetX: 0,
      show: false,
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
      type: Array as PropType<number[]>,
      required: true,
    },
    categories: {
      type: Array as PropType<string[] | number[]>,
      default: () => [],
      required: false,
    },
    colors: {
      type: Array,
      default: () => ['#01afde', '#00E396', '#FEB019', '#FF4560', '#775DD0'],
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
  },
  setup(props) {
    const series = ref<ApexOptions['series']>([]);
    const options = ref<ApexOptions>({
      chart: {
        id: props.chartId,
        type: 'area',
        zoom: {
          enabled: false,
        },
      },
      xaxis: {
        categories: props.categories,
        tooltip: {
          enabled: false,
        },
        labels: {
          show: props.isShowLabel,
        },
        title: {},
      },
      yaxis: {
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
      colors: props.colors,
      stroke: {
        width: 1.5,
        curve: 'smooth',
      },
      legend: {
        show: false,
        position: 'bottom',
        offsetX: 0,
      },
    });

    watch(
      () => props.series,
      (data: number[]) => {
        if (data && data.length > 0) {
          series.value = data;
        } else {
          series.value = [];
        }
      }
    );

    watch(props, (data: any) => {
      if (data.categories && data.categories.length > 0) {
        let tickAmount = 0;

        if (data.categories.length < 6) {
          tickAmount = data.categories.length;
        } else if (data.categories.length >= 30) {
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
                colors: '#C1C5DF',
                fontFamily: 'Noto Sans KR, sans-serif',
                fontWeight: 300,
              },
            },
          },
          legend: {
            position: data.legendPosition,
          },
          tooltip: {
            enabled: true,
            y: {
              formatter: (value) => {
                return addNumberComma(value) + props.yaxisUnit;
              },
            },
          },
          yaxis: {
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
                  ? ''
                  : value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
                      props.yaxisUnit;
              },
            },
            title: {
              text: props.yaxisText,
              rotate: 0,
              offsetX: -15,
              style: {
                color: '#041241',
                fontSize: '13px',
                fontWeight: 400,
                fontFamily: 'Noto Sans KR, sans-serif',
                cssClass: 'apexcharts-yaxis-title',
              },
            },
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
