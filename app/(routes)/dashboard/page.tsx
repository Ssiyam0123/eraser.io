"use client";
import Header from "@/app/_components/Header";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import {
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import { useConvex, useMutation, useQuery } from "convex/react";
import React, { useContext, useEffect } from "react";
import DashboardHeader from "./_components/DashboardHeader";
import FileTable from "./_components/FileTable";
import { useFileList } from "@/app/hooks/useFileList";
import { useTeamFiles } from "@/app/hooks/useTeamFiles";
import { FileListContext } from "@/app/_context/FilesListContext";
import Loader from "./_components/Loader";

export default function Dashboard() {
  const { user }: any = useKindeBrowserClient();
  const convex = useConvex();

  const { getFiles } = useContext(FileListContext);

  const { data = [], isLoading } = useTeamFiles(getFiles);
  const createUser = useMutation(api.user.createUser);

  const checkUser = async () => {
    const result = await convex.query(api.user.getUser, { email: user?.email });
    if (!result?.length) {
      createUser({
        name: user?.given_name,
        email: user?.email,
        image: user?.picture,
      }).then((resp) => console.log(resp));
    }
  };

  useEffect(() => {
    if (user) {
      checkUser();
    }
  }, [user]);

  if (isLoading) return <Loader />;
  return (
    <div>
      <DashboardHeader />

      <FileTable getFiles={getFiles} data={data} />
    </div>
  );
}
