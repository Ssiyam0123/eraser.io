"use client";

import { useRouter } from "next/navigation";
import { GripHorizontal } from "lucide-react";
import React, { useContext, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FileListContext } from "@/app/_context/FilesListContext";
import { useGetTeamList } from "@/app/hooks/useGetTeamList";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useTeamFiles } from "@/app/hooks/useTeamFiles";
import Loader from "./Loader";

export default function FileTable({getFiles, data}) {
  // const { getFiles } = useContext(FileListContext);

  // const {data, isLoading} = useTeamFiles(getFiles)
  const router = useRouter();

  // if(isLoading) return <Loader/>


  if (!getFiles || getFiles.length === 0) {
    return <div className="text-white p-4">No files found.</div>;
  }

  return (
    <div className="overflow-x-auto bg-black p-4 rounded-md h-screen">
      <table className="min-w-full divide-y divide-white/20 text-white">
        <thead className="text-left bg-gray-900">
          <tr className="*:font-semibold *:text-white *:first:sticky *:first:left-0 *:first:bg-gray-900">
            <th className="px-4 py-3 whitespace-nowrap">Created By</th>
            <th className="px-4 py-3 whitespace-nowrap">Document</th>
            <th className="px-4 py-3 whitespace-nowrap">File Name</th>
            <th className="px-4 py-3 whitespace-nowrap">Creation Time</th>
            <th className="px-4 py-3 whitespace-nowrap"></th>
          </tr>
        </thead>

        <tbody className="divide-y divide-white/10 bg-gray-800">
          {getFiles &&  data?.map((file) => (
            <tr
              key={file?._id}
              onClick={()=>router.push("workspace/"+file?._id)}
              className="*:text-white *:px-4 *:py-2 *:whitespace-nowrap *:first:sticky *:first:left-0 *:first:bg-gray-800 *:first:font-medium"
            >
              <td className="cursor-pointer">
                {file.createdBy}
              </td>
              <td className="cursor-pointer">
                {file.document}
              </td>
              <td className="cursor-pointer">
                {file.fileName}
              </td>
              <td className="cursor-pointer">
                {new Date(file._creationTime).toLocaleString()}
              </td>
              <td>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <GripHorizontal />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-gray-800">
                    <DropdownMenuItem>Archive</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
