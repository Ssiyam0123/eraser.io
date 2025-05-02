import { api } from "@/convex/_generated/api";
import { useQuery } from "@tanstack/react-query";
import { useConvex } from "convex/react"

export const useTeamFiles = (teamId: string | undefined) =>{
    const convex = useConvex();

    return useQuery({
        queryKey: ["files", teamId],
        queryFn: async () => {
            if(!teamId) return [];
            return await convex.query(api.files.getFile, {teamId})
        }
    })
}