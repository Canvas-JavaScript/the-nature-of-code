import {Pvector, generateRandomInteger, getRandomColor} from './helper.js'
const body=document.getElementsByTagName("body")[0]
const canvas=document.createElement("canvas")
const c=canvas.getContext("2d")
body.appendChild(canvas)
canvas.width=innerWidth
canvas.height=innerHeight



class Agent{
constructor(x,y){
    this.location=new Pvector(x,y)
    this.velocity=new Pvector(generateRandomInteger(-30,30)/5,generateRandomInteger(-30,30)/5)
    this.acceleration=new Pvector(0,0)
    this.radius=15
    this.velocitylimit=3
    this.color=getRandomColor()
    this.forcelimit=10
}
applyForce(force){
    force.limit(this.forcelimit)
    this.acceleration.add(force)
}
align(alginradius,agarr,curr){ 
    let desiredvel=new Pvector(0,0)
    for(let i=0;i<agarr.length;i++){
        if(i!=curr){
            let dist=this.location.subvector(agarr[i].location)
            if(dist.mag()<alginradius){
                desiredvel.add(agarr[i].velocity)
            }
        }
    }
    
    let steeringforce=desiredvel.subvector(this.velocity)
    if(desiredvel.mag()!=0){
        this.applyForce(steeringforce)
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
    if(this.location.x>=innerWidth){
        this.location.x=1
    }
    if(this.location.x<=0){
        this.location.x=innerWidth-1
    }
    if(this.location.y>=innerHeight){
        this.location.y=1
    }
    if(this.location.y<=0){
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

alert("click and drag to create agents")


let isDragging = false;
let offsetX, offsetY;

function handleMouseDown(e) {
  isDragging = true;
  offsetX = e.clientX - canvas.getBoundingClientRect().left;
  offsetY = e.clientY - canvas.getBoundingClientRect().top;

  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);
}

function handleMouseMove(e) {
  if (isDragging) {
agarr.push(new Agent(e.clientX,e.clientY))
  }
}

function handleMouseUp() {
  isDragging = false;
  document.removeEventListener('mousemove', handleMouseMove);
  document.removeEventListener('mouseup', handleMouseUp);
}

canvas.addEventListener('mousedown', handleMouseDown);


const numberInput = document.getElementById('numberInput');
  const booleanInput = document.getElementById('booleanInput');

  // Add event listeners to the inputs
  numberInput.addEventListener('input', updateNumber);
  booleanInput.addEventListener('change', updateBoolean);

  // Function to update the number value
  function updateNumber() {
    alignradius = parseFloat(numberInput.value);
  }

  // Function to update the boolean value
  function updateBoolean() {
    align = booleanInput.checked;
  }






let agarr=[]
let alignradius=25
numberInput.value=alignradius
let align=true
booleanInput.checked=align
agarr.push(new Agent(innerWidth/2,innerHeight/2))

function animate(){
    c.clearRect(0,0,innerWidth,innerHeight)
    requestAnimationFrame(animate)
    for(let i=0;i<agarr.length;i++){
        agarr[i].update()
        agarr[i].draw(c)
        if(align){
            agarr[i].align(alignradius,agarr,i)
        }
    }
    
    
}   

animate()