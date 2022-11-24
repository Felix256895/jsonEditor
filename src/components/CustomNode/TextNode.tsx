import React, { useRef } from 'react'
import { MdLink, MdLinkOff } from 'react-icons/md'
import useConfig from 'store/useConfig'
import useGraph from 'store/useGraph'
import useStored from 'store/useStored'
import styled from 'styled-components'
import { CustomNodeProps } from './index'
import * as Styles from './style'

const inViewport = true

const StyledWrapper = styled.div<{ hasCollapse: boolean }>`
  display: flex;
  justify-content: ${({ hasCollapse }) =>
    hasCollapse ? 'space-between' : 'center'};
  align-items: center;
  height: 100%;
  width: 100%;
`

const StyledExpand = styled.button`
  pointer-events: all;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.TEXT_NORMAL};
  background: rgba(0, 0, 0, 0.1);
  height: 100%;
  width: 40px;
  border-left: 1px solid ${({ theme }) => theme.BACKGROUND_MODIFIER_ACCENT};

  &:hover {
    background-image: linear-gradient(rgba(0, 0, 0, 0.1) 0 0);
  }
`

const TextNode: React.FC<CustomNodeProps> = ({ node, x, y, hasCollapse }) => {
  const { id, text, width, height, data } = node
  const ref = useRef(null)
  const hideCollapse = useStored(state => state.hideCollapse)
  const hideChildrenCount = useStored(state => state.hideChildrenCount)
  const expandNodes = useGraph(state => state.expandNodes)
  const collapseNodes = useGraph(state => state.collapseNodes)
  const isExpanded = useGraph(state => state.collapsedParents.includes(id))
  const performanceMode = useConfig(state => state.performanceMode)

  const handleExpand = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()

    if (!isExpanded) collapseNodes(id)
    else expandNodes(id)
  }

  return (
    <Styles.StyledForeignObject
      width={width}
      height={height}
      x={0}
      y={0}
      ref={ref}
      hideCollapse={hideCollapse}
      hasCollapse={data.isParent && hasCollapse}
    >
      <StyledWrapper hasCollapse={data.isParent && !hideCollapse}>
        {(!performanceMode || inViewport) && (
          <Styles.StyledKey
            data-x={x}
            data-y={y}
            data-key={JSON.stringify(text)}
            parent={data.isParent}
          >
            <Styles.StyledLinkItUrl>
              {JSON.stringify(text).replaceAll('"', '')}
            </Styles.StyledLinkItUrl>
          </Styles.StyledKey>
        )}

        {data.isParent && data.childrenCount > 0 && !hideChildrenCount && (
          <Styles.StyledChildrenCount>
            ({data.childrenCount})
          </Styles.StyledChildrenCount>
        )}

        {inViewport && data.isParent && hasCollapse && !hideCollapse && (
          <StyledExpand onClick={handleExpand}>
            {isExpanded ? <MdLinkOff size={18} /> : <MdLink size={18} />}
          </StyledExpand>
        )}
      </StyledWrapper>
    </Styles.StyledForeignObject>
  )
}

const propsAreEqual = (prev: CustomNodeProps, next: CustomNodeProps) =>
  prev.node.text === next.node.text && prev.node.width === next.node.width

export default React.memo(TextNode, propsAreEqual)
