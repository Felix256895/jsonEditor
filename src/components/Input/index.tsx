import React from 'react'
import styled from 'styled-components'

const StyledInput = styled.input`
  width: 100%;
  height: 40px;
  line-height: 32px;
  border-radius: 4px;
  border: none;
  outline: none;
  background: ${({ theme }) => theme.BACKGROUND_TERTIARY};
  color: ${({ theme }) => theme.INTERACTIVE_NORMAL};
  margin-bottom: 10px;
  padding: 10px;
`

type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export const Input: React.FC<InputProps> = props => <StyledInput {...props} />
