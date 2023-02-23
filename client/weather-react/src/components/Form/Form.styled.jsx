import styled from 'styled-components';
export const FormEl = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background-color: #095849;
    width: 30%;
    height: 60%;
    margin: auto;
`;

export const FieldsContainer = styled.p`
    display:flex;
    width: 80%;
    justify-content: space-between;
    align-items: center;
`;

export const Label = styled.label`
    float: left;
`;

export const Input = styled.input`
    float: right;
`;