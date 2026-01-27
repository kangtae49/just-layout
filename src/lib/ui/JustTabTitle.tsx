import {observer} from "mobx-react-lite";
import {FontAwesomeIcon as Icon} from "@fortawesome/react-fontawesome";
import {faCircleXmark} from "@fortawesome/free-solid-svg-icons";
import {ControlledMenu, MenuItem} from "@szhsin/react-menu";
import React from "react";
import type {JustBranch, JustId} from "@/lib";
import type {WinInfo} from "@/lib";
import {useJustLayoutStore} from "@/lib";

interface Props extends React.Attributes {
  justId: JustId
  layoutId: string
  justBranch: JustBranch
  winInfo: WinInfo
  menuProps: {
    state?: "opening" | "open" | "closing" | "closed"
    endTransition: () => void
  }
  toggleMenu: (open: boolean) => void
  anchorPoint: { x: number; y: number }
}

const JustTabTitle = observer(({layoutId, justId, winInfo, menuProps, toggleMenu, anchorPoint}: Props) => {
  const justLayoutStore = useJustLayoutStore(layoutId);
  const tabTitleTooltip = justLayoutStore.getTabTitleTooltip(justId)

  const clickClose = (justId: JustId) => {
    justLayoutStore.removeWin({
      justId
    })
  }
  const clickTitle = (_e: React.MouseEvent, justId: JustId) => {
    justLayoutStore.activeWin({
      justId
    })
  }

  return (
    <>
      <div className="just-icon"
           onClick={(e) => clickTitle(e, justId)}
           title={tabTitleTooltip}
      >
        {winInfo.getTabIcon(justId, layoutId)}
      </div>
      <div className="just-title"
           onClick={(e) => clickTitle(e, justId)}
           title={tabTitleTooltip}
      >
        {justLayoutStore.getTabTitle(justId) ?? justId.title}
      </div>

      <div className="just-icon just-close" onClick={() => clickClose(justId)}>
          <Icon icon={faCircleXmark}/>
      </div>
      <ControlledMenu
        state={menuProps.state}
        endTransition={menuProps.endTransition}
        anchorPoint={anchorPoint}
        onClose={() => toggleMenu(false)}
      >
        <MenuItem onClick={() => clickClose(justId)}>
          <div className="just-icon">
          </div>
          <div className="just-title">
            Close
          </div>
          <div className="just-icon" />
        </MenuItem>
      </ControlledMenu>
    </>
  )
})

export default JustTabTitle
