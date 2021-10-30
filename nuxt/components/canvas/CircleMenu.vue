<template>
  <div style="width: 100%; height: 100%; padding: 20px 60px">
    <canvas id="circle-menu" style="width: 100%; height: 100%"></canvas>
  </div>
</template>

<script>
import { defineComponent, onMounted } from '@vue/composition-api'
import VueCanvas, { drawCircleMenu } from '~/components/canvas/utils'
export default defineComponent({
  setup() {
    const mounted = () => {
      const canvas = document.getElementById('circle-menu')
      const vueCanvas = new VueCanvas(canvas)
      drawCircleMenu(vueCanvas.canvas)

      vueCanvas.makeCanvasResponsive(() => {
        drawCircleMenu(vueCanvas.canvas)
      })
    }
    onMounted(mounted)

    return {}
  },
})
</script>


<style>
</style>