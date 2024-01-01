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




function animate(){
    c.clearRect(0,0,innerWidth,innerHeight)
    requestAnimationFrame(animate)
    c.beginPath()
    c.moveTo(base.x,base.y)
    c.lineTo(finalvec1.x,finalvec1.y)
    c.stroke()
}

animate()