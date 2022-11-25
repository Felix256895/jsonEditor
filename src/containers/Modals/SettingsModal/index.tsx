import React from 'react'
import useStored from 'store/useStored'
import styled from 'styled-components'
import shallow from 'zustand/shallow'
import { Modal, ModalProps } from 'components/Modal'
import { Toggle } from 'components/Toggle'

const { Header, Body, Footer } = Modal

const StyledToggle = styled(Toggle)`
  flex-flow: row-reverse;
  background: black;
`

const StyledModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const SettingsModal: React.FC<ModalProps> = ({ visible, setVisible }) => {
  const lightMode = useStored(state => state.lightMode)
  const setLightTheme = useStored(state => state.setLightTheme)
  const [toggleHideCollapse, hideCollapse] = useStored(
    state => [state.toggleHideCollapse, state.hideCollapse],
    shallow
  )
  const [toggleHideChildrenCount, hideChildrenCount] = useStored(
    state => [state.toggleHideChildrenCount, state.hideChildrenCount],
    shallow
  )

  return (
    <Modal visible={visible} setVisible={setVisible}>
      <Header>Settings</Header>
      <Body>
        <StyledModalWrapper>
          <StyledToggle onChange={toggleHideCollapse} checked={hideCollapse}>
            Hide Collapse/Expand Button
          </StyledToggle>
          <StyledToggle
            onChange={toggleHideChildrenCount}
            checked={hideChildrenCount}
          >
            Hide Children Count
          </StyledToggle>
          <StyledToggle
            onChange={() => setLightTheme(!lightMode)}
            checked={lightMode}
          >
            Enable Light Theme
          </StyledToggle>
        </StyledModalWrapper>
      </Body>
      <Footer setVisible={setVisible} />
    </Modal>
  )
}
