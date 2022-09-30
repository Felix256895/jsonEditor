import React from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { Button } from 'components/Button'

const StyledNotFound = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
`
const StyledMessage = styled.h4`
  color: ${({ theme }) => theme.FULL_WHITE};
  font-size: 25px;
  font-weight: 600;
  margin: 10px 0;
`

const StyledSubMessage = styled.div`
  width: 50%;
  color: ${({ theme }) => theme.SILVER};
  margin-bottom: 25px;
`

const StyledImageWrapper = styled.div`
  width: 300px;
`

const NotFound: React.FC = () => {
  const router = useRouter()

  return (
    <StyledNotFound>
      <StyledImageWrapper>
        <img src="/assets/404.svg" alt="not found" width={300} height={300} />
      </StyledImageWrapper>
      <StyledMessage>WIZARDS BEHIND CURTAINS?</StyledMessage>
      <StyledSubMessage>
        Looks like you&apos;re lost, let&apos;s head back to the home!
      </StyledSubMessage>
      <Button onClick={() => router.push('/')}>Go Home</Button>
    </StyledNotFound>
  )
}

export default NotFound
