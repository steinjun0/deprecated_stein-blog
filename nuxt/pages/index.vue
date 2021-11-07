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
    <v-col
      cols="12"
      class="d-flex flex-row justify-space-between"
      style="height: 601px"
    >
      <div style="overflow-y: hidden">
        <LeftPostCards
          style="position: relative"
          :style="`bottom: ${
            circleCanvas.presentPositionAngle
              ? leftPostCardsBottom(circleCanvas.presentPositionAngle)
              : 635
          }px`"
        />
      </div>
      <div style="border-left: 1px solid #c4c4c4; margin: 0 60px"></div>
      <div>
        <CanvasCircleMenu @canvas="(value) => (circleCanvas = value)" />
      </div>
      <div style="border-left: 1px solid #c4c4c4; margin: 0 60px"></div>
      <div class="d-flex flex-column">
        <v-img
          :src="require('@/assets/img/DapadaSample.gif')"
          style="border: 1px solid #c4c4c4"
        ></v-img>
        <div class="d-flex flex-column" style="margin-top: 28px">
          <span class="font-weight-medium" style="font-size: 24px"
            >DAPADA Stock</span
          >
          <span style="font-size: 16px">From Data to Front End</span>
          <span style="font-size: 12px">2021.08 ~ 2021.10</span>
        </div>
        <div style="border-bottom: 1px solid #c4c4c4; margin-top: 28px"></div>
      </div>
    </v-col>
    <v-col
      class="d-flex flex-row justify-space-between"
      style="margin-top: 20px"
    >
      <div class="d-flex justify-center" style="width: 282px">
        포스트 더보기<v-icon>mdi-chevron-right</v-icon>
      </div>
      <div class="d-flex justify-center" style="width: 282px">
        작업물 더보기<v-icon>mdi-chevron-right</v-icon>
      </div>
    </v-col>
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
    const circleCanvas = ref({})
    const leftPostCardsBottom = (presentPositionAngle) => {
      let ratio = Number(presentPositionAngle.toFixed(2)) / 1.57
      if (ratio > 3) {
        ratio = ratio - 3
      } else {
        ratio = ratio + 1
      }
      return 635 * ratio
    }

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

    return { show, switchShow, circleCanvas, leftPostCardsBottom }
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
