import { createGlobalStyle } from "styled-components"

export const GlobalStyles = createGlobalStyle`
  :root {
    --primaryColor: #5856d7;
    --secondaryColor: #ff5c5b;

    --textColor: #DEDEDE;
    --menuColor: #E6E6E6;
    
    --darkBlue: #615de0;

    --systemFont: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  *, *::before, *::after {
    box-sizing: border-box
  }

  html {
    font-size: 62.5%;
    height: 100%;
    margin: 0;
    padding: 0;

    /* @media (max-width: 500px) {
      font-size: 57.5%;
    } */
  }

  body {
    height: 100%;
    background: var(--primaryColor);
    margin: 0;
    padding: 0;
    font-family: var(--systemFont);
    color: var(--textColor);
    overflow: hidden;
  }

  h1, h2, h3, h4, h5, h6 {
    margin-top: 0;
    font-family: var(--systemFont);
    color: #FFE5FB;
  }

  h1 {
    font-size: 4.8rem;
    max-width: 90%;
  }

  h2 {
    font-size: 3.2rem;
  }

  h3 {
    font-size: 2.8rem;
  }

  h4 {
    font-size: 2rem;
    color: var(--textColor);
    font-weight: 500;
    font-family: 'Lora', serif;

  }

  p {
    font-size: 1.6rem;
    line-height: 1.6em;
  }

  a {
    color: var(--menuColor);
    text-decoration: none;
  }

[data-reach-listbox-popover] {
    background: none;
    outline: none;
  }

[data-reach-listbox-option] {
  &:hover {
    background: var(--primaryColor);
    color: #333;
  }
}

  [data-reach-listbox-option][data-current] {
    background: var(--pink);
    color: #333; 
}
`
