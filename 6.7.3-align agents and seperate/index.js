import {Pvector, generateRandomInteger, getRandomColor} from './helper.js'
const body=document.getElementsByTagName("body")[0]
const canvas=document.createElement("canvas")
body.appendChild(canvas)
const c=canvas.getContext("2d")
canvas.width=innerWidth
canvas.height=innerHeight


class Agent{
constructor(x,y){
    this.location=new Pvector(x,y)
    this.velocity=new Pvector(generateRandomInteger(-30,30)/10,generateRandomInteger(-30,30)/10)
    this.acceleration=new Pvector(0,0)
    this.radius=15
    this.forcelimit=0.1
    this.vellimit=3
    this.color=getRandomColor()
}
applyForce(force){
    // force.limit(this.forcelimit)
    this.acceleration.add(force)
}
seperate(seperationradius,agarr,curr){
let desiredvel=new Pvector(0,0)
    for(let i=0;i<agarr.length;i++){
        if(i!=curr){
            let dist=agarr[i].location.subvector(this.location)
            if(dist.mag()<seperationradius){
                let tempvel=dist.copy()
                tempvel.setmag(-100/(dist.mag()))
                desiredvel.add(tempvel)
            }
        }
    }
    if(desiredvel.mag()!=0){
        let steeringforce=desiredvel.subvector(this.velocity)
        this.applyForce(steeringforce)
    }
}


align(alignradius,agarr,curr){
    let desiredvel=new Pvector(0,0)
    for(let i=0;i<agarr.length;i++){
        if(i!=curr){
            let dist=agarr[i].location.subvector(this.location)
            if(dist.mag()<alignradius){
                desiredvel.add(agarr[i].velocity)
            }
        }
    }
    if(desiredvel.mag()!=0){
        let steeringforce=desiredvel.subvector(this.velocity)
        this.applyForce(steeringforce)
    }
}
update(){
this.velocity.add(this.acceleration)
this.velocity.limit(this.vellimit)
this.location.add(this.velocity)
this.acceleration.setmag(0)
this.boundary()
}
boundary(){
if(this.location.x>=innerWidth){
    this.location.x=1
}
if(this.location.x<0){
    this.location.x=innerWidth-1
}

if(this.location.y>=innerHeight){
    this.location.y=1
}
if(this.location.y<0){
    this.location.y=innerHeight-1
}

}
draw(c){
    let dir=this.velocity.copy()
    dir.setmag(this.radius*2)
    dir.add(this.location)
    c.beginPath()
    c.moveTo(this.location.x,this.location.y)
    c.lineTo(dir.x,dir.y)
    c.stroke()

    c.beginPath()
    c.arc(this.location.x,this.location.y,this.radius,0,Math.PI*2,false)
    c.fillStyle=this.color
    c.strokeStyle=this.color
    c.fill()
    c.stroke()
}
}


let agarr=[]
let agsize=100
let alignradius=100
let seperateradius=100
for(let i=0;i<agsize;i++){
agarr.push(new Agent(generateRandomInteger(1,innerWidth-1),generateRandomInteger(1,innerHeight-1)))
}




function animate(){
    c.clearRect(0,0,innerWidth,innerHeight)
    requestAnimationFrame(animate)
    for(let i=0;i<agsize;i++){
        agarr[i].align(alignradius,agarr,i)
        agarr[i].seperate(seperateradius,agarr,i)
        agarr[i].update()
        agarr[i].draw(c)

    }
}
animate()