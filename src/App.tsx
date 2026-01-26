import './App.css'
import "./lib/ui/JustLayoutView.css"
import {JustId, JustLayoutView, JustNode, TabTitleProps} from "./lib";
import type {WinInfo} from "./lib";
import {FontAwesomeIcon as Icon} from "@fortawesome/react-fontawesome";
import {faCircleQuestion} from "@fortawesome/free-solid-svg-icons";
import {useJustLayoutStore} from "./lib";
import {useEffect} from "react";
import {toJS} from "mobx";
import TabTitle from "./TabTitle";


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
    getTabTitle: (props: TabTitleProps) => (
      <TabTitle
        {...props}
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

  useEffect(() => {
    justLayoutStore.setTabTitle(aboutId2, "About !!!")
    justLayoutStore.setTabTitleTooltip(aboutId2, "About Tooltip !!!")
    const ids = justLayoutStore.queryWinIdsByViewId("about")
    console.log('ids', toJS(ids))
    justLayoutStore.toggleWin({nodeName: SIDE_MENU_NODE_NAME})
    justLayoutStore.toggleWin({nodeName: SIDE_MENU_NODE_NAME})
    justLayoutStore.showWin({nodeName: SIDE_MENU_NODE_NAME, show: true})
    const size = justLayoutStore.getSizeByNodeName({nodeName: SIDE_MENU_NODE_NAME})
    console.log('size', size)

    const branch = justLayoutStore.getBranchByJustId({justId: aboutId2})
    console.log('branch', toJS(branch))
    const isHide = justLayoutStore.isPrimaryHide({nodeName: SIDE_MENU_NODE_NAME})
    console.log('isHide', isHide)
    justLayoutStore.openWin({justId: aboutId2})

    const tabs = justLayoutStore.getWinIdsByBranch({branch})
    console.log('tabs', toJS(tabs))

    const node = justLayoutStore.getNodeAtBranch({branch})
    console.log('node', toJS(node))

    justLayoutStore.openWinMenu({justId: aboutId2, nodeName: SIDE_MENU_NODE_NAME})


  }, [])

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
