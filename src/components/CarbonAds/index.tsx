import React from 'react'
import Script from 'next/script'
import { CARBONADS } from 'constants/url'
import { IoMdClose } from 'react-icons/io'
import styled from 'styled-components'

const StyledCloseBtn = styled.button`
  display: none;
  width: 3vw;
  height: 3vw;
  position: absolute;
  top: 0;
  right: 0;
  justify-content: center;
  align-items: center;
  opacity: 0.8;
  border-radius: 0;
  background: ${({ theme }) => theme.DANGER};
`

const StyledWrapper = styled.span<{ isEditor?: boolean }>`
  position: relative;
  display: flex;

  #carbonads {
    width: 100%;
    display: flex;
  }

  ${({ theme, isEditor }) =>
    isEditor &&
    `
      #carbonads {
        border-radius: 0;
        border-top: 1px solid ${theme.BACKGROUND_MODIFIER_ACCENT};
      }

      #carbonads > span {
        max-width: 100%;
        width: 100%;
      }
  `};

  &:hover {
    ${StyledCloseBtn} {
      display: flex;
    }
  }

  @media all and (display-mode: standalone) {
    #carbonads {
      display: none;
    }
  }
`

export const CarbonAds: React.FC<{ isEditor?: boolean }> = ({
  isEditor = false
}) => {
  const [hidden, setHidden] = React.useState<boolean>(false)

  if (hidden) return null

  return (
    <StyledWrapper isEditor={isEditor} id="carbon-wrapper">
      {isEditor && (
        <StyledCloseBtn onClick={() => setHidden(true)}>
          <IoMdClose color="white" size="15" />
        </StyledCloseBtn>
      )}
      <>
        <Script
          type="text/javascript"
          src={CARBONADS}
          id="_carbonads_js"
          strategy="lazyOnload"
          onLoad={() => {
            const init = () => {
              const parent = document.getElementById('carbon-wrapper')
              const ads = document.getElementById('carbonads')

              if (ads === null) return setTimeout(() => init(), 500)

              parent?.appendChild(ads)
            }

            init()
          }}
        />
      </>
    </StyledWrapper>
  )
}
