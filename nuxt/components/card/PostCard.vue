<template>
  <transition name="fade">
    <v-card
      v-if="showLocal"
      width="160px"
      height="90px"
      style="padding: 16px"
      class="d-flex justify-center align-center"
    >
      <slot></slot>
    </v-card>
  </transition>
</template>
      
<script>
import { defineComponent, ref, onMounted } from '@vue/composition-api'
export default defineComponent({
  props: {
    show: {
      type: Boolean,
      default: true,
    },
  },
  setup() {
    const showLocal = ref(false)
    const delayFunction = (func, input = 100) => {
      return () => {
        setTimeout(func, input)
      }
    }
    const switchShow = (input = undefined) => {
      if (typeof input !== 'boolean') {
        showLocal.value = !showLocal.value
      } else {
        showLocal.value = input
      }
    }
    onMounted(delayFunction(switchShow, 1000))
    return { showLocal, switchShow }
  },
  watch: {
    show() {
      this.showLocal = this.show
    },
  },
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
