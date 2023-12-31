import {Pvector} from './helper.js'
const body=document.getElementsByTagName("body")[0]
const canvas=document.createElement("canvas")
body.appendChild(canvas)
canvas.width=innerWidth
canvas.height=innerHeight
const c=canvas.getContext("2d")



let base=new Pvector(innerWidth/2,innerHeight/2)
let vec1=new Pvector(1,0)
vec1.setmag(300)
vec1.add(base)
let mouse=new Pvector(0,0)
let mousevec2=mouse.subvector(base)
// vec3.setmag(200)
// vec4.setmag(200)

canvas.addEventListener("mousemove",(e)=>{
    mouse.x=e.clientX
    mouse.y=e.clientY
    mousevec2=mouse.subvector(base)
})

function animate(){
    c.clearRect(0,0,innerWidth,innerHeight)
    requestAnimationFrame(animate)
    c.beginPath()
    c.moveTo(base.x,base.y)
    c.lineTo(vec1.x,vec1.y)
    c.stroke()

    c.beginPath()
    c.moveTo(base.x,base.y)
    c.lineTo(mouse.x,mouse.y)
    c.stroke()

    let angle=mousevec2.angleBetweenTwoVectors(vec1.subvector(base))*180/Math.PI
    c.beginPath()
    c.font = "30px Arial";
    c.fillText("angle between two vectors is "+angle,100,150);
    c.fillStyle="red"
    c.stroke()
}

animate()