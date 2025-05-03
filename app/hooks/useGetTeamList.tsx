import { api } from "@/convex/_generated/api";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useQuery } from "convex/react";
import { useEffect, useState } from "react";


export const useGetTeamList = () => {
    const { user } = useKindeBrowserClient();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    // Using Convex's useQuery for reactive updates
    const teamList = useQuery(api.teams.getTeam, 
        user?.email ? { email: user.email } : "skip"
    );

    useEffect(() => {
        if (teamList !== undefined) {
            setIsLoading(false);
        }
    }, [teamList]);

    // Handle error state
    useEffect(() => {
        if (teamList === null) {
            setError(new Error("No teams found"));
        }
    }, [teamList]);

    return {
        teamList,
        isLoading: isLoading || teamList === undefined,
        error
    };
};