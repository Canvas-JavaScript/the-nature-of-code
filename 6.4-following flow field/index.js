import {Pvector} from './helper.js'
const body=document.getElementsByTagName("body")[0]
const canvas=document.createElement("canvas")
body.appendChild(canvas)
const c=canvas.getContext("2d")
canvas.width=innerWidth
canvas.height=innerHeight

function drawArrow(ctx,x, y, length, angle) {
    // Convert angle to radians
    var radians = angle * Math.PI / 180;

    // Calculate arrow coordinates
    var x2 = x + length * Math.cos(radians);
    var y2 = y + length * Math.sin(radians);

    // Draw the line
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    // Draw the arrowhead
    var arrowSize = 10;
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
        this.rows=Math.floor(innerWidth/this.resolution)+1
        this.cols=Math.floor(innerHeight/this.resolution)+1
        for(let i=0;i<this.rows;i++){
            this.grid.push([])
            for(let j=0;j<this.cols;j++){
                this.grid[i].push(new singleField(i,j,45,2))
            }
        }
    }
    draw(c){
        for(let i=0;i<this.rows;i++){
            for(let j=0;j<this.cols;j++){
                drawArrow(c,this.grid[i][j].x*this.resolution,this.grid[i][j].y*this.resolution,this.grid[i][j].field.mag()*10,this.grid[i][j].field.angle())
            }
        }
    }

}


let grid1=new Grid()
function animate(){
    requestAnimationFrame(animate)
    grid1.draw(c)
}
animate()