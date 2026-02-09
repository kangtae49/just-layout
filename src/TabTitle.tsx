import {observer} from "mobx-react-lite";
import {FontAwesomeIcon as Icon} from "@fortawesome/react-fontawesome";
import {faCircleXmark, faClone, faExpand} from "@fortawesome/free-solid-svg-icons";
import {ControlledMenu, MenuItem, type MenuState} from "@szhsin/react-menu";
import type {JustBranch, JustId} from "./lib";
import type {WinInfo} from "./lib";
import {useJustLayoutStore} from "./lib";
import {JustUtil} from "./lib";
import React, {type Attributes} from "react";

interface Props extends Attributes {
  justId: JustId
  layoutId: string
  justBranch: JustBranch
  winInfo: WinInfo
  menuProps: {
    state?: MenuState
    endTransition: () => void
  }
  toggleMenu: (open: boolean) => void
  anchorPoint: { x: number; y: number }
}

const TabTitle = observer(({layoutId, justId, justBranch, winInfo, menuProps, toggleMenu, anchorPoint}: Props) => {
  const layoutFullScreenId = `${layoutId}_FULLSCREEN`
  const justLayoutStore = useJustLayoutStore(layoutId);
  const justFullScreenLayoutStore = useJustLayoutStore(layoutFullScreenId);

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
  const cloneWin = (justId: JustId) => {
    const cloneJustId = JustUtil.replaceDup(justId)
    justLayoutStore.cloneTab({
      justId,
      cloneJustId
    })
  }
  const fullScreenWin = (justId: JustId, hideTitle: boolean = false) => {
    justLayoutStore.activeWin({justId})
    if (justFullScreenLayoutStore.layout === null) {
      const justNode = justLayoutStore.getNodeAtBranch({branch: justBranch})
      console.log('fullScreenWin set', justNode)

      justFullScreenLayoutStore.setLayout(justNode)
      justFullScreenLayoutStore.setHideTitle(hideTitle)
    }
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
        <MenuItem onClick={() => cloneWin(justId)}>
            <div className="just-icon">
                <Icon icon={faClone} />
            </div>
            <div className="just-title">
                New
            </div>
            <div className="just-icon" />
        </MenuItem>
        <MenuItem onClick={() => fullScreenWin(justId, true)}>
            <div className="just-icon">
                <Icon icon={faExpand} />
            </div>
            <div className="just-title">
              {justFullScreenLayoutStore.layout !== null ? 'F11' : 'Full'}
            </div>
            <div className="just-icon" />
        </MenuItem>
      </ControlledMenu>
    </>
  )
})

export default TabTitle
