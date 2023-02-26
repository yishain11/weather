import { List } from './SuggestionsList.style';

export default function SuggestionsList({ type, options, onClickFn }) {
    console.log('options', options);
    return <List>
        <h1>list</h1>
        {options.map((option) => {
            return <div onClick={() => { onClickFn(type, option); }}>{option}</div>;
        })}
    </List>;
}
