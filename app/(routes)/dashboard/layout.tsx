"use client";

import { api } from "@/convex/_generated/api";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useConvex } from "convex/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import SideNav from "./_components/SideNav";

export default function DashbordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const convex = useConvex();
  const { user } = useKindeBrowserClient();
  const router = useRouter();

  useEffect(() => {
    if (!user?.email) return;

    const checkTeam = async () => {
      const result = await convex.query(api.teams.getTeam, {
        email: user.email,
      });

      if (!result.length) {
        router.push("/teams/create"); // add `/` to ensure proper routing
      }
    };

    checkTeam();
  }, [user, convex, router]);

  return (
    <div className="grid grid-cols-8">
      <div className="grid col-span-2 border-2">
        <SideNav user={user} />
      </div>
      <div className="grid col-span-6 border-2">{children}</div>
    </div>
  );
}
