import { FormEl, FieldsContainer, Label, Input } from './Form.styled';

export default function Form() {
    function handleSubmit(e) {
        e.preventDefault();
    }
    return <FormEl onSubmit={handleSubmit}>
        <FieldsContainer>
            <Label htmlFor="country">Country</Label>
            <Input type="text" name='country' />
        </FieldsContainer>
        <FieldsContainer>
            <Label htmlFor="city">City</Label>
            <Input type="text" name='city' />
        </FieldsContainer>
        <button>Get Weather</button>
    </FormEl>;
}
