import {Pvector} from './helper.js'
let canvas=document.getElementById("canvas")
let c=canvas.getContext("2d")
canvas.width=innerWidth
canvas.height=innerHeight

class Ball{
    constructor(radius,velocityspeed){
        this.radius=radius;
        this.position=new Pvector(innerWidth/2,innerHeight/2)
        this.velocity=new Pvector(1,1)
        this.velocity.setmag(velocityspeed)
    }
    update(){
        this.position.add(this.velocity)
        if(this.position.x+this.radius>=innerWidth || this.position.x-this.radius<=0){
            this.velocity.x=-1*this.velocity.x
        }
        if(this.position.y+this.radius>=innerHeight || this.position.y-this.radius<=0){
            this.velocity.y=-1*this.velocity.y
        }
    }
    draw(c){
        c.beginPath()
        c.arc(this.position.x,this.position.y,this.radius,0,Math.PI*2,false)
        c.stroke()
    }
}
let ball1=new Ball(20,10)
function animate(){
    c.clearRect(0,0,innerWidth,innerHeight)
    requestAnimationFrame(animate)
    ball1.update()
    ball1.draw(c)
}
animate()