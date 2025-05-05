"use client";

import { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";

// Tools
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Paragraph from "@editorjs/paragraph";
import CodeTool from "@editorjs/code";
import ImageTool from "@editorjs/image";
import Table from "@editorjs/table";
import Quote from "@editorjs/quote";

// History plugin
import { useConvex, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import Loader from "@/app/(routes)/dashboard/_components/Loader";

export default function EditorComponent({ filedId, commandToSave, setcommandToSave }: { filedId: any, commandToSave:boolean, setcommandToSave: (value: boolean) => void;}) {
  // console.log("from editor : ",filedId);
  const editorRef = useRef<EditorJS | null>(null);
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [fileData, setFileData] = useState<any>(null);
  const editorHolder = useRef<HTMLDivElement>(null);
  const convex = useConvex();
  const updateDocument = useMutation(api.files.updateFile);
  const [loading, setLoading] = useState(false);
const [now, setnow] = useState<any>()

useEffect(()=>{
  setnow(Date.now() + (performance.now() % 1))
},[commandToSave])
  // console.log(docData)

  const fetchFile = async () => {
    try {
      setLoading(true);
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
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFile();
  }, []);

  useEffect(() => {
    if (!editorRef.current && editorHolder.current && fileData !== null) {
      let parsedData = { blocks: [] };

      try {
        if (fileData.document) {
          const temp = JSON.parse(fileData.document);
          if (temp && typeof temp === "object" && "blocks" in temp) {
            parsedData = temp;
          }
        }
      } catch (error) {
        console.error("❌ JSON.parse failed:", error);
      }

      const editor = new EditorJS({
        holder: editorHolder.current,
        data: parsedData,
        placeholder: "Start creating professional content...",
        tools: {
          header: Header,
          paragraph: Paragraph,
          list: List,
          code: CodeTool,
          image: {
            class: ImageTool,
            config: {
              endpoints: {
                byFile: "/api/upload",
                byUrl: "/api/fetch-url",
              },
            },
          },
          table: Table,

          quote: Quote,
        },
        onReady: () => {
          editorRef.current = editor;

          setIsEditorReady(true);
        },
      });

      return () => {
        editorRef.current?.destroy();
        editorRef.current = null;
      };
    }
  }, [fileData]);

  const handleSave = async () => {
    if (!filedId || !editorRef.current) return;

    try {
      const content = await editorRef.current.save();
      const document = JSON.stringify(content);
      await updateDocument({
        _id: filedId,
        document: document,
        edited: now,
      });

      toast.success("✅ File updated successfully!");
      setcommandToSave(false)
    } catch (error) {
      console.error("❌ Failed to save editor content:", error);
    }
  };

  useEffect(()=>{
    commandToSave && handleSave()
  
  },[commandToSave])


  if (loading) return <Loader />;

  return (
    <div className="w-full border border-gray-700 rounded p-4 bg-gray-900 text-white space-y-4">
      <div id="editorjs" className="mr-5" ref={editorHolder} />

      {/* <Button
        className="cursor-pointer bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-700 transition"
        onClick={handleSave}
        disabled={!isEditorReady}
      >
        Save Content
      </Button> */}
    </div>
  );
}
