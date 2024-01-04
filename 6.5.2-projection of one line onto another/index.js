import {Pvector} from './helper.js'
const body=document.getElementsByTagName("body")[0]
const canvas=document.createElement("canvas")
body.appendChild(canvas)
const c=canvas.getContext("2d")
canvas.width=innerWidth
canvas.height=innerHeight

let base=new Pvector(innerWidth/2,innerHeight/2)
let vec1=new Pvector(1,-1)
vec1.setmag(innerHeight/2.5)
let finalvec1=new Pvector(base.x+vec1.x,base.y+vec1.y)

let mouse=new Pvector(1,1)
let finalmousevec2=new Pvector(mouse.x,mouse.y)



canvas.addEventListener("mousemove",(e)=>{
    mouse.x=e.clientX
    mouse.y=e.clientY
    console.log(mouse)
})


function animate(){
    c.clearRect(0,0,innerWidth,innerHeight)

    requestAnimationFrame(animate)
    c.strokeStyle="black"
    c.beginPath()
    c.moveTo(base.x,base.y)
    c.lineTo(finalvec1.x,finalvec1.y)
    c.stroke()
    finalmousevec2=new Pvector(mouse.x,mouse.y)
    c.beginPath()
    c.moveTo(base.x,base.y)
    c.lineTo(finalmousevec2.x,finalmousevec2.y)
    c.stroke()


    let sp=mouse.subvector(base)
    sp=sp.dotproduct(vec1)
    sp=sp/vec1.mag()
    let vec3=vec1.copy()
    vec3.setmag(sp)
    vec3.add(base)

    c.beginPath()
    c.moveTo(finalmousevec2.x,finalmousevec2.y)
    c.lineTo(vec3.x,vec3.y)
    c.stroke()


    c.beginPath()
    c.strokeStyle="red"
    c.moveTo(base.x,base.y)
    c.lineTo(vec3.x,vec3.y)
    c.stroke()
    c.beginPath()
    c.arc(vec3.x,vec3.y,5,0,Math.PI*2,false)
    c.fillStyle="red"
    c.fill()
}

animate()