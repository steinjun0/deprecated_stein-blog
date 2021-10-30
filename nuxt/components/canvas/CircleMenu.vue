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
    // let ctx

    // const getCanvas = (canvas) => {

    //   const ctx = canvas.getContext('2d')
    //   const responseCanvasSize = (canvas, canvasWidthRef, canvasHeightRef) => {
    //     const rect = canvas.getBoundingClientRect()
    //     canvasWidthRef.value = rect.width
    //     canvasHeightRef.value = rect.height
    //     canvas.width = canvasWidthRef.value
    //     canvas.height = canvasHeightRef.value
    //   }

    //   responseCanvasSize(canvas, canvasWidth, canvasHeight)

    //   window.addEventListener('resize', () => {
    //     responseCanvasSize(canvas, canvasWidth, canvasHeight)
    //     drawCanvas(canvas.getContext('2d'))
    //   })
    //   return {canvas, ctx}
    // }
    // const drawCanvas = (ctx) => {
    //   ctx.beginPath()
    //   ctx.arc(canvasWidth.value/2, canvasHeight.value/2, canvasWidth.value/2 - 2, 0, Math.PI * 2, true) // Outer circle
    //   ctx.fillStyle = '#c4c4c4'
    //   ctx.fill()
    //   ctx.stroke()
    // }
    const mounted = () => {
      const canvas = document.getElementById('circle-menu')
      // const tempCanvas = getCanvas(canvas)
      // ctx = tempCanvas.ctx

      // drawCanvas(ctx)
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