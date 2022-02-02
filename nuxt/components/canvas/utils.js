export const angleConst = [0, 1.57079, 3.14159, 4.71239, 6.28319]

export default class VueCanvas {
    constructor(canvas) {
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')
        this.responseCanvasSize()
        // this.canvasWidth = canvas.width
        // this.canvasHeight = canvas.height
        this.canvasWidth = '468'
        this.canvasHeight = '587'
    }

    responseCanvasSize() {
        // const rect = this.canvas.getBoundingClientRect()
        // this.canvas.width = rect.width
        // this.canvas.height = rect.height
        this.canvas.width = '468'
        this.canvas.height = '587'
    }

    makeCanvasResponsive(drawCanvas) {
        window.addEventListener('resize', () => {
            this.responseCanvasSize()
            drawCanvas()
            this.canvasWidth = this.canvas.width
            this.canvasHeight = this.canvas.height
        })
    }

    animate(drawCanvas) {
        // 이전 프레임을 지우기 위한 clearRect
        // canvas의 중심이 이동하기 때문에 넓은 범위로 삭제함
        // const ctx = canvas.getContext()
        this.canvas.getContext('2d').clearRect(
            -this.canvasWidth * 2,
            -this.canvasHeight * 2,
            this.canvasWidth * 4,
            this.canvasHeight * 4
        );

        // setTimeout(() => {
        //     window.requestAnimationFrame(this.animate.bind(this, drawCanvas, this.canvas)); // 재귀 함수 형태의 animation 함수
        // }, 1000 / 60)
        window.requestAnimationFrame(this.animate.bind(this, drawCanvas, this.canvas)); // 재귀 함수 형태의 animation 함수
        drawCanvas()
    }
}

export function drawCircle(canvas, x, y, radius, finishAngle, startAngle, fillStyle = '#c4c4c4', strokeStyle = '#c4c4c4') {
    const ctx = canvas.getContext('2d')
    ctx.save()
    ctx.fillStyle = fillStyle
    ctx.strokeStyle = strokeStyle
    const path = new Path2D();
    path.arc(x, y, radius, startAngle, finishAngle, true)
    ctx.fill(path)
    ctx.stroke(path)
    ctx.restore()
}

export function drawSector(canvas, x, y, radius, finishAngle, startAngle, fillStyle = '#c4c4c4', strokeStyle = '#c4c4c4') {
    const ctx = canvas.getContext('2d')
    const path = new Path2D()
    ctx.save()
    ctx.fillStyle = fillStyle
    ctx.strokeStyle = strokeStyle
    path.moveTo(x, y)
    path.arc(x, y, radius, startAngle, finishAngle, true)
    path.moveTo(x, y)
    ctx.fill(path)
    // ctx.stroke(path)
    ctx.restore()
    return path
}

// export function drawText(canvas, x, y, text, fillStyle = '#c4c4c4', strokeStyle = '#c4c4c4') {
//     const ctx = canvas.getContext('2d')
//     const path = new Path2D()
//     ctx.save()
//     ctx.fillStyle = fillStyle
//     ctx.strokeStyle = strokeStyle
//     path.moveTo(x, y)
//     path.arc(x, y, radius, startAngle, finishAngle, true)
//     path.moveTo(x, y)
//     ctx.fill(path)
//     ctx.stroke(path)
//     ctx.restore()
//     return path
// }
// export function addDelayed(ref, objective) {
//     console.log(ref)
//     console.log(objective)
//     if (ref < objective) {
//         ref = ref + 0.01
//         setTimeout(addDelayed(ref, objective), 100)
//     }
// }
