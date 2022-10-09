import React from 'react'
import styled, { DefaultTheme } from 'styled-components'
import { tuple } from '../utils/type'

enum ButtonType {
  PRIMARY = 'PRIMARY',
  SECONDARY = 'BLURPLE',
  DANGER = 'DANGER',
  SUCCESS = 'SEAGREEN',
  WARNING = 'ORANGE'
}

const ButtonHTMLTypes = tuple('submit', 'button', 'reset')
export type ButtonHTMLType = typeof ButtonHTMLTypes[number]

interface BaseButtonProps {
  status?: keyof typeof ButtonType
  block?: boolean
  children?: React.ReactNode
  href?: string
  link?: boolean
}

export type AnchorButtonProps = {
  href: string
  target?: string
  onClick?: React.MouseEventHandler<HTMLElement>
} & BaseButtonProps &
  Omit<React.AnchorHTMLAttributes<any>, 'type' | 'onClick'>
export type NativeButtonProps = {
  htmlType?: ButtonHTMLType
  onClick?: React.MouseEventHandler<HTMLElement>
} & BaseButtonProps &
  Omit<React.ButtonHTMLAttributes<any>, 'type' | 'onClick'>
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

const getButtonStatus = (status: keyof typeof ButtonType, theme: DefaultTheme) =>
  theme[ButtonType[status]]

const StyledButton = styled.button<{
  status: keyof typeof ButtonType
  block: boolean
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ status, theme }) => getButtonStatus(status, theme)};
  color: #fff;
  padding: 8px 16px;
  min-width: 60px;
  min-height: 32px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 3px;
  font-family: 'Catamaran', sans-serif;
  width: ${({ block }) => (block ? '100%' : 'fit-content')};
  height: 40px;
  background-image: none;
  cursor: pointer;

  :disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  div {
    white-space: nowrap;
    margin: 0 auto;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  &:hover {
    background-image: linear-gradient(rgba(0, 0, 0, 0.1) 0 0);
  }

  @media only screen and (min-width: 768px) {
    font-size: 14px;
  }
`
const StyledButtonContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const BaseButton = (props: ButtonProps, ref: any) => {
  const { status, block = false, children, link = false, ...rest } = props
  const buttonRef = (ref as any) || React.createRef<HTMLElement>()

  return (
    <StyledButton
      as={link ? 'a' : 'button'}
      type="button"
      status={status ?? 'PRIMARY'}
      block={block}
      ref={buttonRef}
      {...rest}
    >
      <StyledButtonContent>{children}</StyledButtonContent>
    </StyledButton>
  )
}

export const Button = React.forwardRef<unknown, ButtonProps>(BaseButton)
