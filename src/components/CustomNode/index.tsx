import React from 'react'
import { Node, NodeProps } from 'reaflow'
import ObjectNode from './ObjectNode'
import TextNode from './TextNode'

export interface CustomNodeProps {
  node: NodeData
  x: number
  y: number
  hasCollapse?: boolean
}

const rootProps = {
  width: 40,
  height: 40,
  rx: 50,
  ry: 50
}

export const CustomNode: React.FC<NodeProps> = NodeProps => {
  const { text, data } = NodeProps.properties
  return (
    <Node {...NodeProps} {...(data.isEmpty && rootProps)} lable={<React.Fragment />}>
      {({ node, x, y }) => {
        if (Array.isArray(text)) {
          return <ObjectNode node={node as NodeData} x={x} y={y} />
        }

        return (
          <TextNode
            hasCollapse={data.childrenCount > 0}
            node={node as NodeData}
            x={x}
            y={y}
          />
        )
      }}
    </Node>
  )
}
