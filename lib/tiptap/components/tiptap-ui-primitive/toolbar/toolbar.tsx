"use client"

import * as React from "react"
import { Separator } from "@/lib/tiptap/components/tiptap-ui-primitive/separator"
import "./toolbar.scss"

type BaseProps = React.HTMLAttributes<HTMLDivElement>

interface ToolbarProps extends BaseProps {
  variant?: "floating" | "fixed"
}

const mergeRefs = <T,>(
  refs: Array<React.RefObject<T> | React.Ref<T> | null | undefined>
): React.RefCallback<T> => {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(value)
      } else if (ref != null) {
        ;(ref as React.MutableRefObject<T | null>).current = value
      }
    })
  }
}


export const Toolbar = React.forwardRef<HTMLDivElement, ToolbarProps>(
  ({ children, className, variant = "fixed", ...props }, ref) => {
    const toolbarRef = React.useRef<HTMLDivElement>(null)

    return (
      <div
        ref={mergeRefs([toolbarRef, ref])}
        role="toolbar"
        aria-label="toolbar"
        data-variant={variant}
        className={`tiptap-toolbar ${className || ""}`}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Toolbar.displayName = "Toolbar"

export const ToolbarGroup = React.forwardRef<HTMLDivElement, BaseProps>(
  ({ children, className, ...props }, ref) => {
    const groupRef = React.useRef<HTMLDivElement>(null)


    return (
      <div
        ref={mergeRefs([groupRef, ref])}
        role="group"
        className={`tiptap-toolbar-group ${className || ""}`}
        {...props}
      >
        {children}
      </div>
    )
  }
)

ToolbarGroup.displayName = "ToolbarGroup"

export const ToolbarSeparator = React.forwardRef<HTMLDivElement, BaseProps>(
  ({ ...props }, ref) => {
    const separatorRef = React.useRef<HTMLDivElement>(null)

    return (
      <Separator
        ref={mergeRefs([separatorRef, ref])}
        orientation="vertical"
        decorative
        {...props}
      />
    )
  }
)

ToolbarSeparator.displayName = "ToolbarSeparator"
