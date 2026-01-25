import JustWinTitleView from "./JustWinTitleView.tsx";
import JustWinBodyView from "./JustWinBodyView.tsx";
import type {GetTabMenuFn, GetWinInfoFn} from "@/lib";
import type {JustBranch, JustStack} from "@/lib";
import {useJustLayoutStore} from "@/lib";
import {observer} from "mobx-react-lite";
import React from "react";

interface Props extends React.Attributes {
  layoutId: string
  isFullScreenView: boolean
  hideTitle?: boolean
  dndAccept: string[]
  justBranch: JustBranch
  justStack: JustStack
  getWinInfo: GetWinInfoFn
  getTabMenu?: GetTabMenuFn
}

function JustWinView ({layoutId, isFullScreenView, hideTitle, dndAccept, justBranch, justStack, getWinInfo, getTabMenu}: Props) {
  const justLayoutStore = useJustLayoutStore(layoutId)
  const fullScreenHideTitle = justLayoutStore.fullScreenHideTitle;

  const showTitle = hideTitle !== true
  const onFocus = () => {
    if (justStack.active) {
      justLayoutStore.activeWin({justId: justStack.active})
    }
  }
  return (
    <div className="just-win" onFocusCapture={onFocus} tabIndex={1}>
      {(showTitle && !fullScreenHideTitle)  &&
        <JustWinTitleView
          layoutId={layoutId}
          isFullScreenView={isFullScreenView}
          dndAccept={dndAccept}
          justBranch={justBranch}
          justStack={justStack}
          getWinInfo={getWinInfo}
          getTabMenu={getTabMenu}
        />
      }
      <JustWinBodyView
        layoutId={layoutId}
        dndAccept={dndAccept}
        justBranch={justBranch}
        justStack={justStack}
        getWinInfo={getWinInfo}
      />
    </div>
  )
}

export default observer(JustWinView)
