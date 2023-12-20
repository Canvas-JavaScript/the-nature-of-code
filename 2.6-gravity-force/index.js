import {Pvector, generateRandomInteger, getRandomColor} from './helper.js'
const body=document.getElementsByTagName("body")[0]
const canvas=document.createElement("canvas")
body.appendChild(canvas)
canvas.width=innerWidth
canvas.height=innerHeight
let c=canvas.getContext("2d")


class Planet{
constructor(){
    this.radius=generateRandomInteger(10,20)
    this.mass=this.radius*10
    this.color=getRandomColor()
    this.location=new Pvector(generateRandomInteger(this.radius,innerWidth-this.radius),generateRandomInteger(this.radius,innerHeight-this.radius))
    this.velocity=new Pvector(generateRandomInteger(5,10),generateRandomInteger(5,10))
    this.acceleration=new Pvector(0,0)
    this.velocitylimit=1;
}
applyForce(force){
let forcecopy=force.copy()
forcecopy.div(this.mass)
this.acceleration.add(forcecopy)
}
update(){
this.velocity.add(this.acceleration)
this.location.add(this.velocity)
this.acceleration.setmag(0)
}
draw(c){
    c.beginPath()
    c.arc(this.location.x,this.location.y,this.radius,0,Math.PI*2,false)
    c.fillStyle=this.color
    c.strokeStyle=this.color
    c.fill()
    c.stroke()
}
}

class Star{
    constructor(){
        this.radius=generateRandomInteger(50,60)
        this.mass=this.radius*100
        this.G=1
        this.color=getRandomColor()
        this.location=new Pvector(innerWidth/2,innerHeight/2)
        this.velocity=new Pvector(0,0)
        this.acceleration=new Pvector(0,0)
    }
    attractForce(planet){
        let radius=this.location.subvector(planet.location)
        radius.limit(150)
        let radmag=radius.mag()
        radius.setmag(this.G*this.mass*planet.mass/(radmag*radmag))
        return radius;
    }
    draw(c){
        c.beginPath()
        c.arc(this.location.x,this.location.y,this.radius,0,Math.PI*2,false)
        c.fillStyle=this.color
        c.strokeStyle=this.color
        c.fill()
        c.stroke()
    }
}

let plan1=new Planet()
let star=new Star()
let planetarr=[]
let numofplanets=10
for(let i=0;i<numofplanets;i++){
planetarr.push(new Planet())
}

function animate(){
    c.clearRect(0,0,innerWidth,innerHeight)
    requestAnimationFrame(animate)
    // let attractforce=star.attractForce(plan1)
    // plan1.applyForce(attractforce)
    // console.log(attractforce.mag())
    // plan1.update()
    // star.draw(c)
    // plan1.draw(c)


    for(let i=0;i<numofplanets;i++){
        let attractforce=star.attractForce(planetarr[i])
        planetarr[i].applyForce(attractforce)
    planetarr[i].update()
    star.draw(c)
    planetarr[i].draw(c)
    }
}
animate()