import {JustLayoutStore} from "./justLayout.store.ts";
import type {JSX} from "react";

export type JustDirection = 'row' | 'column';
export type JustSplitDirection = 'first' | 'second';
export type JustSplitType = 'split-percentage' | 'split-pixels';
export type JustType = 'stack' | JustSplitType;

type JSONPrimitive = string | number | boolean | null | undefined;
export type JSONValue =
  | JSONPrimitive
  | JSONValue[]
  | { [key: string]: JSONValue }
export type JSONObject = { [key: string]: JSONValue };

export interface JustId extends JSONObject {
  title: string
  viewId: string
  dupId?: string
  params?: Record<string, JSONValue>
}

export type JustNode = JustStack | JustSplit

export type JustBranch = JustSplitDirection []

export interface NodeInfo {
  node: JustNode
  branch: JustBranch
}


export interface JustNodeBase {
  type: JustType
  name?: string
  dndAccept?: string[]
  hideTitle?: boolean
}

export interface JustStack extends JustNodeBase {
  type: 'stack'
  tabs: JustId[]
  active: JustId | null
}

export type JustSplit = JustSplitPercentage | JustSplitPixels;


export interface JustSplitBase extends JustNodeBase {
  type: JustSplitType
  direction: JustDirection
  first: JustNode
  second: JustNode
  size: number
  minSize?: number
}

export interface JustSplitPercentage extends JustSplitBase {
  type: 'split-percentage'
}

export interface JustSplitPixels extends JustSplitBase {
  type: 'split-pixels'
  primary: JustSplitDirection
  primaryDefaultSize: number
  primaryHide?: boolean
  noSplitter?: boolean
}

export type JustPos = JustSplitDirection | 'stack'


export type JustLayoutFactory = (id: string) => JustLayoutStore;


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

export interface JustDragItem {
  justId: JustId
  direction?: JustDirection
  pos?: JustPos
  index?: number
}

export type GetWinInfoFn = (justId: JustId) => WinInfo;
export type GetTabTitleFn = ({justId, layoutId, justBranch, isFullScreenView, winInfo}: TabTitleProps) => JSX.Element;
export type GetViewFn = (justId: JustId, layoutId: string) => JSX.Element;
export type GetTabIconFn = (justId: JustId, layoutId: string) => JSX.Element;

export type GetTabMenuFn = (layoutId: string, branch: JustBranch, justStack: JustStack, isFullScreenView: boolean) => JSX.Element;

