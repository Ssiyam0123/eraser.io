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
  commandToSave: boolean;
  setcommandToSave: (value: boolean) => void;
};

export default function Whiteboard({
  filedId,
  commandToSave,
  setcommandToSave,
}: Props) {
  const updateWhiteBord = useMutation(api.files.updateWhiteDoc);

  const [updateWhite, setUpdateWhiteBord] = useState();
  const [fileData, setFileData] = useState<any>(null);
  const convex = useConvex();

  const handleUpdate = async () => {
    try {
      const result = await updateWhiteBord({
        _id: filedId,
        document: JSON.stringify(updateWhite),
      });
      toast.success("file updated");
      setcommandToSave(false);
      console.log("✅ Whiteboard saved:", result);
    } catch (err) {
      console.error("❌ Save error:", err);
    }
  };
  useEffect(() => {
    commandToSave && handleUpdate();
  }, [commandToSave]);
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
    <div className="h-screen">
      {fileData && (
        <Excalidraw
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
