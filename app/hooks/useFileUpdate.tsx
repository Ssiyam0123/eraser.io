import { api } from "@/convex/_generated/api";
import { useConvex, useQuery } from "convex/react"

interface UpdateFile {
    forFileId : any;
    document : any;
}

export const useFileUpdate = ({forFileId, document}:UpdateFile) =>{
    const convex = useConvex();
    return useQuery({
        queryKey: [forFileId],
        queryFn: async () => {
            return convex.query(api.files.updateFile, {document:document})
        }
    })
}