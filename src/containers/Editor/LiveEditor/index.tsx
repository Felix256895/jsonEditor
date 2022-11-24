import React from 'react'
import { GraphCanvas } from 'containers/Editor/LiveEditor/GraphCanvas'
import { Tools } from 'containers/Editor/Tools'
import styled from 'styled-components'

const StyledLiveEditor = styled.div`
  position: relative;
  height: 100%;
`

const LiveEditor: React.FC = () => {
  return (
    <StyledLiveEditor>
      <Tools />
      <GraphCanvas />
    </StyledLiveEditor>
  )
}

export default LiveEditor
