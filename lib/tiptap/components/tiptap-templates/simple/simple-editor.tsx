"use client";

import * as React from "react";
import { EditorContent, EditorContext, useEditor } from "@tiptap/react";

// --- Tiptap Core Extensions ---
import { StarterKit } from "@tiptap/starter-kit";
import { Image } from "@tiptap/extension-image";
import { TaskItem } from "@tiptap/extension-task-item";
import { TextAlign } from "@tiptap/extension-text-align";
import { Typography } from "@tiptap/extension-typography";
import { Highlight } from "@tiptap/extension-highlight";
import { Superscript } from "@tiptap/extension-superscript";

// --- Custom Extensions ---
import { Link } from "@/lib/tiptap/components/tiptap-extension/link-extension";
import { Selection } from "@/lib/tiptap/components/tiptap-extension/selection-extension";

// --- UI Primitives ---
import { Button } from "@/lib/tiptap/components/tiptap-ui-primitive/button";
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
} from "@/lib/tiptap/components/tiptap-ui-primitive/toolbar";

// --- Tiptap Node ---
import { ImageUploadNode } from "@/lib/tiptap/components/tiptap-node/image-upload-node/image-upload-node-extension";
import "@/lib/tiptap/components/tiptap-node/list-node/list-node.scss";
import "@/lib/tiptap/components/tiptap-node/image-node/image-node.scss";
import "@/lib/tiptap/components/tiptap-node/paragraph-node/paragraph-node.scss";

// --- Tiptap UI ---
import { HeadingDropdownMenu } from "@/lib/tiptap/components/tiptap-ui/heading-dropdown-menu";
import { ImageUploadButton } from "@/lib/tiptap/components/tiptap-ui/image-upload-button";
import { ListDropdownMenu } from "@/lib/tiptap/components/tiptap-ui/list-dropdown-menu";
import { BlockquoteButton } from "@/lib/tiptap/components/tiptap-ui/blockquote-button";
import {
  ColorHighlightPopover,
  ColorHighlightPopoverContent,
  ColorHighlightPopoverButton,
} from "@/lib/tiptap/components/tiptap-ui/color-highlight-popover";
import {
  LinkPopover,
  LinkContent,
  LinkButton,
} from "@/lib/tiptap/components/tiptap-ui/link-popover";
import { MarkButton } from "@/lib/tiptap/components/tiptap-ui/mark-button";
import { TextAlignButton } from "@/lib/tiptap/components/tiptap-ui/text-align-button";
import { UndoRedoButton } from "@/lib/tiptap/components/tiptap-ui/undo-redo-button";

// --- Icons ---
import { ArrowLeftIcon } from "@/lib/tiptap/components/tiptap-icons/arrow-left-icon";
import { HighlighterIcon } from "@/lib/tiptap/components/tiptap-icons/highlighter-icon";
import { LinkIcon } from "@/lib/tiptap/components/tiptap-icons/link-icon";

// --- Hooks ---
import { useMobile } from "@/lib/tiptap/hooks/use-mobile";
import { useWindowSize } from "@/lib/tiptap/hooks/use-window-size";
import { useCursorVisibility } from "@/lib/tiptap/hooks/use-cursor-visibility";

// --- Lib ---
import { MAX_FILE_SIZE } from "@/lib/tiptap/lib/tiptap-utils";

// --- Styles ---
import "@/lib/tiptap/components/tiptap-templates/simple/simple-editor.scss";
import { useRef, forwardRef, useImperativeHandle, useState } from "react";

const MainToolbarContent = ({
  onHighlighterClick,
  onLinkClick,
  isMobile,
}: {
  onHighlighterClick: () => void;
  onLinkClick: () => void;
  isMobile: boolean;
}) => {
  return (
    <>
      {/* <Spacer /> */}

      <ToolbarGroup>
        <UndoRedoButton action="undo" />
        <UndoRedoButton action="redo" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <HeadingDropdownMenu levels={[1, 2, 3, 4]} />
        <ListDropdownMenu types={["bulletList", "orderedList"]} />
        <BlockquoteButton />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <MarkButton type="bold" />
        <MarkButton type="italic" />
        <MarkButton type="strike" />
        <MarkButton type="underline" />
        {!isMobile ? (
          <ColorHighlightPopover />
        ) : (
          <ColorHighlightPopoverButton onClick={onHighlighterClick} />
        )}
        {!isMobile ? <LinkPopover /> : <LinkButton onClick={onLinkClick} />}
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <MarkButton type="superscript" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <TextAlignButton align="left" />
        <TextAlignButton align="center" />
        <TextAlignButton align="right" />
        <TextAlignButton align="justify" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <ImageUploadButton text="Add" />
      </ToolbarGroup>
      {isMobile && <ToolbarSeparator />}
    </>
  );
};

const MobileToolbarContent = ({
  type,
  onBack,
}: {
  type: "highlighter" | "link";
  onBack: () => void;
}) => (
  <>
    <ToolbarGroup>
      <Button data-style="ghost" onClick={onBack}>
        <ArrowLeftIcon className="tiptap-button-icon" />
        {type === "highlighter" ? (
          <HighlighterIcon className="tiptap-button-icon" />
        ) : (
          <LinkIcon className="tiptap-button-icon" />
        )}
      </Button>
    </ToolbarGroup>

    <ToolbarSeparator />

    {type === "highlighter" ? (
      <ColorHighlightPopoverContent />
    ) : (
      <LinkContent />
    )}
  </>
);

export type SimpleEditorHandle = {
  getPendingFiles: () => Map<string, File>;
};

export const SimpleEditor = forwardRef<
  SimpleEditorHandle,
  {
    value: string;
    onChange: (html: string) => void;
  }
>(({ value, onChange }, ref) => {
  const pendingFilesRef = useRef<Map<string, File>>(new Map());

  useImperativeHandle(ref, () => ({
    getPendingFiles: () => pendingFilesRef.current,
  }));

  const isMobile = useMobile();
  const windowSize = useWindowSize();
  const [mobileView, setMobileView] = useState<"main" | "highlighter" | "link">(
    "main",
  );
  const toolbarRef = React.useRef<HTMLDivElement>(null);

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
      StarterKit.configure({code: false, codeBlock: false}),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      TaskItem.configure({ nested: true }),
      Highlight.configure({ multicolor: true }),
      Image,
      Typography,
      Superscript,
      Selection,
      ImageUploadNode.configure({
        accept: "image/*",
        maxSize: MAX_FILE_SIZE,
        limit: 10,
        upload: async (file: File) => {
          const url = URL.createObjectURL(file);
          pendingFilesRef.current.set(url, file); 
          return url; 
        },
        onError: (error) => console.error("Upload failed:", error),
      }),
      Link.configure({ openOnClick: false }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      const currentBlobUrls = Array.from(pendingFilesRef.current.keys())
      currentBlobUrls.forEach(url => {
        if (!html.includes(url)) {
          pendingFilesRef.current.delete(url)
          URL.revokeObjectURL(url)
        }
      })

      onChange(html)
    },
  });

  const bodyRect = useCursorVisibility({
    editor,
    overlayHeight: toolbarRef.current?.getBoundingClientRect().height ?? 0,
  });

  React.useEffect(() => {
    if (!isMobile && mobileView !== "main") {
      setMobileView("main");
    }
  }, [isMobile, mobileView]);

  return (
    <EditorContext.Provider value={{ editor }}>
      <Toolbar
        ref={toolbarRef}
        style={
          isMobile
            ? {
                bottom: `calc(100% - ${windowSize.height - bodyRect.y}px)`,
              }
            : {}
        }
      >
        {mobileView === "main" ? (
          <MainToolbarContent
            onHighlighterClick={() => setMobileView("highlighter")}
            onLinkClick={() => setMobileView("link")}
            isMobile={isMobile}
          />
        ) : (
          <MobileToolbarContent
            type={mobileView === "highlighter" ? "highlighter" : "link"}
            onBack={() => setMobileView("main")}
          />
        )}
      </Toolbar>

      <div className="content-wrapper">
        <EditorContent
          editor={editor}
          role="presentation"
          className="simple-editor-content"
        />
      </div>
    </EditorContext.Provider>
  );
});
