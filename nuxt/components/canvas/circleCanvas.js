
import VueCanvas, { drawSector, angleConst } from './utils'
export class CircleMenuCanvas extends VueCanvas {
    constructor(canvas) {
        super(canvas)
        this.presentPositionAngle = 0
        this.sectorPaths = ''
        this.sectorPart = ['', '', '', '']
    }

    positiveSin(theta) {
        return Math.sin(theta) > 0 ? Math.sin(theta) : 0
    }

    changeColor(theta, index) {
        if (angleConst[(0 + index) % 4] <= theta && theta < angleConst[(1 + index) % 4 === 0 ? 4 : (1 + index) % 4]) {
            // console.log('case 0')
            return 0
        }
        else if (angleConst[(1 + index) % 4] <= theta && theta < angleConst[(2 + index) % 4 === 0 ? 4 : (2 + index) % 4]) {
            // console.log('case 1')
            // sin up
            return Math.sin(theta - angleConst[1 + index])
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

    draw(canvas, fillStyle = '#c4c4c4') {
        const ctx = canvas.getContext('2d')
        // drawCircle(canvas, canvas.width / 2, canvas.height / 2, canvas.width / 2 - 2, 0, Math.PI * 2, fillStyle = '#ffffff')
        this.presentSectorPath = drawSector(canvas, canvas.width / 2, canvas.height / 2, canvas.width / 2 - 2, -Math.PI / 4 + this.presentPositionAngle, Math.PI / 4 + this.presentPositionAngle, '#222222')

        this.sectorPart[0] = drawSector(canvas, canvas.width / 2, canvas.height / 2, canvas.width / 2 - 2, -Math.PI / 4 + 0, Math.PI / 4 + 0, '#00000000', '#00000000')
        this.sectorPart[1] = drawSector(canvas, canvas.width / 2, canvas.height / 2, canvas.width / 2 - 2, -Math.PI / 4 + Math.PI / 2, Math.PI / 4 + Math.PI / 2, '#00000000', '#00000000')
        this.sectorPart[2] = drawSector(canvas, canvas.width / 2, canvas.height / 2, canvas.width / 2 - 2, -Math.PI / 4 + Math.PI, Math.PI / 4 + Math.PI, '#00000000', '#00000000')
        this.sectorPart[3] = drawSector(canvas, canvas.width / 2, canvas.height / 2, canvas.width / 2 - 2, -Math.PI / 4 + Math.PI * 3 / 2, Math.PI / 4 + Math.PI * 3 / 2, '#00000000', '#00000000')



        // 4시
        ctx.save()
        ctx.beginPath();
        ctx.strokeStyle = `rgba(104,104,104,${this.changeColor(this.presentPositionAngle, 0)})`
        ctx.moveTo(canvas.width / 2 * (1 + 0.8 * Math.cos(Math.PI / 4)) - 2, canvas.height / 2 + (canvas.width / 2) * 0.8 * Math.sin(Math.PI / 4) - 2)
        ctx.lineTo(canvas.width / 2 * (1 + Math.cos(Math.PI / 4)) - 2, canvas.height / 2 + (canvas.width / 2) * Math.sin(Math.PI / 4) - 2)
        ctx.stroke();
        ctx.restore()

        // 7시
        ctx.save()
        ctx.beginPath();
        // console.log('this.changeColor(this.presentPositionAngle, 1)', this.changeColor(this.presentPositionAngle, 1))
        ctx.strokeStyle = `rgba(104,104,104,${this.changeColor(this.presentPositionAngle, 1)})`
        ctx.moveTo(canvas.width / 2 * (1 + 0.8 * Math.cos(Math.PI * 3 / 4)) + 4, canvas.height / 2 + (canvas.width / 2) * 0.8 * Math.sin(Math.PI * 3 / 4) - 2)
        ctx.lineTo(canvas.width / 2 * (1 + Math.cos(Math.PI * 3 / 4)) + 4, canvas.height / 2 + (canvas.width / 2) * Math.sin(Math.PI * 3 / 4) - 2)
        ctx.stroke();
        ctx.restore()

        // 10시
        ctx.save()
        ctx.beginPath();
        ctx.strokeStyle = `rgba(104,104,104,${this.changeColor(this.presentPositionAngle, 2)})`
        ctx.moveTo(canvas.width / 2 * (1 + 0.8 * Math.cos(Math.PI * 5 / 4)) - 1, canvas.height / 2 + (canvas.width / 2) * 0.8 * Math.sin(Math.PI * 5 / 4) + 2)
        ctx.lineTo(canvas.width / 2 * (1 + Math.cos(Math.PI * 5 / 4)) - 1, canvas.height / 2 + (canvas.width / 2) * Math.sin(Math.PI * 5 / 4) + 2)
        ctx.stroke();
        ctx.restore()

        // 1시
        ctx.save()
        ctx.beginPath();
        ctx.strokeStyle = `rgba(104,104,104,${this.changeColor(this.presentPositionAngle, 3)})`
        ctx.moveTo(canvas.width / 2 * (1 + 0.8 * Math.cos(-Math.PI / 4)) - 1, canvas.height / 2 + (canvas.width / 2) * 0.8 * Math.sin(-Math.PI / 4) + 1)
        ctx.lineTo(canvas.width / 2 * (1 + Math.cos(-Math.PI / 4)) - 1, canvas.height / 2 + (canvas.width / 2) * Math.sin(-Math.PI / 4) + 1)
        ctx.stroke();
        ctx.restore()


        ctx.save()
        ctx.font = '24px Noto Sans KR'
        ctx.fillStyle = 'gray'
        ctx.textAlign = 'center'
        ctx.fillText('Programming', canvas.width * 3 / 4 + 20, canvas.height / 2 + 9)
        ctx.fillText('Music', canvas.width / 4 - 20, canvas.height / 2 + 9)
        ctx.fillText('Photos', canvas.width / 2, canvas.height * 3 / 4 + 20)
        ctx.fillText('About Me', canvas.width / 2, canvas.height / 4 + 12 - 20)
        ctx.restore()


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
