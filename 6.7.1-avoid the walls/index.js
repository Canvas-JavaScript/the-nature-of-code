import { Pvector, generateGaussianRandom, generateRandomInteger } from "./helper.js"

const body=document.getElementsByTagName("body")[0]
const canvas=document.createElement("canvas")
const c=canvas.getContext("2d")
body.appendChild(canvas)
canvas.width=innerWidth
canvas.height=innerHeight


class Agent{
    constructor(x,y){
        this.location=new Pvector(x,y)
        this.velocity=new Pvector(generateRandomInteger(-40,40)/10,generateRandomInteger(-40,40)/10)
        this.acceleration=new Pvector(0,0)
        this.radius=15
        this.forcelimit=1.5
        this.velocitylimit=generateRandomInteger(2,5)
    }
    seek(location){
        let desiredvel=location.subvector(this.location)
        desiredvel.setmag(this.velocity.mag())
        let steeringforce=desiredvel.subvector(this.velocity)
        return steeringforce
    }
    applyallForces(location){
        let seekforce=this.seek(location)
        seekforce.mult(2)
        this.applyForce(seekforce)
    }
    applyForce(force){
        force.limit(this.forcelimit)
        this.acceleration.add(force)
    }
    update(){
        this.velocity.add(this.acceleration)
        this.velocity.limit(this.velocitylimit)
        this.location.add(this.velocity)
        this.acceleration.setmag(0)
        this.boundary()
    }
    boundary(){
        if(this.location.x>=innerWidth){
            this.location.x=1
        }
        if(this.location.x<0){
            this.location.x=innerWidth-1
        }
        
        if(this.location.y>=innerHeight){
            this.location.y=1
        }
        if(this.location.y<0){
            this.location.y=innerHeight-1
        }
    }
    draw(c){
        let dir=this.velocity.copy()
        dir.setmag(this.radius*2)
        dir.add(this.location)
        c.beginPath()
        c.moveTo(this.location.x,this.location.y)
        c.lineTo(dir.x,dir.y)
        c.stroke()
        c.beginPath()
        c.arc(this.location.x,this.location.y,this.radius,0,Math.PI*2,false)
        c.stroke()
    }
}


let ag1=new Agent(generateRandomInteger(0,innerWidth),innerHeight/2)

let location=new Pvector(generateGaussianRandom(innerWidth/2,100)(),-10)

function animate(){
    c.clearRect(0,0,innerWidth,innerHeight)
    requestAnimationFrame(animate)
    ag1.applyallForces(location)
    ag1.update()
    ag1.draw(c)
}
animate()