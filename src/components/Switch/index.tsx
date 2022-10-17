import React from 'react'
import styled from 'styled-components'

interface SwitchProps {
  checked?: boolean
  children?: React.ReactNode
  onChange?: (value: boolean) => void
}

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
`

const StyledButton = styled.button<{ checked: boolean }>`
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  width: 44px;
  height: 22px;
  line-height: 20px;
  padding: 0;
  vertical-align: middle;
  border-radius: 20px 20px;
  border: 1px solid ${({ checked }) => (checked ? '#87d068' : '#ccc')};
  background-color: ${({ checked }) => (checked ? '#87d068' : '#ccc')};
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.35, 0, 0.25, 1);
  overflow: hidden;

  &:after {
    position: absolute;
    width: 18px;
    height: 18px;
    left: ${({ checked }) => (checked ? '22px' : '2px')};
    top: 1px;
    border-radius: 50% 50%;
    background-color: #fff;
    content: ' ';
    cursor: pointer;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.26);
    transform: scale(1);
    transition: left 0.3s cubic-bezier(0.35, 0, 0.25, 1);
    animation-timing-function: cubic-bezier(0.35, 0, 0.25, 1);
    animation-duration: 0.3s;
    animation-name: switchOff;
  }

  &:hover:after {
    transform: scale(1.1);
    animation-name: switchOn;
  }

  @keyframes switchOn {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.25);
    }
    100% {
      transform: scale(1.1);
    }
  }

  @keyframes switchOff {
    0% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
`

const StyledLabel = styled.label`
  margin-left: 10px;
  font-weight: 500;
  cursor: pointer;
  color: ${({ theme }) => theme.INTERACTIVE_ACTIVE};
`

export const Switch: React.FC<SwitchProps> = ({
  children,
  checked = false,
  onChange
}) => {
  const [isChecked, setIsChecked] = React.useState(checked)

  const handleChange = () => {
    setIsChecked(!isChecked)
    onChange && onChange(!isChecked)
  }

  return (
    <StyledContainer>
      <StyledButton type="button" checked={isChecked} onClick={handleChange} />
      <StyledLabel onClick={handleChange}>{children}</StyledLabel>
    </StyledContainer>
  )
}
