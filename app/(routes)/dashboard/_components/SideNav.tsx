import React, { useEffect, useState } from "react";
import SideNavTop from "./SideNavTop";
import SideNavMiddle from "./SideNavMiddle";
import SideNavBottom from "./SideNavBottom";

export default function SideNav({ user }) {
  const [currentTeamId, setCurrentTeamId] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("currentTeam");
  
    if (stored && stored !== "undefined") {
      try {
        const parsed = JSON.parse(stored);
        setCurrentTeamId(parsed);
      } catch (e) {
        console.error("Failed to parse currentTeam:", e);
      }
    } else {
      console.warn("No valid currentTeam found in localStorage");
    }
  }, []);
  

  return (
    <aside className="h-screen w-full shadow-md flex flex-col justify-between p-4">
      <div>
        <SideNavTop user={user} />
      </div>
      <div className="flex-1 mt-6">
        <SideNavMiddle />
      </div>
      <div className="mt-6">
        <SideNavBottom currentTeamId={currentTeamId} />
      </div>
    </aside>
  );
}
