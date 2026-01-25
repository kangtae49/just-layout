
import {type DropTargetMonitor, useDrop, type XYCoord} from "react-dnd";
import classNames from 'classnames';
import {type JustDragItem} from "@/lib";
import type {GetWinInfoFn} from "..";
import type {JustBranch, JustStack} from "@/lib";
import React, {Activity, useLayoutEffect, useRef, useState} from "react";
import {JustUtil} from "@/lib";
import {useJustLayoutStore} from "@/lib";
import {observer} from "mobx-react-lite";

interface Props extends React.Attributes {
  layoutId: string
  dndAccept: string[]
  justBranch: JustBranch
  justStack: JustStack
  getWinInfo: GetWinInfoFn
}

function JustWinBodyView (props: Props) {
  const ref = useRef<HTMLDivElement | null>(null)

  const { layoutId, dndAccept, getWinInfo, justBranch, justStack } = props;
  const [overlayRect, setOverlayRect] = useState<{ top: number, left: number, width: number, height: number }|null>(null)

  const justLayoutStore = useJustLayoutStore(layoutId);


  const onDrop = (_itemType: any, item: JustDragItem) => {
    if (!item.pos) return;
    if (item.pos === 'stack') {
      justLayoutStore.moveWin({
        pos: item.pos,
        justId: item.justId,
        branch: justBranch,
        index: item.index ?? -1
      })
    } else {
      justLayoutStore.moveWin({
        pos: item.pos,
        justId: item.justId,
        branch: justBranch,
        direction: item.direction ?? 'row',
      })
    }
  }
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: dndAccept,
      collect: (monitor: DropTargetMonitor) => ({
        isOver: monitor.isOver(),
      }),
      drop(_item: JustDragItem, monitor) {
        if (!ref.current) {
          return undefined
        }
        onDrop(monitor.getItemType(), monitor.getItem())
        return undefined
      },
      hover(item: JustDragItem, monitor) {
        if (!ref.current) {
          return
        }
        const hoverBoundingRect = ref.current.getBoundingClientRect()
        const clientOffset = monitor.getClientOffset()
        const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
        const hoverClientX = (clientOffset as XYCoord).x - hoverBoundingRect.left
        const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top
        const distX = hoverClientX - hoverMiddleX
        const distY = hoverClientY - hoverMiddleY
        const percentX = Math.abs((distX * 100) / hoverMiddleX)
        const percentY = Math.abs((distY * 100) / hoverMiddleY)

        if (percentX < 60 && percentY < 60) {
          item.pos = 'stack'
          const overlayRect = {
            top: hoverBoundingRect.top,
            left: hoverBoundingRect.left,
            width: hoverBoundingRect.width,
            height: hoverBoundingRect.height
          }
          setOverlayRect(overlayRect)
        } else {
          const direction = percentX > percentY ? 'row' : 'column'
          const sign = direction === 'row' ? Math.sign(distX) : Math.sign(distY)
          const pos = sign > 0 ? 'second' : 'first'
          item.direction = direction
          item.pos = pos
          // console.log('item: ', item, percentX, percentY)

          const overlayRect = {
            top: (pos === 'second' && direction === 'column') ?  hoverBoundingRect.top + hoverBoundingRect.height/2 : hoverBoundingRect.top,
            left: (pos === 'second' && direction === 'row') ?  hoverBoundingRect.left + hoverBoundingRect.width/2 : hoverBoundingRect.left,
            width: direction === 'row' ? hoverBoundingRect.width/2 : hoverBoundingRect.width,
            height: direction === 'column' ? hoverBoundingRect.height/2 : hoverBoundingRect.height,
          }
          setOverlayRect(overlayRect)
        }
      }
    }), [justStack]
  )

  useLayoutEffect(() => {
    if (ref.current) {
      drop(ref);
    }
  }, [drop]);

  return (
    <div
      className={classNames(
        "just-win-body",
        {
          "isOver": isOver,
          "last-active": JustUtil.isEquals(justStack.active, justLayoutStore.lastActiveId),
        })
      }
      ref={ref}
    >
      {justStack.tabs.map(justId =>
        <Activity key={JustUtil.toString(justId)} mode={JustUtil.isEquals(justStack.active, justId) ? 'visible' : 'hidden'}>
          {getWinInfo(justId).getView(justId, layoutId)}
        </Activity>
      )}

      {
        (isOver && overlayRect != null) &&
        <div className="just-overlay" style={{
          top: overlayRect.top,
          left: overlayRect.left,
          width: `${overlayRect.width}px`,
          height: `${overlayRect.height}px`,
        }} />
      }
    </div>
  )
}

export default observer(JustWinBodyView)
