"use client";

import React, { useState } from "react";
import WorkspaceHeader from "../_components/WorkspaceHeader";
import EditorComponent from "../_components/EditorComponent";
import { useParams } from "next/navigation";
import Whiteboard from "../_components/Whiteboard";

export default function Page() {
  const {filedId} = useParams();
  
  // console.log(filedId);

  const [commandToSave, setcommandToSave] = useState<boolean>(false)
  console.log(commandToSave)

  return (
    <div>
      <WorkspaceHeader setcommandToSave={setcommandToSave}/>
      <div className="flex flex-col lg:flex-row flex-wrap justify-center w-full px-4 gap-6 mt-20">
        {/* Editor Panel */}
        <div className="w-full lg:w-[45%] min-h-[70vh]">
          <h2 className="text-white mb-2 text-lg font-semibold">Editor</h2>
          <EditorComponent filedId={filedId} commandToSave={commandToSave}   setcommandToSave={setcommandToSave}/>
        </div>

        {/* Whiteboard Panel */}
        <div className="w-full lg:w-[45%] min-h-[70vh]">
          <h2 className="text-white mb-2 text-lg font-semibold">Whiteboard</h2>
          {/* Uncomment your whiteboard when needed */}
          {/* <Editor /> */}
          <div className=" rounded-lg h-full shadow-md p-4 ">
            
            {/* <Canvas/> */}
            <Whiteboard filedId={filedId} commandToSave={commandToSave} setcommandToSave={setcommandToSave}/>
          </div>
        </div>
      </div>
    </div>
  );
}
