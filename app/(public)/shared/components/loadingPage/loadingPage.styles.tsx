import styled from "styled-components";

export const LoadingPageContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #0d0d0d;
    color: white;
    z-index: 999;
    transition: translate .3s ease;
    transition-delay: 700ms;
    translate: 0 -100%;
`
