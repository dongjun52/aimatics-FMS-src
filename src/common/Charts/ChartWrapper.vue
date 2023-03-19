<template>
  <div class="border_box po_r chart_wrapper" :style="{ height: height + 'px' }">
    <p class="section_title">{{ titleValue }}</p>
    <div class="chart_wrapper_content">
      <slot name="chart"></slot>
    </div>
    <div class="chart_wrapper_bottom_area">
      <p class="chart_wrapper_bottom_unit_text">
        <span v-if="unitTextValue">{{ unitTextValue }}</span>
      </p>
      <button v-if="moreView" class="btn btn_md btn_blue" @click="modalControl">
        자세히 보기
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, toRefs } from 'vue';

export default defineComponent({
  name: 'ChartWrapper',
  props: {
    title: {
      types: String,
      required: true,
    },
    height: {
      types: Number,
      required: true,
    },
    unitText: {
      types: String,
      required: false,
    },
    moreView: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['open-modal', 'resetKey'],
  setup(props, { emit }) {
    const { title } = toRefs(props);

    const modalControl = () => {
      emit('open-modal');
      emit('resetKey');
    };

    return {
      titleValue: title,
      heightValue: ref(props.height),
      unitTextValue: ref(props.unitText),
      modalControl,
    };
  },
});
</script>
