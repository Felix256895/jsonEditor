import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  html, body {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Catamaran', sans-serif;
    font-weight: 400;
    font-size: 16px;
    scroll-behavior: smooth;
    color: ${({ theme }) => theme.FULL_WHITE};
    background-color: #000;
    opacity: 1;
    background-image: radial-gradient(#414141 0.5px, #000000 0.5px);
    background-size:10px 10px;

    @media only screen and (min-width: 768px) {
      background-color: #000;
      opacity: 1;
      background-image: radial-gradient(#414141 0.5px, #000000 0.5px);
      background-size:15px 15px;
    }

    * {
      -webkit-tap-highlight-color: transparent;
    }

    a {
      padding: 0;
      margin: 0;
      text-decoration: none;
      color: unset;
      font-family: 'Roboto', sans-serif;
    }

    button {
      border: none;
      outline: none;
      background: transparent;
      width: fit-content;
      padding: 0;
      margin: 0;
      cursor: pointer;
    }
  }
`;

export default GlobalStyle;
