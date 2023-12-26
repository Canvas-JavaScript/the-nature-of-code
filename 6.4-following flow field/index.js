import {Pvector, generateRandomInteger} from './helper.js'
const body=document.getElementsByTagName("body")[0]
const canvas=document.createElement("canvas")
body.appendChild(canvas)
const c=canvas.getContext("2d")
canvas.width=innerWidth
canvas.height=innerHeight

function drawArrow(ctx,x, y, length, angle) {
    var radians=angle
    // Calculate arrow coordinates
    var x2 = x + length * Math.cos(radians);
    var y2 = y + length * Math.sin(radians);

    // Draw the line
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x2, y2);
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

class singleField{
    constructor(x,y,theta,magnitude){
        this.x=x
        this.y=y
        this.field=new Pvector(1,1)
        this.field.setAngle(theta*Math.PI/180)
        this.field.setmag(magnitude)
    }
}

class Grid{
    constructor(){
        this.grid=[]
        this.resolution=50
        this.rows=Math.floor(innerWidth/this.resolution)+2
        this.cols=Math.floor(innerHeight/this.resolution)+2
        this.showgrid=true
        for(let i=0;i<this.rows;i++){
            this.grid.push([])
            for(let j=0;j<this.cols;j++){
                this.grid[i].push(new singleField(i*this.resolution,j*this.resolution,generateRandomInteger(-45,45),2))
            }
        }

    }
    givevelocity(x,y){
        let currow=Math.floor(x/this.resolution)
        let currcol=Math.floor(y/this.resolution)
 
        if(currow<this.rows && currcol<this.cols){
            return this.grid[currow][currcol].field.copy()
        }
        else{
            return new Pvector(0,0)
        }
    }
    draw(c){
        if(this.showgrid){
            for(let i=0;i<this.rows;i++){
                for(let j=0;j<this.cols;j++){
                    drawArrow(c,this.grid[i][j].x,this.grid[i][j].y,this.grid[i][j].field.mag()*10,this.grid[i][j].field.angle())
                }
            }
        }
        
    }

}

class Agent{
    constructor(){
        this.location=new Pvector(innerWidth/2,innerHeight/2)
        this.velocity=new Pvector(0,0)
        this.acceleration=new Pvector(0,0)
        this.velocitylimit=1
        this.steeringforcelimit=5
        this.radius=10
        this.nosesize=20
        this.mass=1
        
    }
    applyForce(force,issteeringforce){
        if(issteeringforce){
            let currforce=force.copy()
            currforce.div(this.mass)
            currforce.limit(this.steeringforcelimit)
            this.acceleration.add(currforce)
        }
        else{
            let currforce=force.copy()
            currforce.div(this.mass)
            this.acceleration.add(currforce)
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
            this.location.x=innerWidth
        }
        if(this.location.y>=innerHeight){
            this.location.y=1
        }
        if(this.location.y<=0){
            this.location.y=innerHeight
        }
    }
    draw(c){
        let dir=this.velocity.copy()
        dir.setmag(this.nosesize)
        dir.add(this.location)
        c.beginPath()
        c.moveTo(this.location.x,this.location.y)
        c.lineTo(dir.x,dir.y)
        c.stroke()
        c.beginPath()
        c.arc(this.location.x,this.location.y,this.radius,0,Math.PI*2,false)
        c.stroke()
    }
}


let ag1=new Agent()
let grid1=new Grid()
console.log(innerWidth,innerHeight)
function animate(){
    c.clearRect(0,0,innerWidth,innerHeight)
    requestAnimationFrame(animate)
    grid1.draw(c)
    let desiredvelocity=grid1.givevelocity(ag1.location.x,ag1.location.y)
    let steeringforce=desiredvelocity.subvector(ag1.velocity)
    ag1.applyForce(steeringforce,true)
    ag1.update()
    ag1.draw(c)
    
}

animate()