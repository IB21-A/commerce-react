import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    :root {
        --maxWidth: 1170px;
        --lightGrey: #aaa;
        --medGrey: #353535;
        --darkGrey: #1c1c1c;
        --red: #Fc0000;
        --transition: all 0.3s linear;
    }

    ::after,
    ::before {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    ul {
        list-style-type: none;
    }

    * {
        box-sizing: border-box;
    }

    body {
        margin: 0;
        padding: 0;
    }
`;
