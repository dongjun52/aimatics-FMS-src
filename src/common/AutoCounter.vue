<template>
  <Vue3Autocounter
    :start-amount="options.startAmount"
    :end-amount="options.endAmount"
    :duration="options.duration"
    :prefix="options.prefix"
    :suffix="options.suffix"
    :separator="options.separator"
    :decimal-separator="options.decimalSeparator"
    :decimals="options.decimals"
  />
</template>

<script lang="ts">
import { defineComponent, PropType, watch } from 'vue';
import Vue3Autocounter from 'vue3-autocounter';

export interface IAutoCounterOptions {
  startAmount: number;
  endAmount: number;
  duration: number;
  prefix: string;
  suffix: string | number;
  separator: string;
  decimalSeparator: string;
  decimals: number;
}

export const defaltAutoCounterOptions: IAutoCounterOptions = {
  startAmount: 0,
  endAmount: 0,
  duration: 1,
  prefix: '',
  suffix: '',
  separator: ',',
  decimalSeparator: '.',
  decimals: 2,
};

export default defineComponent({
  name: 'AutoCounter',
  components: {
    Vue3Autocounter,
  },
  props: {
    options: {
      type: Object as PropType<IAutoCounterOptions>,
      required: true,
    },
  },
  setup(props) {
    return {};
  },
});
</script>
