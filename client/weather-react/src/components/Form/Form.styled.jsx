import styled from 'styled-components';
export const FormEl = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background-color: #095849;
    width: 70%;
    height: 70%;
    margin: auto;
`;

export const FieldsContainer = styled.p`
    display:flex;
    width: 90%;
    justify-content: space-around;
    align-items: center;
`;

export const Label = styled.label`
    width: 40%;
`;

export const Input = styled.input`
    width: 60%;
`;