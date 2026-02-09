import JustNodeView from "./JustNodeView.tsx";
import classNames from "classnames";
import type {GetTabMenuFn, GetWinInfoFn} from "@/lib";
// import type {JustNode} from "@/lib";
import {useJustLayoutStore} from "@/lib";
import {observer} from "mobx-react-lite";
import React from "react";

interface Props extends React.Attributes {
  layoutId: string
  getWinInfo: GetWinInfoFn
  // initialValue: JustNode | null
  getTabMenu?: GetTabMenuFn

}


const JustLayoutView =  observer(({layoutId, getWinInfo, getTabMenu}: Props) => {
  // const {onLoad} = useOnload();
  // const layoutFullScreenId = `${layoutId}_FULLSCREEN`
  const justLayoutStore = useJustLayoutStore(layoutId)
  // const justLayoutFullScreenStore = useJustLayoutStore(layoutFullScreenId)


  // onLoad(() => {
  //   justLayoutStore.setLayout(initialValue)
  //   justLayoutStore.setFullScreenLayoutByBranch(null)
  //   justLayoutFullScreenStore.setLayout(null)
  // })

  // useEffect(() => {
  //   justLayoutStore.setLayout(initialValue)
  // }, [])


  // useEffect(() => {
  //   justLayoutFullScreenStore.setHideTitle(justLayoutStore.hideTitle)
  // }, [justLayoutStore.hideTitle])
  return (
      <div className={classNames(
        "just-layout",
        // "thema-dark"
      )}>
        <JustNodeView
          layoutId={layoutId}
          hideTitle={justLayoutStore.layout?.hideTitle}
          dndAccept={justLayoutStore.layout?.dndAccept ?? []}
          node={justLayoutStore.layout}
          justBranch={[]}
          getWinInfo={getWinInfo}
          getTabMenu={getTabMenu}
        />
      </div>

  )
})

export default JustLayoutView
