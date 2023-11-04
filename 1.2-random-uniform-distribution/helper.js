export function lineTo(ctx,x1,y1,x2,y2){
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeSytle="black"
    ctx.stroke();
    
}
export function generateRandomInteger(min, max) {
    return Math.floor(min + Math.random()*(max - min + 1))
  }
  