import { useEffect, useState } from "react";
import { api } from "@/convex/_generated/api";
import { useConvex } from "convex/react";


export const useFileList = (teamId: any) => {
  const [currentTeam, setCurrentTeam2] = useState();


  // console.log("team id from usefile hook :" + currentTeam);
  const convex = useConvex();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFiles = async () => {
      setLoading(true);
      const result : any = await convex.query(api.files.getFile, {
        teamId: currentTeam || "",
      });
      setFiles(result);
      setLoading(false);
    };

    // console.log("from file hook : ++ :"+files.length)
    if (currentTeam) {
      fetchFiles();
    }
  }, [convex, currentTeam]);

  return { files, setCurrentTeam2 };
};
