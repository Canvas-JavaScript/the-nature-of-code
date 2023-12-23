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


class OscillatorAddition{
    constructor(x,y,radius1,frequency1,radius2,frequency2,circleradius){
        this.theta=Math.PI*270/180;
        this.amplitude1=radius1;
        this.amplitude2=radius2;
        this.radius=radius1+radius2;
        this.x1=x
        this.y1=y
        this.color=getRandomColor() 
        this.circleradius=circleradius
        this.x2=this.x1+this.radius*Math.cos(this.theta)
        this.y2=this.y1+this.radius*Math.sin(this.theta)
        this.frequency1=frequency1;
        this.frequency2=frequency2;
    }
    update(time){
        this.radius=this.amplitude1*Math.sin((2*Math.PI/this.frequency1)*time)+this.amplitude2*Math.sin((2*Math.PI/this.frequency2)*time)
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
class SineAddition{
    constructor(numofpoints,ylocation,timeincrement,amplitude1,frequency1,amplitude2,frequency2,radiusofcircle){
        this.numofpoints=numofpoints
        this.increment=innerWidth/numofpoints
        this.startx=0
        this.endx=innerWidth
        this.oscarr=[]
        this.timeincrement=timeincrement
        this.radiusofcircle=radiusofcircle
        this.amplitude1=amplitude1
        this.frequency1=frequency1
        this.amplitude2=amplitude2
        this.frequency2=frequency2
        for(let i=0;i<this.numofpoints;i++){
            this.oscarr.push(new OscillatorAddition(this.startx+i*this.increment,ylocation,amplitude1,frequency1,amplitude2,frequency2,radiusofcircle))
        }
    }
    draw(c,time){
        for(let i=0;i<this.numofpoints;i++){
            this.oscarr[i].update(time+i*timeincrement)
            this.oscarr[i].draw(c)
        }
    }
}

let time=0
let timeincrement=0.001

//first sine wave
let numofpoints1=300
let ypositiontodraw1=innerHeight/4
let amplitude1=10
let frequency1=0.01
let radiusofcircle1=10

//second sine wave
let numofpoints2=numofpoints1
let ypositiontodraw2=2*innerHeight/4
let amplitude2=100
let frequency2=0.1
let radiusofcircle2=radiusofcircle1

//added sinewave
let numofpointsAdd=numofpoints1
let ypositiontodrawAdd=3*innerHeight/4

let radiusofcircleAdd=radiusofcircle1

let sin1=new Sine(numofpoints1,ypositiontodraw1,timeincrement,amplitude1,frequency1,radiusofcircle1)
let sin2=new Sine(numofpoints2,ypositiontodraw2,timeincrement,amplitude2,frequency2,radiusofcircle2)
let sin3=new SineAddition(numofpointsAdd,ypositiontodrawAdd,timeincrement,amplitude1,frequency1,amplitude2,frequency2,radiusofcircleAdd)


function animate(){
    c.clearRect(0,0,innerWidth,innerHeight)
    requestAnimationFrame(animate)
    sin1.draw(c,time)
    sin2.draw(c,time)
    sin3.draw(c,time)
    time+=timeincrement
}

animate()




let nopinput=document.getElementById("numofpoints")
let ypositiontodrawinput=document.getElementById("ypositiontodraw")
let timeincrementinput=document.getElementById("timeincrement")
let amplitudeinput=document.getElementById("amplitude")
let frequencyinput=document.getElementById("frequency")
let radiusofcircleinput=document.getElementById("radiusofcircle")

nopinput.value=numofpoints1
ypositiontodrawinput.value=ypositiontodraw1
timeincrementinput.value=timeincrement
amplitudeinput.value=amplitude1
frequencyinput.value=frequency1
radiusofcircleinput.value=radiusofcircle1

nopinput.addEventListener("change",(e)=>{
numofpoints1=parseInt(e.target.value)
sin1=new Sine(numofpoints1,ypositiontodraw1,timeincrement,amplitude1,frequency1,radiusofcircle1)
sin3=new SineAddition(numofpointsAdd,ypositiontodrawAdd,timeincrement,amplitude1,frequency1,amplitude2,frequency2,radiusofcircleAdd)
})

ypositiontodrawinput.addEventListener("change",(e)=>{
ypositiontodraw1=parseInt(e.target.value)
sin1=new Sine(numofpoints1,ypositiontodraw1,timeincrement,amplitude1,frequency1,radiusofcircle1)
sin3=new SineAddition(numofpointsAdd,ypositiontodrawAdd,timeincrement,amplitude1,frequency1,amplitude2,frequency2,radiusofcircleAdd)
})
    
timeincrementinput.addEventListener("change",(e)=>{
timeincrement=parseFloat(e.target.value)
sin1=new Sine(numofpoints1,ypositiontodraw1,timeincrement,amplitude1,frequency1,radiusofcircle1)
sin3=new SineAddition(numofpointsAdd,ypositiontodrawAdd,timeincrement,amplitude1,frequency1,amplitude2,frequency2,radiusofcircleAdd)
})

amplitudeinput.addEventListener("change",(e)=>{
amplitude1=parseInt(e.target.value)
sin1=new Sine(numofpoints1,ypositiontodraw1,timeincrement,amplitude1,frequency1,radiusofcircle1)
sin3=new SineAddition(numofpointsAdd,ypositiontodrawAdd,timeincrement,amplitude1,frequency1,amplitude2,frequency2,radiusofcircleAdd)
})

frequencyinput.addEventListener("change",(e)=>{
frequency1=parseFloat(e.target.value)
sin1=new Sine(numofpoints1,ypositiontodraw1,timeincrement,amplitude1,frequency1,radiusofcircle1)
sin3=new SineAddition(numofpointsAdd,ypositiontodrawAdd,timeincrement,amplitude1,frequency1,amplitude2,frequency2,radiusofcircleAdd)
})

radiusofcircleinput.addEventListener("change",(e)=>{
    radiusofcircle1=parseInt(e.target.value)
sin1=new Sine(numofpoints1,ypositiontodraw1,timeincrement,amplitude1,frequency1,radiusofcircle1)
sin3=new SineAddition(numofpointsAdd,ypositiontodrawAdd,timeincrement,amplitude1,frequency1,amplitude2,frequency2,radiusofcircleAdd)
})


