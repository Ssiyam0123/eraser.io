"use client";

import { MoveDown, MoveUp } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useUserTeams } from "@/app/hooks/useUserTeams";
import { FileListContext } from "@/app/_context/FilesListContext";
import InsideHove from "./InsideHove";

export interface TEAM {
  createdBy: string;
  teamName: string;
  _id: string;
}

export default function SideNavTop() {
  const [open, setOpen] = useState(false);
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);
  const { getFiles, setGetFiles } = useContext(FileListContext);
  const { data: teams = [] } = useUserTeams();

  // Set default team on load
  useEffect(() => {
    if (teams.length > 0 && !selectedTeamId) {
      setSelectedTeamId(teams[0]._id);
    }
  }, [teams]);

  console.log(getFiles);
  // Refetch files whenever selected team changes
  useEffect(() => {
    if (selectedTeamId) {
      setGetFiles(selectedTeamId);
    }
  }, [selectedTeamId]);

  const selectedTeam = teams.find((team) => team._id === selectedTeamId);

  return (
    <div className="p-4">
      {/* Dropdown Select */}
      <select
        className="w-full p-2 bg-gray-800 text-white rounded"
        value={selectedTeamId || ""}
        onChange={(e) => setSelectedTeamId(e.target.value)}
      >
        {teams.map((team) => (
          <option key={team._id} value={team._id}>
            {team.teamName}
          </option>
        ))}
      </select>

      {/* Optional: show current team name visually */}
      <div className="mt-2 text-white">
        Selected Team: <strong>{selectedTeam?.teamName || "None"}</strong>
      </div>

      <Popover>
        <PopoverTrigger className="w-full" value={selectedTeamId || ""}>
          <div
            onClick={() => setOpen(!open)}
            className="flex items-center justify-center cursor-pointer bg-gray-800 p-5 text-center gap-2"
          >
            <span className="font-bold text-xl">{selectedTeam?.teamName}</span>
            <span>{open ? <MoveDown /> : <MoveUp />}</span>
          </div>
        </PopoverTrigger>
        <PopoverContent>
          <InsideHove
            selectedTeamId={selectedTeamId}
            setSelectedTeamId={setSelectedTeamId}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
