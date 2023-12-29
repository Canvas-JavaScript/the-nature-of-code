import './style.css'
import {Pvector, drawArrow, drawTriangle, generateRandomInteger} from './helper.js'
import { createNoise2D } from 'simplex-noise';

const body=document.getElementsByTagName("body")[0]
const canvas=document.createElement("canvas")
body.appendChild(canvas)
canvas.width=innerWidth
canvas.height=innerHeight
const c=canvas.getContext("2d")

class FieldLine{
  constructor(x,y,angle,mag){
    this.x=x
    this.y=y
    this.field=new Pvector(1,1)
    this.field.setAngle(angle)
    this.field.setmag(mag)
  }
}
class Grid{
  constructor(){
    const noise2D = createNoise2D();
    this.noiseconsistency=50
    this.grid=[]
    this.resolution=30
    this.rows=Math.floor(innerWidth/this.resolution)+2
    this.cols=Math.floor(innerHeight/this.resolution)+2
    for(let i=0;i<this.rows;i++){
      this.grid.push([])
      for(let j=0;j<this.cols;j++){
        this.grid[i].push(new FieldLine(i*this.resolution,j*this.resolution,180*noise2D(i/this.noiseconsistency, j/this.noiseconsistency)*Math.PI/180,1))
      }
    }
  }
  giveDesiredVelocity(location){
    let x=Math.floor(location.x/this.resolution)
    let y=Math.floor(location.y/this.resolution)
    return this.grid[x][y].field.copy()
  }
  draw(c){
    for(let i=0;i<this.rows;i++){
      for(let j=0;j<this.cols;j++){
        drawArrow(c,this.grid[i][j].x,this.grid[i][j].y,this.grid[i][j].field.mag()*25,this.grid[i][j].field.angle())
      }
    }
  }
}


class Agent{
  constructor(x,y)
  {
    this.location=new Pvector(x,y)
    this.velocity=new Pvector(0,0)
    this.acceleration=new Pvector(0,0)
    this.size=10
    this.mass=this.size/10
    this.velocitylimit=generateRandomInteger(1,5)
    this.steeringforcelimit=1
  }
  applyForce(force,issteeringforce){
    if(issteeringforce){
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
      this.location.x=innerWidth-10
    }
    if(this.location.y>innerHeight){
      this.location.y=1
    }
    if(this.location.y<0){
      this.location.y=innerHeight-10
    }
  }
  draw(c){
    let dir=this.velocity.copy()
    dir.add(this.location)
    drawTriangle(c,this.location.x,this.location.y,dir.x,dir.y,this.size)
  }
}

let g1=new Grid()
let ag1=new Agent(innerWidth/2,innerHeight/2)

let agarr=[]



function animate(){
  c.clearRect(0,0,innerWidth,innerHeight)
  requestAnimationFrame(animate)
  let desvel=g1.giveDesiredVelocity(ag1.location)
  let steeringforce=desvel.subvector(ag1.velocity)
  
  ag1.applyForce(steeringforce,true)
  g1.draw(c)
  ag1.update()
  ag1.draw(c)


  for(let i=0;i<agarr.length;i++){
  let desvel=g1.giveDesiredVelocity(agarr[i].location)
  let steeringforce=desvel.subvector(agarr[i].velocity)
  agarr[i].applyForce(steeringforce,true)
  agarr[i].update()
  agarr[i].draw(c)
  }
}
animate()


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