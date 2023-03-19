<template>
  <Button @click="onClick">
    {{ buttonName }}
  </Button>
</template>

<script lang="ts">
import Button from 'ant-design-vue/es/button';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AntdButton',
  emits: ['click'],
  components: {
    Button,
  },
  props: {
    buttonName: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const onClick = () => {
      emit('click');
    };
    return {
      onClick,
    };
  },
});
</script>

<style scoped></style>
