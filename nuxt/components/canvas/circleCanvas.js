
import VueCanvas, { drawSector, angleConst, drawCircle } from './utils'
export default class CircleMenuCanvas extends VueCanvas {
    constructor(canvas) {
        super(canvas)
        this.presentPositionAngle = 0
        this.index = 0
        this.sectorPaths = ''
        this.sectorPart = ['', '', '', '']
        this.sectorColors = [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]]
        this.defaultTextColors = [[55, 55, 55], [55, 55, 55], [55, 55, 55], [55, 55, 55]]
        this.sectorTextColors = [[255, 255, 255], [255, 255, 255], [255, 255, 255], [255, 255, 255]]
        this.abs = Math.abs
        this.sin = Math.sin
        this.cos = Math.cos
        this.round = Math.round
    }

    positiveSin(theta) {
        return this.sin(theta) > 0 ? this.sin(theta) : 0
    }

    getDividerColor(theta, index) {
        if (theta < 0) theta = 0
        if (angleConst[(0 + index) & 3] <= theta && theta < angleConst[((1 + index) & 3) === 0 ? 4 : (1 + index) & 3]) {
            // console.log('case 0')
            return 0
        }
        else if (angleConst[(1 + index) & 3] <= theta && theta < angleConst[((2 + index) & 3) === 0 ? 4 : (2 + index) & 3]) {
            // console.log('case 1')
            // sin up
            return this.sin(theta - angleConst[1 + index & 3])
        }
        else if (angleConst[(2 + index) & 3] <= theta && theta < angleConst[((3 + index) & 3) === 0 ? 4 : (3 + index) & 3]) {
            // console.log('case 2')
            return 1
        }
        else if (angleConst[(3 + index) & 3] <= theta && theta < angleConst[((4 + index) & 3) === 0 ? 4 : (4 + index) & 3]) {
            // console.log('case 3')
            // sin down
            return this.sin(theta - angleConst[(3 + index) & 3] + angleConst[1])
        }
    }

    getChangingColor(theta, defaultColor, objectiveColor, index) {
        let ratio = 0
        if (angleConst[(0 + index) & 3] <= theta && theta < angleConst[((1 + index) & 3) === 0 ? 4 : (1 + index) & 3]) {
            // console.log('case 0')
            // sin down
            ratio = this.abs(this.sin(theta + angleConst[(1 + index) & 3]).toFixed(3))
        }
        else if (angleConst[(1 + index) & 3] <= theta && theta < angleConst[((2 + index) & 3) === 0 ? 4 : (2 + index) & 3]) {
            // console.log('case 1')
            ratio = 0
        }
        else if (angleConst[(2 + index) & 3] <= theta && theta < angleConst[((3 + index) & 3) === 0 ? 4 : (3 + index) & 3]) {
            // console.log('case 2')
            ratio = 0
        }
        else if (angleConst[(3 + index) & 3] <= theta && theta < angleConst[((4 + index) & 3) === 0 ? 4 : (4 + index) & 3]) {
            // sin up
            // console.log('case 3')
            ratio = this.abs(this.sin(theta + angleConst[(1 + index) & 3]).toFixed(3))
        }
        // console.log('ratio', ratio)


        return `rgba(${defaultColor[0] * (1 - ratio) + objectiveColor[0] * ratio},${defaultColor[1] * (1 - ratio) + objectiveColor[1] * ratio},${defaultColor[2] * (1 - ratio) + objectiveColor[2] * ratio})`
    }

    draw(canvas, fillStyle = '#c4c4c4') {
        if (this.canvasWidth === 0 || this.canvasHeight === 0) {
            console.log(this.canvasWidth)
            return
        }
        drawCircle(canvas, this.canvasWidth / 2, this.canvasHeight / 2, this.canvasWidth / 2 - 2, 0, Math.PI * 2, '#fafafa', '#ffffff')
        this.index = Number((this.presentPositionAngle / angleConst[1]).toFixed(0))
        if (this.index >= 4) this.index = 0
        const lingrad = this.ctx.createLinearGradient(
            this.canvasWidth / 2,
            this.canvasHeight / 2,
            this.canvasWidth / 2 + this.canvasWidth / 2 * this.cos(this.presentPositionAngle),
            this.canvasHeight / 2 + this.canvasWidth / 2 * (this.sin(this.presentPositionAngle)))
        lingrad.addColorStop(0, this.getChangingColor(this.presentPositionAngle, [102, 102, 102], this.sectorColors[this.index], this.index))
        lingrad.addColorStop(0.5, 'rgba(0,0,0,1)')
        this.presentSectorPath = drawSector(canvas,
            this.canvasWidth / 2,
            this.canvasHeight / 2,
            this.canvasWidth / 2 - 2,
            -Math.PI / 4 + this.presentPositionAngle, Math.PI / 4 + this.presentPositionAngle,
            lingrad)


        this.sectorPart[0] = drawSector(canvas, this.canvasWidth / 2, this.canvasHeight / 2, this.canvasWidth / 2 - 2, -Math.PI / 4 + 0, Math.PI / 4 + 0, '#00000000', '#00000000')
        this.sectorPart[1] = drawSector(canvas, this.canvasWidth / 2, this.canvasHeight / 2, this.canvasWidth / 2 - 2, -Math.PI / 4 + Math.PI / 2, Math.PI / 4 + Math.PI / 2, '#00000000', '#00000000')
        this.sectorPart[2] = drawSector(canvas, this.canvasWidth / 2, this.canvasHeight / 2, this.canvasWidth / 2 - 2, -Math.PI / 4 + Math.PI, Math.PI / 4 + Math.PI, '#00000000', '#00000000')
        this.sectorPart[3] = drawSector(canvas, this.canvasWidth / 2, this.canvasHeight / 2, this.canvasWidth / 2 - 2, -Math.PI / 4 + Math.PI * 3 / 2, Math.PI / 4 + Math.PI * 3 / 2, '#00000000', '#00000000')


        // 4시
        this.ctx.save()
        this.ctx.beginPath();
        this.ctx.strokeStyle = `rgba(196,196,196,${this.getDividerColor(this.presentPositionAngle, 0)})`
        this.ctx.moveTo(this.canvasWidth / 2 * (1 + 0.8 * this.cos(Math.PI / 4)) - 2, this.canvasHeight / 2 + (this.canvasWidth / 2) * 0.8 * this.sin(Math.PI / 4) - 2)
        this.ctx.lineTo(this.canvasWidth / 2 * (1 + this.cos(Math.PI / 4)) - 2, this.canvasHeight / 2 + (this.canvasWidth / 2) * this.sin(Math.PI / 4) - 2)
        this.ctx.stroke();
        this.ctx.restore()

        // 7시
        this.ctx.save()
        this.ctx.beginPath();
        // console.log('this.changeColor(this.presentPositionAngle, 1)', this.changeColor(this.presentPositionAngle, 1))
        this.ctx.strokeStyle = `rgba(196,196,196,${this.getDividerColor(this.presentPositionAngle, 1)})`
        this.ctx.moveTo(this.canvasWidth / 2 * (1 + 0.8 * this.cos(Math.PI * 3 / 4)) + 4, this.canvasHeight / 2 + (this.canvasWidth / 2) * 0.8 * this.sin(Math.PI * 3 / 4) - 2)
        this.ctx.lineTo(this.canvasWidth / 2 * (1 + this.cos(Math.PI * 3 / 4)) + 4, this.canvasHeight / 2 + (this.canvasWidth / 2) * this.sin(Math.PI * 3 / 4) - 2)
        this.ctx.stroke();
        this.ctx.restore()

        // 10시
        this.ctx.save()
        this.ctx.beginPath();
        this.ctx.strokeStyle = `rgba(196,196,196,${this.getDividerColor(this.presentPositionAngle, 2)})`
        this.ctx.moveTo(this.canvasWidth / 2 * (1 + 0.8 * this.cos(Math.PI * 5 / 4)) - 1, this.canvasHeight / 2 + (this.canvasWidth / 2) * 0.8 * this.sin(Math.PI * 5 / 4) + 2)
        this.ctx.lineTo(this.canvasWidth / 2 * (1 + this.cos(Math.PI * 5 / 4)) - 1, this.canvasHeight / 2 + (this.canvasWidth / 2) * this.sin(Math.PI * 5 / 4) + 2)
        this.ctx.stroke();
        this.ctx.restore()

        // 1시
        this.ctx.save()
        this.ctx.beginPath();
        this.ctx.strokeStyle = `rgba(196,196,196,${this.getDividerColor(this.presentPositionAngle, 3)})`
        this.ctx.moveTo(this.canvasWidth / 2 * (1 + 0.8 * this.cos(-Math.PI / 4)) - 1, this.canvasHeight / 2 + (this.canvasWidth / 2) * 0.8 * this.sin(-Math.PI / 4) + 1)
        this.ctx.lineTo(this.canvasWidth / 2 * (1 + this.cos(-Math.PI / 4)) - 1, this.canvasHeight / 2 + (this.canvasWidth / 2) * this.sin(-Math.PI / 4) + 1)
        this.ctx.stroke();
        this.ctx.restore()

        this.ctx.font = '24px Noto Sans KR'
        // this.ctx.fillStyle = 'gray'
        this.ctx.textAlign = 'center'
        this.ctx.save()
        this.ctx.fillStyle = this.getChangingColor(this.presentPositionAngle, this.defaultTextColors[0], this.sectorTextColors[0], 0)
        this.ctx.fillText('Programming', this.canvasWidth * 3 / 4 + 20, this.canvasHeight / 2 + 9)
        this.ctx.restore()
        this.ctx.save()
        this.ctx.fillStyle = this.getChangingColor(this.presentPositionAngle, this.defaultTextColors[1], this.sectorTextColors[1], 1)
        this.ctx.fillText('Camera', this.canvasWidth / 2, this.canvasHeight * 3 / 4 + 20)
        this.ctx.restore()
        this.ctx.save()
        this.ctx.fillStyle = this.getChangingColor(this.presentPositionAngle, this.defaultTextColors[2], this.sectorTextColors[2], 2)
        this.ctx.fillText('Music', this.canvasWidth / 4 - 20, this.canvasHeight / 2 + 9)
        this.ctx.restore()
        this.ctx.save()
        this.ctx.fillStyle = this.getChangingColor(this.presentPositionAngle, this.defaultTextColors[3], this.sectorTextColors[3], 3)
        this.ctx.fillText('About Me', this.canvasWidth / 2, this.canvasHeight / 4 + 12 - 20)
        this.ctx.restore()
    }

    changeSectoreWithDelay(index) {
        // index가 0이고, 현재각은 0이 아닐떄 -> 0도(2*PI가 안되도록)
        const objectiveAngle = (index === 0 && this.presentPositionAngle !== 0) ? angleConst[0] : angleConst[index]

        if (this.presentPositionAngle.toFixed(3) >= angleConst[4] || this.presentPositionAngle.toFixed(3) < angleConst[0]) {
            this.presentPositionAngle = 0
        }

        if (this.presentPositionAngle.toFixed(3) !== objectiveAngle.toFixed(3)) {
            if (Number(this.presentPositionAngle.toFixed(3)) === 0 && objectiveAngle > angleConst[2]) {
                this.presentPositionAngle = angleConst[4]
            }
            if (this.abs(objectiveAngle - this.presentPositionAngle) < 0.01) {
                this.presentPositionAngle = objectiveAngle
            } else {
                let diff = this.sin(Number(objectiveAngle - this.presentPositionAngle)) * 0.1
                if (diff < 0.01 && diff > 0) {
                    diff = 0.01
                } else if (diff > -0.01 && diff < 0) {
                    diff = -0.01
                }
                this.presentPositionAngle += diff
                if (this.presentPositionAngle < angleConst[0] || this.presentPositionAngle > angleConst[4]) {
                    this.presentPositionAngle = 0
                }
            }
            // this.presentPositionAngle = Number((this.presentPositionAngle + 0.01).toFixed(2))
            setTimeout(() => { this.changeSectoreWithDelay(index) }, 1)
        }
    }

    clickSector(event) {
        const x = event.offsetX;
        const y = event.offsetY;

        this.sectorPart.forEach((path, index) => {
            const isStop = angleConst.includes(this.presentPositionAngle)
            if (!isStop) return
            if (this.ctx.isPointInPath(path, x, y)) {
                this.changeSectoreWithDelay(index)
            }
        })
    }

    changeCurosr(event) {
        const x = event.offsetX;
        const y = event.offsetY;
        this.sectorPart.forEach((path, index) => {
            if (this.ctx.isPointInPath(this.presentSectorPath, x, y)) {
                this.canvas.style.cursor = 'default'
                return
            }
            if (this.ctx.isPointInPath(path, x, y)) {
                this.canvas.style.cursor = 'pointer'
            }
        })
    }

}
