import { Pvector, drawTriangle, generateRandomInteger } from "./helper.js"
const body=document.getElementsByTagName('body')[0]
const canvas=document.createElement("canvas")
const c=canvas.getContext("2d")
body.appendChild(canvas)
canvas.width=innerWidth
canvas.height=innerHeight


class Agent{
    constructor(x,y){
        this.location=new Pvector(x,y)
        this.velocity=new Pvector(generateRandomInteger(-40,40)/10,generateRandomInteger(-40,40)/10)
        this.acceleration=new Pvector(0,0)
        this.radius=10
        this.velocitylimit=4
        this.forcelimit=0.1
    }
    seek(location){
        let desiredvel=location.subvector(this.location)
        let steeringforce=desiredvel.subvector(this.velocity)
        return steeringforce
    }
    seperate(agarr,curr,seperationradius){
        let desiredvel=new Pvector(0,0)
        for(let i=0;i<agarr.length;i++){
            if(i!=curr){
                let dist=agarr[i].location.subvector(this.location)
                if(dist.mag()<seperationradius){
                    let temp=dist.copy()
                    temp.setmag(-10000/(dist.mag()*dist.mag()))
                    desiredvel.add(temp)
                }
               
            }
        }
        if(desiredvel.mag()!=0){
            return desiredvel.subvector(this.velocity)
        }
        else{
            return new Pvector(0,0)
        }
    }
    applyallForce(location,agarr,curr){
        let seekingforce=this.seek(location)
        let seperationforce=this.seperate(agarr,curr,70)
        seekingforce.mult(1)
        seperationforce.mult(1000)
        this.applyForce(seekingforce)
        this.applyForce(seperationforce)
    }
    applyForce(force){
        force.limit(this.forcelimit)
        this.acceleration.add(force)
    }
    update(){
        this.velocity.add(this.acceleration)
        this.velocity.limit(this.velocitylimit)
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
        drawTriangle(c,this.location.x,this.location.y,this.location.x+this.velocity.x,this.location.y+this.velocity.y,this.radius)
        
    }
}


let agarr=[]
let numofagents=200
let mouselocation=new Pvector(innerWidth/2,innerHeight/2)
for(let i=0;i<numofagents;i++){
    agarr.push(new Agent(generateRandomInteger(1,innerWidth), generateRandomInteger(1,innerHeight)))
}
canvas.addEventListener("mousemove",(e)=>{
    mouselocation.x=e.clientX
    mouselocation.y=e.clientY
})
function animate(){
    c.clearRect(0,0,innerWidth,innerHeight)
    requestAnimationFrame(animate)

    for(let i=0;i<agarr.length;i++){
        agarr[i].applyallForce(mouselocation,agarr,i)
        agarr[i].update()
        agarr[i].draw(c)
    }


}

animate()