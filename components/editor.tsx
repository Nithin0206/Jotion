"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import Heading from "@tiptap/extension-heading";
import SlashCommand from "./extensions/slash-command"; // custom slash command extension
import { useEffect } from "react";
import { useTheme } from "next-themes";
import { useEdgeStore } from "@/lib/edgestore";

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}

const Editor = ({ onChange, initialContent, editable = true }: EditorProps) => {
  const { resolvedTheme } = useTheme();
  const { edgestore } = useEdgeStore();

  const editor = useEditor({
    editable,
    extensions: [
      StarterKit.configure({
        heading: false,
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
      Placeholder.configure({
        placeholder: "Enter text or type '/' for commands",
      }),
      Image,
      SlashCommand, // custom extension
    ],
    content: initialContent ? JSON.parse(initialContent) : "",
    onUpdate({ editor }) {
      onChange(JSON.stringify(editor.getJSON(), null, 2));
    },
  });

  useEffect(() => {
    const el = document.querySelector('[data-testid="tiptap-editor"]');

    const handlePasteImage = async (event: Event) => {
      const clipboardEvent = event as ClipboardEvent;
      if (!clipboardEvent.clipboardData?.files.length || !editor) return;
      const file = clipboardEvent.clipboardData.files[0];
      const uploaded = await edgestore.publicFiles.upload({ file });
      editor.chain().focus().setImage({ src: uploaded.url }).run();
    };

    el?.addEventListener("paste", handlePasteImage);
    return () => {
      el?.removeEventListener("paste", handlePasteImage);
    };
  }, [editor]);

  return (
    <div
      data-testid="tiptap-editor"
      className={`p-4 min-h-[400px] prose max-w-none outline-none focus:outline-none transition-colors duration-300 ${
        resolvedTheme === "dark" ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <EditorContent editor={editor} />
    </div>
  );
};

export default Editor;