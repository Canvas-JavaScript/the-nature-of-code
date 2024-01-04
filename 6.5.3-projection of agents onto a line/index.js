import {Pvector, generateRandomInteger} from './helper.js'

const body=document.getElementsByTagName("body")[0]
const canvas=document.createElement("canvas")
body.appendChild(canvas)
const c=canvas.getContext("2d")
canvas.width=innerWidth
canvas.height=innerHeight
canvas.style.border="2px solid red"
class Line{
    constructor(x1,y1,x2,y2){
        this.x1=x1
        this.y1=y1
        this.x2=x2
        this.y2=y2

        this.vec1=new Pvector(this.x1,this.y1)
        this.vec2=new Pvector(this.x2,this.y2)
        this.vector=this.vec2.subvector(this.vec1)
    }
    draw(c){
        this.vector=this.vec2.subvector(this.vec1)
        c.beginPath()
        c.moveTo(this.x1,this.y1)
        c.lineTo(this.x2,this.y2)
        c.stroke()
    }
}

class Agent{
    constructor(){
        this.location=new Pvector(innerWidth*Math.random(),innerHeight*Math.random())
        this.velocity=new Pvector(generateRandomInteger(-20,20)/10,generateRandomInteger(-20,20)/10)
        this.acceleration=new Pvector(0,0)
        this.radius=13
    }
    applyForce(force){
        this.acceleration.add(force)
    }
    update(){
        this.velocity.add(this.acceleration)
        this.location.add(this.velocity)
        this.boundary()
        this.acceleration.setmag(0)
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
        c.beginPath()
        c.arc(this.location.x,this.location.y,this.radius,0,Math.PI*2,false)
        c.fillStyle="red"
        c.fill()
        c.stroke()


        c.beginPath()
        c.moveTo(this.location.x,this.location.y)
        c.lineTo(this.location.x+dir.x,this.location.y+dir.y)
        c.stroke()
    }
    drawProject(y){
        let spmag=this.location.dotproduct(y.vector)/y.vector.mag()
        let sp=y.vector.copy()
        sp.setmag(spmag)
        sp.add(y.vec1)
        c.beginPath()
        c.moveTo(this.location.x,this.location.y)
        c.lineTo(sp.x,sp.y)
        c.stroke()
    }
}
let button1=document.getElementById("handleinputs")
button1.addEventListener("click",handleInputs)
document.getElementById("xInput").value=innerHeight/2
document.getElementById("yInput").value=innerHeight/2
function handleInputs() {
    // Get values from the input fields
    var y1 = document.getElementById("xInput").value;
    var y2 = document.getElementById("yInput").value;

    // Convert the input to numbers (assuming numeric inputs)

    line1=new Line(0,parseFloat(y1),innerWidth,parseFloat(y2))
 
  }



let line1=new Line(0,innerHeight/2,innerWidth,innerHeight/2)

let agarr=[]

for(let i=0;i<10;i++){
    agarr.push(new Agent())
}

function animate(){
    
    c.clearRect(0,0,innerWidth,innerHeight)
    requestAnimationFrame(animate)

    line1.draw(c)

    // ag1.update()
    // ag1.draw(c)
    // ag1.drawProject(line1)
 
    
    for(let i=0;i<10;i++){
        agarr[i].update()
        agarr[i].draw(c)
        agarr[i].drawProject(line1)
    }
}

animate()

