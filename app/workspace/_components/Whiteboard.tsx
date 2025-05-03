// app/whiteboard/page.tsx or inside a component

'use client';

import { Excalidraw } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";

export default function Whiteboard() {
  return (
    <div style={{ height: "" }} className="h-screen">
      <Excalidraw />
    </div>
  );
}
