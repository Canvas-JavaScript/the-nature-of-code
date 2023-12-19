import {Pvector, generateRandomInteger, getRandomColor} from './helper.js'
const canvas=document.createElement("canvas")
const body=document.getElementsByTagName("body")[0]
canvas.width=innerWidth
canvas.height=innerHeight
body.appendChild(canvas)

const c=canvas.getContext("2d")

class Ball{
    constructor(){
        this.radius=generateRandomInteger(30,60);
        this.mass=this.radius/10;
        this.location=new Pvector(generateRandomInteger(this.radius,innerWidth-this.radius),100)
        this.velocity=new Pvector(0,0)
        this.acceleration=new Pvector(0,0)
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
        this.boundary()
        this.acceleration.setmag(0)
    }
    boundary(){
        if(this.location.x+this.radius>=innerWidth || this.location.x-this.radius<=0){
           this.velocity.x=this.velocity.x*-1
            this.location.add(this.velocity)
        }
        if(this.location.y+this.radius>=innerHeight || this.location.y-this.radius<=0){
            this.velocity.y=this.velocity.y*-1
            this.location.add(this.velocity)
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
}
let ballarr=[]
let numofballs=10
let gravity=new Pvector(0,0.1)
let isMouseDown=false;
let friction_coff=0.1
for(let i=0;i<numofballs;i++){
ballarr.push(new Ball())
}


canvas.addEventListener('mousedown', () => {
    isMouseDown = true;
  });
  canvas.addEventListener('mouseup', () => {
    isMouseDown = false;
  });
alert("press mousedown to apply airfriction on the balls")
function animate(){
    c.clearRect(0,0,innerWidth,innerHeight)
    requestAnimationFrame(animate)
    if(isMouseDown){
        for(let i=0;i<numofballs;i++){
            let friction=ballarr[i].velocity.copy()
            friction.normalize()
            friction.mult(-1*friction_coff) 
            ballarr[i].applyForce(friction)
            
        }
    }
    for(let i=0;i<numofballs;i++){
        let gravitycopy=gravity.copy()
        gravitycopy.mult(ballarr[i].mass)
        ballarr[i].applyForce(gravitycopy)
        ballarr[i].update()
        ballarr[i].draw(c)
    }
   
}
animate()
