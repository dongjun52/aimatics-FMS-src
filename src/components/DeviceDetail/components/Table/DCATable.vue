<template>
  <p class="list_title pt15">
    {{ dcaDataList.externalEvent.parentsEventName }}
  </p>
  <ul class="custom_list_type4 list_full_width mt6">
    <li
      v-for="(childEvent, eventIndex) in dcaDataList.externalEvent.childEvents"
      :key="eventIndex"
    >
      <div class="left_title">{{ childEvent.name }}</div>
      <div :class="`right_cont ${colorsAboveZero(childEvent.count)}`">
        {{ childEvent.count }}
      </div>
    </li>
  </ul>

  <div class="dca_list_wrap">
    <div class="dca_section mt30">
      <!-- ADAS Alerts -->
      <p class="list_title pt15">
        {{ dcaDataList.driverCoaching.parentsEventName }}
      </p>
      <ul class="custom_list_type4 mt6">
        <li
          v-for="(childEvent, eventIndex) in dcaDataList.driverCoaching
            .childEvents"
          :key="eventIndex"
        >
          <div class="left_title">{{ childEvent.name }}</div>
          <div :class="`right_cont ${colorsAboveZero(childEvent.count)}`">
            {{ childEvent.count }}
          </div>
        </li>
      </ul>
    </div>

    <div class="dca_section mt30">
      <p class="list_title pt15">
        {{ dcaDataList.driveSafetyEvent.parentsEventName }}
      </p>
      <ul class="custom_list_type4 mt6">
        <li
          v-for="(childEvent, eventIndex) in dcaDataList.driveSafetyEvent
            .childEvents"
          :key="eventIndex"
        >
          <div class="left_title">{{ childEvent.name }}</div>
          <div :class="`right_cont ${colorsAboveZero(childEvent.count)}`">
            {{ childEvent.count }}
          </div>
        </li>
      </ul>
    </div>

    <div class="dca_section mt30">
      <p class="list_title pt15">
        {{ dcaDataList.driverEvent.parentsEventName }}
      </p>
      <ul class="custom_list_type4 mt6">
        <li
          v-for="(childEvent, eventIndex) in dcaDataList.driverEvent
            .childEvents"
          :key="eventIndex"
        >
          <div class="left_title">{{ childEvent.name }}</div>
          <div :class="`right_cont ${colorsAboveZero(childEvent.count)}`">
            {{ childEvent.count }}
          </div>
        </li>
      </ul>
    </div>

    <div class="dca_section mt30">
      <p class="list_title pt15">
        {{ dcaDataList.onDemandEvent.parentsEventName }}
      </p>
      <ul class="custom_list_type4 mt6">
        <li
          v-for="(childEvent, eventIndex) in dcaDataList.onDemandEvent
            .childEvents"
          :key="eventIndex"
        >
          <div class="left_title">{{ childEvent.name }}</div>
          <div :class="`right_cont ${colorsAboveZero(childEvent.count)}`">
            {{ childEvent.count }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { RootState } from '@/store';
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'DCATable',
  components: {},
  props: {
    serial: {
      type: String,
      required: true,
      default: '',
    },
    changedDate: {
      type: String, // Object as PropType<{ startDt: string; endDt: string }>,
      required: false,
      default: '',
    },
  },
  setup() {
    const store = useStore<RootState>();
    const dcaDataList = computed(
      () => store.state.dca.dcaData.dcaEventEachCountsList
    );

    const colorsAboveZero = (counts: number): string => {
      if (counts > 0) {
        return 'ft_red3 fw_m';
      }

      return '';
    };

    return {
      dcaDataList,
      colorsAboveZero,
    };
  },
});
</script>

<style lang="scss" scoped>
.dca_list_wrap {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1%;

  .dca_section {
    width: 49%;
  }
}
</style>
