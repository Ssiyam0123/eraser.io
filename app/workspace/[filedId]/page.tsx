"use client";

import React from "react";
import WorkspaceHeader from "../_components/WorkspaceHeader";
import EditorComponent from "../_components/EditorComponent";
import { useParams } from "next/navigation";
import Canvas from "../_components/Canvas";
import Whiteboard from "../_components/Whiteboard";

export default function Page() {
  const {filedId} = useParams();
  
  // console.log(filedId);

  return (
    <div>
      <WorkspaceHeader />
      <div className="flex flex-col lg:flex-row flex-wrap justify-center w-full px-4 gap-6 mt-20">
        {/* Editor Panel */}
        <div className="w-full lg:w-[45%] min-h-[70vh]">
          <h2 className="text-white mb-2 text-lg font-semibold">Editor</h2>
          <EditorComponent filedId={filedId} />
        </div>

        {/* Whiteboard Panel */}
        <div className="w-full lg:w-[45%] min-h-[70vh]">
          <h2 className="text-white mb-2 text-lg font-semibold">Whiteboard</h2>
          {/* Uncomment your whiteboard when needed */}
          {/* <Editor /> */}
          <div className=" rounded-lg h-full shadow-md p-4 ">
            
            {/* <Canvas/> */}
            <Whiteboard/>
          </div>
        </div>
      </div>
    </div>
  );
}
