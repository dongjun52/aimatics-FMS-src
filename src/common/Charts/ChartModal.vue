<template>
  <Modal
    v-model:visible="visibleValue"
    class="contents_modal chart_modal"
    :title="title"
    width="80%"
    centered
    :footer="null"
    :after-close="offModal"
    :destroy-on-close="true"
  >
    <slot></slot>
  </Modal>
</template>

<script lang="ts">
import Modal from 'ant-design-vue/es/modal';
import { defineComponent, ref, toRefs } from 'vue';

export default defineComponent({
  name: 'ChartModal',
  components: {
    Modal,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    visible: {
      type: Boolean,
      required: true,
    },
    offModal: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const { visible } = toRefs(props);
    const visibleValue = ref(visible.value);
    return {
      visibleValue,
    };
  },
});
</script>

<style scoped></style>
