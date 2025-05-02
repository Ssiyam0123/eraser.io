"use client";

import { FileListContext } from "@/app/_context/FilesListContext";
import { useFileList } from "@/app/hooks/useFileList";
import { useGetTeamList } from "@/app/hooks/useGetTeamList";
import { useTeamFiles } from "@/app/hooks/useTeamFiles";
import { useUserTeams } from "@/app/hooks/useUserTeams";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import { LogOutIcon, Settings, User2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";

export default function InsideHove({ selectedTeamId, setSelectedTeamId }) {
  const { user } = useKindeBrowserClient();
  const { getFiles, setGetFiles } = useContext(FileListContext);
  const { data: teamList } = useUserTeams();

  const handleTeamSelect = (team) => {
    setSelectedTeamId(team?._id);
    // refetch()
  };

  // const { teamList } = useGetTeamList();

  // console.log("from inside hove : ",teamList)

  const router = useRouter();

  const handleRouting = (item) => {
    router.push(`${item.path}`);
  };

  const menu = [
    {
      name: "Join or Create Team",
      icon: <User2 />,
      path: "teams/create",
    },
    {
      name: "Settings",
      icon: <Settings />,
      path: "settings",
    },
  ];

  return (
    <div className="space-y-4">
      {/* Team List */}
      <div className="space-y-2">
        {teamList?.map((team) => (
          <div
            key={team._id}
            onClick={() => handleTeamSelect(team)}
            className={`cursor-pointer p-3 rounded-2xl font-medium transition ${
              selectedTeamId === team._id && "bg-blue-900 text-gray-100"
            }`}
          >
            {team.teamName}
          </div>
        ))}
      </div>

      <Separator className="my-4" asChild />

      {/* Menu */}
      <div className="space-y-4">
        {menu.map((item, i) => (
          <div
            key={i}
            onClick={() => handleRouting(item)}
            className="flex items-center justify-between text-lg cursor-pointer hover:text-green-500 transition"
          >
            <span>{item.name}</span>
            <span>{item.icon}</span>
          </div>
        ))}

        {/* Logout */}
        <div className="flex items-center justify-between text-lg mt-6 cursor-pointer hover:text-red-500 transition">
          <span>Log out</span>
          <LogoutLink>
            <LogOutIcon />
          </LogoutLink>
        </div>
      </div>

      <Separator className="my-4" />

      {/* User Info */}
      <div className="flex items-center gap-3">
        {user && (
          <Image
            className="rounded-full"
            alt="user logo"
            height={30}
            width={30}
            src={user?.picture}
          />
        )}
        <div>
          <p className="text-sm font-semibold">{user?.given_name}</p>
          <p className="text-sm text-gray-400">{user?.email}</p>
        </div>
      </div>
    </div>
  );
}
