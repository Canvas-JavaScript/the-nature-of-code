import {Pvector, generateGaussianRandom, generateRandomInteger} from './helper.js'
const body=document.getElementsByTagName("body")[0]
const canvas=document.createElement("canvas")
body.appendChild(canvas)
const c=canvas.getContext("2d")
canvas.width=innerWidth
canvas.height=innerHeight


class Agent{
constructor(){
    this.location=new Pvector(generateRandomInteger(100,innerWidth-100),generateRandomInteger(100,innerHeight-100))
    this.velocity=new Pvector(0,0)
    this.acceleration=new Pvector(0,0)
    this.maxagentspeed=2
    this.maxsteerinfroce=generateGaussianRandom(2,5)()
    this.radius=10;
}
applyForce(force,issteeringforce=false){
if(issteeringforce){
    
force.limit(this.maxsteerinfroce)
}
this.acceleration.add(force)
}
update(){
this.velocity.add(this.acceleration)
this.velocity.limit(this.maxagentspeed)
this.location.add(this.velocity)

this.acceleration.setmag(0)
}
draw(c){
    this.dir=this.velocity.copy()
        this.dir.setmag(20)
        this.dir.add(this.location)
        c.beginPath()
        c.moveTo(this.location.x,this.location.y)
        c.lineTo(this.dir.x,this.dir.y)
        c.stroke()
c.beginPath()
c.arc(this.location.x,this.location.y,this.radius,0,Math.PI*2,false)
c.stroke()
}
}



let ag1=new Agent()
let agarr=[]
let numofagents=10
for(let i=0;i<numofagents;i++){
    agarr.push(new Agent())
}
let mousepos=new Pvector(0,0)
canvas.addEventListener("mousemove",(e)=>{
    mousepos.x=e.clientX
    mousepos.y=e.clientY
})


function animate(){
    c.clearRect(0,0,innerWidth,innerHeight)
    requestAnimationFrame(animate)
    let desiredvel=mousepos.subvector(ag1.location)
    let steeringforce=desiredvel.subvector(ag1.velocity)
    ag1.applyForce(steeringforce,true)
    ag1.update()
    ag1.draw(c)


    for(let i=0;i<numofagents;i++){
        let desiredvel=mousepos.subvector(agarr[i].location)
    let steeringforce=desiredvel.subvector(agarr[i].velocity)
    agarr[i].applyForce(steeringforce,true)
    agarr[i].update()
    agarr[i].draw(c)
    }


}
animate()