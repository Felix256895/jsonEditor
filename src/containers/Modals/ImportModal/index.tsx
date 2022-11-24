import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { AiOutlineUpload } from 'react-icons/ai'
import useConfig from 'store/useConfig'
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
  const [url, setUrl] = useState<string>('')
  const [file, setFile] = useState<File | null>(null)

  const handleImportFile = () => {
    if (url) {
      setFile(null)
      toast.loading('Loading...', { id: 'toastFetch' })
      return fetch(url)
        .then(res => res.json())
        .then(json => {
          setJson(JSON.stringify(json))
          setVisible(false)
        })
        .catch(() => toast.error('Failed to fetch JSON!'))
        .finally(() => toast.dismiss('toastFetch'))
    }

    if (file) {
      const reader = new FileReader()

      reader.readAsText(file, 'UTF-8')
      reader.onload = function (data) {
        setJson(data.target?.result as string)
        setVisible(false)
      }
    }
  }

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
            key={file?.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFile(e?.target?.files?.item[0])
            }
            type="file"
            accept="application/JSON"
          />
          <AiOutlineUpload size={48} />
          <StyledUploadMessage>Click Here to Upload JSON</StyledUploadMessage>
          <StyledFileName>{file?.name ?? 'None'}</StyledFileName>
        </StyledUploadContainer>
      </StyledBody>
      <Footer setVisible={setVisible}>
        <Button
          status="SECONDARY"
          onClick={handleImportFile}
          disabled={!(file || url)}
        >
          Import
        </Button>
      </Footer>
    </Modal>
  )
}
