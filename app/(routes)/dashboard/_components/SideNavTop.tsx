import { ArrowDownNarrowWide, Move, MoveDown, MoveUp } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import InsideHove from "./InsideHove";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";

export interface TEAM {
  createdBy: String,
  teamName: String,
  _id: string
}

export default function SideNavTop({ user }) {
  const [open, setOpen] = useState(false);
  const[teamList, setTeamList] = useState([])
const convex = useConvex()
  const getTeamList = async ()=>{
    const result = await convex.query(api.teams.getTeam,{email:user?.email})
    console.log(result)
    setTeamList(result)
    return result;
  }

  console.log(teamList)

useEffect(()=>{
  user && getTeamList()
},[])


  //   console.log(open);
  return (
    <div>
      <Popover>
        <PopoverTrigger className="w-full">
          <h1
            onClick={() => setOpen(!open)}
            className="flex items-center justify-center cursor-pointer bg-gray-800 p-5 text-center gap-2"
          >
            <h1 className="font-bold text-xl"> Esthiyaks Team</h1>
            <h1>{open ? <MoveDown /> : <MoveUp />}</h1>
          </h1>
        </PopoverTrigger>
        <PopoverContent>
          <InsideHove teamList={teamList} user={user} />
        </PopoverContent>
      </Popover>
    </div>
  );
}
