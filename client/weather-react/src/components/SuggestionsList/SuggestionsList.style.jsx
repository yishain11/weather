import styled from 'styled-components';

export const List = styled.div`
        position: 'absolute';
        top: '100%';
        left: 0;
        right: 0;
        z-index: 1;
        background-color: '#fff';
        border: '1px solid #ccc';
        border-top: 'none';
        padding: 0;
        margin: 0;
        height: 100px;
        overflow-y: auto;
        width: 400px;
`;

export const Item = styled.div`
        padding: '5px';
        cursor: 'pointer'
`;