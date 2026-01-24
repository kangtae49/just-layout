import {JSX} from "react";
import type {JustBranch, JustId, JustStack} from "./justLayout.types.ts";


export interface WinInfo {
  getTabTitle?: GetTabTitleFn
  getTabIcon: GetTabIconFn
  getView: GetViewFn
}
export type GetWinInfoFn = (justId: JustId) => WinInfo;
export type GetTabTitleFn = ({justId: JustId, layoutId: string, justBranch: JustBranch, isFullScreenView: boolean, winInfo: WinInfo}) => JSX.Element;
export type GetViewFn = (justId: JustId, layoutId: string) => JSX.Element;
export type GetTabIconFn = (justId: JustId, layoutId: string) => JSX.Element;

export type GetTabMenuFn = (layoutId: string, branch: JustBranch, justStack: JustStack, isFullScreenView: boolean) => JSX.Element;

