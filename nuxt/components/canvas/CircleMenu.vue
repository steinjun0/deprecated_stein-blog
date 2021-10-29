<template>
  <div style="width: 100%; height: 100%">
    <canvas id="circle-menu" style="width: 100%; height: 100%"></canvas>
    {{ windowWidth }}
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from '@vue/composition-api'
export default defineComponent({
  setup() {
    let ctx

    const getCanvasContext = () => {
      const canvas = document.getElementById('circle-menu')
      const ctx = canvas.getContext('2d')

      const { width, height } = canvas.getBoundingClientRect()
      canvas.width = width
      canvas.height = height
      return ctx
    }
    const drawCanvas = (ctx) => {
      ctx.beginPath()
      ctx.arc(75, 75, 200, 0, Math.PI * 2, true) // Outer circle
      ctx.fillStyle = '#c4c4c4'
      ctx.fill()
      ctx.stroke()
    }
    const windowWidth = ref(0)
    const mounted = () => {
      ctx = getCanvasContext()
      drawCanvas(ctx)
      window.addEventListener('resize', () => {
        windowWidth.value = window.innerWidth
      })
    }
    onMounted(mounted)

    return { windowWidth }
  },
})
</script>


<style>
</style>