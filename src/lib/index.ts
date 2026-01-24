import type {JustBranch, JustId, JustStack} from "./justLayout.types.ts";
import React from "react";
export * from "./inversify.config.ts";
export * from "./json-util.ts";
export * from "./justLayout.constants.ts";
export * from "./justLayout.module.ts";
export * from "./justLayout.service.ts";
export * from "./justLayout.store.ts";
export * from "./justLayout.types.ts";
export * from "./justUtil.ts";
export * from "./useJustLayoutStore.ts";
export * from "./ui/JustDraggableTitle.tsx";
export * from "./ui/JustLayoutView.tsx";
export * from "./ui/JustLayoutView.css";
export * from "./ui/JustNodeView.tsx";
export * from "./ui/JustSplitter.tsx";
export * from "./ui/JustTabMenu.tsx";
export * from "./ui/JustTabTitle.tsx";
export * from "./ui/JustWinBodyView.tsx";
export * from "./ui/JustWinTitleView.tsx";
export * from "./ui/JustWinView.tsx";


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
}


export type GetWinInfoFn = (justId: JustId) => WinInfo;
export type GetTabTitleFn = ({justId, layoutId, justBranch, isFullScreenView, winInfo}: TabTitleProps) => React.JSX.Element;
export type GetViewFn = (justId: JustId, layoutId: string) => React.JSX.Element;
export type GetTabIconFn = (justId: JustId, layoutId: string) => React.JSX.Element;

export type GetTabMenuFn = (layoutId: string, branch: JustBranch, justStack: JustStack, isFullScreenView: boolean) => React.JSX.Element;

