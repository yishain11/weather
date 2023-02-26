import styled from 'styled-components';
import { Col, Row } from '../Containers/Containers';

export const Title = styled.div`
    font-weight: bold;
    font-size: 3vw;
    text-transform: capitalize; 
`;

export const Data = styled.div`
    font-size: 2vw;
`;

export const DataCol = styled(Col)`
    width: 50%;
    justify-content: space-between;
    align-items: center;
    `;

export const DataRow = styled(Row)`
    border: 1px solid lightcyan;
    border-radius: 5px;
    margin-top: 1rem;
    height: 100%;
    @media screen and (max-width: 480px){
        flex-direction: column;
    }
`;