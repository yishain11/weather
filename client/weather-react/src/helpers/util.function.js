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

export function processDailyWeather(dailyWeatherObj) {
    const termsMap = {
        temperature_2m_max: 'temperature',
        windspeed_10m_max: 'windspeed'
    };
    const timeAmount = dailyWeatherObj.time.length;
    const allowedVals = ['time', 'temperature_2m_max', 'weathercode', 'windspeed_10m_max'];
    const dailyWeatherVals = [];
    for (let i = 0; i < timeAmount; i++) {
        const newDataObj = {};
        allowedVals.forEach((type) => {
            const finalKey = type in termsMap ? termsMap[type] : type;
            newDataObj[finalKey] = dailyWeatherObj[type][i];
        });
        dailyWeatherVals.push(newDataObj);
    }
    return dailyWeatherVals;
}
