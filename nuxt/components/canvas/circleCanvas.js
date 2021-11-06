
import VueCanvas, { drawSector, angleConst } from './utils'
export class CircleMenuCanvas extends VueCanvas {
    constructor(canvas) {
        super(canvas)
        this.presentPositionAngle = 0
        this.index = 0
        this.sectorPaths = ''
        this.sectorPart = ['', '', '', '']
        this.sectorColors = [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]]
        this.defaultTextColors = [[55, 55, 55], [55, 55, 55], [55, 55, 55], [55, 55, 55]]
        this.sectorTextColors = [[255, 255, 255], [255, 255, 255], [255, 255, 255], [255, 255, 255]]
    }

    positiveSin(theta) {
        return Math.sin(theta) > 0 ? Math.sin(theta) : 0
    }

    getDividerColor(theta, index) {
        if (angleConst[(0 + index) % 4] <= theta && theta < angleConst[(1 + index) % 4 === 0 ? 4 : (1 + index) % 4]) {
            // console.log('case 0')
            return 0
        }
        else if (angleConst[(1 + index) % 4] <= theta && theta < angleConst[(2 + index) % 4 === 0 ? 4 : (2 + index) % 4]) {
            // console.log('case 1')
            // sin up
            return Math.sin(theta - angleConst[1 + index % 4])
        }
        else if (angleConst[(2 + index) % 4] <= theta && theta < angleConst[(3 + index) % 4 === 0 ? 4 : (3 + index) % 4]) {
            // console.log('case 2')
            return 1
        }
        else if (angleConst[(3 + index) % 4] <= theta && theta < angleConst[(4 + index) % 4 === 0 ? 4 : (4 + index) % 4]) {
            // console.log('case 3')
            // sin down
            return Math.sin(theta - angleConst[(3 + index) % 4] + angleConst[1])
        }
    }

    getChangingColor(theta, defaultColor, objectiveColor, index) {
        let ratio = 0
        if (angleConst[(0 + index) % 4] <= theta && theta < angleConst[(1 + index) % 4 === 0 ? 4 : (1 + index) % 4]) {
            // console.log('case 0')
            // sin down
            ratio = Math.abs(Math.sin(theta + angleConst[(1 + index) % 4]))

        }
        else if (angleConst[(1 + index) % 4] <= theta && theta < angleConst[(2 + index) % 4 === 0 ? 4 : (2 + index) % 4]) {
            // console.log('case 1')
            ratio = 0
        }
        else if (angleConst[(2 + index) % 4] <= theta && theta < angleConst[(3 + index) % 4 === 0 ? 4 : (3 + index) % 4]) {
            // console.log('case 2')
            ratio = 0
        }
        else if (angleConst[(3 + index) % 4] <= theta && theta < angleConst[(4 + index) % 4 === 0 ? 4 : (4 + index) % 4]) {
            // console.log('case 3')
            // sin up
            ratio = Math.abs(Math.sin(theta + angleConst[(1 + index) % 4]))
        }

        return `rgba(${defaultColor[0] * (1 - ratio) + objectiveColor[0] * ratio},${defaultColor[1] * (1 - ratio) + objectiveColor[1] * ratio},${defaultColor[2] * (1 - ratio) + objectiveColor[2] * ratio})`
    }

    draw(canvas, fillStyle = '#c4c4c4') {
        // drawCircle(canvas, canvas.width / 2, canvas.height / 2, canvas.width / 2 - 2, 0, Math.PI * 2, fillStyle = '#ffffff')
        this.index = Number((this.presentPositionAngle / angleConst[1]).toFixed(0))
        if (this.index >= 4) this.index = 0
        const lingrad = this.ctx.createLinearGradient(canvas.width / 2, canvas.height / 2, canvas.width / 2 + canvas.width / 2 * Math.cos(this.presentPositionAngle), canvas.height / 2 + canvas.width / 2 * (Math.sin(this.presentPositionAngle)))
        lingrad.addColorStop(0, this.getChangingColor(this.presentPositionAngle, [102, 102, 102], this.sectorColors[this.index], this.index))
        lingrad.addColorStop(0.5, 'rgba(0,0,0,1)')
        this.presentSectorPath = drawSector(canvas,
            canvas.width / 2,
            canvas.height / 2,
            canvas.width / 2 - 2,
            -Math.PI / 4 + this.presentPositionAngle, Math.PI / 4 + this.presentPositionAngle,
            lingrad)


        this.sectorPart[0] = drawSector(canvas, canvas.width / 2, canvas.height / 2, canvas.width / 2 - 2, -Math.PI / 4 + 0, Math.PI / 4 + 0, '#00000000', '#00000000')
        this.sectorPart[1] = drawSector(canvas, canvas.width / 2, canvas.height / 2, canvas.width / 2 - 2, -Math.PI / 4 + Math.PI / 2, Math.PI / 4 + Math.PI / 2, '#00000000', '#00000000')
        this.sectorPart[2] = drawSector(canvas, canvas.width / 2, canvas.height / 2, canvas.width / 2 - 2, -Math.PI / 4 + Math.PI, Math.PI / 4 + Math.PI, '#00000000', '#00000000')
        this.sectorPart[3] = drawSector(canvas, canvas.width / 2, canvas.height / 2, canvas.width / 2 - 2, -Math.PI / 4 + Math.PI * 3 / 2, Math.PI / 4 + Math.PI * 3 / 2, '#00000000', '#00000000')


        // 4시
        this.ctx.save()
        this.ctx.beginPath();
        this.ctx.strokeStyle = `rgba(104,104,104,${this.getDividerColor(this.presentPositionAngle, 0)})`
        this.ctx.moveTo(canvas.width / 2 * (1 + 0.8 * Math.cos(Math.PI / 4)) - 2, canvas.height / 2 + (canvas.width / 2) * 0.8 * Math.sin(Math.PI / 4) - 2)
        this.ctx.lineTo(canvas.width / 2 * (1 + Math.cos(Math.PI / 4)) - 2, canvas.height / 2 + (canvas.width / 2) * Math.sin(Math.PI / 4) - 2)
        this.ctx.stroke();
        this.ctx.restore()

        // 7시
        this.ctx.save()
        this.ctx.beginPath();
        // console.log('this.changeColor(this.presentPositionAngle, 1)', this.changeColor(this.presentPositionAngle, 1))
        this.ctx.strokeStyle = `rgba(104,104,104,${this.getDividerColor(this.presentPositionAngle, 1)})`
        this.ctx.moveTo(canvas.width / 2 * (1 + 0.8 * Math.cos(Math.PI * 3 / 4)) + 4, canvas.height / 2 + (canvas.width / 2) * 0.8 * Math.sin(Math.PI * 3 / 4) - 2)
        this.ctx.lineTo(canvas.width / 2 * (1 + Math.cos(Math.PI * 3 / 4)) + 4, canvas.height / 2 + (canvas.width / 2) * Math.sin(Math.PI * 3 / 4) - 2)
        this.ctx.stroke();
        this.ctx.restore()

        // 10시
        this.ctx.save()
        this.ctx.beginPath();
        this.ctx.strokeStyle = `rgba(104,104,104,${this.getDividerColor(this.presentPositionAngle, 2)})`
        this.ctx.moveTo(canvas.width / 2 * (1 + 0.8 * Math.cos(Math.PI * 5 / 4)) - 1, canvas.height / 2 + (canvas.width / 2) * 0.8 * Math.sin(Math.PI * 5 / 4) + 2)
        this.ctx.lineTo(canvas.width / 2 * (1 + Math.cos(Math.PI * 5 / 4)) - 1, canvas.height / 2 + (canvas.width / 2) * Math.sin(Math.PI * 5 / 4) + 2)
        this.ctx.stroke();
        this.ctx.restore()

        // 1시
        this.ctx.save()
        this.ctx.beginPath();
        this.ctx.strokeStyle = `rgba(104,104,104,${this.getDividerColor(this.presentPositionAngle, 3)})`
        this.ctx.moveTo(canvas.width / 2 * (1 + 0.8 * Math.cos(-Math.PI / 4)) - 1, canvas.height / 2 + (canvas.width / 2) * 0.8 * Math.sin(-Math.PI / 4) + 1)
        this.ctx.lineTo(canvas.width / 2 * (1 + Math.cos(-Math.PI / 4)) - 1, canvas.height / 2 + (canvas.width / 2) * Math.sin(-Math.PI / 4) + 1)
        this.ctx.stroke();
        this.ctx.restore()

        this.ctx.font = '24px Noto Sans KR'
        // ctx.fillStyle = 'gray'
        this.ctx.textAlign = 'center'
        this.ctx.save()
        this.ctx.fillStyle = this.getChangingColor(this.presentPositionAngle, this.defaultTextColors[0], this.sectorTextColors[0], 0)
        this.ctx.fillText('Programming', canvas.width * 3 / 4 + 20, canvas.height / 2 + 9)
        this.ctx.restore()
        this.ctx.save()
        this.ctx.fillStyle = this.getChangingColor(this.presentPositionAngle, this.defaultTextColors[1], this.sectorTextColors[1], 1)
        this.ctx.fillText('Camera', canvas.width / 2, canvas.height * 3 / 4 + 20)
        this.ctx.restore()
        this.ctx.save()
        this.ctx.fillStyle = this.getChangingColor(this.presentPositionAngle, this.defaultTextColors[2], this.sectorTextColors[2], 2)
        this.ctx.fillText('Music', canvas.width / 4 - 20, canvas.height / 2 + 9)
        this.ctx.restore()
        this.ctx.save()
        this.ctx.fillStyle = this.getChangingColor(this.presentPositionAngle, this.defaultTextColors[3], this.sectorTextColors[3], 3)
        this.ctx.fillText('About Me', canvas.width / 2, canvas.height / 4 + 12 - 20)
        this.ctx.restore()
    }

    getClickedSectorIndex(event) {
        const x = event.offsetX;
        const y = event.offsetY;
        this.sectorPart.forEach((path, index) => {
            const isMoving = (Number(this.presentPositionAngle.toFixed(2)) % (angleConst[1]) < 0.01 || angleConst[1] - Number(this.presentPositionAngle.toFixed(2)) % (angleConst[1]) < 0.01)
            if (this.ctx.isPointInPath(path, x, y) && isMoving) {
                function follow(object, index) {

                    // index가 0이고, 현재각은 0이 아닐떄 -> 0도(2*PI가 안되도록)
                    const objectiveAngle = (index === 0 && object.presentPositionAngle !== 0) ? angleConst[0] : index * angleConst[1]

                    if (object.presentPositionAngle.toFixed(2) >= angleConst[4] || object.presentPositionAngle.toFixed(2) < angleConst[0]) {
                        object.presentPositionAngle = 0
                    }

                    if (Number(object.presentPositionAngle.toFixed(2)) !== objectiveAngle) {
                        if (Number(object.presentPositionAngle.toFixed(2)) === 0 && objectiveAngle > angleConst[2]) {
                            object.presentPositionAngle = angleConst[4]
                        }
                        object.presentPositionAngle += Math.sin(Number(objectiveAngle - object.presentPositionAngle)) * 0.1
                        // object.presentPositionAngle = Number((object.presentPositionAngle + 0.01).toFixed(2))
                        setTimeout(() => { follow(object, index) }, 1)
                    }
                }
                follow(this, index)

            }
        })
    }

}
