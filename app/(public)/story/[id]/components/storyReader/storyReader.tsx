"use client";

import * as React from "react";
import { EditorContent, EditorContext, useEditor } from "@tiptap/react";

// --- Tiptap Core Extensions ---
import { StarterKit } from "@tiptap/starter-kit";
import { Image } from "@tiptap/extension-image";
import { TextAlign } from "@tiptap/extension-text-align";
import { Highlight } from "@tiptap/extension-highlight";
import { Superscript } from "@tiptap/extension-superscript";

// --- Custom Extensions ---
import { Selection } from "@/lib/tiptap/components/tiptap-extension/selection-extension";

// --- Tiptap Node ---
import "@/lib/tiptap/components/tiptap-node/list-node/list-node.scss";
import "@/lib/tiptap/components/tiptap-node/paragraph-node/paragraph-node.scss";

// --- Hooks ---


export function StoryReader({
  value,
}: {
  value: string;
}) {

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Highlight.configure({ multicolor: true }),
      Image,
      Superscript,
      Selection,
    ],
    content: value,
    editable: false
  });

  return (
    <EditorContext.Provider value={{ editor }}>
    

      <div className="content-wrapper">
        <EditorContent
          editor={editor}
          role="presentation"
          className="simple-editor-content"
        />
      </div>
    </EditorContext.Provider>
  );
}
