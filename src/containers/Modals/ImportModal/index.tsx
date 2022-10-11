import React, { useState } from 'react'
import useConfig from 'hooks/store/useConfig'
import { AiOutlineUpload } from 'react-icons/ai'
import styled from 'styled-components'
import { Button } from 'components/Button'
import { Input } from 'components/Input'
import { Modal, ModalProps } from 'components/Modal'

const { Header, Body, Footer } = Modal

const StyledBody = styled(Body)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const StyledUploadContainer = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.BACKGROUND_SECONDARY};
  border: 2px dashed ${({ theme }) => theme.BACKGROUND_TERTIARY};
  border-radius: 5px;
  width: 100%;
  min-height: 200px;
  padding: 16px;
  cursor: pointer;

  input[type='file'] {
    display: none;
  }
`

const StyledFileName = styled.span`
  color: ${({ theme }) => theme.INTERACTIVE_NORMAL};
`

const StyledUploadMessage = styled.h3`
  color: ${({ theme }) => theme.INTERACTIVE_ACTIVE};
  margin-bottom: 0;
`

export const ImportModal: React.FC<ModalProps> = ({ visible, setVisible }) => {
  const setJson = useConfig(state => state.setJson)
  const [url, setUrl] = useState('')
  const [file, setFile] = useState('')

  return (
    <Modal visible={visible} setVisible={setVisible}>
      <Header>Import JSON</Header>
      <StyledBody>
        <Input
          type="url"
          value={url}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUrl(e?.target?.value)
          }
          placeholder="URL of JSON to fetch"
        />
        <StyledUploadContainer>
          <input
            value={file}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFile(e?.target?.files?.item[0])
            }
            type="file"
            accept="application/JSON"
          />
          <AiOutlineUpload size={48} />
          <StyledUploadMessage>Click Here to Upload JSON</StyledUploadMessage>
          <StyledFileName>None</StyledFileName>
        </StyledUploadContainer>
      </StyledBody>
      <Footer setVisible={setVisible}>
        <Button status="SECONDARY">Import</Button>
      </Footer>
    </Modal>
  )
}
