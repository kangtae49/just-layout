import './App.css'
import "./lib/ui/JustLayoutView.css"
import {
  type JustBranch,
  type JustId,
  JustLayoutView,
  type JustNode,
  type JustStack,
  JustUtil,
  type TabTitleProps
} from "./lib";
import type {WinInfo} from "./lib";
import {FontAwesomeIcon as Icon} from "@fortawesome/react-fontawesome";
import {faCircleQuestion} from "@fortawesome/free-solid-svg-icons";
import {useJustLayoutStore} from "./lib";
import {type JSX, useEffect} from "react";
import {toJS} from "mobx";
import TabTitle from "./TabTitle";
import {observer} from "mobx-react-lite";
import TabMenu from "@/TabMenu.tsx";


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

const viewMap: Record<ViewId, WinInfo> = {
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

const getTabMenu = (layoutId: string, branch: JustBranch, justStack: JustStack): JSX.Element => {
  return (
    <TabMenu layoutId={layoutId} justBranch={branch} justStack={justStack} />
  )
}

const App = observer(() => {
  const layoutId = "LAYOUT_ID"
  const layoutFullScreenId = `${layoutId}_FULLSCREEN`

  const justLayoutStore = useJustLayoutStore(layoutId)
  const justLayoutFullScreenStore = useJustLayoutStore(layoutFullScreenId)


  const openWin = () => {
    const justId: JustId = aboutId2
    console.log('openBoard', justId)
    justLayoutStore.openWinByNodeName({justId, nodeName: SIDE_MENU_NODE_NAME})
  }

  useEffect(() => {
    justLayoutStore.setLayout(initialValue)
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

    if (branch !== null) {
      const tabs = justLayoutStore.getWinIdsByBranch({branch})
      console.log('tabs', toJS(tabs))

      const node = justLayoutStore.getNodeAtBranch({branch})
      console.log('node', toJS(node))
    }

    justLayoutStore.openWinMenu({justId: aboutId2, nodeName: SIDE_MENU_NODE_NAME})

    const title = JustUtil.getParamString({ viewId: "about", title: "About2", params: {title: 'hello'}}, 'title')
    console.log('title', title)
    const title2 = JustUtil.getParam<string>({ viewId: "about", title: "About2", params: {title: 'hello'}}, 'title')
    console.log('title2', title2)
    const xx = JustUtil.withoutDup({viewId: "about", title: "About2", dupId: "xx"})
    console.log('xx', xx)
  }, [])


  useEffect(() => {
    // const removeFullScreen = window.api.onChangeFullScreen((_event, _flag) => {
    // })
    // const removeMaximize = window.api.onChangeMaximize((_event, _flag) => {
    // })

    const handleFullScreenChange = () => {
    }

    const handleKeyDown = async (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        justLayoutFullScreenStore.setLayout(null)
      }
      // else if (e.key === 'F11') {
      // }
      if (e.altKey) {
        if (e.key === 'ArrowRight') {
          if (justLayoutFullScreenStore.layout !== null) {
            justLayoutFullScreenStore.activeNextWin()
          } else {
            justLayoutStore.activeNextWin()
          }
        } else if (e.key === 'ArrowLeft') {
          if (justLayoutFullScreenStore.layout !== null) {
            justLayoutFullScreenStore.activePrevWin()
          } else {
            justLayoutStore.activePrevWin()
          }
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    document.addEventListener('fullscreenchange', handleFullScreenChange);

    return () => {
      // removeFullScreen()
      // removeMaximize()
      window.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
    }
  }, [])

  console.log('justLayoutFullScreenStore.layout', justLayoutFullScreenStore.layout)
  return (


      <div style={{width: "100%", height: "100%"}}>
        <div onClick={openWin}>
          xx
        </div>
        {(justLayoutFullScreenStore.layout === null) &&
          <JustLayoutView
            layoutId={layoutId}
            // initialValue={initialValue}
            getWinInfo={getWinInfo}
            getTabMenu={getTabMenu}
          />
        }
        {justLayoutFullScreenStore.layout !== null &&
            <JustLayoutView
                layoutId={layoutFullScreenId}
                getWinInfo={getWinInfo}
                getTabMenu={getTabMenu}
                // initialValue={null}
            />
        }
      </div>
    // </Provider>
  )
})

export default App
