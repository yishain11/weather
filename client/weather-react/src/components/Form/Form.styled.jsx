import styled from 'styled-components';
export const FormEl = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background-color: #095849;
    width: 70%;
    height: 50vh;
    margin: auto;
`;

export const FieldsContainer = styled.p`
    display:flex;
    width: 90%;
    justify-content: space-around;
    align-items: center;
    height: 100%;
`;

export const Label = styled.label`
    width: 40%;
    font-size: 4vw;
    display: flex;
    justify-content: flex-start;
`;

export const Input = styled.input`
    width: 60%;
    height: 5vh;
`;

export const Button = styled.button`
    font-size: 4vw;
`;