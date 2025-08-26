"use client"
import { useRef ,useState,useEffect} from "react";

export default function Home() {

  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(()=>{
    if(canvasRef.current){
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
     
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
        console.log(e.clientX);
        console.log(e.clientY);
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
  },[canvasRef])
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      
        <canvas ref = {canvasRef} width={1080} height={1000}></canvas>
    </div>
  );
}
