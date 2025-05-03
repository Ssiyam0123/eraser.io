// app/whiteboard/page.tsx or inside a component

'use client';

import { Excalidraw } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";
import { useState } from "react";

export default function Whiteboard() {
    const [whiteOut, setwhitleOut] = useState()
    // console.log(whiteOut)
  return (
    <div style={{ height: "" }} className="h-[70vh]">
      <Excalidraw 
      onChange={(api : any)=>setwhitleOut(api)}
      theme="dark"/>
    </div>
  );
}
