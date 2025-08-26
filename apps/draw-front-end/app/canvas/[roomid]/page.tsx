"use client"
import { initDraw } from "@/draw";
import { useRef ,useEffect} from "react";

export default function Home() {

  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(()=>{
    if(canvasRef.current){
      initDraw(canvasRef.current);
    }
  },[canvasRef])
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      
        <canvas ref = {canvasRef} width={1080} height={1000}></canvas>
    </div>
  );
}
