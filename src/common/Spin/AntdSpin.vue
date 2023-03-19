<template>
  <div class="spin_container">
    <Spin :spinning="spinning">
      <slot></slot>
    </Spin>
  </div>
</template>

<script lang="ts">
import Spin from 'ant-design-vue/es/spin';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AntdSpin',
  components: {
    Spin,
  },
  props: {
    spinning: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  setup(props) {
    return {};
  },
});
</script>

<style scoped>
/* .spin_container {
  text-align: center;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  margin-bottom: 20px;
  padding: 30px 50px;
  margin: 20px 0;
} */
</style>
