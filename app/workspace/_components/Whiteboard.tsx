"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Excalidraw, ExcalidrawImperativeAPI } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";
import { useConvex, useMutation, useQuery } from "convex/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

type Props = {
  filedId: Id<"files">;
};

export default function Whiteboard({ filedId }: Props) {
  const excalidrawRef = useRef<ExcalidrawImperativeAPI>(null);
  const updateWhiteBord = useMutation(api.files.updateWhiteDoc);
  const fetchedDocFile = useQuery(api.files.gerDocById, { _id: filedId });
  const [updateWhite, setUpdateWhiteBord] = useState();
  const [fileData, setFileData] = useState<any>(null);
  const convex = useConvex();
  console.log(fileData);

  const handleUpdate = async () => {
    try {
      const result = await updateWhiteBord({
        _id: filedId,
        document: JSON.stringify(updateWhite),
      });
      console.log("✅ Whiteboard saved:", result);
    } catch (err) {
      console.error("❌ Save error:", err);
    }
  };

  const fetchFile = async () => {
    try {
      const result = await convex.query(api.files.getFileById, {
        _id: filedId,
      });

      if (!result) {
        throw new Error("File not found");
      }

      setFileData(result);
      // console.log("📄 File data fetched:", result);
    } catch (error) {
      console.error("❌ Failed to fetch file:", error);
      toast.error("Failed to load file");
    } finally {
    }
  };

  useEffect(() => {
    fetchFile();
  }, []);

  return (
    <div className="h-[70vh]">
      <button
        onClick={handleUpdate}
        className="p-2 bg-green-600 text-white rounded mb-2"
      >
        Save Whiteboard
      </button>

      {fileData && (
        <Excalidraw
          ref={excalidrawRef}
          initialData={{
            elements: JSON.parse(fileData?.whiteboard),
          }}
          onChange={(excalidrawElements) =>
            setUpdateWhiteBord(excalidrawElements)
          }
          theme="dark"
        />
      )}
    </div>
  );
}
