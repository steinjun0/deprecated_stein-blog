<template>
  <div style="width: 467px; height: 100%">
    <canvas id="circle-menu" style="width: 100%; height: 100%"></canvas>
  </div>
</template>

<script>
import { defineComponent, onMounted } from '@vue/composition-api'
import CircleMenuCanvas from '@/components/canvas/circleCanvas.js'
export default defineComponent({
  setup(props, { emit }) {
    const mounted = () => {
      const canvas = document.getElementById('circle-menu')

      const circleMenuCanvas = new CircleMenuCanvas(canvas)
      circleMenuCanvas.draw(circleMenuCanvas.canvas)

      // circleMenuCanvas.makeCanvasResponsive(() => {
      //   circleMenuCanvas.draw(circleMenuCanvas.canvas)
      // })

      circleMenuCanvas.animate(() => {
        circleMenuCanvas.draw(circleMenuCanvas.canvas)
        emit('canvas', circleMenuCanvas)
      })

      canvas.addEventListener(
        'click',
        circleMenuCanvas.clickSector.bind(circleMenuCanvas)
      )

      canvas.addEventListener(
        'mouseover',
        circleMenuCanvas.changeCurosr.bind(circleMenuCanvas)
      )

      canvas.addEventListener(
        'mouseout',
        circleMenuCanvas.changeCurosr.bind(circleMenuCanvas)
      )

      canvas.addEventListener(
        'mousemove',
        circleMenuCanvas.changeCurosr.bind(circleMenuCanvas)
      )
    }
    onMounted(mounted)

    return {}
  },
})
</script>


<style>
</style>