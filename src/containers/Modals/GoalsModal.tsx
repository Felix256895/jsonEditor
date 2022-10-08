import React from 'react'
import { GITHUB_URL } from 'constants/url'
import { FaHeart, FaTwitter } from 'react-icons/fa'
import styled from 'styled-components'
import { Button } from 'components/Button'
import { Modal, ModalProps } from 'components/Modal'

const { Header, Body, Footer } = Modal

const StyledTitle = styled.h2`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.TEXT_POSITIVE};
  flex: 1;
  font-weight: 700;
  font-family: 'Catamaran', sans-serif;
  margin-top: 0;

  &::after {
    background: ${({ theme }) => theme.TEXT_POSITIVE};
    height: 1px;

    content: '';
    -webkit-box-flex: 1;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    margin-left: 4px;
    opacity: 0.6;
  }
`

const ButtonsWrapper = styled.div`
  display: flex;
  padding: 40px 0 0;
  gap: 20px;
`

export const GoalsModal: React.FC<ModalProps> = ({ visible, setVisible }) => {
  return (
    <Modal visible={visible} setVisible={setVisible}>
      <Header>Help JSON Crack&apos;s Goals</Header>
      <Body>
        <StyledTitle>OUR GOAL</StyledTitle>
        <b>JSON Crack&apos;s Goal</b> is to keep the service completely free and open
        source for everyone! For the contiunity of our service and keep the new
        updates coming we need your support to make that possible ❤️
        <ButtonsWrapper>
          <Button
            href={GITHUB_URL}
            target="_blank"
            rel="me"
            status="DANGER"
            block
            link
          >
            <FaHeart />
            Sponsor
          </Button>
          <Button
            href={`https://twitter.com/intent/tweet?button=&url=${encodeURIComponent(
              'https://jsoncrack.com'
            )}&text=Looking+to+understand+or+explore+some+JSON?+Just+paste+or+upload+to+visualize+it+as+a+graph+with+JSON+Crack+😍&button=`}
            rel="noreferrer"
            status="SECONDARY"
            block
            link
          >
            <FaTwitter />
            Share on Twitter
          </Button>
        </ButtonsWrapper>
      </Body>
      <Footer setVisible={setVisible} />
    </Modal>
  )
}
