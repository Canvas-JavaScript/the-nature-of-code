import {Pvector, generateRandomInteger} from './helper.js'
const body=document.getElementsByTagName("body")[0]
const canvas=document.createElement("canvas")
const c=canvas.getContext("2d")
body.appendChild(canvas)
canvas.width=innerWidth
canvas.height=innerHeight

class Line{
    constructor(x1,y1,x2,y2){
        this.vec1=new Pvector(x1,y1)
        this.vec2=new Pvector(x2,y2)
        this.linevec=this.vec2.subvector(this.vec1)
        this.radius=30
    }
    draw(c){
        c.beginPath()
        c.moveTo(this.vec1.x,this.vec1.y-this.radius)
        c.lineTo(this.vec2.x,this.vec2.y-this.radius)
        c.stroke()

        c.beginPath()
        c.moveTo(this.vec1.x,this.vec1.y)
        c.lineTo(this.vec2.x,this.vec2.y)
        c.stroke()
        

        c.beginPath()
        c.moveTo(this.vec1.x,this.vec1.y+this.radius)
        c.lineTo(this.vec2.x,this.vec2.y+this.radius)
        c.stroke()
        
    }
}

class Path{
    constructor(line1){
        this.line1=line1
    }
    draw(){
        this.line1.draw(c)
    }
}



class Agent{
    constructor(x,y){
        this.location=new Pvector(x,y)
        this.velocity=new Pvector(1,0)
        this.acceleration=new Pvector(0,0)
        this.velocitylimit=0.1+5*Math.random()
        this.radius=10
        this.futuresize=100
        this.steeringforcelimit=0.2
    }
    seek(c,path,drawseek){
        
        let future=this.velocity.copy()
        future.setmag(this.futuresize)
        future.add(this.location)
        let spmag=future.dotproduct(path.line1.linevec)/path.line1.linevec.mag()
        let sp1=path.line1.linevec.copy()
        let sp2=path.line1.linevec.copy()
        sp1.setmag(spmag)
        sp2.setmag(spmag+this.futuresize)
        sp1.add(path.line1.vec1)
        sp2.add(path.line1.vec1)
        if(drawseek){
            this.drawSeek(c,this.location.x,this.location.y,future.x,future.y,sp1.x,sp1.y,sp2.x,sp2.y)
        }
        let length=future.subvector(sp1).mag()
        if(path.line1.radius<length){
            let desiredvel=sp2.subvector(this.location)
            let steeringforce=desiredvel.subvector(this.velocity)
            this.applyForce(steeringforce)
        }
       
    }
    drawSeek(c,x0,y0,x1,y1,x2,y2,x3,y3){
        c.beginPath()
        c.moveTo(x1,y1)
        c.lineTo(x2,y2)
        c.stroke()
        c.beginPath()
        c.arc(x1,y1,10,0,Math.PI*2,false)
        c.fillStyle="red"
        c.fill()
        c.stroke()

        c.beginPath()
        c.arc(x2,y2,10,0,Math.PI*2,false)
        c.fillStyle="blue"
        c.fill()
        c.stroke()


        c.beginPath()
        c.arc(x3,y3,10,0,Math.PI*2,false)
        c.fillStyle="green"
        c.fill()
        c.stroke()
    }
    applyForce(force){
        force.limit(this.steeringforcelimit)
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
        if(this.location.x>innerWidth){
            this.location.x=1
        }
        if(this.location.x<0){
            this.location.x=innerWidth-1
        }
        if(this.location.y>innerHeight){
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
        c.fillStyle="red"
        c.fill()
        c.stroke()
    }
}

let line1=new Line(0,generateRandomInteger(innerHeight/5,4*innerHeight/5),innerWidth,generateRandomInteger(innerHeight/5,4*innerHeight/5))
let path=new Path(line1)


let ag1=new Agent(innerWidth/2,innerHeight/3)
let agarr=[]
canvas.addEventListener("click",(e)=>{
    agarr.push(new Agent(e.clientX,e.clientY))
})
document.addEventListener("keydown",(e)=>{
    if(e.key=="d" || e.key=="D"){
        showfuture=!showfuture
    }d
})
let showfuture=true
function animate(){
    c.clearRect(0,0,innerWidth,innerHeight)
    requestAnimationFrame(animate)
    path.draw(c)
    ag1.seek(c,path,showfuture)
    ag1.update()
    ag1.draw(c)

    for(let i=0;i<agarr.length;i++){
        agarr[i].seek(c,path,showfuture)
        agarr[i].update()
        agarr[i].draw(c)
    }
    c.font="30px Comic Sans MS";
    c.fillStyle = "red";
    c.textAlign = "center";
    c.fillText("press d to disable the future and click to generate agents", innerWidth/2,100 );
}
animate()