"use client";

import { MoveDown, MoveUp } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import InsideHove from "./InsideHove";
import { useGetTeamList } from "@/app/hooks/useGetTeamList";
import { useFileList } from "@/app/hooks/useFileList";

export interface TEAM {
  createdBy: string;
  teamName: string;
  _id: string;
}

export default function SideNavTop() {
  const [open, setOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState();
  const { teamList } = useGetTeamList();
  const [fileList, setFileList] = useState();

  // useEffect(() => {
  //   teamList && setSelectedTeam(teamList[0]);
  // }, [teamList]);




  useEffect(() => {
    if (teamList && teamList?.length && !selectedTeam) {
      setSelectedTeam(teamList[0]);
    }
  }, [teamList, selectedTeam]);
  


  const { files } = useFileList(selectedTeam?._id);

  return (
    <div>
      <Popover>
        <PopoverTrigger className="w-full">
          <div
            onClick={() => setOpen(!open)}
            className="flex items-center justify-center cursor-pointer bg-gray-800 p-5 text-center gap-2"
          >
            <span className="font-bold text-xl">{selectedTeam?.teamName}</span>
            <span>{open ? <MoveDown /> : <MoveUp />}</span>
          </div>
        </PopoverTrigger>
        <PopoverContent>
          {/* <InsideHove
            selectedTeam={selectedTeam}
            setSelectedTeam={setSelectedTeam}
          /> */}
        </PopoverContent>
      </Popover>
    </div>
  );
}
