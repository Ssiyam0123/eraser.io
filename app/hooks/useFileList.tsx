import { useEffect, useState } from "react";
import { api } from "@/convex/_generated/api";
import { useConvex } from "convex/react";
import { useGetTeamList } from "./useGetTeamList";

export const useFileList = (teamId) => {
  const [currentTeam, setCurrentTeam] = useState();

  // const {} = useGetTeamList()

  teamId && setCurrentTeam(teamId);

  console.log("team id forom usefile hook :" + teamId);
  const convex = useConvex();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFiles = async () => {
      setLoading(true);
      const result = await convex.query(api.files.getFile, {
        teamId: currentTeam,
      });
      setFiles(result);
      setLoading(false);
    };

    if (teamId) {
      fetchFiles();
    }
  }, [teamId, convex]);

  return { files, loading };
};
