import React from 'react'
import styled from 'styled-components'
import { Error } from 'components/Error'
import { MonacoEditor } from 'components/MonacoEditor'

const StyledEditorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: auto;
  user-select: none;
`
export const JsonEditor: React.FC = () => {
  const [hasError, setHasError] = React.useState(false)

  return (
    <StyledEditorWrapper>
      <Error hasError={hasError} />
      <MonacoEditor setHasError={setHasError} />
    </StyledEditorWrapper>
  )
}
