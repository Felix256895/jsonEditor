import React from 'react'
import { MdLink, MdLinkOff } from 'react-icons/md'
import useConfig from 'store/useConfig'
import useGraph from 'store/useGraph'
import useStored from 'store/useStored'
import styled from 'styled-components'
import { CustomNodeProps } from 'components/CustomNode'
import * as Styled from './style'

const inViewport = true

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

const StyledTextNodeWrapper = styled.div<{ hasCollapse: boolean }>`
  display: flex;
  justify-content: ${({ hasCollapse }) =>
    hasCollapse ? 'space-between' : 'center'};
  align-items: center;
  height: 100%;
  width: 100%;
`

const TextNode: React.FC<CustomNodeProps> = ({
  node,
  x,
  y,
  hasCollapse = false
}) => {
  const { id, text, width, height, data } = node
  const ref = React.useRef(null)
  const hideCollapse = useStored(state => state.hideCollapse)
  const hideChildrenCount = useStored(state => state.hideChildrenCount)
  const expandNodes = useGraph(state => state.expandNodes)
  const collapseNodes = useGraph(state => state.collapseNodes)
  const isExpanded = useGraph(state => state.collapsedParents.includes(id))
  const performanceMode = useConfig(state => state.performanceMode)

  const handleExpand = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    !isExpanded ? collapseNodes(id) : expandNodes(id)
  }

  return (
    <Styled.StyledForeignObject
      width={width}
      height={height}
      x={0}
      y={0}
      hideCollapse={hideCollapse}
      hasCollapse={data.isParent && hasCollapse}
      ref={ref}
    >
      <StyledTextNodeWrapper hasCollapse={data.isParent && !hideCollapse}>
        {(!performanceMode || inViewport) && (
          <Styled.StyledKey
            data-x={x}
            data-y={y}
            data-key={JSON.stringify(text)}
            parent={data.isParent}
          >
            <Styled.StyledLinkItUrl>
              {JSON.stringify(text).replaceAll('"', '')}
            </Styled.StyledLinkItUrl>
          </Styled.StyledKey>
        )}

        {data.isParent && data.childrenCount > 0 && !hideChildrenCount && (
          <Styled.StyledChildrenCount>
            ({data.childrenCount})
          </Styled.StyledChildrenCount>
        )}

        {inViewport && data.isParent && hasCollapse && !hideCollapse && (
          <StyledExpand onClick={handleExpand}>
            {isExpanded ? <MdLinkOff size={18} /> : <MdLink size={18} />}
          </StyledExpand>
        )}
      </StyledTextNodeWrapper>
    </Styled.StyledForeignObject>
  )
}

function propsAreEqual(prev: CustomNodeProps, next: CustomNodeProps) {
  return prev.node.text === next.node.text && prev.node.width === next.node.width
}

export default React.memo(TextNode, propsAreEqual)
