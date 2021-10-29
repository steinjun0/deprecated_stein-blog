<template>
  <v-row justify="center" align="center">
    <v-col>
      <!-- <v-btn @click="switchShow">{{ show }}</v-btn>
      <TransientCard :show="show">
        <span>안녕하세요</span>
      </TransientCard> -->
    </v-col>
    <v-col cols="12" style="margin-bottom: 50px">
      <span style="font-size: 144px">stein.log</span>
    </v-col>
    <v-col md="4" style="border-right: solid #c4c4c4 1px">
      <LeftPostCards />
    </v-col>
    <v-col md="5" style="height: 600px; border-right: solid #c4c4c4 1px">
      <CanvasCircleMenu />
    </v-col>
    <v-col md="3" style=""> visual content </v-col>
  </v-row>
</template>
<script>
import { defineComponent, ref, onMounted } from '@vue/composition-api'
import LeftPostCards from './index/LeftPostCards.vue'
export default defineComponent({
  components: {
    LeftPostCards,
  },
  setup() {
    const show = ref(false)
    const delayFunction = (func, input = 100) => {
      return () => {
        setTimeout(func, input)
      }
    }
    const switchShow = (input = undefined) => {
      if (typeof input !== 'boolean') {
        show.value = !show.value
      } else {
        show.value = input
      }
    }
    onMounted(() => {
      delayFunction(switchShow, 1000)
    })

    return { show, switchShow }
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
