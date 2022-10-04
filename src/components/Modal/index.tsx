import React from 'react'
import { useKeyPress } from 'hooks/useKeyPress'
import { Button } from 'components/Button'
import * as Styles from './styles'

type FooterProps = React.PropsWithChildren<{
  setVisible: (status: boolean) => void
}>

export type ReactComponent = React.FC<React.PropsWithChildren<{}>>

type ModalType = {
  Header: ReactComponent
  Body: ReactComponent
  Footer: React.FC<FooterProps>
}

export interface ModalProps {
  visible: boolean
  children: React.ReactNode
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const Header: ReactComponent = ({ children }) => (
  <Styles.StyledHeaderWrapper>
    <Styles.StyledModalTitle>{children}</Styles.StyledModalTitle>
  </Styles.StyledHeaderWrapper>
)

const Body: ReactComponent = ({ children }) => (
  <Styles.StyledBodyWrapper>{children}</Styles.StyledBodyWrapper>
)

const Footer: React.FC<FooterProps> = ({ children, setVisible }) => {
  const handleEscapePress = useKeyPress('Escape')

  React.useEffect(() => {
    if (handleEscapePress) setVisible(false)
  }, [setVisible, handleEscapePress])
  return (
    <Styles.StyledFooterWrapper>
      <Button onClick={() => setVisible(false)}>Close</Button>
      {children}
    </Styles.StyledFooterWrapper>
  )
}

export const Modal: React.FC<ModalProps> & ModalType = ({
  children,
  visible,
  setVisible
}) => {
  const handleClick = (e: React.SyntheticEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      setVisible(v => !v)
    }
  }

  if (!visible) return null
  return (
    <Styles.StyledModalWrapper onClick={handleClick}>
      <Styles.StyledModalInnerWrapper>{children}</Styles.StyledModalInnerWrapper>
    </Styles.StyledModalWrapper>
  )
}

Modal.Header = Header
Modal.Body = Body
Modal.Footer = Footer
