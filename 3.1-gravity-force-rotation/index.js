import {Pvector, generateRandomInteger, getRandomColor} from './helper.js'

const body=document.getElementsByTagName("body")[0]
const canvas=document.createElement("canvas")
body.appendChild(canvas)
canvas.width=innerWidth
canvas.height=innerHeight
const c=canvas.getContext("2d")

class Planet{
constructor(){
    this.velrand=3
    this.radius=generateRandomInteger(30,40)
    
    this.location=new Pvector(generateRandomInteger(this.radius,innerWidth-this.radius),generateRandomInteger(this.radius,innerHeight-this.radius))
    this.velocity=new Pvector(generateRandomInteger(-1*this.velrand,this.velrand),generateRandomInteger(-1*this.velrand,this.velrand))
    this.acceleration=new Pvector(0,0)
    this.color=getRandomColor()
    this.velocitylimit=10
    this.angle=60;
    this.length=generateRandomInteger(30,40)
    this.width=generateRandomInteger(30,40)
    this.mass=(this.length*this.width)/100
    this.angvel=generateRandomInteger(10,15)
}
applyForce(force){
    let forcecopy=force.copy()
    forcecopy.div(this.mass)
    this.acceleration.add(forcecopy)
}
update(){
    this.angle+=this.angvel
    this.velocity.add(this.acceleration)
    this.velocity.limit(this.velocitylimit)
    this.location.add(this.velocity)
    this.acceleration.setmag(0)
}

draw(c){
c.save()
c.fillStyle=this.color
c.beginPath()
c.translate(this.location.x,this.location.y)
c.rotate(this.angle*Math.PI/180)
c.fillRect(-1*this.length/2,-1*this.width/2,this.length,this.width)
c.fill()
c.restore()
}
}

class Star{
    constructor(){
        this.radius=generateRandomInteger(60,70)
        this.mass=this.radius*100
        this.location=new Pvector(innerWidth/2,innerHeight/2)
        this.velocity=new Pvector(0,0)
        this.acceleration=new Pvector(0,0)
        this.color=getRandomColor()
        this.G=1
    }
    attractForce(planet){
        let radius=this.location.subvector(planet.location)
        radius.constrain(150,250)
        let mag=radius.mag()
        radius.setmag(this.G*this.mass*planet.mass/(mag*mag))
        return radius
    }
    draw(c){
    c.beginPath()
    c.fillStyle=this.color
    c.strokeStyle=this.color
    c.arc(this.location.x,this.location.y,this.radius,0,Math.PI*2,false)
    c.stroke()
    c.fill()
    }
}

let star1=new Star()
let planet1=new Planet()
let numofplan=10
let planetarr=[]
for(let i=0;i<numofplan;i++){
    planetarr.push(new Planet())
}

function animate(){
    c.clearRect(0,0,innerWidth,innerHeight)
    requestAnimationFrame(animate)
    // let gravity=star1.attractForce(planet1)
    // planet1.applyForce(gravity)
    // planet1.update()
    // star1.draw(c)
    // planet1.draw(c)

    for(let i=0;i<planetarr.length;i++){
        let gravity=star1.attractForce(planetarr[i])
        planetarr[i].applyForce(gravity)
        planetarr[i].update()
        star1.draw(c)
        planetarr[i].draw(c)
    }
}
animate()