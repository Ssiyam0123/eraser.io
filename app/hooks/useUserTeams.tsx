import { api } from "@/convex/_generated/api";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useQuery } from "@tanstack/react-query";
import { useConvex } from "convex/react";

export const useUserTeams = () => {
  const convex = useConvex();
  const { user } = useKindeBrowserClient();

  return useQuery({
    queryKey: ["teams", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];

      return await convex.query(api.teams.getTeam, { email: user?.email });
    },
  });
};
