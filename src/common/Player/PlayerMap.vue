<template>
  <GMapMap
    class="map_hide_interface"
    :center="center"
    :zoom="16"
    :options="MAP_OPTIONS"
    style="width: 100%; height: 100%"
  >
    <GMapMarker :icon="'/images/common/icon_marker.png'" :position="center" />
    <GMapPolyline ref="playerPolyline" :path="mapPath" />
    <!--    <GMapPolyline-->
    <!--      ref="playerPolyline"-->
    <!--      :path="mapPath"-->
    <!--      :options="polylineOptions"-->
    <!--    />-->
  </GMapMap>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue';
import { useStore } from 'vuex';

import { MAP_OPTIONS } from '@/constants/mapOverview';
import type { RootState } from '@/store';

export default defineComponent({
  name: 'PlayerMap',
  components: {},
  setup() {
    const playerPolyline = ref();
    const { state } = useStore<RootState>();

    const mapPath = computed(() => state.player.videoData.map);
    const polylineOptions = computed(
      () => state.player.videoData.polylineOptions
    );
    const current = computed(() => state.player.graphAndMapCurrent);
    const center = ref<{ lat: number; lng: number }>({
      lat: 36.903876529771686,
      lng: 130.1810075584544,
    });

    watch(
      () => current.value,
      (current: number) => {
        if (mapPath.value.length > current) {
          center.value = mapPath.value[current];
        }
      },
      {
        immediate: true,
        deep: true,
      }
    );

    // const animatePath = (line: any) => {
    //   let count = 0;
    //   window.setInterval(() => {
    //     count = (count + 1) % 200;
    //
    //     const icons = line.icons;
    //     icons[0].offset = count / 2 + '%';
    //
    //     line.set('icons', icons);
    //   }, 50);
    // };
    //
    // watch(
    //   () => playerPolyline.value,
    //   (polyline: any) => {
    //     polyline.$polylinePromise.then((polylineContent: any) => {
    //       animatePath(polylineContent);
    //     });
    //   }
    // );

    return {
      MAP_OPTIONS,
      playerPolyline,
      polylineOptions,
      mapPath,
      center,
    };
  },
});
</script>

<style lang="scss" scoped></style>
