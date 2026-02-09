import {observer} from "mobx-react-lite";
import {MenuItem} from "@szhsin/react-menu";
import type {JustBranch, JustStack} from "@/lib";
import {useJustLayoutStore} from "@/lib";

interface Prop {
  layoutId: string
  justBranch: JustBranch
  justStack: JustStack
}
const JustTabMenu = observer(({layoutId, justBranch }: Prop) => {
  const justLayoutStore = useJustLayoutStore(layoutId);
  const closeAllTabs = () => {
    justLayoutStore.removeAllTabs({
      branch: justBranch
    })
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
    </>
  )
})

export default JustTabMenu
