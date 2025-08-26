import axios from "axios"
type Shape = {
    type:"rect";
    x:number;
    y:number;
    width:number;
    height:number
}

export function initDraw(canvas: HTMLCanvasElement){
     
      const ctx = canvas.getContext("2d");
     let existingShapes: Shape[]=[];
      if(!ctx){
        return;
      }
      let clicked = false;
      let startX = 0;
      let startY = 0;
      canvas.addEventListener("mousedown",(e)=>{
        clicked = false;
        startX = (e.clientX);
        startY = (e.clientY);
      })

       canvas.addEventListener("mouseup",(e)=>{
        clicked = false;
         const width = e.clientX - startX;
            const height = e.clientY - startY;

            existingShapes.push({
             type : "rect",
             x : 12,
             y :12,
             width : 1222,
             height : 1233
            })
      })

        canvas.addEventListener("mousemove",(e)=>{
          if(clicked){
            const width = e.clientX - startX;
            const height = e.clientY - startY;
            ctx.clearRect(0,0,canvas.width,canvas.height);
            ctx.fillStyle="rgba(0,0,0)";
            ctx.fillRect(0,0,canvas.width,canvas.height);
              ctx.strokeStyle="rgba(255,255,255)";
            ctx.strokeRect(startX,startY,width,height);
          }  
      })
}


function ClearCanvas(existingShapes: Shape[],canvas : HTMLCanvasElement,ctx : CanvasRenderingContext2D){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = "rgba(0,0,0)"

    existingShapes.map((shape)=>{
        if(shape.type === "rect"){
            ctx.strokeStyle="rgba(255,255,255)";
            ctx.strokeRect(shape.x,shape.y,shape.width,shape.height);
        }
    })
}
const HTTP_BACKEND = "localhost:3000";
async function getExistingShapes(roomId: string) {
    const res = await axios.get(`${HTTP_BACKEND}/chats/${roomId}`);
    const messages = res.data.messages;

    const shapes = messages.map((x: {message: string}) => {
        const messageData = JSON.parse(x.message)
        return messageData.shape;
    })
    return shapes;
}