import React, { useState } from 'react'
import Link from 'next/link'
import { GITHUB_URL, TWITTER_URL } from 'constants/url'
import { ClearModal } from 'containers/Modals/ClearModal'
import { DownloadModal } from 'containers/Modals/DownloadModal'
import { ImportModal } from 'containers/Modals/ImportModal'
import { ShareModal } from 'containers/Modals/ShareModal'
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
import { VscCollapseAll, VscExpandAll } from 'react-icons/vsc'
import useConfig from 'store/useConfig'
import useGraph from 'store/useGraph'
import styled from 'styled-components'
import shallow from 'zustand/shallow'
import { Tooltip } from 'components/Tooltip'
import { getNextDirection } from 'utils/getNextDirection'

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

const rotateLayout = (direction: 'LEFT' | 'RIGHT' | 'DOWN' | 'UP') => {
  if (direction === 'LEFT') return 90
  if (direction === 'UP') return 180
  if (direction === 'RIGHT') return 270
  return 360
}

export const Sidebar: React.FC = () => {
  const [uploadVisible, setUploadVisible] = useState(false)
  const [clearVisible, setClearVisible] = useState(false)
  const [shareVisible, setShareVisible] = useState(false)
  const [downloadVisible, setDownloadVisible] = useState(false)

  const getJson = useConfig(state => state.getJson)
  const setConfig = useConfig(state => state.setConfig)
  const centerView = useConfig(state => state.centerView)
  const collapseGraph = useGraph(state => state.collapseGraph)
  const expandGraph = useGraph(state => state.expandGraph)
  const setDirection = useGraph(state => state.setDirection)

  const handleSave = () => {
    const a = document.createElement('a')
    const file = new Blob([getJson()], { type: 'text/plain' })
    a.href = window.URL.createObjectURL(file)
    a.download = 'JSON.json'
    a.click()
  }

  const [graphCollapsed, direction] = useGraph(state => [
    state.graphCollapsed,
    state.direction
  ])

  const [foldNodes, hideEditor] = useConfig(
    state => [state.foldNodes, state.hideEditor],
    shallow
  )

  const toggleFoldNodes = () => {
    setConfig('foldNodes', !foldNodes)
    toast(`${foldNodes ? 'Unfolded' : 'Folded'} nodes`)
  }

  const toggleDirection = () => {
    const nextDirection = getNextDirection(direction)
    setDirection(nextDirection)
  }

  const toggleExpandCollapseGraph = () => {
    graphCollapsed ? expandGraph() : collapseGraph()

    toast(`${graphCollapsed ? 'Expanded' : 'Collapsed'} graph.`)
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
          <StyledElement onClick={toggleDirection}>
            <StyledFlowIcon rotate={rotateLayout(direction)} />
          </StyledElement>
        </Tooltip>
        <Tooltip className="mobile" title="Center View">
          <StyledElement onClick={centerView}>
            <MdCenterFocusWeak />
          </StyledElement>
        </Tooltip>
        <Tooltip
          className="desktop"
          title={foldNodes ? 'Unfold Nodes' : 'Fold Nodes'}
        >
          <StyledElement onClick={toggleFoldNodes}>
            {foldNodes ? <CgArrowsShrinkH /> : <CgArrowsMergeAltH />}
          </StyledElement>
        </Tooltip>
        <Tooltip
          className="desktop"
          title={graphCollapsed ? 'Expand Graph' : 'Collapse Graph'}
        >
          <StyledElement onClick={toggleExpandCollapseGraph}>
            {graphCollapsed ? <VscExpandAll /> : <VscCollapseAll />}
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
