import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    :root {
        --maxWidth: 1000px;
        --primary: #0275d8;
        --secondary: #292b2c;
        --lightGrey: #aaa;
        --medLightGrey: #8c8c8c;
        --medGrey: #353535;
        --darkGrey: #1c1c1c;
        --red: #Fc0000;
        --transition: all 0.3s linear;
    }

    *, ::after,
    ::before {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        margin: 0;
        padding: 0;
    }

    .two-columns {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        
    }
`;
