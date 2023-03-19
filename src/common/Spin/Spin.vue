<template>
  <slot></slot>
  <div v-if="spinning" class="loader_wrap" :style="style">
    <div class="loader">
      <svg
        class="car"
        width="102"
        height="40"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g
          transform="translate(2 1)"
          stroke="#01afde"
          fill="none"
          fill-rule="evenodd"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path
            class="car__body"
            d="M47.293 2.375C52.927.792 54.017.805 54.017.805c2.613-.445 6.838-.337 9.42.237l8.381 1.863c2.59.576 6.164 2.606 7.98 4.531l6.348 6.732 6.245 1.877c3.098.508 5.609 3.431 5.609 6.507v4.206c0 .29-2.536 4.189-5.687 4.189H36.808c-2.655 0-4.34-2.1-3.688-4.67 0 0 3.71-19.944 14.173-23.902zM36.5 15.5h54.01"
            stroke-width="3"
          />
          <ellipse
            class="car__wheel--left"
            stroke-width="3.2"
            fill="#FFF"
            cx="83.493"
            cy="30.25"
            rx="6.922"
            ry="6.808"
          />
          <ellipse
            class="car__wheel--right"
            stroke-width="3.2"
            fill="#FFF"
            cx="46.511"
            cy="30.25"
            rx="6.922"
            ry="6.808"
          />
          <path
            class="car__line car__line--top"
            d="M22.5 16.5H2.475"
            stroke-width="3"
          />
          <path
            class="car__line car__line--middle"
            d="M20.5 23.5H.4755"
            stroke-width="3"
          />
          <path
            class="car__line car__line--bottom"
            d="M25.5 9.5h-19"
            stroke-width="3"
          />
        </g>
      </svg>
      <div class="tip mt15">
        <span class="ft_blueL ml30">{{ tip }}</span>
      </div>
      <div class="dots-container mt10 ml30">
        <div class="pulse-dot pulse-dot-1"></div>
        <div class="pulse-dot pulse-dot-2"></div>
        <div class="pulse-dot pulse-dot-3"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Spin',
  props: {
    spinning: {
      type: Boolean,
      required: true,
    },
    tip: {
      type: String,
      required: false,
      default: () => 'Loading data',
    },
    style: {
      type: Object,
      required: false,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.loader_wrap {
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  position: absolute;
  z-index: 94;
  background-color: rgba(255, 255, 255, 0.7);
}

.loader {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.car {
  &__body {
    animation: shake 0.2s ease-in-out infinite alternate;
  }

  &__line {
    transform-origin: center right;
    stroke-dasharray: 22;
    animation: line 0.8s ease-in-out infinite;
    animation-fill-mode: both;

    &--top {
      animation-delay: 0s;
    }

    &--middle {
      animation-delay: 0.2s;
    }

    &--bottom {
      animation-delay: 0.4s;
    }
  }
}

@keyframes shake {
  0% {
    transform: translateY(-1%);
  }
  100% {
    transform: translateY(3%);
  }
}

@keyframes line {
  0% {
    stroke-dashoffset: 22;
  }

  25% {
    stroke-dashoffset: 22;
  }

  50% {
    stroke-dashoffset: 0;
  }

  51% {
    stroke-dashoffset: 0;
  }

  80% {
    stroke-dashoffset: -22;
  }

  100% {
    stroke-dashoffset: -22;
  }
}

.dots-container {
  width: 30px;
  display: flex;
  justify-content: space-between;
}

.pulse-dot {
  width: 5px;
  height: 5px;
  border-radius: 25px;
  background-color: #01afde;
}

.pulse-dot-1 {
  opacity: 0.5;
  animation: pulse 1.5s ease infinite;
}

.pulse-dot-2 {
  animation: pulse 1.5s ease infinite;
  animation-delay: 0.5s;
}

.pulse-dot-3 {
  animation: pulse 1.5s ease infinite;
  animation-delay: 1s;
}

@keyframes pulse {
  0% {
    opacity: 0.4;
    transform: scale(1, 1);
  }

  50% {
    opacity: 1;
    transform: scale(1.2, 1.2);
  }

  100% {
    opacity: 0.4;
    transform: scale(1, 1);
  }
}

.tip > span {
  color: #01afde;
  font-size: 16px;
  font-weight: 400;
}
</style>
