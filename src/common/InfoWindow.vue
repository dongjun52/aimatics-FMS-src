<template>
  <div
    class="marker_table"
    :class="
      info.type === 100
        ? 'car_run'
        : info.type === 300
        ? 'car_stop'
        : 'car_accident'
    "
  >
    <table>
      <colgroup>
        <col width="30%" />
        <col width="70%" />
      </colgroup>
      <tr>
        <th colspan="2">
          <span class="fw_b">
            {{ info.vehicleNumber }}
          </span>
          <span class="ml10">
            {{ info.driverName }}
          </span>
        </th>
      </tr>
      <tr>
        <td class="column">위치</td>
        <td class="now-info">
          {{ !info.location ? '-' : info.location }}
        </td>
      </tr>
      <tr>
        <td class="column">현재속도</td>
        <td class="now-info">
          {{ info.speed === null ? '-' : info.speed + ' km/h' }}
        </td>
      </tr>
      <tr>
        <td class="column">평균속도</td>
        <td class="now-info">
          {{ info.avgSpeed === null ? '-' : info.avgSpeed + ' km/h' }}
        </td>
      </tr>
      <tr>
        <td class="column">운행시간</td>
        <td class="now-info">
          {{
            info.continuousHours === '-'
              ? '-'
              : info.continuousHours + ' (시:분:초)'
          }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'InfoWindow',
  props: {
    info: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    return {};
  },
});
</script>

<style scoped></style>
