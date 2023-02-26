import { FieldsContainer, Input, Label } from './Form.styled';

export default function FormField({ inputRef, debounceInput, type }) {
    return <FieldsContainer>
        <Label htmlFor={type}>Country</Label>
        <Input ref={inputRef} type="text" name={type} onChange={(e) => {
            debounceInput(e, type);
        }} />
    </FieldsContainer>;
}
