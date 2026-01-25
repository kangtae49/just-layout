import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import JustNodeView from "./JustNodeView.tsx";
import classNames from "classnames";
import type {GetTabMenuFn, GetWinInfoFn} from "@/lib";
import type {JustNode} from "@/lib";
import {useJustLayoutStore} from "@/lib";
import {observer} from "mobx-react-lite";
import React, {useEffect} from "react";

interface Props extends React.Attributes {
  layoutId: string
  getWinInfo: GetWinInfoFn
  initialValue: JustNode
  getTabMenu?: GetTabMenuFn

}


function JustLayoutView ({layoutId, getWinInfo, getTabMenu, initialValue}: Props) {
  // const {onLoad} = useOnload();
  const layoutFullScreenId = `${layoutId}_FULLSCREEN`
  const justLayoutStore = useJustLayoutStore(layoutId)
  const justLayoutFullScreenStore = useJustLayoutStore(layoutFullScreenId)

  // onLoad(() => {
  //   justLayoutStore.setLayout(initialValue)
  //   justLayoutStore.setFullScreenLayoutByBranch(null)
  //   justLayoutFullScreenStore.setLayout(null)
  // })

  useEffect(() => {
    if (justLayoutFullScreenStore.layout === null){
      justLayoutStore.setFullScreenLayoutByBranch(null)
      justLayoutStore.setFullScreenHideTitle(false)
    }
  }, [justLayoutFullScreenStore.layout])

  useEffect(() => {
    justLayoutStore.setLayout(initialValue)
    justLayoutStore.setFullScreenLayoutByBranch(null)
    justLayoutFullScreenStore.setLayout(null)

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
        console.log('esc')
        justLayoutStore.setFullScreenLayoutByBranch(null)
      } else if (e.key === 'F11') {
        console.log('F11')
        if (justLayoutStore.fullScreenLayout !== null) {
          justLayoutStore.setFullScreenLayoutByBranch(null)
        }
      }
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




  useEffect(() => {
    console.log('useEffect justLayoutStore.fullScreenLayout', justLayoutStore.fullScreenLayout)
    justLayoutFullScreenStore.setLayout(justLayoutStore.fullScreenLayout)
    if (justLayoutStore.lastActiveId) {
      justLayoutFullScreenStore.activeWin({justId: justLayoutStore.lastActiveId})
    }
  }, [justLayoutStore.fullScreenLayout])

  useEffect(() => {
    justLayoutFullScreenStore.setFullScreenHideTitle(justLayoutStore.fullScreenHideTitle)
  }, [justLayoutStore.fullScreenHideTitle])

  return (
    <DndProvider backend={ HTML5Backend }>
      <div className={classNames(
        "just-layout",
        // "thema-dark"
      )}>
        {justLayoutStore.fullScreenLayout === null &&
          <JustNodeView
            layoutId={layoutId}
            isFullScreenView={false}
            hideTitle={justLayoutStore.layout?.hideTitle}
            dndAccept={justLayoutStore.layout?.dndAccept ?? []}
            node={justLayoutStore.layout}
            justBranch={[]}
            getWinInfo={getWinInfo}
            getTabMenu={getTabMenu}
          />
        }
        {justLayoutStore.fullScreenLayout !== null &&
          <JustNodeView
            layoutId={layoutFullScreenId}
            isFullScreenView={true}
            hideTitle={justLayoutStore.layout?.hideTitle}
            dndAccept={justLayoutStore.layout?.dndAccept ?? []}
            node={justLayoutFullScreenStore.layout}
            justBranch={[]}
            getWinInfo={getWinInfo}
            getTabMenu={getTabMenu}
          />
        }
      </div>
    </DndProvider>
  )
}

export default observer(JustLayoutView)
