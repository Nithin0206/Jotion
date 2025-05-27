import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useBlockNote } from "@blocknote/react";
import { useTheme } from "next-themes";
import { useEdgeStore } from "@/lib/edgestore";

// Define the EditorProps interface
interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}

// Create the Editor component
const Editor = ({ onChange, initialContent, editable }: EditorProps) => {
  const { resolvedTheme } = useTheme();
  const { edgestore } = useEdgeStore();

  // Handle file upload logic
  const handleUpload = async (file: File) => {
    try {
      const response = await edgestore.publicFiles.upload({ file });
      return response.url;
    } catch (e) {
      console.error("File upload error:", e);
    }
  };

  // Parse the initial content and ensure it's an array of blocks
  let parsedInitialContent: any = [];

  try {
    if (initialContent) {
      // Try parsing as JSON first
      try {
        parsedInitialContent = JSON.parse(initialContent);
      } catch (jsonError) {
        // If it's not valid JSON, treat it as plain text or HTML
        console.error("Error parsing initialContent as JSON. Treating it as HTML:", jsonError);
        parsedInitialContent = [
          {
            type: 'paragraph',
            content: [{ type: 'text', text: initialContent }],
          },
        ];
      }
    }
  } catch (e) {
    console.error("Error parsing initialContent:", e);
  }

  // Ensure parsedInitialContent is a non-empty array of blocks
  if (!Array.isArray(parsedInitialContent) || parsedInitialContent.length === 0) {
    parsedInitialContent = [
      {
        type: 'paragraph',
        content: [{ type: 'text', text: 'Start typing here...' }],
      },
    ];
  }

  // Create a BlockNote editor instance with the specified editable and initial content
  const editor = useBlockNote({
    editable,
    initialContent: parsedInitialContent,
    uploadFile: handleUpload,
  });

  // Return the BlockNote editor view with the appropriate theme
  return (
    <div>
      <BlockNoteView
        editor={editor}
        theme={resolvedTheme === "dark" ? "dark" : "light"}
        onChange={(editor: { topLevelBlocks: any }) => {
          // Trigger the onChange function with the updated content
          onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
        }}
      />
    </div>
  );
};

export default Editor;
