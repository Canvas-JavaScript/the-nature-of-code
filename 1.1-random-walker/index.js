import { lineTo } from "./helper.js";
let canvas=document.getElementById("canvas");
let c=canvas.getContext("2d");
canvas.width=innerWidth
canvas.height=innerHeight
let x=innerWidth/2
let y=innerHeight/2
let newx,newy;
let randlength=3
function animate(){
    requestAnimationFrame(animate);
    newx=x+(Math.random()>0.5 ? randlength : -1*randlength)
    newy=y+(Math.random()>0.5 ? randlength : -1*randlength)
    lineTo(c,x,y,newx,newy)
    x=newx;
    y=newy;
}
animate()