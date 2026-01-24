import {observer} from "mobx-react-lite";
import {MenuItem} from "@szhsin/react-menu";
import {FontAwesomeIcon as Icon} from "@fortawesome/react-fontawesome";
import {faExpand} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import type {JustBranch, JustStack} from "../justLayout.types.ts";
import {useJustLayoutStore} from "../useJustLayoutStore.ts";

interface Prop {
  layoutId: string
  justBranch: JustBranch
  justStack: JustStack
  isFullScreenView: boolean
}
function JustTabMenu ({layoutId, justBranch, isFullScreenView }: Prop) {
  const justLayoutStore = useJustLayoutStore(layoutId);
  const closeAllTabs = () => {
    console.log('closeAllTabs justBranch', justBranch)
    // const winIds: JustId[] = justLayoutStore.getWinIdsByBranch({branch});

    justLayoutStore.removeAllTabs({
      branch: justBranch
    })

  }

  const fullScreenWin = async (hideTitle: boolean = false) => {
    if (isFullScreenView) {
      justLayoutStore.setLayout(null)
    } else {
      justLayoutStore.setFullScreenLayoutByBranch(justBranch)
      justLayoutStore.setFullScreenHideTitle(hideTitle)
    }
  }

  return (
    <>
      <MenuItem className="just-menu-item" onClick={() => closeAllTabs()}>
        <div className="just-icon" />
        <div className="just-title">
          Close All
        </div>
        <div className="just-icon" />
      </MenuItem>
      <MenuItem className="just-menu-item" onClick={() => fullScreenWin(true)}>
        <div className="just-icon">
          <Icon icon={faExpand} />
        </div>
        <div className="just-title">
          {isFullScreenView ? 'F11' : 'Full'}
        </div>
        <div className="just-icon" />
      </MenuItem>
    </>
  )
}

export default observer(JustTabMenu)