import React from 'react'
import useConfig from 'store/useConfig'
import { CustomNodeProps } from 'components/CustomNode'
import * as Styles from './style'

const inViewport = true

const ObjectNode: React.FC<CustomNodeProps> = ({ node, x, y }) => {
  const { text, width, height, data } = node
  const ref = React.useRef(null)
  const performanceMode = useConfig(state => state.performanceMode)

  if (data.isEmpty) return null

  return (
    <Styles.StyledForeignObject
      width={width}
      height={height}
      x={0}
      y={0}
      ref={ref}
      isObject
    >
      {(!performanceMode || inViewport) &&
        text.map((val, idx) => (
          <Styles.StyledRow
            data-key={JSON.stringify(val[1])}
            data-x={x}
            data-y={y}
            key={idx}
          >
            <Styles.StyledKey objectKey>
              {JSON.stringify(val[0]).replaceAll('"', '')}:{' '}
            </Styles.StyledKey>
            <Styles.StyledLinkItUrl>{JSON.stringify(val[1])}</Styles.StyledLinkItUrl>
          </Styles.StyledRow>
        ))}
    </Styles.StyledForeignObject>
  )
}

const propsAreEqual = (prev: CustomNodeProps, next: CustomNodeProps) =>
  String(prev.node.text) === String(next.node.text) &&
  prev.node.width === next.node.width

export default React.memo(ObjectNode, propsAreEqual)
