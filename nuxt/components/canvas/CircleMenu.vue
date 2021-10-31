<template>
  <div style="width: 100%; height: 100%; padding: 20px 60px">
    <canvas id="circle-menu" style="width: 100%; height: 100%"></canvas>
  </div>
</template>

<script>
import { defineComponent, onMounted } from '@vue/composition-api'
import { CircleMenuCanvas } from '~/components/canvas/utils'
export default defineComponent({
  setup() {
    const mounted = () => {
      const canvas = document.getElementById('circle-menu')

      const circleMenuCanvas = new CircleMenuCanvas(canvas)
      circleMenuCanvas.draw(circleMenuCanvas.canvas)

      circleMenuCanvas.makeCanvasResponsive(() => {
        circleMenuCanvas.draw(circleMenuCanvas.canvas)
      })

      circleMenuCanvas.animate(() => {
        circleMenuCanvas.draw(circleMenuCanvas.canvas)
      })

      canvas.addEventListener(
        'click',
        circleMenuCanvas.getClickedSectorIndex.bind(circleMenuCanvas)
      )
    }
    onMounted(mounted)

    return {}
  },
})
</script>


<style>
</style>