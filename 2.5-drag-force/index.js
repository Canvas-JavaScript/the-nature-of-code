import {generateRandomInteger,Pvector,getRandomColor,getOppositeColor} from './helper.js'
const body=document.getElementsByTagName("body")[0]
const canvas=document.createElement("canvas")
body.appendChild(canvas)
canvas.width=innerWidth
canvas.height=innerHeight
let c=canvas.getContext("2d")


class Ball{
constructor(){
    this.radius=generateRandomInteger(20,60)
    this.maincolor=getRandomColor()
    this.color=this.maincolor
    this.mass=this.radius/10
    this.location=new Pvector(generateRandomInteger(this.radius,innerWidth-this.radius),100)
    this.velocity=new Pvector(0,0)
    this.acceleration=new Pvector(0,0)
}
applyForce(force){
    let forcecopy=force.copy()
    forcecopy.div(this.mass)
    this.acceleration.add(forcecopy)
}
insidemedium(med){
    if(med.contains(this.location)){
        this.color=getOppositeColor(this.maincolor)
    }
    else{
        this.color=this.maincolor
    }
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
        this.location.add(this.velocity)
    }
    if(this.location.y+this.radius>=innerHeight || this.location.y-this.radius<=0){
        this.velocity.y=this.velocity.y*-1
        this.location.add(this.velocity)
    }
}
draw(c){
    c.beginPath()
    c.fillStyle=this.color;
    c.strokeStyle=this.color;
    c.arc(this.location.x,this.location.y,this.radius,0,Math.PI*2,false)
    c.stroke()
    c.fill()
}
}

class Fluid{
    constructor(x,y,xlen,ylen,coff){
        this.x=x;
        this.y=y;
        this.xlen=xlen;
        this.ylen=ylen;
        this.coff=coff;
    }
    contains(location){
        let x=location.x
        let y=location.y
        if(x>=this.x && x<=this.x+this.xlen && y>=this.y && y<=this.y+this.ylen)
        {
            return true;
        }
        else{
            return false;
        }
    }
    dragForce(velocity){
        let dragForce=velocity.copy()
        let mag=velocity.mag()
        mag=mag*mag;
        dragForce.setmag(-1*mag*this.coff)
        return dragForce
    }
    draw(c){
        c.beginPath()
        c.rect(this.x, this.y, this.xlen, this.ylen);
        c.fillStyle="#D3D3D3"
        c.strokeStyle="#D3D3D3"
        c.fillRect(this.x, this.y, this.xlen, this.ylen);
        c.stroke()
    }   
}

// let ball1=new Ball()
let med1=new Fluid(0,innerHeight/2,innerWidth,innerHeight/2,0.5)
let gravity=new Pvector(0,0.05)

let ballarr=[]
let balllen=10
for(let i=0;i<balllen;i++){
ballarr.push(new Ball())
}


document.addEventListener('click', function() {
    location.reload();
  });

function animate(){
    c.clearRect(0,0,innerWidth,innerHeight)
    requestAnimationFrame(animate)

    med1.draw(c)
    
    // let gravitycopy=gravity.copy()
    // gravitycopy.mult(ball1.mass)
    // ball1.applyForce(gravitycopy)
    // if(med1.contains(ball1.location))
    // {
    //     let dragforce=med1.dragForce(ball1.velocity)
    //     ball1.applyForce(dragforce)
    // }
    
    
    // ball1.update()
    // ball1.insidemedium(med1)
    // ball1.draw(c)
    for(let i=0;i<ballarr.length;i++){
        let gravitycopy=gravity.copy()
        gravitycopy.mult(ballarr[i].mass)
        ballarr[i].applyForce(gravitycopy)
        ballarr[i].update()
        if(med1.contains(ballarr[i].location))
        {
            let dragforce=med1.dragForce(ballarr[i].velocity)
            ballarr[i].applyForce(dragforce)
            ballarr[i].update()    
        }
        
        ballarr[i].insidemedium(med1)
        ballarr[i].draw(c)
    }
    
}
animate()