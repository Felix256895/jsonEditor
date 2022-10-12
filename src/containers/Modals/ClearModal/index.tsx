import React from 'react'
import useConfig from 'hooks/store/useConfig'
import toast from 'react-hot-toast'
import { Button } from 'components/Button'
import { Modal, ModalProps } from 'components/Modal'

const { Header, Body, Footer } = Modal

export const ClearModal: React.FC<ModalProps> = ({ visible, setVisible }) => {
  const setJson = useConfig(state => state.setJson)
  const handleClick = () => {
    setJson('{}')
    toast.success(`Cleared JSON and removed from memory.`)
    setVisible(false)
  }

  return (
    <Modal visible={visible} setVisible={setVisible}>
      <Header>Clear JSON</Header>
      <Body>Are you sure you want to clear JSON?</Body>
      <Footer setVisible={setVisible}>
        <Button status="DANGER" onClick={handleClick}>
          Confirm
        </Button>
      </Footer>
    </Modal>
  )
}
