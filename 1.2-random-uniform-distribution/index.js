import {generateRandomInteger} from './helper.js'
let canvas=document.getElementById("canvas");
let c=canvas.getContext("2d");
canvas.width=innerWidth;
canvas.height=innerHeight;

let stepsize=20;
let arrRectHeight=[]
let count=0;
for(let i=0;i<innerWidth;i+=stepsize)
{
    arrRectHeight.push(0)
}
function animate(){
    c.clearRect(0,0,innerWidth,innerHeight)
    requestAnimationFrame(animate);
    let genRand=generateRandomInteger(0,innerWidth);
    count=0;
    for(let i=0;i<innerWidth;i+=stepsize)
    {
        if(genRand>=i && genRand<=i+stepsize){
            arrRectHeight[count]+=2
        }
        count++;
    }
    count=0;
    console.log(arrRectHeight)
    for(let i=0;i<innerWidth;i+=stepsize)
    {
        c.beginPath()
        c.rect(i,innerHeight-arrRectHeight[count],stepsize,arrRectHeight[count]);
        c.stroke()
        count++;
    }
    
}
animate()
