<template>
  <v-row justify="center" align="center">
    <v-col cols="12" style="margin-bottom: 50px">
      <span id="blog-title" style="font-weight: 500">stein.log</span>
    </v-col>
    <v-col
      cols="12"
      class="d-flex flex-row justify-space-between"
      style="height: 601px"
    >
      <div>
        <div
          ref="leftPostCardsWrapper"
          style="overflow-y: hidden; height: 601px"
        >
          <LeftPostCards
            id="LeftPostCards"
            :posts="posts"
            style="position: relative"
            :style="`bottom: ${
              circleCanvas.presentPositionAngle
                ? leftPostCardsBottom(circleCanvas.presentPositionAngle)
                : 635
            }px`"
          />
        </div>
        <div
          class="d-flex justify-center"
          style="cursor: pointer"
          @click="router.push('/post/list')"
        >
          포스트 더보기<v-icon>mdi-chevron-right</v-icon>
        </div>
      </div>

      <div
        class="d-flex d-md-none flex-column justify-center align-center"
        style="margin: 0 auto 0 12px"
      >
        <div class="d-flex flex-column">
          <div style="cursor: pointer" @click="changeCategoryPrevious">
            <v-icon size="36">mdi-chevron-up</v-icon>
          </div>
          <div style="height: 16px"></div>
          <div style="cursor: pointer" @click="changeCategoryNext">
            <v-icon size="36">mdi-chevron-down</v-icon>
          </div>
        </div>
      </div>

      <div
        class="d-none d-md-flex"
        style="border-left: 1px solid rgba(0, 0, 0, 0.12); margin: 0 60px"
      ></div>

      <div class="d-none d-md-flex">
        <CanvasCircleMenu @canvas="(value) => (circleCanvas = value)" />
      </div>
      <div
        class="d-none d-lg-flex"
        style="border-left: 1px solid rgba(0, 0, 0, 0.12); margin: 0 60px"
      ></div>
      <div class="d-none d-lg-flex flex-column" style="width: 500px">
        <!-- <v-img
          :lazy-src="require('@/assets/img/DapadaSample.png')"
          :src="require('@/assets/img/DapadaSample-min.gif')"
          style="border: 1px solid rgba(0, 0, 0, 0.12)"
        ></v-img> -->
        <div style="min-height: 601px">
          <video
            autoplay
            loop
            muted
            playsinline
            src="@/assets/img/ezgif-3-4ca33b8f62.mp4"
            style="height: 442px"
          ></video>
          <!-- <img
            :src="require('@/assets/img/DapadaSample.gif')"
            style="border: 1px solid rgba(0, 0, 0, 0.12)"
          /> -->
          <div class="d-flex flex-column" style="margin-top: 28px">
            <span class="font-weight-medium" style="font-size: 24px"
              >DAPADA Stock</span
            >
            <span style="font-size: 16px">From Data to Front End</span>
            <span style="font-size: 12px">2021.08 ~ 2021.10</span>
          </div>
          <!-- <div
          style="border-bottom: 1px solid rgba(0, 0, 0, 0.12); margin-top: 28px"
        ></div> -->
        </div>

        <div class="d-none d-lg-flex justify-center" style="width: 282px">
          작업물 더보기<v-icon>mdi-chevron-right</v-icon>
        </div>
      </div>
    </v-col>
  </v-row>
</template>
<script>
import { defineComponent, ref, onMounted } from '@vue/composition-api'
import LeftPostCards from './index/LeftPostCards.vue'
import { ViewSetAPI } from '@/API'
const PostAPI = new ViewSetAPI('blog/post')

export default defineComponent({
  components: {
    LeftPostCards,
  },
  setup(props, { root }) {
    const router = root._router
    const circleCanvas = ref({})
    const posts = ref([])
    const leftPostCards = ref()

    const leftPostCardsBottom = (presentPositionAngle) => {
      let ratio = Number(presentPositionAngle.toFixed(2)) / 1.57
      if (ratio > 3) {
        ratio = ratio - 3
      } else {
        ratio = ratio + 1
      }
      return 635 * ratio
    }

    const changeCategoryPrevious = () => {
      if (circleCanvas.value.index > 0) {
        circleCanvas.value.index -= 1
      } else {
        circleCanvas.value.index = 3
      }
      circleCanvas.value.changeSectoreWithDelay(circleCanvas.value.index)
    }

    const changeCategoryNext = () => {
      if (circleCanvas.value.index < 3) {
        circleCanvas.value.index += 1
      } else {
        circleCanvas.value.index = 0
      }
      circleCanvas.value.changeSectoreWithDelay(circleCanvas.value.index)
    }

    onMounted(async () => {
      const res = await PostAPI.getAxios(`get_main_page_list`)
      posts.value = [].concat(res.programming, res.music, res.camera)
    })

    return {
      circleCanvas,
      leftPostCardsBottom,
      router,
      posts,
      leftPostCards,
      changeCategoryPrevious,
      changeCategoryNext,
    }
  },
})
</script>

<style scoped>
@media (max-width: 960px) {
  #blog-title {
    font-size: 40px;
  }

  #LeftPostCards {
    width: 100%;
    min-width: 230px;
  }
}
@media (min-width: 960px) {
  #blog-title {
    font-size: 80px;
  }
  #LeftPostCards {
    max-width: 360px;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
