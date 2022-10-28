import React from 'react'
import useConfig from 'hooks/store/useConfig'
import { CustomNodeProps } from './index'
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
      {!performanceMode &&
        inViewport &&
        text.map((item, index) => (
          <Styles.StyledRow
            data-key={JSON.stringify(item[1])}
            data-x={x}
            data-y={y}
            key={index}
          >
            <Styles.StyledKey objectKey>
              {JSON.stringify(item[0]).replaceAll('', '')}:{' '}
            </Styles.StyledKey>
            <Styles.StyledLinkItUrl>
              {JSON.stringify(item[1])}
            </Styles.StyledLinkItUrl>
          </Styles.StyledRow>
        ))}
    </Styles.StyledForeignObject>
  )
}

const propsAreEqual = (prev: CustomNodeProps, next: CustomNodeProps) => {
  return (
    String(prev.node.text) === String(next.node.text) &&
    prev.node.width === next.node.width
  )
}

export default React.memo(ObjectNode, propsAreEqual)
