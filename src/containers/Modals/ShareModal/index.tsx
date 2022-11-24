import React, { useState, useEffect } from 'react'
import { compress } from 'compress-json'
import { baseURL } from 'constants/data'
import toast from 'react-hot-toast'
import { BiErrorAlt } from 'react-icons/bi'
import useConfig from 'store/useConfig'
import styled from 'styled-components'
import { Button } from 'components/Button'
import { Input } from 'components/Input'
import { Modal, ModalProps } from 'components/Modal'

const { Header, Body, Footer } = Modal

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  font-size: 12px;
  padding: 16px 0;
  font-weight: 600;
  line-height: 16px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.INTERACTIVE_NORMAL};
  border-top: 1px solid ${({ theme }) => theme.BACKGROUND_MODIFIER_ACCENT};

  &:first-of-type {
    padding-top: 0;
    border: none;
  }
`

const StyledFlex = styled.div`
  display: flex;
  gap: 12px;
`

const StyledErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  color: ${({ theme }) => theme.TEXT_DANGER};
`

const StyledWarning = styled.p``

export const ShareModal: React.FC<ModalProps> = ({ visible, setVisible }) => {
  const json = useConfig(state => state.json)
  const [encodedJson, setEncodedJson] = useState('')

  const embedText = `<iframe src="${baseURL}/widget?json=${encodedJson}" width="512" height="384" style="border: 2px solid #b9bbbe; border-radius: 6px;"></iframe>`
  const shareURL = `${baseURL}/editor?json=${encodedJson}`

  useEffect(() => {
    if (visible) {
      const jsonEncode = compress(JSON.parse(json))
      const jsonString = JSON.stringify(jsonEncode)

      setEncodedJson(jsonString)
    }
  }, [json, visible])

  const handleShareLink = (val: string) => {
    window?.navigator?.clipboard?.writeText(val)
    toast.success(`Link copied to clipboard.`)
    setVisible(false)
  }

  return (
    <Modal visible={visible} setVisible={setVisible}>
      <Header>Create a Share Link</Header>
      <Body>
        {encodedJson.length > 5000 ? (
          <StyledErrorWrapper>
            <BiErrorAlt size={60} />
            <StyledWarning>
              Link size exceeds 5000 characters, unable to generate link for file of
              this size!
            </StyledWarning>
          </StyledErrorWrapper>
        ) : (
          <>
            <StyledContainer>
              Share Link
              <StyledFlex>
                <Input value={shareURL} type="url" readOnly />
                <Button status="SECONDARY" onClick={() => handleShareLink(shareURL)}>
                  Copy
                </Button>
              </StyledFlex>
            </StyledContainer>
            <StyledContainer>
              Embed into your website
              <StyledFlex>
                <Input value={embedText} type="url" readOnly />
                <Button
                  status="SECONDARY"
                  onClick={() => handleShareLink(embedText)}
                >
                  Copy
                </Button>
              </StyledFlex>
            </StyledContainer>
          </>
        )}
      </Body>
      <Footer setVisible={setVisible} />
    </Modal>
  )
}
