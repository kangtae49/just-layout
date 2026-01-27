import JustWinView from "./JustWinView.tsx";
import classNames from "classnames";
import * as React from "react";
import JustSplitter, {type SplitSize} from "./JustSplitter.tsx";
import {Activity, type CSSProperties, useRef} from "react";
import type {GetTabMenuFn, GetWinInfoFn} from "@/lib";
import type {JustBranch, JustNode, JustSplit, JustSplitDirection} from "@/lib";
import {useJustLayoutStore} from "@/lib";
import {observer} from "mobx-react-lite";

interface Props extends React.Attributes {
  layoutId: string
  justBranch: JustBranch
  node: JustNode | null
  getWinInfo: GetWinInfoFn
  getTabMenu?: GetTabMenuFn
  hideTitle?: boolean
  dndAccept: string[]
}

const JustNodeView = observer(({layoutId, hideTitle, dndAccept, node, justBranch, getWinInfo, getTabMenu}: Props) => {
  const refNode = useRef<HTMLDivElement | null>(null);

  const justLayoutStore = useJustLayoutStore(layoutId)

  const onResize= ({size}: SplitSize) => {
    justLayoutStore.updateResize({ branch: justBranch, size: size })
  }


  const getStyle = (node: JustSplit, splitDirection: JustSplitDirection): CSSProperties => {

    if (node.type === "split-percentage" && splitDirection === 'first') {
      return {
        flexBasis: `calc(${node.size}% - 3px)`,
        [node.direction === 'row' ? 'minWidth' : 'minHeight']: `${node.minSize ?? 0}%`
      }
    } else if (node.type === "split-pixels" && splitDirection === node.primary) {
      return {
        flexBasis: `${node.size}px`,
        [node.direction === 'row' ? 'minWidth' : 'minHeight']: `${node.minSize ?? 0}px`
      }
    }
    return {}
  }

  return (
    <div ref={refNode}
      className={classNames(
        "just-node",
        )
      }
    >
      {node?.type === 'stack' && (
        <JustWinView
          hideTitle={node.hideTitle ?? hideTitle}
          layoutId={layoutId}
          dndAccept={node.dndAccept ?? dndAccept}
          justStack={node}
          justBranch={justBranch}
          getWinInfo={getWinInfo}
          getTabMenu={getTabMenu}
        />
      )}
      {(node?.type === 'split-percentage' || node?.type === 'split-pixels') && (
        <div key={`JustNode-${justBranch.join(",")}`}
             className={classNames(
               node.type,
               {
                 "just-column": node.direction === 'column',
                 "just-row": node.direction === 'row'
               }
             )}>
          <Activity mode={node.type==='split-pixels' && node.primary === 'first' && node.primaryHide === true ? 'hidden' : 'visible'}>
          <div
            className={classNames("just-first", {
              "just-primary": node.type === "split-percentage" || (node.type === 'split-pixels' && node.primary === 'first'),
              "just-secondary": !(node.type === "split-percentage" || (node.type === 'split-pixels' && node.primary === 'first')),
            })}
            style={getStyle(node, 'first')}
          >
              <JustNodeView
                layoutId={layoutId}
                hideTitle={node.hideTitle ?? hideTitle}
                dndAccept={node.dndAccept ?? dndAccept}
                node={node.first}
                justBranch={[...justBranch, "first"]}
                getWinInfo={getWinInfo}
                getTabMenu={getTabMenu}
              />
          </div>
          </Activity>
          {
            !(node.type === 'split-pixels' && (node.noSplitter === true || node.primaryHide === true))
            &&
            <JustSplitter
              layoutId={layoutId}
              node={node}
              justBranch={justBranch}
              containerRef={refNode}
              onChange={onResize}
              onRelease={onResize}
            />
          }
          <Activity mode={node.type==='split-pixels' && node.primary === 'second' && node.primaryHide === true ? 'hidden' : 'visible'}>
          <div
               className={classNames("just-second", {
                 "just-primary": !(node.type === "split-percentage" || (node.type === 'split-pixels' && node.primary === 'first')),
                 "just-secondary": node.type === "split-percentage" || (node.type === 'split-pixels' && node.primary === 'first'),
               })}
               style={getStyle(node, 'second')}
          >
              <JustNodeView
                layoutId={layoutId}
                hideTitle={node.hideTitle ?? hideTitle}
                dndAccept={node.dndAccept ?? dndAccept}
                node={node.second}
                justBranch={[...justBranch, "second"]}
                getWinInfo={getWinInfo}
                getTabMenu={getTabMenu}
              />
          </div>
          </Activity>
        </div>
      )}

    </div>
  )

})

export default JustNodeView
