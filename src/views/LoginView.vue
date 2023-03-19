<template>
  <Login />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Login from '@/components/Login/Login.vue';

export default defineComponent({
  name: 'LoginView',
  components: { Login },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
