import {observer} from "mobx-react-lite";
import {FontAwesomeIcon as Icon} from "@fortawesome/react-fontawesome";
import {faCircleXmark} from "@fortawesome/free-solid-svg-icons";
import {ControlledMenu, MenuItem, useMenuState} from "@szhsin/react-menu";
import React, {useState} from "react";
import type {JustBranch, JustId} from "@/lib";
import type {WinInfo} from "@/lib";
import {useJustLayoutStore} from "@/lib";

interface Props extends React.Attributes {
  justId: JustId
  layoutId: string
  justBranch: JustBranch
  isFullScreenView: boolean
  winInfo: WinInfo
}

function JustTabTitle({layoutId, justId, winInfo}: Props) {
  console.log('TabTitle justId', justId)
  const [menuProps, toggleMenu] = useMenuState();
  const [anchorPoint, ] = useState({ x: 0, y: 0 });
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
}

export default observer(JustTabTitle)
