import React, { useContext, useEffect, useState } from "react";
import SideNavTop from "./SideNavTop";
import SideNavMiddle from "./SideNavMiddle";
import SideNavBottom from "./SideNavBottom";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";

import { useFileList } from "@/app/hooks/useFileList";

export default function SideNav() {




  return (
    <aside className=" w-full shadow-md flex flex-col justify-between p-4">
      <div>
        <SideNavTop  />
      </div>
      <div className="flex-1 mt-6">
        <SideNavMiddle />
      </div>
      <div className="mt-6">
        {/* <SideNavBottom
          currentTeamId={currentTeamId}
          currentFileNum={currentFileNum}
        /> */}
      </div>
    </aside>
  );
}
