export const debounce = (fn, delay) => {
    let timerId;
    return function (...args) {
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
};

export function handleFilter(newValue, originalArr, setFilFn, setIsFilDataFn) {
    if (newValue && originalArr) {
        const filteredValues = originalArr.filter(el => el.includes(newValue) && el !== newValue);
        setFilFn(filteredValues);
        setIsFilDataFn(filteredValues.length > 0);
    } else {
        setFilFn([]);
        setIsFilDataFn(false);
    }
}

export function handleSelection(setFn, selectedOption, inputRef, setIfFilFn) {
    setFn(selectedOption);
    inputRef.current.value = selectedOption;
    setIfFilFn(false);
}
