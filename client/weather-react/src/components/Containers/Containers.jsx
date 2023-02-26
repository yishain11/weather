import styled from 'styled-components';

export const ColContainer = styled.div`
    display:flex;
    flex-direction: column;
`;

export const Row = styled.div`
    display:flex;
    width: 50%;
    margin: auto;
    align-items: center;
    justify-content: space-around;
    @media screen and (max-width:480px){
        flex-direction: column;
    }
`;

export const Col = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;