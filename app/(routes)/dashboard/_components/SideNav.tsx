import React, { useContext, useEffect, useState } from "react";
import SideNavTop from "./SideNavTop";
import SideNavMiddle from "./SideNavMiddle";
import SideNavBottom from "./SideNavBottom";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { FileListContext } from "@/app/_context/FilesListContext";

export default function SideNav({ user }) {
  const [currentTeamId, setCurrentTeamId] = useState(null);
  const [currentFileNum, setCurrentFileNum] = useState(0);
  const convex = useConvex();
  const { fileList, setFileList } = useContext(FileListContext);

  const getFiles = async () => {
    const result = await convex.query(api.files.getFile, {
      teamId: currentTeamId,
    });
    console.log(result);
    setCurrentFileNum(result.length);
    setFileList(result);
  };

  // console.log(currentTeamId)
  fileList && console.log(fileList);

  useEffect(() => {
    currentTeamId && getFiles();
  }, [currentTeamId]);

  // useEffect(() => {
  //   const stored = localStorage.getItem("currentTeam");

  //   if (stored && stored !== "undefined") {
  //     try {
  //       const parsed = JSON.parse(stored);
  //       setCurrentTeamId(parsed);
  //     } catch (e) {
  //       console.error("Failed to parse currentTeam:", e);
  //     }
  //   } else {
  //     console.warn("No valid currentTeam found in localStorage");
  //   }
  // }, []);

  return (
    <aside className=" w-full shadow-md flex flex-col justify-between p-4">
      <div>
        <SideNavTop user={user} setCurrentTeamId={setCurrentTeamId} />
      </div>
      <div className="flex-1 mt-6">
        <SideNavMiddle />
      </div>
      <div className="mt-6">
        <SideNavBottom
          currentTeamId={currentTeamId}
          currentFileNum={currentFileNum}
          getFiles={getFiles}
        />
      </div>
    </aside>
  );
}
