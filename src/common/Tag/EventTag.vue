<template>
  <span class="event_tag" :style="{ backgroundColor: color }"> {{ name }}</span>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue';
import { getEventColor, getEventName } from '@/helpers/eventType';
import { EventKey } from '@/types/common/eventType';
import { string } from 'vue-types';

export default defineComponent({
  name: 'EventTag',
  props: {
    type: {
      type: String as PropType<EventKey>,
      required: true,
    },
    stillCut: {
      type: string,
      required: false,
    },
  },
  components: {},
  setup(props) {
    const color = ref('');
    const name = ref('');

    watch(
      () => props.type,
      () => {
        color.value = getEventColor(props.type);
        name.value = getEventName(props.type);
      },
      {
        immediate: true,
      }
    );

    watch(
      () => props.stillCut,
      (stillCut) => {
        if (stillCut) {
          color.value = 'gray';
          name.value = 'Still Cut';
        }
      },
      {
        immediate: true,
      }
    );
    return {
      name,
      color,
    };
  },
});
</script>

<style scoped></style>
