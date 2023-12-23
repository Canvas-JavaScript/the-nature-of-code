import {Pvector} from './helper.js'
const body=document.getElementsByTagName("body")[0]
const canvas=document.createElement("canvas")
body.appendChild(canvas)
const c=canvas.getContext("2d")
canvas.width=innerWidth
canvas.height=innerHeight

class Agent
{
    constructor(x,y)
    {
        this.location=new Pvector(x,y)
        this.velocity=new Pvector(0,0)
        this.acceleration=new Pvector(0,0)
        this.radius=10
    }
    update()
    {

    }
    draw(c)
    {
        this.dir=this.velocity.copy()
        this.dir.setmag(20)
        this.dir.add(this.location)
        c.beginPath()
        c.moveTo(this.location.x,this.location.y)
        c.lineTo(this.dir.x,this.dir.y)
        c.stroke()
        c.beginPath()
        c.arc(this.location.x,this.location.y,this.radius,0,Math.PI*2,false)
        c.stroke()
    }
}




let ag1=new Agent(innerWidth/2,innerHeight/2)

function animate(){
    c.clearRect(0,0,innerWidth,innerHeight)
    requestAnimationFrame(animate)
    ag1.update()
    ag1.draw(c)
}
animate()