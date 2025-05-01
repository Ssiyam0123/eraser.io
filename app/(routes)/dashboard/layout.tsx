'use client'

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useConvex } from "convex/react";
import { useEffect, useState } from "react";
import SideNav from "./_components/SideNav";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";


export default function DashbordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const convex = useConvex();
  const { user } = useKindeBrowserClient();
  const router = useRouter();
  const [isCheckingTeam, setIsCheckingTeam] = useState(false);

  useEffect(() => {
    if (!user?.email || isCheckingTeam) return;

    const checkTeam = async () => {
      setIsCheckingTeam(true);
      try {
        const result = await convex.query(api.teams.getTeam, {
          email: user.email,
        });

        if (!result?.length) {
          // router.push("/teams/create");
        }
      } finally {
        setIsCheckingTeam(false);
      }
    };

    checkTeam();
  }, [user, convex]);

  return (
    <div className="grid grid-cols-8">
      <div className="grid col-span-2 border-2">
        <SideNav />
      </div>
      <div className="grid col-span-6 border-2">{children}</div>
    </div>
  );
}