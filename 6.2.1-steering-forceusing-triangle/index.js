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
        this.steeringforcelimit=1
        this.velocitylimit=2
    }
    applyForce(force,issteeringforce){
        if(issteeringforce){
            force.limit(this.steeringforcelimit)
            this.acceleration.add(force)

        }
        else{
            this.acceleration.add(force)
        }
    }
    update()
    {
        this.velocity.add(this.acceleration)
        this.velocity.limit(this.velocitylimit)
        this.location.add(this.velocity)
        this.acceleration.setmag(0)
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

let mousepos=new Pvector(0,0)
document.addEventListener("mousemove",(e)=>{
mousepos.x=e.clientX
mousepos.y=e.clientY
})



function animate(){
    c.clearRect(0,0,innerWidth,innerHeight)
    requestAnimationFrame(animate)
    let desiredvel=mousepos.subvector(ag1.location)
    let steeringforce=desiredvel.subvector(ag1.velocity)
    ag1.applyForce(steeringforce)
    ag1.update()
    ag1.draw(c)
}
animate()