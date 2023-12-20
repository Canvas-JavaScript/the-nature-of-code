const body=document.getElementsByTagName("body")[0]
const canvas=document.createElement("canvas")
body.appendChild(canvas)
canvas.width=innerWidth
canvas.height=innerHeight

function animate(){
    requestAnimationFrame(animate)
}
animate()