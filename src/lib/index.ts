import type {JustBranch, JustId, JustStack} from "./justLayout.types.ts";
import React from "react";
import './ui/JustLayoutView.css';
export * from "./json-util.ts";
export * from "./justLayout.constants.ts";
export * from "./justLayout.module.ts";
export * from "./justLayout.service.ts";
export * from "./justLayout.store.ts";
export * from "./justLayout.types.ts";
export * from "./justUtil.ts";
export * from "./useJustLayoutStore.ts";
export {default as JustDraggableTitle} from "./ui/JustDraggableTitle";
export {default as JustLayoutView} from "./ui/JustLayoutView";
export {default as JustNodeView} from "./ui/JustNodeView";
export {default as JustSplitter} from "./ui/JustSplitter";
export {default as JustTabMenu} from "./ui/JustTabMenu";
export {default as JustTabTitle} from "./ui/JustTabTitle";
export {default as JustWinBodyView} from "./ui/JustWinBodyView";
export {default as JustWinTitleView} from "./ui/JustWinTitleView";
export {default as JustWinView} from "./ui/JustWinView";
export type {JustDragItem} from "./ui/JustDraggableTitle.tsx"

export interface WinInfo {
  getTabTitle?: GetTabTitleFn
  getTabIcon: GetTabIconFn
  getView: GetViewFn
}

export interface TabTitleProps {
  justId: JustId
  layoutId: string
  justBranch: JustBranch
  isFullScreenView: boolean
  winInfo: WinInfo
  menuProps: {
    state?: "opening" | "open" | "closing" | "closed"
    endTransition: () => void
  }
  toggleMenu: (open: boolean) => void
  anchorPoint: { x: number; y: number }
}


export type GetWinInfoFn = (justId: JustId) => WinInfo;
export type GetTabTitleFn = ({justId, layoutId, justBranch, isFullScreenView, winInfo}: TabTitleProps) => React.JSX.Element;
export type GetViewFn = (justId: JustId, layoutId: string) => React.JSX.Element;
export type GetTabIconFn = (justId: JustId, layoutId: string) => React.JSX.Element;

export type GetTabMenuFn = (layoutId: string, branch: JustBranch, justStack: JustStack, isFullScreenView: boolean) => React.JSX.Element;

