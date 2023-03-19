<template>
  <transition name="fade">
    <teleport to="body">
      <div v-if="visible" class="alert_dim" :class="loading ? 'alert_loading_dim' : ''">
        <div class="alert"
          :class="typeValue === 'error' ? 'bt_red' : typeValue === 'success' ? 'bt_blue' : 'bt_yellow'">
          <div class="inner tc">
            <p v-if="!loading" class="alert_title icon2"
              :class="typeValue === 'error' ? 'icon_error ft_red3' : typeValue === 'success' ? 'icon_success ft_blueL' : 'icon_warning ft_yellow'">
              {{ loading ? 'Saving...' : titleValue }}
            </p>

            <p v-else class="alert_title"
              :class="typeValue === 'error' ? 'ft_red3' : typeValue === 'success' ? 'ft_blueL' : 'ft_yellow'">
              Saving...
            </p>

            <template v-if="loading">
              <div class="alert_msg">
                <Spin :indicator="indicator" />
              </div>
            </template>
            <template v-else>
              <div class="alert_msg" v-html="contentValue" />
            </template>

            <template v-if="!loading">
              <div v-if="confirmValue" class="btn_group tc">
                <button class="btn btn_xxl mr10"
                  :class="typeValue === 'error' ? 'btn_red2' : typeValue === 'success' ? 'btn_white' : 'btn_yellow2'"
                  type="button" @click="destroy">
                  Cancel
                </button>
                <button class="btn btn_xxl"
                  :class="typeValue === 'error' ? 'btn_red' : typeValue === 'success' ? 'btn_blue' : 'btn_yellow'"
                  type="button" @click="okAction">
                  Ok
                </button>
              </div>
              <div v-else class="btn_group tc">
                <button class="btn btn_xxl"
                  :class="typeValue === 'error' ? 'btn_red' : typeValue === 'success' ? 'btn_blue' : 'btn_yellow'"
                  type="button" @click="onOk">
                  Ok
                </button>
              </div>
            </template>
          </div>
        </div>
      </div>
    </teleport>
  </transition>
</template>

<script lang="ts">
import { LoadingOutlined } from '@ant-design/icons-vue';
import Spin from 'ant-design-vue/es/spin';
import { defineComponent, h } from 'vue';

import { useConfirmAlert } from '@/composables/useConfirmAlert';

export default defineComponent({
  name: 'AlertConfirm',
  components: {
    Spin,
  },
  setup() {
    const {
      okAction,
      closeAction,
      destroy,
      visible,
      loading,
      titleValue,
      confirmValue,
      typeValue,
      contentValue,
    } = useConfirmAlert();
    const indicator = h(LoadingOutlined, {
      style: {
        fontSize: '60px',
        color: '#01afde',
        paddingTop: '20px',
      },
      spin: true,
    });

    const onOk = (): void => {
      if (closeAction.value) {
        closeAction.value();
        destroy();
      } else {
        destroy();
      }
    };

    return {
      indicator,
      okAction,
      closeAction,
      destroy,
      onOk,
      visible,
      loading,
      confirmValue,
      titleValue,
      typeValue,
      contentValue,
    };
  },
});
</script>

<style scoped>
</style>
