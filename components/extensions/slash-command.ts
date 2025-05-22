// extensions/slash-command.ts
import { Extension } from "@tiptap/core";
import Suggestion, { SuggestionProps } from "@tiptap/suggestion";
import { ReactRenderer } from "@tiptap/react";
import tippy from "tippy.js";
import CommandList from "./slash/CommandList"; // Component shown in popup
import { Editor } from "@tiptap/react";
import { SuggestionKeyDownProps } from "@tiptap/suggestion";


type CommandItem = {
  title: string;
  description: string;
  command: ({ editor, range }: { editor: Editor; range: any }) => void;
};

const commands: CommandItem[] = [
  {
    title: "Heading 1",
    description: "Big section heading",
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setNode("heading", { level: 1 }).run();
    },
  },
  {
    title: "Heading 2",
    description: "Medium section heading",
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setNode("heading", { level: 2 }).run();
    },
  },
  {
    title: "Bullet List",
    description: "Create a bullet list",
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleBulletList().run();
    },
  },
  {
    title: "Image",
    description: "Upload an image",
    command: ({ editor, range }) => {
      // Just insert empty for now — actual image gets inserted on paste
      editor.chain().focus().deleteRange(range).setImage({ src: "" }).run();
    },
  },
];

export default Extension.create({
  name: "slash-command",

  addOptions() {
    return {
      suggestion: {
        char: "/",
        items: () => commands,
        render: () => {
          let component: ReactRenderer;
          let popup: any;

          return {
            onStart: (props:SuggestionProps) => {
              component = new ReactRenderer(CommandList, {
                props,
                editor: props.editor,
              });

              popup = tippy(document.body, {
                getReferenceClientRect: () => props.clientRect?.() ?? new DOMRect(),
                appendTo: () => document.body,
                content: component.element,
                showOnCreate: true,
                interactive: true,
                trigger: "manual",
                placement: "bottom-start",
              });
              
              
            },
            onUpdate(props:SuggestionProps) {
              component.updateProps(props);
              popup.setProps({ getReferenceClientRect: props.clientRect });
            },
            onKeyDown(props:SuggestionProps) {
              return (component.ref as any).onKeyDown(props);
            },
            onExit() {
              popup.destroy();
              component.destroy();
            },
          };
        },
      },
    };
  },

  addProseMirrorPlugins() {
    return [Suggestion({ editor: this.editor, ...this.options.suggestion })];
  },
});
