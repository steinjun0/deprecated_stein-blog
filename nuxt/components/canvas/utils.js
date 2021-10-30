
export default class VueCanvas {
    constructor(canvas, ...args) {
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')
        this.responseCanvasSize()
    }

    responseCanvasSize() {
        const rect = this.canvas.getBoundingClientRect()
        this.canvas.width = rect.width
        this.canvas.height = rect.height
    }

    makeCanvasResponsive(drawCanvas) {
        window.addEventListener('resize', () => {
            this.responseCanvasSize()
            drawCanvas()
        })
    }
}

export function drawCircle(canvas, x, y, radius, startAngle, finishAngle, fillStyle = '#c4c4c4') {
    const ctx = canvas.getContext('2d')
    ctx.save()
    ctx.beginPath()
    ctx.arc(x, y, radius, startAngle, finishAngle, true) // Outer circle
    ctx.fillStyle = fillStyle
    ctx.fill()
    ctx.stroke()
    ctx.restore()
}

export function drawCircleMenu(canvas, fillStyle = '#c4c4c4') {
    const ctx = canvas.getContext('2d')
    ctx.save()
    ctx.beginPath()
    ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2 - 2, 0, Math.PI * 2, true) // Outer circle
    ctx.fillStyle = fillStyle
    ctx.fill()
    ctx.stroke()
    ctx.restore()
}