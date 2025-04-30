import { FileListContext } from "@/app/_context/FilesListContext";
import { FlipHorizontalIcon, GripHorizontal } from "lucide-react";
import React, { useContext } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function FileTable() {
  const { fileList, setFileList } = useContext(FileListContext);

  return (
    <div className="overflow-x-auto bg-black p-4 rounded-md">
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
          {fileList.map((file, i) => (
            <tr
              key={i}
              className="*:text-white *:px-4 *:py-2 *:whitespace-nowrap *:first:sticky *:first:left-0 *:first:bg-gray-800 *:first:font-medium"
            >
              <td>{file?.createdBy}</td>
              <td>{file?.document}</td>
              <td>{file?.fileName}</td>
              <td>{new Date(file?._creationTime).toLocaleString()}</td>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <GripHorizontal />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-gray-800">
                  <DropdownMenuItem>Archive</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
