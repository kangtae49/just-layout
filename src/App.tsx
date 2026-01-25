import './App.css'
import "./lib/ui/JustLayoutView.css"
import JustLayoutView from "./lib/ui/JustLayoutView.tsx";
import type {JustId, JustNode} from "./lib/justLayout.types.ts";
import type {WinInfo} from "./lib";
import TabTitle from "./TabTitle.tsx";
import {FontAwesomeIcon as Icon} from "@fortawesome/react-fontawesome";
import {faCircleQuestion} from "@fortawesome/free-solid-svg-icons";
import {useJustLayoutStore} from "./lib";
import {Provider} from "inversify-react";
import {container} from "./inversify.config";


export type ViewId = "about"

const aboutId1: JustId = { viewId: "about", title: "About1"}
const aboutId2: JustId = { viewId: "about", title: "About2"}

const SIDE_MENU_NODE_NAME = "SideMenu"
const CONTENTS_VIEW = "Contents"

const initialValue: JustNode = {
  type: 'split-pixels',
  name: SIDE_MENU_NODE_NAME,
  direction: 'row',
  primary: 'first',
  primaryDefaultSize: 200,
  size: 200,
  // minSize: 38,
  first: {
    type: 'stack',
    tabs: [aboutId1],
    active: aboutId1,
    hideTitle: true,
  },
  second: {
    type: 'stack',
    name: CONTENTS_VIEW,
    dndAccept: ["about"],
    tabs: [aboutId2],
    active: aboutId2,
  },
}

// const initialValue: JustNode = {
//   type: "stack",
//   tabs: [aboutId1, aboutId2],
//   active: aboutId1,
//   dndAccept: ["about"],
// }

export const viewMap: Record<ViewId, WinInfo> = {
  "about": {
    getTabTitle: ({justId, layoutId, justBranch, isFullScreenView, winInfo}) => (
      <TabTitle
        justId={justId}
        layoutId={layoutId}
        justBranch={justBranch}
        isFullScreenView={isFullScreenView}
        winInfo={winInfo}
      />
    ),
    getTabIcon: () => <Icon icon={faCircleQuestion} />,
    getView: () => <div>About</div>,
  },
}

const getWinInfo = (justId: JustId): WinInfo => {
  const viewId = justId.viewId as ViewId;
  return viewMap[viewId]
}

// const getTabMenu = (layoutId: string, branch: JustBranch, justStack: JustStack, isFullScreenView: boolean): JSX.Element => {
//   return (
//     <TabMenu layoutId={layoutId} justBranch={branch} justStack={justStack} isFullScreenView={isFullScreenView} />
//   )
// }

function App() {
  const layoutId = "LAYOUT_ID"

  // const layoutFullScreenId = `${layoutId}_FULLSCREEN`
  const justLayoutStore = useJustLayoutStore(layoutId)


  const openWin = () => {
    const justId: JustId = aboutId2
    console.log('openBoard', justId)
    justLayoutStore.openWinByNodeName({justId, nodeName: SIDE_MENU_NODE_NAME})
  }

  // const justLayoutFullScreenStore = useJustLayoutStore(layoutFullScreenId)
  // useEffect(() => {
  //   console.log('useEffect justLayoutFullScreenStore.layout', justLayoutFullScreenStore.layout)
  //   const isFull = justLayoutFullScreenStore.layout !== null
  //   console.log('isFull', isFull)
  //   if (!isFull) {
  //     justLayoutStore.setFullScreenLayoutByBranch(null)
  //     justLayoutStore.setFullScreenHideTitle(false)
  //   }
  //   const changeScreen = async (isFull: boolean) => {
  //     const isFullScreen = await window.api.isFullScreen()
  //     if (isFullScreen !== isFull) {
  //       await window.api.setFullScreen(isFull)
  //     }
  //
  //     const isMaximized = await window.api.isMaximized();
  //     if (isMaximized !== isFull) {
  //       if (isFull) {
  //         window.api.maximize()
  //       } else {
  //         window.api.unmaximize()
  //       }
  //     }
  //   }
  //   changeScreen(isFull)
  //
  // }, [justLayoutFullScreenStore.layout])
  return (


      <div style={{width: "100%", height: "100%"}}>
        <div onClick={openWin}>
          xx
        </div>
        <JustLayoutView
          layoutId={layoutId}
          initialValue={initialValue}
          getWinInfo={getWinInfo}
          // getTabMenu={getTabMenu}
        />
      </div>
    // </Provider>
  )
}

export default App
