import {Pvector, generateGaussianRandom, generateRandomInteger, getRandomColor} from './helper.js'
const body=document.getElementsByTagName("body")[0]
const canvas=document.createElement("canvas")
body.appendChild(canvas)
canvas.width=innerWidth
canvas.height=innerHeight
const c=canvas.getContext("2d")
class Star{
    constructor(x,y){
        this.location=new Pvector(x,y)
        this.velocity=new Pvector(0,0)
        this.acceleration=new Pvector(0,0)
        this.radius=100
        this.mass=this.radius
        this.G=1
    }
    generateForce(planet){
        let force=this.location.subvector(planet.location)
        force.limit(50)
        let dist=force.mag()
        force.normalize()
        force.setmag(this.G*this.mass*planet.mass/(dist*dist))
        return force
    }
    draw(c){
        c.beginPath()
        c.arc(this.location.x,this.location.y,this.radius,0,Math.PI*2,false)
        c.fillStyle="grey"
        c.strokeStyle="black"
        c.stroke()
        c.fill()
    }
}
class Planet{
    constructor(){
        this.radius=generateRandomInteger(20,40)
        this.location=new Pvector(generateRandomInteger(this.radius,innerWidth-this.radius),generateRandomInteger(this.radius,innerHeight-this.radius))
        console.log(this.location)
        this.velocity=new Pvector(generateGaussianRandom(0.1,2)(),generateGaussianRandom(0.1,2)())
        this.acceleration=new Pvector(0,0)
        this.mass=this.radius/10
        this.color=getRandomColor()
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
        c.stroke()
        c.fill()
    }
}
// let plan1=new Planet()
let planarr=[]
let numofplanets=100
for(let i=0;i<numofplanets;i++){
    planarr.push(new Planet())
}

let star1=new Star(innerWidth/3,innerHeight/3)
let star2=new Star(2*innerWidth/3,innerHeight/3)
let star3=new Star(innerWidth/3,2*innerHeight/3)
let star4=new Star(2*innerWidth/3,2*innerHeight/3)
function animate(){
    canvas.height=innerHeight
    requestAnimationFrame(animate)

    star1.draw(c)
    star2.draw(c)
    star3.draw(c)
    star4.draw(c)
    for(let i=0;i<numofplanets;i++){
        planarr[i].applyForce(star1.generateForce(planarr[i]))
        planarr[i].applyForce(star2.generateForce(planarr[i]))
        planarr[i].applyForce(star3.generateForce(planarr[i]))
        planarr[i].applyForce(star4.generateForce(planarr[i]))
        planarr[i].update()
        planarr[i].draw(c)

    }
    // plan1.applyForce(star1.generateForce(plan1))
    // plan1.applyForce(star2.generateForce(plan1))

    // plan1.update()
    // plan1.draw(c)

}
animate()