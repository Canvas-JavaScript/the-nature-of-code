export function lineTo(ctx,x1,y1,x2,y2){
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeSytle="black"
    ctx.stroke();
    
}
export function getRandomColor() {
  // Generate random values for red, green, and blue components
  var red = Math.floor(Math.random() * 256);
  var green = Math.floor(Math.random() * 256);
  var blue = Math.floor(Math.random() * 256);

  // Convert the values to hexadecimal and format the color string
  var color = '#' + red.toString(16) + green.toString(16) + blue.toString(16);

  return color;
}

export function generateRandomInteger(min, max) {
    return Math.floor(min + Math.random()*(max - min + 1))
  }
  
  export function generateGaussianRandom(mean, stdev) {
    var y2;
    var use_last = false;
    return function() {
      var y1;
      if (use_last) {
        y1 = y2;
        use_last = false;
      } else {
        var x1, x2, w;
        do {
          x1 = 2.0 * Math.random() - 1.0;
          x2 = 2.0 * Math.random() - 1.0;
          w = x1 * x1 + x2 * x2;
        } while (w >= 1.0);
        w = Math.sqrt((-2.0 * Math.log(w)) / w);
        y1 = x1 * w;
        y2 = x2 * w;
        use_last = true;
      }
  
      var retval = mean + stdev * y1;
      if (retval > 0)
        return retval;
      return -retval;
    }
  }
  
  export class Pvector{
    constructor(x,y){
    this.x=x;
    this.y=y;
    }
    copy(){
      return new Pvector(this.x,this.y)
    }
    add(vec2){
    this.x+=vec2.x;
    this.y+=vec2.y;
    }
    sub(vec2){
    this.x=this.x-vec2.x;
    this.y=this.y-vec2.y;
    }
    mult(num){
      this.x=this.x*num;
      this.y=this.y*num;
    }
    div(num){
      this.x=this.x/num;
      this.y=this.y/num;
    }
    subvector(vec2){
    let retvec=new Pvector(this.x,this.y)
    retvec.sub(vec2)
    return retvec;
    }
    mag(){
      return Math.sqrt(this.x*this.x+this.y*this.y)
    }
    normalize(){
    let currmag=this.mag()
    if(currmag==0){
    this.x=1
    }
    else{
      this.x=this.x/currmag;
      this.y=this.y/currmag;
    }
    }
    setmag(num){
      this.normalize()
      this.x*=num;
      this.y*=num;
    }
    limit(num){
      if(this.mag()>=num){
        this.setmag(num)
      }
    }
    }