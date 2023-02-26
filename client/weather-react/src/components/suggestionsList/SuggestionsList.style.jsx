import styled from 'styled-components';

export const List = styled.div`
        position: absolute;
        top: 50%;
        left: 40%;
        z-index: 1;
        background-color:#10b1de;
        border: 1px solid #0a93b9;
        opacity: 0.95;
        border-radius: 10px;
        padding: 0;
        margin: 0;
        overflow-y: auto;
        width: 400px;
        font-weight: bold;
        `;

export const Item = styled.div`
        color: #1d0a51;
        padding: 5px;
        cursor: pointer;
        &:hover {
                background-color: #fff;
                
        }
`;