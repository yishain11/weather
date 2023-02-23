import { useRef } from 'react';
import { FormEl, FieldsContainer, Label, Input } from './Form.styled';

export default function Form() {
    const countryInput = useRef(null);
    const cityInput = useRef(null)

    function handleSubmit(e) {
        e.preventDefault();
        console.log('values: ');
        console.log('cityInput', cityInput.current.value);
        console.log('countryInput', countryInput.current.value)
    }
    return <FormEl onSubmit={handleSubmit}>
        <FieldsContainer>
            <Label htmlFor="country">Country</Label>
            <Input ref={countryInput} type="text" name='country' />
        </FieldsContainer>
        <FieldsContainer>
            <Label htmlFor="city">City</Label>
            <Input ref={cityInput} type="text" name='city' />
        </FieldsContainer>
        <button>Get Weather</button>
    </FormEl>;
}
