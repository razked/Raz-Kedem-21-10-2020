import { createGlobalStyle} from "styled-components"

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.50s linear;
  }

  html {
    font-size: 62.5%;
  }

  * {
    font-family: "Assistant", sans-serif;
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    outline: none;
  }
  `
