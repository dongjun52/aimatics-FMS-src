<template>
  <apexchart
    ref="graph"
    width="100%"
    height="100%"
    :type="'line'"
    :options="options"
    :series="series"
  />
</template>

<script lang="ts">
import { ApexOptions } from 'apexcharts';
import { computed, defineComponent, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { convertSecondToMinutes } from '@/utils/dateFormat';
import { yaxis } from '@/constants/videoLineGraph';

export default defineComponent({
  name: 'VideoLineGraph',
  components: {},
  setup() {
    const graph = ref();
    const { state } = useStore();
    const current = computed(() => state.player.graphAndMapCurrent);
    const graphData = computed(() => state.player.videoData.graph);

    // const { chartId, yaxis, categories, seriesData, color, duration } = toRefs(
    //   props.data
    // );

    const color = ['#008FFB', '#FEB019', '#00E396'];
    let initSeries: ApexOptions['series'] = [
      {
        name: 'rpm',
        data: [0],
      },
      {
        name: 'speed',
        data: [0],
      },
      // {
      //   name: 'brake',
      //   data: [0],
      // },
    ];

    const series = ref<ApexOptions['series']>(initSeries);

    const chart: ApexOptions['chart'] = {
      id: '',
      type: 'line',
      animations: {
        enabled: true,
        easing: 'linear',
        dynamicAnimation: {
          enabled: true,
        },
      },
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    };

    const markers = {
      size: 0,
    };

    const xaxis: ApexOptions['xaxis'] = {
      type: 'category',
      categories: graphData.value.xaxis,
      tooltip: {
        enabled: true,
      },
      labels: {
        show: true,
        maxHeight: 5,
        style: {
          cssClass: 'xaxis-text',
        },
      },
    };

    const legend: ApexOptions['legend'] = {
      show: true,
      showForSingleSeries: true,
      showForNullSeries: true,
      showForZeroSeries: true,
      position: 'bottom',
      horizontalAlign: 'left',
      fontSize: '12px',
      onItemClick: {
        toggleDataSeries: false,
      },
    };

    const options = ref<ApexOptions>({
      chart: chart,
      markers: markers,
      xaxis: xaxis,
      yaxis: yaxis,
      colors: color,
      legend: legend,
      stroke: {
        width: 3,
        curve: 'smooth',
      },
    });

    // watch(
    //   () => props.data,
    //   (data: any) => {
    //     const seriesData = data.seriesData.value;
    //
    //     if (seriesData && seriesData.length > 0) {
    //       series.value = JSON.parse(JSON.stringify(seriesData));
    //     } else {
    //       series.value = [];
    //     }
    //   }
    // );

    // const name = ref<string>('');
    // const isSeriesOff = reactive({
    //   rpm: false,
    //   speed: false,
    //   brake: false,
    // });

    watch(
      () => current.value,
      (current: number) => {
        const forGraph = graph.value;

        if (forGraph) {
          const categories = graphData.value.xaxis;
          const updateSeries = Object.keys(graphData.value.series).map(
            (key: string) => {
              return {
                name: key,
                data: graphData.value.series[key],
              };
            }
          );

          const animate = true;
          const redrawPaths = false;
          const updateSyncedCharts = false;

          forGraph.updateSeries(updateSeries, animate);
          forGraph.updateOptions(
            {
              chart: {
                events: {
                  // legendClick: (
                  //   options: any,
                  //   legendIndex: any,
                  //   config: any
                  // ) => {
                  //   name.value = config.globals.seriesNames[legendIndex];
                  // },
                },
              },
              xaxis: {
                type: 'category',
                categories: categories,
                labels: {
                  show: true,
                  maxHeight: 5,
                  style: {
                    cssClass: 'xaxis-text',
                  },
                },
              },
              tooltip: { shared: true },
            },
            redrawPaths,
            animate,
            updateSyncedCharts
          );

          forGraph.clearAnnotations();
          forGraph.addXaxisAnnotation({
            x: categories[current],
            borderColor: 'red',
            label: {
              borderColor: 'red',
              orientation: 'horizontal',
              text: convertSecondToMinutes(current),
              style: {
                color: 'white',
                background: 'red',
              },
            },
          });
        }
      },
      {
        immediate: true,
      }
    );

    return {
      graph,
      series,
      options,
    };
  },
});
</script>

<style lang="scss">
.xaxis-text {
  display: none !important;
}
</style>
