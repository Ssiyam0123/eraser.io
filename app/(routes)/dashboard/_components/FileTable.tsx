"use client";

import { useRouter } from "next/navigation";
import { GripHorizontal } from "lucide-react";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

// Define types for individual file and component props
type File = {
  _id: string;
  fileName: string;
  _creationTime: string | number;
  edited?: string | number;
};

type FileTableProps = {
  getFiles: () => Promise<File[]>;
  data: File[];
};

export default function FileTable({ getFiles, data }: FileTableProps) {
  const { user } = useKindeBrowserClient();
  const router = useRouter();

  if (!getFiles || data.length === 0) {
    return <div className="text-white p-4">No files found.</div>;
  }

  return (
    <div className="overflow-x-auto bg-black p-4 rounded-md h-screen">
      <table className="min-w-full divide-y divide-white/20 text-white">
        <thead className="text-left bg-gray-900">
          <tr className="*:font-semibold *:text-white *:first:sticky *:first:left-0 *:first:bg-gray-900">
            <th className="px-4 py-3 whitespace-nowrap">File Name</th>
            <th className="px-4 py-3 whitespace-nowrap">Creation Time</th>
            <th className="px-4 py-3 whitespace-nowrap">Edited</th>
            <th className="px-4 py-3 whitespace-nowrap">Author</th>
            <th className="px-4 py-3 whitespace-nowrap"></th>
          </tr>
        </thead>

        <tbody className="divide-y divide-white/10 bg-gray-800">
          {data.map((file) => (
            <tr
              key={file._id}
              onClick={() => router.push("workspace/" + file._id)}
              className="*:text-white *:px-4 *:py-2 *:whitespace-nowrap *:first:sticky *:first:left-0 *:first:bg-gray-800 *:first:font-medium cursor-pointer"
            >
              <td>{file.fileName}</td>
              <td>{new Date(file._creationTime).toLocaleString()}</td>
              <td>
                {file.edited
                  ? new Date(file.edited).toLocaleString()
                  : "Not edited"}
              </td>
              <td>
                <Image
                  height={40}
                  width={40}
                  className="rounded-3xl"
                  src={user?.picture || "/fallback.png"}
                  alt="User avatar"
                />
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
