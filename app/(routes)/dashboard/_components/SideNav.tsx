import React from "react";
import SideNavTop from "./SideNavTop";
import SideNavMiddle from "./SideNavMiddle";
import SideNavBottom from "./SideNavBottom";

export default function SideNav({ user }) {
  return (
    <aside className="h-screen w-full  shadow-md flex flex-col justify-between p-4">
      {/* Top Section: Profile or Logo */}
      <div>
        <SideNavTop user={user} />
      </div>

      {/* Middle Section: Navigation Links */}
      <div className="flex-1 mt-6">
        <SideNavMiddle />
      </div>

      {/* Bottom Section: Settings or Logout */}
      <div className="mt-6">
        <SideNavBottom />
      </div>
    </aside>
  );
}
