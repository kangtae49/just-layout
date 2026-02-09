import JustWinTitleView from "./JustWinTitleView.tsx";
import JustWinBodyView from "./JustWinBodyView.tsx";
import type {GetTabMenuFn, GetWinInfoFn} from "@/lib";
import type {JustBranch, JustStack} from "@/lib";
import {useJustLayoutStore} from "@/lib";
import {observer} from "mobx-react-lite";
import React from "react";

interface Props extends React.Attributes {
  layoutId: string
  hideTitle?: boolean
  dndAccept: string[]
  justBranch: JustBranch
  justStack: JustStack
  getWinInfo: GetWinInfoFn
  getTabMenu?: GetTabMenuFn
}

const JustWinView = observer(({layoutId, hideTitle, dndAccept, justBranch, justStack, getWinInfo, getTabMenu}: Props) => {
  const justLayoutStore = useJustLayoutStore(layoutId)
  const hideTitleOfStore = justLayoutStore.hideTitle;

  const showTitle = hideTitle !== true
  const onFocus = () => {
    if (justStack.active) {
      justLayoutStore.activeWin({justId: justStack.active})
    }
  }
  return (
    <div className="just-win" onFocusCapture={onFocus} tabIndex={1}>
      {(showTitle && !hideTitleOfStore)  &&
        <JustWinTitleView
          layoutId={layoutId}
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
})

export default JustWinView
