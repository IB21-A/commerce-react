import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    :root {
        --maxWidth: 1200px;
        --lightGrey: #aaa;
        --medGrey: #353535;
        --darkGrey: #1c1c1c;
        --red: #Fc0000;
    }

    * {
        box-sizing: border-box;
    }

    body {
        margin: 0;
        padding: 0;
    }
`;
