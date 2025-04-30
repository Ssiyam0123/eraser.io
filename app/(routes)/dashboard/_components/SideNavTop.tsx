import { MoveDown, MoveUp } from "lucide-react";
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
  createdBy: string;
  teamName: string;
  _id: string;
}

export default function SideNavTop({ user }) {
  const [open, setOpen] = useState(false);
  const [teamList, setTeamList] = useState<TEAM[]>();
  const convex = useConvex();
  const [selectedTeam, setSelectedTeam] = useState([0])

  const getTeamList = async () => {
    const result = await convex.query(api.teams.getTeam, {
      email: user?.email,
    });
    setTeamList(result);
    if(result.length>0)  setSelectedTeam(result[0])
  };

  console.log(selectedTeam)

  useEffect(() => {
    if (user?.email) getTeamList();
  }, [user]);

  return (
    <div>
      <Popover>
        <PopoverTrigger className="w-full">
          <div
            onClick={() => setOpen(!open)}
            className="flex items-center justify-center cursor-pointer bg-gray-800 p-5 text-center gap-2"
          >
            <span className="font-bold text-xl">
              {selectedTeam?.teamName}
            </span>
            <span>{open ? <MoveDown /> : <MoveUp />}</span>
          </div>
        </PopoverTrigger>
        <PopoverContent>
          <InsideHove selectedTeam={selectedTeam} setSelectedTeam={setSelectedTeam} teamList={teamList} user={user} />
        </PopoverContent>
      </Popover>
    </div>
  );
}
