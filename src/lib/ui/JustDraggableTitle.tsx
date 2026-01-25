import React, {useCallback, useEffect, useLayoutEffect, useRef, useState} from "react";
import {type DragSourceMonitor, useDrag, useDrop} from "react-dnd";
import type { XYCoord } from 'react-dnd';
import type {WinInfo} from "@/lib";
import type {JustBranch, JustDirection, JustId, JustPos, JustStack} from "@/lib";
import classNames from "classnames";
import {useMenuState} from "@szhsin/react-menu";
import {observer} from "mobx-react-lite";
import JustTabTitle from "./JustTabTitle.tsx";
import {JustUtil, useJustLayoutStore} from "@/lib";

export interface JustDragItem {
  justId: JustId
  direction?: JustDirection
  pos?: JustPos
  index?: number
}

interface Props extends React.Attributes {
  layoutId: string
  isFullScreenView: boolean
  dndAccept: string[]
  justBranch: JustBranch
  justId: JustId
  winInfo: WinInfo
  justStack: JustStack
  rect: DOMRect | null
}

function JustDraggableTitle(props: Props) {
  const {
    layoutId,

    isFullScreenView,
    dndAccept,
    winInfo, justBranch, justId, justStack,
    rect: parentRect
  } = props;
  const ref = useRef<HTMLDivElement | null>(null)
  const [, toggleMenu] = useMenuState();
  const [, setAnchorPoint] = useState({ x: 0, y: 0 });

  const justLayoutStore = useJustLayoutStore(layoutId);



  const [{ isDragging }, drag] = useDrag({
    type: justId.viewId,
    item: {
      justBranch,
      justId,
      index: -1,
    } as JustDragItem,
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const [, drop] = useDrop<JustDragItem, void, { handlerId: any | null }> ({
    accept: dndAccept,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item: JustDragItem, monitor) {
      if (!ref.current) {
        return
      }
      if (justId === item.justId) {
        return
      }
      const hoverBoundingRect = ref.current.getBoundingClientRect()
      const clientOffset = monitor.getClientOffset()
      const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2
      const hoverClientX = (clientOffset as XYCoord).x - hoverBoundingRect.left

      const sourceWinId = item.justId;
      const targetWinId = justId;

      const curTabs = justStack.tabs.filter(tabId => !JustUtil.isEquals(tabId, sourceWinId))
      let targetIndex = JustUtil.indexOf(curTabs, targetWinId)
      if (hoverClientX > hoverMiddleX) {
        targetIndex += 1
      }
      item.pos = 'stack'
      item.index = targetIndex
    }
  })

  useEffect(() => {
    if (JustUtil.isEquals(justId, justLayoutStore.lastActiveId ?? null)) {
      if (ref.current == null) return;
      if (parentRect == null) return;
      const rect = ref.current.getBoundingClientRect();
      if (parentRect.left > rect.left || parentRect.right < rect.right) {
        ref.current.scrollIntoView({
          behavior: 'auto',
          block: 'center',
          inline: 'center'
        })
      }
    }
  }, [justLayoutStore.lastActiveTm])



  useLayoutEffect(() => {
    if (ref.current) {
      drag(drop(ref))
    }
  }, [drop, drag]);

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setAnchorPoint({ x: e.clientX, y: e.clientY });
    toggleMenu(true);
  }, [toggleMenu]);

  // const tabTitleTooltip = justLayoutStore.getTabTitleTooltip(justId)

  return (
    <div
      className={classNames(
        "just-draggable-title",
        "just-title-menus",
        {
          "dragging": isDragging,
          "just-active": JustUtil.isEquals(justStack.active, justId),
          "last-active": JustUtil.isEquals(justLayoutStore.lastActiveId, justId)
        }
      )}
      ref={ref}
      onContextMenu={handleContextMenu}
    >
      {
        winInfo.getTabTitle ?
          winInfo.getTabTitle({justId, layoutId, justBranch, isFullScreenView, winInfo}) :
          <JustTabTitle justId={justId} layoutId={layoutId} justBranch={justBranch} isFullScreenView={isFullScreenView} winInfo={winInfo} />
      }
    </div>
  )
}

export default observer(JustDraggableTitle)
