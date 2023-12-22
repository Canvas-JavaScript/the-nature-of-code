import { generateRandomInteger, getRandomColor } from "./helper.js"
const body=document.getElementsByTagName("body")[0]
const canvas=document.createElement("canvas")
const c=canvas.getContext("2d")
body.appendChild(canvas)
canvas.width=innerWidth
canvas.height=innerHeight

class Oscillator{
    constructor(x,y,radius,frequency,circleradius){
        this.theta=Math.PI*270/180;
        this.amplitude=radius;
        this.radius=radius;
        this.x1=x
        this.y1=y
        this.color=getRandomColor() 
        this.circleradius=circleradius
        this.x2=this.x1+this.radius*Math.cos(this.theta)
        this.y2=this.y1+this.radius*Math.sin(this.theta)
        this.frequency=frequency;
    }
    update(time){
        this.radius=this.amplitude*Math.sin((2*Math.PI/this.frequency)*time)
        this.x2=this.x1+this.radius*Math.cos(this.theta)
        this.y2=this.y1+this.radius*Math.sin(this.theta)
    }
    draw(c){
        c.beginPath()
        c.moveTo(this.x1,this.y1)
        c.lineTo(this.x2,this.y2)
        c.stroke()
        c.beginPath()
        c.arc(this.x2,this.y2,this.circleradius,0,Math.PI*2,false)
        c.fillStyle=this.color
        c.strokeStyle=this.color
        c.fill()
        c.stroke()
    }
}
class Sine{
    constructor(numofpoints,ylocation,timeincrement,amplitude,frequency,radiusofcircle){
        this.numofpoints=numofpoints
        this.increment=innerWidth/numofpoints
        this.startx=0
        this.endx=innerWidth
        this.oscarr=[]
        this.timeincrement=timeincrement
        this.radiusofcircle=radiusofcircle
        this.amplitude=amplitude
        this.frequency=frequency
        for(let i=0;i<this.numofpoints;i++){
            
            this.oscarr.push(new Oscillator(this.startx+i*this.increment,ylocation,amplitude,frequency,radiusofcircle))
        }
    }
    draw(c,time){
        for(let i=0;i<this.numofpoints;i++){
            this.oscarr[i].update(time+i*timeincrement)
            this.oscarr[i].draw(c)
        }
    }
}
let numofpoints=300
let ypositiontodraw=innerHeight/2
let timeincrement=0.001
let amplitude=300
let frequency=0.2
let radiusofcircle=100
let sin1=new Sine(numofpoints,ypositiontodraw,timeincrement,amplitude,frequency,radiusofcircle)
let time=0

let nopinput=document.getElementById("numofpoints")
let ypositiontodrawinput=document.getElementById("ypositiontodraw")
let timeincrementinput=document.getElementById("timeincrement")
let amplitudeinput=document.getElementById("amplitude")
let frequencyinput=document.getElementById("frequency")
let radiusofcircleinput=document.getElementById("radiusofcircle")

nopinput.value=numofpoints
ypositiontodrawinput.value=innerHeight/2
timeincrementinput.value=timeincrement
amplitudeinput.value=amplitude
frequencyinput.value=frequency
radiusofcircleinput.value=radiusofcircle

nopinput.addEventListener("change",(e)=>{
numofpoints=parseInt(e.target.value)
sin1=new Sine(numofpoints,ypositiontodraw,timeincrement,amplitude,frequency,radiusofcircle)})

ypositiontodrawinput.addEventListener("change",(e)=>{
ypositiontodraw=parseInt(e.target.value)
sin1=new Sine(numofpoints,ypositiontodraw,timeincrement,amplitude,frequency,radiusofcircle)})
    
timeincrementinput.addEventListener("change",(e)=>{
timeincrement=parseFloat(e.target.value)
sin1=new Sine(numofpoints,ypositiontodraw,timeincrement,amplitude,frequency,radiusofcircle)})

amplitudeinput.addEventListener("change",(e)=>{
amplitude=parseInt(e.target.value)
sin1=new Sine(numofpoints,ypositiontodraw,timeincrement,amplitude,frequency,radiusofcircle)})

frequencyinput.addEventListener("change",(e)=>{
frequency=parseFloat(e.target.value)
sin1=new Sine(numofpoints,ypositiontodraw,timeincrement,amplitude,frequency,radiusofcircle)})

radiusofcircleinput.addEventListener("change",(e)=>{
    radiusofcircle=parseInt(e.target.value)
sin1=new Sine(numofpoints,ypositiontodraw,timeincrement,amplitude,frequency,radiusofcircle)})

function animate(){
    c.clearRect(0,0,innerWidth,innerHeight)
    requestAnimationFrame(animate)
    sin1.draw(c,time)
    time+=timeincrement
}

animate()