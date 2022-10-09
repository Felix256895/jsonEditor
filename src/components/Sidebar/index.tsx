import React from 'react'
import Link from 'next/link'
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
import { Tooltip } from 'components/Tooltip'

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
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

export const Sidebar: React.FC = () => {
  return (
    <StyledContainer>
      <StyledTopWrapper>
        <Link passHref href="/">
          <StyledElement as={StyledLogo}>
            <StyledText>J</StyledText>
            <StyledText secondary>C</StyledText>
          </StyledElement>
        </Link>

        <Tooltip title="Edit JSON">
          <StyledElement>
            <AiOutlineEdit />
          </StyledElement>
        </Tooltip>
        <Tooltip title="Import File">
          <StyledElement>
            <AiOutlineFileAdd />
          </StyledElement>
        </Tooltip>
        <Tooltip title="Rotate Layout">
          <StyledElement>
            <StyledFlowIcon rotate={0} />
          </StyledElement>
        </Tooltip>
      </StyledTopWrapper>
    </StyledContainer>
  )
}
