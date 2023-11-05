import {generateGaussianRandom} from './helper.js'
let canvas=document.getElementById("canvas");
let c=canvas.getContext("2d");
canvas.width=innerWidth
canvas.height=innerHeight

let arrOfGaussianRandoms=[]
let stepsize=20
let mean=innerWidth/2
let stddev=100
for(let i=0;i<innerWidth;i+=stepsize){
    arrOfGaussianRandoms.push(0)
}
let count=0
function animate(){
    c.clearRect(0,0,innerWidth,innerHeight)
    requestAnimationFrame(animate)
    let rand=generateGaussianRandom(mean,stddev)()
    console.log(rand)
    count=0
    for(let i=0;i<innerWidth;i+=stepsize){
        if(rand>=i && rand<=i+stepsize){
            arrOfGaussianRandoms[count]+=3
        }
        count++
    }
    count=0

    for(let i=0;i<innerWidth;i+=stepsize){
        c.beginPath()
        c.rect(i,innerHeight-arrOfGaussianRandoms[count],stepsize,arrOfGaussianRandoms[count])
        c.stroke()
        count++
    }
}
animate()
