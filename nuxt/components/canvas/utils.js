const angleConst = [0, 1.57, 3.14, 4.71, 6.28]
export default class VueCanvas {
    constructor(canvas) {
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

    animate(drawCanvas) {
        window.requestAnimationFrame(this.animate.bind(this, drawCanvas, this.canvas)); // 재귀 함수 형태의 animation 함수
        // 이전 프레임을 지우기 위한 clearRect
        // canvas의 중심이 이동하기 때문에 넓은 범위로 삭제함
        // const ctx = canvas.getContext()
        this.canvas.getContext('2d').clearRect(
            -this.canvas.width * 2,
            -this.canvas.height * 2,
            this.canvas.width * 4,
            this.canvas.height * 4
        );

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
    ctx.stroke(path)
    ctx.restore()
    return path
}

// export function addDelayed(ref, objective) {
//     console.log(ref)
//     console.log(objective)
//     if (ref < objective) {
//         ref = ref + 0.01
//         setTimeout(addDelayed(ref, objective), 100)
//     }
// }

export class CircleMenuCanvas extends VueCanvas {
    constructor(canvas) {
        super(canvas)
        this.presentPositionAngle = 0
        this.sectorPaths = ''
        this.sectorPart = ['', '', '', '']
    }


    draw(canvas, fillStyle = '#c4c4c4') {
        drawCircle(canvas, canvas.width / 2, canvas.height / 2, canvas.width / 2 - 2, 0, Math.PI * 2, fillStyle = '#ffffff')
        this.presentSectorPath = drawSector(canvas, canvas.width / 2, canvas.height / 2, canvas.width / 2 - 2, -Math.PI / 4 + this.presentPositionAngle, Math.PI / 4 + this.presentPositionAngle, '#222222')

        this.sectorPart[0] = drawSector(canvas, canvas.width / 2, canvas.height / 2, canvas.width / 2 - 2, -Math.PI / 4 + 0, Math.PI / 4 + 0, '#00000000', '#00000000')
        this.sectorPart[1] = drawSector(canvas, canvas.width / 2, canvas.height / 2, canvas.width / 2 - 2, -Math.PI / 4 + Math.PI / 2, Math.PI / 4 + Math.PI / 2, '#00000000', '#00000000')
        this.sectorPart[2] = drawSector(canvas, canvas.width / 2, canvas.height / 2, canvas.width / 2 - 2, -Math.PI / 4 + Math.PI, Math.PI / 4 + Math.PI, '#00000000', '#00000000')
        this.sectorPart[3] = drawSector(canvas, canvas.width / 2, canvas.height / 2, canvas.width / 2 - 2, -Math.PI / 4 + Math.PI * 3 / 2, Math.PI / 4 + Math.PI * 3 / 2, '#00000000', '#00000000')
    }

    getClickedSectorIndex(event) {
        const x = event.offsetX;
        const y = event.offsetY;
        this.sectorPart.forEach((path, index) => {
            if (this.ctx.isPointInPath(path, x, y) && (this.presentPositionAngle % (angleConst[1]) < 0.01 || angleConst[1] - this.presentPositionAngle % (angleConst[1]) < 0.01)) {
                function follow(object, index) {

                    // index가 0이고, 현재각은 0이 아닐떄 -> 
                    const objectiveAngle = (index === 0 && object.presentPositionAngle !== 0) ? angleConst[0] : index * angleConst[1]

                    if (object.presentPositionAngle.toFixed(2) >= angleConst[4] || object.presentPositionAngle.toFixed(2) < angleConst[0]) {
                        object.presentPositionAngle = 0
                    }

                    if (object.presentPositionAngle.toFixed(2) < objectiveAngle) {
                        object.presentPositionAngle += Math.sin(Number((objectiveAngle - object.presentPositionAngle))) * 0.1

                        // object.presentPositionAngle = Number((object.presentPositionAngle + 0.01).toFixed(2))
                        setTimeout(() => { follow(object, index) }, 1)
                    }
                    else if (object.presentPositionAngle.toFixed(2) > objectiveAngle) {
                        // object.presentPositionAngle = Number((object.presentPositionAngle - 0.01).toFixed(2))
                        object.presentPositionAngle += Math.sin(Number((objectiveAngle - object.presentPositionAngle))) * 0.1
                        setTimeout(() => { follow(object, index) }, 1)
                    }

                }
                follow(this, index)
                // while (this.presentPositionAngle < index * Math.PI / 2) {
                //     this.presentPositionAngle = (this.presentPositionAngle + 1)
                //     console.log('this.presentPositionIndex', this.presentPositionAngle)

                // }
                // this.presentPositionIndex = index
            }
        })
    }

}
