
import VueCanvas, { drawCircle, drawSector, angleConst } from './utils'
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
