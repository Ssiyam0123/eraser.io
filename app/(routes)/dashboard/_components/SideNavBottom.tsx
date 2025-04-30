import { Archive, Book, EraserIcon, Github, icons, Layers3, Lock, MoveDownIcon } from "lucide-react";
import React from "react";

export default function () {
    const menu = [
        {
            name:"Eraserbot",
            icon: <EraserIcon/>,
            path:""
        },
        {
            name: "AI References",
            icon:<Book/>,
            path:""
        },
        {
            name:"Team Templets",
            icon: <Layers3/>,
            path:""
        },
        {
            name: "Github Sync",
            icon: <Github/>,
            path: ''
        },
        {
            name:"Private Files",
            icon:<Lock/>,
            path: ""
        },
        {
            name:"Archive",
            icon: <Archive/>,
            path:""
        }
    ]
  return <div>
    {
        menu.map((item,i)=>(<h1 className="text-lg flex space-x-2 space-y-5">
            <p className="text-lg cursor-pointer">{item.icon}</p>
            <p className="text-lg cursor-pointer">{item.name}</p>
        </h1>))
    }

    <div className="bg-blue-700 rounded-2xl flex justify-between p-4" >
        <p>New File </p>  
        <p><MoveDownIcon/></p>
    </div>

  </div>;
}
