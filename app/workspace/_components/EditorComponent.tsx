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
import Checklist from "@editorjs/checklist";
import Quote from "@editorjs/quote";
import Embed from "@editorjs/embed";

// History plugin
import Undo from "editorjs-undo";
import { Button } from "@/components/ui/button";
import { useConvex, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

export default function EditorComponent(filedId) {
    console.log(filedId)
  const editorRef = useRef<EditorJS | null>(null);
  const [isEditorReady, setIsEditorReady] = useState(false);
  const editorHolder = useRef<HTMLDivElement>(null);

  const updateDocument = useMutation(api.files.updateFile);

  useEffect(() => {
    if (!editorRef.current && editorHolder.current) {
      const editor = new EditorJS({
        holder: editorHolder.current,
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
          checklist: Checklist,
          quote: Quote,
          embed: {
            class: Embed,
            config: {
              services: {
                youtube: true,
                codepen: true,
                twitter: true,
              },
            },
          },
        },
        onReady: () => {
          editorRef.current = editor;

          const undo = new Undo({ editor });
          undo.initialize();

          // Add custom keyboard shortcut for Redo
          window.addEventListener("keydown", (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "y") {
              e.preventDefault();
              undo.redo();
            }
          });

          setIsEditorReady(true);
        },
      });

      return () => {
        editorRef.current?.destroy();
        editorRef.current = null;
      };
    }
  }, []);

  const handleSave = async () => {
    if (filedId && editorRef.current) {
      try {
        const content = await editorRef.current.save();
        // console.log("✅ Saved content:", content);
        console.log("✅ Stringyfy content:", JSON.stringify(content));
        updateDocument({ _id: filedId?.fileId, document: JSON.stringify(content) });
        toast.success("file updated successfully");
        // You can now send this to your backend
      } catch (err) {
        console.error("❌ Saving failed", err);
      }
    }
  };

  return (
    <div className="w-full border border-gray-700 rounded p-4 bg-gray-900 text-white space-y-4">
      <div id="editorjs" className="mr-5" ref={editorHolder} />
      {isEditorReady && (
        <p className="text-sm text-gray-400">Loading editor...</p>
      )}

      <Button
        className="bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-700 transition"
        onClick={handleSave}
        disabled={isEditorReady}
      >
        Save Content
      </Button>
    </div>
  );
}
