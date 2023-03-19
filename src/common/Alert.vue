<template>
  <transition name="fade">
    <!-- warning 타입 추가
    - bt_yellow
    - icon_warning ft_yellow
    - btn_yellow2 -->
    <div class="alert" :class="type === 'error' ? 'bt_red' : 'bt_blue'">
      <div class="inner tc">
        <p class="alert_title icon2" :class="
          type === 'error' ? 'icon_error ft_red3' : 'icon_success ft_blueL'
        ">
          {{ title }}
        </p>
        <!-- <div class="alert_msg"> -->
        <slot></slot>
        <!-- <span>고객센터 : +82-2-6675-0200</span> -->
        <!-- </div> -->
        <div class="btn_group tc">
          <button v-if="cancel" href="#!" class="btn btn_xxl mr10" :class="type === 'error' ? 'btn_red2' : 'btn_white'"
            type="button" @click="$emit('cancel')">
            취소
          </button>
          <button href="#!" class="btn btn_xxl" :class="type === 'error' ? 'btn_red' : 'btn_blue'" type="button"
            @click="$emit('close')">
            Ok
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Alert',

  emits: ['close', 'cancel'],
  props: {
    title: {
      type: String,
      required: true,
    },
    cancel: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: false,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style scoped>
</style>
