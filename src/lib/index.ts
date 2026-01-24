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
export * from "./ui/JustLayoutView.css";
export {default as JustDraggableTitle} from "./ui/JustDraggableTitle.tsx";
export {default as JustLayoutView} from "./ui/JustLayoutView.tsx";
export {default as JustNodeView} from "./ui/JustNodeView.tsx";
export {default as JustSplitter} from "./ui/JustSplitter.tsx";
export {default as JustTabMenu} from "./ui/JustTabMenu.tsx";
export {default as JustTabTitle} from "./ui/JustTabTitle.tsx";
export {default as JustWinBodyView} from "./ui/JustWinBodyView.tsx";
export {default as JustWinTitleView} from "./ui/JustWinTitleView.tsx";
export {default as JustWinView} from "./ui/JustWinView.tsx";


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

