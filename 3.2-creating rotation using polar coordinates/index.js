const body=document.getElementsByTagName("body")[0]
const canvas=document.createElement("canvas")
body.appendChild(canvas)
canvas.width=innerWidth
canvas.height=innerHeight
const c=canvas.getContext("2d")
export function getRandomColor() {
    // Generate random values for red, green, and blue components
    var red = Math.floor(Math.random() * 256);
    var green = Math.floor(Math.random() * 256);
    var blue = Math.floor(Math.random() * 256);
    var color= "rgba("+red+","+ green+","+blue+","+"1)"
    // Convert the values to hexadecimal and format the color string
    // var color = '#' + red.toString(16) + green.toString(16) + blue.toString(16);
  
    return color;
  }

  let color=getRandomColor()
  let radius=100
let angle=0
let angvel=0.03
let circleradius=30
function drawcircle(c,x,y,radius){
c.beginPath()
c.arc(x,y,radius,0,Math.PI*2,false)
c.stroke()
c.fillStyle=color
c.strokeStyle=color;
c.fill()
}

function drawline(c,x1,y1,x2,y2){
    c.beginPath()
    c.moveTo(x1,y1)
    c.lineTo(x2,y2)
    c.stroke()
}
function animate(){
    angle+=angvel
    c.clearRect(0,0,innerWidth,innerHeight)
    requestAnimationFrame(animate)
    c.save()
    c.translate(innerWidth/2,innerHeight/2)
    drawline(c,0,0,radius*Math.cos(angle),radius*Math.sin(angle))
    drawcircle(c,radius*Math.cos(angle),radius*Math.sin(angle),circleradius)
    c.restore()
}
animate()