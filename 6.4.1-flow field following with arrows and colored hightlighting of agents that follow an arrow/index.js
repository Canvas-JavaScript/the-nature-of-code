import { Pvector,drawArrow,drawTriangle, generateRandomInteger } from "./helper.js";

const body=document.getElementsByTagName("body")[0]
const canvas=document.createElement("canvas")
body.appendChild(canvas)
const c=canvas.getContext("2d")
canvas.width=innerWidth
canvas.height=innerHeight


class FieldLine{
    constructor(x,y,theta,mag){
        this.x=x;
        this.y=y;
        this.field=new Pvector(1,1)
        this.field.setAngle(theta)
        this.field.setmag(mag)
    }
}
class Grid{
    constructor(){
        this.grid=[]
        this.resolution=50
        this.rows=Math.floor(innerWidth/this.resolution)+2
        this.cols=Math.floor(innerHeight/this.resolution)+2
        this.arrowsize=3
        for(let i=0;i<this.rows;i++){
            this.grid.push([])
            for(let j=0;j<this.cols;j++){
                this.grid[i].push(new FieldLine(i*this.resolution,j*this.resolution,generateRandomInteger(15,-15)*Math.PI/180,10))
            }
        }
    }   
    giveVelocity(velocity){
        let x=Math.floor(velocity.x/this.resolution)
        let y=Math.floor(velocity.y/this.resolution)
        console.log(x,y)
        console.log(this.grid[x][y].field)
        return this.grid[x][y].field.copy()
    }
    draw(c){
        for(let i=0;i<this.rows;i++){
            for(let j=0;j<this.cols;j++){
                drawArrow(c,this.grid[i][j].x, this.grid[i][j].y, this.grid[i][j].field.mag()*this.arrowsize, this.grid[i][j].field.angle()) 
            }
        }
    }
}
class Agent{
    constructor(x,y){
        this.location=new Pvector(x,y)
        this.velocity=new Pvector(0,0)
        this.acceleration=new Pvector(0,0)
        this.mass=1
        this.steeringforcelimit=10
        this.maxvelocity=generateRandomInteger(1,3)
        this.radius=10
    }
    applyForce(force,isSteeringForce){
        if(isSteeringForce){
            let forcecopy=force.copy()
            forcecopy.div(this.mass)
            forcecopy.limit(this.steeringforcelimit)
            this.acceleration.add(forcecopy)
        }
        else{
            let forcecopy=force.copy()
            forcecopy.div(this.mass)
            this.acceleration.add(forcecopy)
        }
    }
    update(){
        this.velocity.add(this.acceleration)
        this.velocity.limit(this.maxvelocity)
        this.location.add(this.velocity)
        this.acceleration.setmag(0)
        this.boundary()
    }
    boundary(){
        if(this.location.x>innerWidth){
            this.location.x=1
        }
        if(this.location.x<=0){
            this.location.x=innerWidth-1
        }
        if(this.location.y>innerHeight){
            this.location.y=1
        }
        if(this.location.y<=0){
            this.location.y=innerHeight-1
        }
    }
    draw(c){

        let dir=this.velocity.copy()
        dir.setmag(30)
        dir.add(this.location)

        drawTriangle(c,this.location.x,this.location.y,dir.x,dir.y,this.radius)
        // c.beginPath()
        // c.arc(this.location.x,this.location.y,this.radius,0,Math.PI*2,false)
        // c.stroke()

    }
}
alert("click and drag to create agents")


 // Variables to track the drag state
 var isDragging = false;
 var startX, startY;

 // Event listeners
 canvas.addEventListener('mousedown', handleMouseDown);
 canvas.addEventListener('mousemove', handleMouseMove);
 canvas.addEventListener('mouseup', handleMouseUp);

 // Event handlers
 function handleMouseDown(event) {
   isDragging = true;
   startX = event.clientX - canvas.getBoundingClientRect().left;
   startY = event.clientY - canvas.getBoundingClientRect().top;
 }

 function handleMouseMove(event) {
   if (isDragging) {
     var mouseX = event.clientX - canvas.getBoundingClientRect().left;
     var mouseY = event.clientY - canvas.getBoundingClientRect().top;

     // Calculate the distance moved
     var deltaX = mouseX - startX;
     var deltaY = mouseY - startY;

     // Update the starting point for the next move event
     startX = mouseX;
     startY = mouseY;

     // Draw something based on the drag
     agarr.push(new Agent(startX,startY))
   }
 }

 function handleMouseUp() {
   isDragging = false;
 }


let g1=new Grid()
let agarr=[]
agarr.push(new Agent(innerWidth/2,innerHeight/2))

// canvas.addEventListener("click",(e)=>{
// agarr.push(new Agent(e.clientX,e.clientY))
// })
function animate(){
    c.clearRect(0,0,innerWidth,innerHeight)
    requestAnimationFrame(animate)
    
    g1.draw(c)

    for(let i=0;i<agarr.length;i++){
        let desiredvelocity=g1.giveVelocity(agarr[i].location)
        let steeringForce=desiredvelocity.subvector(agarr[i].velocity)
        agarr[i].applyForce(steeringForce,true)
        agarr[i].update()
        agarr[i].draw(c)
    }
   
}

animate()