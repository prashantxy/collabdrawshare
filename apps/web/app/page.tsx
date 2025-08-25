"use client";
import { useRouter } from "next/navigation";
import {useState} from "react";

export default function Home() {
  const [roomId,setRoomId] = useState("");
  const router = useRouter();
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <input value={roomId} onChange={(e)=>{
        setRoomId(e.target.value);
      }} type = "text" placeholder="Room id"></input>
      <button onClick={()=>{

      }}>JoinRoom</button>
    </div>
  );
}
