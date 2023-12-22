import {generateRandomInteger, getRandomColor} from './helper.js'
const body=document.getElementsByTagName("body")[0]
const canvas=document.createElement("canvas")
const userinput=document.getElementById("userinput")
canvas.width=innerWidth
canvas.height=innerHeight
body.appendChild(canvas)
const c=canvas.getContext("2d")

class Oscillator{
constructor(theta,frequncy,amplitude,circleradius){
    this.theta=theta*Math.PI/180;
    this.x=innerWidth/2+this.radius*Math.sin(this.theta)
    this.y=innerHeight/2+this.radius*Math.cos(this.theta)
    this.circleradius=circleradius

    this.color=getRandomColor()
    this.frequncy=frequncy
    this.amplitude=amplitude
}

update(frame){
this.radius=this.amplitude*Math.sin(2*Math.PI*frame*this.frequncy)
this.x=innerWidth/2+this.radius*Math.cos(this.theta)
this.y=innerHeight/2+this.radius*Math.sin(this.theta)
}

draw(c){
   
    c.beginPath()
    c.moveTo(innerWidth/2,innerHeight/2)
    c.lineTo(this.x,this.y)
    c.stroke()
    c.beginPath()
    c.arc(this.x,this.y,this.circleradius,0,Math.PI*2,false)
    c.fillStyle=this.color
    c.strokeStyle=this.color
    c.fill()
    c.stroke()
}
}

// let osc1=new Oscillator(90,1,300)
let framecount=0
let oscarr=[]
let numofosc=100
userinput.addEventListener("change",(e)=>{
    try{
        numofosc=parseInt(e.target.value)
    }
    catch(e){
        numofosc=100
    }
console.log(numofosc)
oscarr=[]
for(let i=0;i<numofosc;i++){
    oscarr.push(new Oscillator(360*Math.random(),generateRandomInteger(3,7),generateRandomInteger(150,400),generateRandomInteger(20,40)))
}
})

for(let i=0;i<numofosc;i++){
    oscarr.push(new Oscillator(360*Math.random(),generateRandomInteger(3,7),generateRandomInteger(150,400),generateRandomInteger(20,40)))
}
function animate(){
    c.clearRect(0,0,innerWidth,innerHeight)
    requestAnimationFrame(animate)
    // osc1.update(framecount)
    // osc1.draw(c)



    framecount+=0.001;

    for(let i=0;i<oscarr.length;i++){
        oscarr[i].update(framecount)
        oscarr[i].draw(c)
    }
}
animate()
