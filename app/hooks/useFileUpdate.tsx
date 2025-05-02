import { api } from "@/convex/_generated/api";
import { useConvex, useQuery } from "convex/react"

export const useFileUpdate = (forFileId, document) =>{
    const convex = useConvex();
    return useQuery({
        queryKey: [forFileId],
        queryFn: async () => {
            return convex.query(api.files.updateFile, {document:document})
        }
    })
}