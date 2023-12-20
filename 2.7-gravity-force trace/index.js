import {Pvector, generateRandomInteger, getRandomColor,Queue} from './helper.js'
const body=document.getElementsByTagName("body")[0]
const canvas=document.createElement("canvas")
body.appendChild(canvas)
canvas.width=innerWidth
canvas.height=innerHeight
let c=canvas.getContext("2d")


class Planet{
constructor(){
    this.const=7
    this.velconst=3
    this.radius=generateRandomInteger(10,20)
    this.mass=this.radius*10
    this.color=getRandomColor()
    this.location=new Pvector(generateRandomInteger(this.const*this.radius,innerWidth-this.const*this.radius),generateRandomInteger(this.const*this.radius,innerHeight-this.const*this.radius))
    this.velocity=new Pvector(generateRandomInteger(-1*this.velconst,this.velconst),generateRandomInteger(-1*this.velconst,this.velconst))
    this.acceleration=new Pvector(0,0)
    this.velocitylimit=11;
    this.prevlocations=new Queue()
    this.prevlocationsSize=20
}
applyForce(force){
let forcecopy=force.copy()
forcecopy.div(this.mass)
this.acceleration.add(forcecopy)
}
update(){
this.velocity.add(this.acceleration)
this.velocity.limit(this.velocitylimit)
this.location.add(this.velocity)
this.acceleration.setmag(0)
if(this.prevlocations.size()<this.prevlocationsSize){
this.prevlocations.enqueue(this.location.copy())   
}
else{
this.prevlocations.dequeue()
this.prevlocations.enqueue(this.location.copy())
}
}
draw(c){
    c.beginPath()
    c.arc(this.location.x,this.location.y,this.radius,0,Math.PI*2,false)
    c.fillStyle=this.color
    c.strokeStyle=this.color
    c.fill()
    c.stroke()
    
}
changeAlpha(rgbaColor, newAlpha) { 
    const match = rgbaColor.match(/(\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)/);
    if (!match) {
      return "Invalid RGBA color format";
    }
    const red = parseInt(match[1], 10);
    const green = parseInt(match[2], 10);
    const blue = parseInt(match[3], 10);
    const clampedAlpha = Math.max(0, Math.min(1, newAlpha));
    const newColor = `rgba(${red}, ${green}, ${blue}, ${clampedAlpha})`;
    return newColor;
}
trace(c){
    let stepsize=1/this.prevlocations.size();
    let alpha=0;
    let stepcolors=this.changeAlpha(this.color, alpha)
    for(let i=0;i<this.prevlocations.size();i++){
        c.beginPath()
        let temp=this.prevlocations.accessElement(i);
        c.arc(temp.x,temp.y,this.radius,0,Math.PI*2,false)

        c.fillStyle=stepcolors
        c.strokeStyle=stepcolors
        alpha+=stepsize;
        stepcolors=this.changeAlpha(this.color, alpha)
        c.fill()
        c.stroke()
    }
}
}

class Star{
    constructor(){
        this.radius=generateRandomInteger(50,60)
        this.mass=this.radius*300
        this.G=1
        this.color="rgba(0, 0, 0, 0.2)"
        this.location=new Pvector(innerWidth/2,innerHeight/2)
        this.velocity=new Pvector(0,0)
        this.acceleration=new Pvector(0,0)
    }
    attractForce(planet){
        let radius=this.location.subvector(planet.location)
        radius.constrain(200,250)
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

let star=new Star()
let planetarr=[]
let numofplanets=10
for(let i=0;i<numofplanets;i++){
planetarr.push(new Planet())
}

function animate(){
    c.clearRect(0,0,innerWidth,innerHeight)
    requestAnimationFrame(animate)
    for(let i=0;i<numofplanets;i++){
        let attractforce=star.attractForce(planetarr[i])
        planetarr[i].applyForce(attractforce)
    planetarr[i].update()
    
    star.draw(c)
    planetarr[i].draw(c)
    planetarr[i].trace(c)
    }
}
animate()