import { Pvector,generateRandomInteger } from "./helper.js"

let canvas=document.getElementById("canvas")
let c=canvas.getContext("2d")
canvas.width=innerWidth
canvas.height=innerHeight
class Ball{
constructor(){
    this.radius=50
    this.location=new Pvector(generateRandomInteger(this.radius,innerWidth-this.radius),generateRandomInteger(this.radius,innerHeight-this.radius));
    this.velocity=new Pvector(1,0);
    this.acceleration=new Pvector(0,0);
}
applyForce(force){
    this.acceleration.add(force)
}
update(){
this.velocity.add(this.acceleration)
this.location.add(this.velocity)
this.acceleration.setmag(0)
if(this.location.y+this.radius>innerHeight || this.location.y-this.radius<0){
this.velocity.y*=-1
}
if(this.location.x+this.radius>innerWidth || this.location.x-this.radius<0){
    this.velocity.x*=-1
}
}

draw(c){
c.beginPath()
c.arc(this.location.x,this.location.y,this.radius,0,Math.PI*2,false);
c.stroke()
}
}

let b1=new Ball()
let gravity=new Pvector(0,0.2);
let wind=new Pvector(2,0);
function animate(){
    c.clearRect(0,0,innerWidth,innerHeight)
    requestAnimationFrame(animate)
    b1.applyForce(gravity)
    b1.update()
    b1.draw(c)
}
animate()