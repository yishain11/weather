import styled from 'styled-components';
export const FormEl = styled.form`
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background-color: #07658d;
    width: 70%;
    height: 50vh;
    margin: auto;
    border-radius: 5px;
    display: flex;
    flex-direction: column;

`;

export const FieldsContainer = styled.p`
    display:flex;
    width: 90%;
    justify-content: space-around;
    align-items: center;
    height: 100%;
    @media screen and (max-width: 480px){
        flex-direction: column;
    }
`;

export const Label = styled.label`
    width: 40%;
    font-size: 4vw;
    display: flex;
    justify-content: flex-start;
    @media screen and (max-width: 480px){
        font-size: calc(4rem - 6vw);
        justify-content: center;
    }
`;

export const Input = styled.input`
    width: 60%;
    height: 5vh;
    font-size: 4vh
`;

export const Button = styled.button`
    border-radius: 5px;
    border: 1px solid lightgoldenrodyellow;
    font-size: 4vw;
    background-color: #0f2a74;
    color: white;
    margin-bottom: 1%;
    &:hover {
        background-color: #1c54ee;
        color: white;}
`;