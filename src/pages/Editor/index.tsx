import React from 'react'
import Head from 'next/head'
import Panes from 'containers/Editor/Panes'
import styled from 'styled-components'
import { Sidebar } from 'components/Sidebar'

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100vh;

  @media only screen and (max-width: 768px) {
    position: fixed;
    flex-direction: column;
    height: -webkit-fill-available;
  }
`

const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`

const EditorPage = () => (
  <StyledContainer>
    <Head>
      <title>Editor | JSON</title>
      <meta name="description" content="View your JSON data in graphs instantly." />
    </Head>
    <StyledWrapper>
      <Sidebar />
      <StyledContainer>
        <Panes />
      </StyledContainer>
    </StyledWrapper>
  </StyledContainer>
)

export default EditorPage
