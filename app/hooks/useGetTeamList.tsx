import { api } from "@/convex/_generated/api";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useConvex } from "convex/react";
import { useEffect, useState } from "react";

export const useGetTeamList = () => {
    const {user} = useKindeBrowserClient();
    const convex = useConvex();
    const [teamList, setTeamList] = useState()

    const fetchTeamList = async() =>{
        const result = await convex.query(api.teams.getTeam,{email: user?.email})
        setTeamList(result);
    }

    useEffect(()=>{
        fetchTeamList()
    },[user, convex])

   return {teamList}
};

