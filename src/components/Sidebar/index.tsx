import React, { useState } from 'react'
import Link from 'next/link'
import { GITHUB_URL, TWITTER_URL } from 'constants/url'
import { ClearModal } from 'containers/Modals/ClearModal'
import { DownloadModal } from 'containers/Modals/DownloadModal'
import { ImportModal } from 'containers/Modals/ImportModal'
import { ShareModal } from 'containers/Modals/ShareModal'
import useConfig from 'hooks/store/useConfig'
import useStored from 'hooks/store/useStored'
import toast from 'react-hot-toast'
import {
  AiOutlineDelete,
  AiFillGithub,
  AiOutlineTwitter,
  AiOutlineSave,
  AiOutlineFileAdd,
  AiOutlineLink,
  AiOutlineEdit
} from 'react-icons/ai'
import {
  CgArrowsMergeAltH,
  CgArrowsMergeAltV,
  CgArrowsShrinkH,
  CgArrowsShrinkV
} from 'react-icons/cg'
import { FiDownload } from 'react-icons/fi'
import { HiHeart } from 'react-icons/hi'
import { MdCenterFocusWeak } from 'react-icons/md'
import { TiFlowMerge } from 'react-icons/ti'
import styled from 'styled-components'
import shallow from 'zustand/shallow'
import { Tooltip } from 'components/Tooltip'

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: fit-content;
  padding: 4px;
  border: 1px solid ${({ theme }) => theme.BACKGROUND_MODIFIER_ACCENT};
  background-color: ${({ theme }) => theme.BACKGROUND_TERTIARY};

  @media only screen and (max-width: 768px) {
    width: 100%;
    flex-direction: row;
  }
`

const StyledTopWrapper = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;

  .mobile {
    display: none;
  }

  @media only screen and (max-width: 768px) {
    justify-content: space-evenly;
    flex-direction: row;

    .mobile {
      display: initial;
    }

    .desktop {
      display: none;
    }
  }
`

const StyledElement = styled.button`
  position: relative;
  display: flex;
  justify-content: center;
  text-align: center;
  font-size: 26px;
  font-weight: 600;
  width: fit-content;
  cursor: pointer;
  color: ${({ theme }) => theme.SIDEBAR_ICONS};
  padding: 12px 8px;

  svg {
    vertical-align: middle;
  }

  a {
    display: flex;
  }

  &:hover :is(a, svg) {
    color: ${({ theme }) => theme.INTERACTIVE_HOVER};
  }

  @media only screen and (max-width: 768px) {
    font-size: 22px;
    padding: 8px 4px;
  }
`

const StyledText = styled.span<{ secondary?: boolean }>`
  color: ${({ theme, secondary }) =>
    secondary ? theme.INTERACTIVE_HOVER : theme.ORANGE};
`

const StyledLogo = styled.a`
  color: ${({ theme }) => theme.FULL_WHITE};
  padding: 8px 4px;
  border-bottom: 1px solid ${({ theme }) => theme.BACKGROUND_MODIFIER_ACCENT};

  @media only screen and (max-width: 768px) {
    border-bottom: 0;
  }
`
const StyledFlowIcon = styled(TiFlowMerge)<{ rotate: number }>`
  transform: rotate(${({ rotate }) => `${rotate}deg`});
`

const StyledBottomWrapper = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  @media only screen and (max-width: 768px) {
    display: none;
  }
`

enum rotateLayout {
  LEFT = 90,
  UP = 180,
  RIGHT = 270,
  DOWN = 360
}

enum getNextLayout {
  UP = 'RIGHT',
  RIGHT = 'DOWN',
  DOWN = 'LEFT',
  LEFT = 'UP'
}

export const Sidebar: React.FC = () => {
  const getJson = useConfig(state => state.getJson)
  const setConfig = useConfig(state => state.setConfig)
  const centerView = useConfig(state => state.centerView)
  const [uploadVisible, setUploadVisible] = useState(false)
  const [clearVisible, setClearVisible] = useState(false)
  const [shareVisible, setShareVisible] = useState(false)
  const [downloadVisible, setDownloadVisible] = useState(false)

  const [expand, layout, hideEditor] = useConfig(
    state => [state.expand, state.layout, state.hideEditor],
    shallow
  )

  const toggleExpandShrink = () => {
    setConfig('expand', !expand)
    toast(`${expand ? 'Shrunk' : 'Expanded'} nodes.`)
  }

  const handleSave = () => {
    const a = document.createElement('a')
    const file = new Blob([getJson()], { type: 'text/plain' })
    a.href = window.URL.createObjectURL(file)
    a.download = 'JSON.json'
    a.click()
  }

  return (
    <StyledContainer>
      <StyledTopWrapper>
        <Link passHref href="/">
          <StyledElement as={StyledLogo}>
            <StyledText>J</StyledText>
            <StyledText secondary>C</StyledText>
          </StyledElement>
        </Link>
        <Tooltip className="mobile" title="Edit JSON">
          <StyledElement onClick={() => setConfig('hideEditor', !hideEditor)}>
            <AiOutlineEdit />
          </StyledElement>
        </Tooltip>
        <Tooltip title="Import File">
          <StyledElement onClick={() => setUploadVisible(true)}>
            <AiOutlineFileAdd />
          </StyledElement>
        </Tooltip>
        <Tooltip title="Rotate Layout">
          <StyledElement onClick={() => setConfig('layout', getNextLayout[layout])}>
            <StyledFlowIcon rotate={rotateLayout[layout]} />
          </StyledElement>
        </Tooltip>
        <Tooltip className="mobile" title="Center View">
          <StyledElement onClick={centerView}>
            <MdCenterFocusWeak />
          </StyledElement>
        </Tooltip>
        <Tooltip className="desktop" title="Shrink Nodes">
          <StyledElement title="Toggle Expand/Shrink" onClick={toggleExpandShrink}>
            {expand ? <CgArrowsMergeAltH /> : <CgArrowsShrinkH />}
          </StyledElement>
        </Tooltip>
        <Tooltip className="desktop" title="Expand Graph">
          <StyledElement>
            <CgArrowsShrinkV />
          </StyledElement>
        </Tooltip>
        <Tooltip className="desktop" title="Save JSON">
          <StyledElement onClick={handleSave}>
            <AiOutlineSave />
          </StyledElement>
        </Tooltip>
        <Tooltip className="mobile" title="Download Image">
          <StyledElement onClick={() => setDownloadVisible(true)}>
            <FiDownload />
          </StyledElement>
        </Tooltip>
        <Tooltip title="Clear JSON">
          <StyledElement onClick={() => setClearVisible(true)}>
            <AiOutlineDelete />
          </StyledElement>
        </Tooltip>
        <Tooltip className="desktop" title="Share">
          <StyledElement onClick={() => setShareVisible(true)}>
            <AiOutlineLink />
          </StyledElement>
        </Tooltip>
      </StyledTopWrapper>
      <StyledBottomWrapper>
        <StyledElement>
          <Link href={TWITTER_URL}>
            <a aria-label="Twitter" rel="me" target="_blank">
              <AiOutlineTwitter />
            </a>
          </Link>
        </StyledElement>
        <StyledElement>
          <Link href={GITHUB_URL}>
            <a aria-label="GitHub" rel="me" target="_blank">
              <AiFillGithub />
            </a>
          </Link>
        </StyledElement>
        <StyledElement>
          <Link href="https://github.com/sponsors/AykutSarac">
            <a aria-label="GitHub Sponsors" rel="me" target="_blank">
              <HiHeart />
            </a>
          </Link>
        </StyledElement>
      </StyledBottomWrapper>
      <ImportModal visible={uploadVisible} setVisible={setUploadVisible} />
      <ClearModal visible={clearVisible} setVisible={setClearVisible} />
      <ShareModal visible={shareVisible} setVisible={setShareVisible} />
      <DownloadModal visible={downloadVisible} setVisible={setDownloadVisible} />
    </StyledContainer>
  )
}
