<template>
  <div style="width: 100%; height: 100%">
    <canvas id="circle-menu" style="width: 100%; height: 100%"></canvas>
    {{  }}
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from '@vue/composition-api'
export default defineComponent({
  setup() {
    let ctx
    const canvasWidth = ref(0)
    const canvasHeight = ref(0)

    const getCanvas = () => {
      const canvas = document.getElementById('circle-menu')
      const ctx = canvas.getContext('2d')

      const rect = canvas.getBoundingClientRect()
      canvasWidth.value = rect.width
      canvasHeight.value = rect.height
      canvas.width = canvasWidth.value
      canvas.height = canvasHeight.value 

      window.addEventListener('resize', () => {
        const rect = canvas.getBoundingClientRect()
        canvasWidth.value = rect.width
        canvasHeight.value = rect.height
        canvas.width = canvasWidth.value
        canvas.height = canvasHeight.value 
        drawCanvas(canvas.getContext('2d'))
      })
      return {canvas, ctx}
    }
    const drawCanvas = (ctx) => {
      ctx.beginPath()
      ctx.arc(canvasWidth.value/2, canvasHeight.value/2, canvasWidth.value/2 - 2, 0, Math.PI * 2, true) // Outer circle
      ctx.fillStyle = '#c4c4c4'
      ctx.fill()
      ctx.stroke()
    }
    const mounted = () => {
      const tempCanvas = getCanvas()
      ctx = tempCanvas.ctx

      drawCanvas(ctx)
      
    }
    onMounted(mounted)

    return {  }
  },
})
</script>


<style>
</style>