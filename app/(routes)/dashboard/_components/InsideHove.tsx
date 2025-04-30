import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { LogOut, LogOutIcon, Settings, User2 } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function InsideHove({ user, teamList }) {
  console.log(user);
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
      <div className="space-y-2">
        {
          teamList?.map((list,i)=><div className="bg-blue-900 p-3 rounded-2xl font-bold">{list.teamName}</div>)
        }
      </div>
      {/* <Separator className="my-4" /> */}
      <div className="divider "></div>
      <div>
        {menu.map((item, i) => (
          <h1 key={i} className="text-lg flex space-x-2 space-y-5">
            <h5 className="text-lg cursor-pointer">{item.name}</h5>
            <h5 className="text-lg cursor-pointer">{item.icon}</h5>
          </h1>
        ))}
        <h1 className="flex text-lg mb-9 cursor-pointer space-x-2">
          <h1>Log out</h1>
          <LogoutLink>
            <LogOutIcon />
          </LogoutLink>
        </h1>
        <div className="divider "></div>

        <h1 className="flex items-center">
          <div className="mr-5">
            {user && (
              <Image
                className="rounded-full"
                alt="user logo"
                height={30}
                width={30}
                src={user?.picture}
              />
            )}
          </div>

          <div className="">
            <p className="text-sm font-semibold">{user?.given_name}</p>
            <p>{user?.email}</p>
          </div>
        </h1>
      </div>
    </div>
  );
}
