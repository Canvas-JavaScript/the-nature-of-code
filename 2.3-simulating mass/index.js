import { getRandomColor,Pvector,generateRandomInteger } from "./helper.js"

const body=document.getElementsByTagName("body")[0]
const canvas=document.createElement("canvas")
body.appendChild(canvas)
canvas.width=innerWidth
canvas.height=innerHeight
const c=canvas.getContext("2d")

class Ball{
constructor(){
    this.radius=generateRandomInteger(30,50)
    this.location=new Pvector(generateRandomInteger(this.radius,innerWidth-this.radius),200)
    // this.location=new Pvector(100,100)
    this.mass=this.radius/10;
    this.velocity=new Pvector(0,0)
    this.acceleration=new Pvector(0,0)
    this.color=getRandomColor()
}
applyForce(force)
{
let newforce=force.copy()
newforce.div(this.mass)
this.acceleration.add(newforce)

}
update(){
this.velocity.add(this.acceleration)
this.location.add(this.velocity)
this.acceleration.setmag(0)
this.boundary()
}
boundary(){
    if(this.location.x+this.radius>=innerWidth || this.location.x-this.radius<=0){
        this.velocity.x=this.velocity.x*-1
        this.location.add(this.velocity)//skip the frame
    }
    if(this.location.y+this.radius>=innerHeight || this.location.y-this.radius<=0){
        this.velocity.y=this.velocity.y*-1
        this.location.add(this.velocity)//skip the frame
    }
}
draw(c){
    c.beginPath()
    c.arc(this.location.x,this.location.y,this.radius,0,Math.PI*2,false);
    c.fillStyle=this.color;
    c.fill()
    c.strokeStyle=this.color;   
    c.stroke()
}
}


//++++++++++++++++++++++++++++++++++++++++
let ballarr=[]
let gravity=new Pvector(0,0.1)
let wind=new Pvector(0.3,0)
let isMouseDown = false;
for(let x=0;x<10;x++){
    ballarr.push(new Ball())
}
alert("click mousedown and hold to apply wind force to right")

canvas.addEventListener('mousedown', function(event) {
    isMouseDown = true;
    

    setInterval(function() {
      if (isMouseDown) {

        for(let x=0;x<ballarr.length;x++){
            ballarr[x].applyForce(wind)
            ballarr[x].update()
            ballarr[x].draw(c)
        }
        
      }
    }, 100); 
  });

  canvas.addEventListener('mouseup', function(event) {
    isMouseDown = false;
  });




function animate(){
    requestAnimationFrame(animate)
    c.clearRect(0,0,innerWidth,innerHeight)
    for(let x=0;x<ballarr.length;x++){
        let gravitycopy=gravity.copy()
        gravitycopy.mult(ballarr[x].mass)
        ballarr[x].applyForce(gravitycopy)
        ballarr[x].update()
        ballarr[x].draw(c)
    }
    // b1.applyForce(gravity)
    // b1.update()
    // b1.draw(c)
}
animate()