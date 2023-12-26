const body=document.getElementsByTagName("body")[0]
const canvas=document.createElement("canvas")
body.appendChild(canvas)


class Grid{
    constructor(){
        this.grid=[]
        this.resolution=50
        this.rows=Math.floor(innerHeight/this.resolution)+2
        this.cols=Math.floor(innerWidth/this.resolution)+2
    }
    update(){

    }
    draw(c){

    }
}



function animate(){
    requestAnimationFrame(animate)
}
animate()