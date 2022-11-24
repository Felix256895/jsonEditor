import React from 'react'
import toast from 'react-hot-toast'
import { FiCopy } from 'react-icons/fi'
import styled from 'styled-components'
import { Button } from 'components/Button'
import { Modal } from 'components/Modal'

const { Header, Body, Footer } = Modal

interface NodeModalProps {
  selectedNode: object
  visible: boolean
  closeModal: () => void
}

const StyledTextarea = styled.textarea`
  resize: none;
  width: 100%;
  min-height: 200px;

  padding: 10px;
  background: ${({ theme }) => theme.BACKGROUND_TERTIARY};
  color: ${({ theme }) => theme.INTERACTIVE_NORMAL};
  outline: none;
  border-radius: 4px;
  line-height: 20px;
  border: none;
`

export const NodeModal = ({ selectedNode, visible, closeModal }: NodeModalProps) => {
  const nodeData = Array.isArray(selectedNode)
    ? Object.fromEntries(selectedNode)
    : selectedNode

  const handleClipboard = () => {
    toast.success('Content copied to clipboard!')
    navigator.clipboard.writeText(JSON.stringify(nodeData))
    closeModal()
  }

  return (
    <Modal visible={visible} setVisible={closeModal}>
      <Header>Node Content</Header>
      <Body>
        <StyledTextarea
          defaultValue={JSON.stringify(
            nodeData,
            (_, v) => {
              if (typeof v === 'string') return v.replaceAll('"', '')
              return v
            },
            2
          )}
          readOnly
        />
      </Body>
      <Footer setVisible={closeModal}>
        <Button status="SECONDARY" onClick={handleClipboard}>
          <FiCopy size={18} /> Clipboard
        </Button>
      </Footer>
    </Modal>
  )
}
