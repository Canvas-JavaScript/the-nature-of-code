import {Pvector, drawTriangle, generateRandomInteger} from './helper.js'
const body=document.getElementsByTagName("body")[0]
const canvas=document.createElement("canvas")
body.appendChild(canvas)
canvas.width=innerWidth
canvas.height=innerHeight
const c=canvas.getContext("2d")

export function drawArrow(ctx,x, y, length, angle,color) {
    var radians=angle
    // Calculate arrow coordinates
    var x2 = x + length * Math.cos(radians);
    var y2 = y + length * Math.sin(radians);

    // Draw the line
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x2, y2);
    ctx.fillStyle=color;
    ctx.strokeStyle=color;
    ctx.stroke();

    // Draw the arrowhead
    var arrowSize = 5;
    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - arrowSize * Math.cos(radians - Math.PI / 6), y2 - arrowSize * Math.sin(radians - Math.PI / 6));
    ctx.lineTo(x2 - arrowSize * Math.cos(radians + Math.PI / 6), y2 - arrowSize * Math.sin(radians + Math.PI / 6));
    
    ctx.closePath();
    ctx.fill();
}
class Fieldline{
    constructor(x,y,angle,mag,color){
        this.x=x
        this.y=y
        this.field=new Pvector(1,1)
        this.field.setAngle(angle)
        this.field.setmag(mag)
        this.color=color
    }
}

class Grid{
constructor(){
    this.grid=[]
    this.resolution=50
    this.rows=Math.floor(innerWidth/this.resolution)+2
    this.cols=Math.floor(innerHeight/this.resolution)+2
    for(let i=0;i<this.rows;i++){
        this.grid.push([])
        for(let j=0;j<this.cols;j++){
            this.grid[i].push(new Fieldline(i*this.resolution,j*this.resolution,generateRandomInteger(-30,30)*Math.PI/180,1,"black"))
        }
    }
}
giveDesiredVelocity(location){
let x=Math.floor(location.x/this.resolution)
let y=Math.floor(location.y/this.resolution)
return this.grid[x][y].field.copy();
}
update(location,color){
    let x=Math.floor(location.x/this.resolution)
    let y=Math.floor(location.y/this.resolution)
    this.grid[x][y].color=color
}
draw(c){
    for(let i=0;i<this.rows;i++){
        for(let j=0;j<this.cols;j++){
            drawArrow(c,this.grid[i][j].x, this.grid[i][j].y, this.grid[i][j].field.mag()*30, this.grid[i][j].field.angle(),this.grid[i][j].color)
        }
    }
}
}

class Agent{
    constructor(){
        this.location=new Pvector(innerWidth/2,innerHeight/2)
        this.velocity=new Pvector(0,0)
        this.acceleration=new Pvector(0,0)
        this.radius=15
        this.mass=1
        this.velocitylimit=1
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
        dir.add(this.location)
        c.beginPath()
        c.moveTo(this.location.x,this.location.y)
        c.lineTo(dir.x,dir.y)
        c.stroke()
        drawTriangle(c,this.location.x,this.location.y,dir.x,dir.y,this.radius)
    }
}

let grid1=new Grid()

let ag1=new Agent()
function animate(){
canvas.height=innerHeight
requestAnimationFrame(animate)
let desiredvel=grid1.giveDesiredVelocity(ag1.location)
let steeringforce=desiredvel.subvector(ag1.velocity)
let prevlocation=ag1.location.copy()

grid1.update(ag1.location,"red")
ag1.applyForce(steeringforce)
ag1.update()


grid1.draw(c)
ag1.draw(c)
grid1.update(prevlocation,"black")

}
animate()