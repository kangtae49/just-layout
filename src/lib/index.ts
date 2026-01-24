import type {JustBranch, JustId, JustStack} from "./justLayout.types.ts";
import React from "react";
import './ui/JustLayoutView.css';

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

