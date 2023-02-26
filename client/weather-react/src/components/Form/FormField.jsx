import SuggestionsList from '../suggestionsList/SuggestionsList';
import { FieldsContainer, Input, Label } from './Form.styled';

export default function FormField({ inputRef, debounceInput, type, isData, options, onClickFn }) {
    return <FieldsContainer>
        <Label htmlFor={type}>{type}</Label>
        <Input ref={inputRef} type="text" name={type} onChange={(e) => {
            debounceInput(e, type);
        }} />
        {isData && <SuggestionsList options={options} onClickFn={onClickFn} type={type} />}
    </FieldsContainer>;
}
