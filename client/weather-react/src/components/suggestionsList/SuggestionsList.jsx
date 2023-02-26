import { memo } from 'react';
import { Item, List } from './SuggestionsList.style';

export default memo(function SuggestionsList({ type, options, onClickFn }) {
    console.log('options', options);
    return <List>
        {options.map((option, i) => {
            return <Item key={i} onClick={(e) => {
                e.preventDefault();
                onClickFn(type, option);
            }}>{option}</Item>;
        })}
    </List>;
});
