"use client";

import * as React from "react";
import { EditorContent, EditorContext, useEditor } from "@tiptap/react";

// --- Tiptap Core Extensions ---
import { StarterKit } from "@tiptap/starter-kit";
import { Image } from "@tiptap/extension-image";
import { TextAlign } from "@tiptap/extension-text-align";
import { Highlight } from "@tiptap/extension-highlight";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";

// --- Custom Extensions ---
import { Selection } from "@/app/tiptap/components/tiptap-extension/selection-extension";

// --- Tiptap Node ---
import "@/app/tiptap/components/tiptap-node/code-block-node/code-block-node.scss";
import "@/app/tiptap/components/tiptap-node/list-node/list-node.scss";
import "@/app/tiptap/components/tiptap-node/paragraph-node/paragraph-node.scss";

// --- Hooks ---
import { useMobile } from "@/app/tiptap/hooks/use-mobile";

// --- Styles ---
import "@/app/tiptap/components/tiptap-templates/simple/simple-editor.scss";


export function StoryReader({
  value,
}: {
  value: string;
}) {
  const isMobile = useMobile();
  const [mobileView, setMobileView] = React.useState<
    "main" | "highlighter" | "link"
  >("main");

  const editor = useEditor({
    immediatelyRender: false,
    editorProps: {
      attributes: {
        autocomplete: "off",
        autocorrect: "off",
        autocapitalize: "off",
        "aria-label": "Main content area, start typing to enter text.",
      },
    },
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Highlight.configure({ multicolor: true }),
      Image,
      Superscript,
      Subscript,
      Selection,
    ],
    content: value,
    editable: false
  });

  React.useEffect(() => {
    if (!isMobile && mobileView !== "main") {
      setMobileView("main");
    }
  }, [isMobile, mobileView]);

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
