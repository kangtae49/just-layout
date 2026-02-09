import {observer} from "mobx-react-lite";
import {MenuItem} from "@szhsin/react-menu";
import {FontAwesomeIcon as Icon} from "@fortawesome/react-fontawesome";
import {faExpand} from "@fortawesome/free-solid-svg-icons";
import type {JustBranch, JustStack} from "./lib";
import {useJustLayoutStore} from "./lib";

interface Prop {
  layoutId: string
  justBranch: JustBranch
  justStack: JustStack
}
const TabMenu = observer(({layoutId, justBranch }: Prop) => {
  const layoutFullScreenId = `${layoutId}_FULLSCREEN`
  const justLayoutStore = useJustLayoutStore(layoutId);
  const justFullScreenLayoutStore = useJustLayoutStore(layoutFullScreenId);
  const closeAllTabs = () => {
    justLayoutStore.removeAllTabs({
      branch: justBranch
    })
  }

  const fullScreenWin = (hideTitle: boolean = false) => {
    if (justFullScreenLayoutStore.layout === null) {
      const justNode = justLayoutStore.getNodeAtBranch({branch: justBranch})
      justFullScreenLayoutStore.setLayout(justNode)
      justFullScreenLayoutStore.setHideTitle(hideTitle)
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
          {justFullScreenLayoutStore.layout !== null ? 'F11' : 'Full'}
        </div>
        <div className="just-icon" />
      </MenuItem>
    </>
  )
})

export default TabMenu
