import {Pvector,getRandomColor,generateRandomInteger} from './helper.js'


class Canvas{
    constructor(width,height){
        this.body=document.body;
        this.canvas=document.createElement("canvas");
        this.canvas.width=width;
        this.canvas.height=height;
        this.body.appendChild(this.canvas)
        
    }
    draw(){
        let canvas=document.getElementById("canvas")
       
        this.c=this.canvas.getContext("2d");
        
        return [this.c,this.canvas];
    }
}
class Ball{
    constructor(x,y,radius,color)
    {
        this.location=new Pvector(x,y)
        this.velocity=new Pvector(0,0)
        this.acceleration=new Pvector(0,0)
        this.radius=radius
        this.vellimit=5
        this.color=color
    }
    update(acceleration){
        this.acceleration=acceleration
        this.velocity.add(this.acceleration)
        this.velocity.limit(this.vellimit)
        this.location.add(this.velocity)
    }
    draw(c){
        c.beginPath()
        c.arc(this.location.x,this.location.y,this.radius,0,Math.PI*2,false)
        c.fillStyle=this.color;
        c.stroke()
        c.fill()
    }
}
let can1=new Canvas(innerWidth,innerHeight)
let [c,canvas]=can1.draw()
console.log(c,canvas)
let ball1=new Ball(innerWidth/2,innerHeight/2,50,getRandomColor())
let mouselocation=new Pvector(0,0)

canvas.onmousemove=(e)=>{
    mouselocation.x=e.clientX
    mouselocation.y=e.clientY
}
let ballarr=[]
for(let i=0;i<10;i++){
ballarr.push(new Ball(innerWidth*Math.random(),innerHeight*Math.random(),generateRandomInteger(30,50),getRandomColor()))
}
function animate(){
    c.clearRect(0,0,innerWidth,innerHeight)
    requestAnimationFrame(animate)
    let acceleration=mouselocation.subvector(ball1.location)
    acceleration.setmag(0.11)
    ball1.update(acceleration)
    ball1.draw(c)
    for(let i=0;i<ballarr.length;i++){
        let acceleration=mouselocation.subvector(ballarr[i].location)
        acceleration.setmag(generateRandomInteger(0.05,0.1))
        ballarr[i].update(acceleration)
        ballarr[i].draw(c)
    }
}
animate()
