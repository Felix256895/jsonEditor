import styled, { keyframes } from 'styled-components'

const appearAnimation = keyframes`
  from { 
    transform: scale(0.6) ;
    opacity: 0;
  }
  to { 
    transform: scale(1);
    opacity: 1; 
  }
`

export const StyledModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 36;
  background: rgba(0, 0, 0, 0.85);

  * {
    box-sizing: border-box;
  }
`

export const StyledModalInnerWrapper = styled.div`
  min-width: 440px;
  max-width: 490px;
  width: fit-content;
  animation: ${appearAnimation} 220ms ease-in-out;
  line-height: 20px;

  @media only screen and (max-width: 768px) {
    min-width: 90%;
    max-width: 90%;
  }
`

export const StyledModalTitle = styled.h2`
  font-size: 20px;
  margin: 0;
  color: ${({ theme }) => theme.INTERACTIVE_ACTIVE};
`

export const StyledHeaderWrapper = styled.div`
  background: ${({ theme }) => theme.MODAL_BACKGROUND};
  padding: 16px;
  border-radius: 5px 5px 0 0;
`

export const StyledBodyWrapper = styled.div`
  color: ${({ theme }) => theme.TEXT_NORMAL};
  background: ${({ theme }) => theme.MODAL_BACKGROUND};
  padding: 16px;
  overflow: hidden auto;
`

export const StyledFooterWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  background: ${({ theme }) => theme.BACKGROUND_SECONDARY};
  padding: 16px;
  border-radius: 0 0 5px 5px;
  gap: 10px;
`
