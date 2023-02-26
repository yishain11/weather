export function getCountries(serverURL) {
    return fetch(`http://${serverURL.current}/data/countries`)
        .then(res => res.json())
        .catch(err => {
            console.error('err in loading cities', err);
        });
}

export function getWeather(serverURL, country, city) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return fetch(`http://${serverURL.current}/weather`, {
        method: 'POST',
        body: JSON.stringify({ country, city }),
        headers: headers
    })
        .then(res => res.json())
        .catch(err => console.error('fetch err', err));
}

export function getCitiesByCountry(serverURL, country) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return fetch(`http://${serverURL.current}/data/loadCities`, {
        method: 'POST',
        body: JSON.stringify({ country }),
        headers: headers
    })
        .then(res => res.json())
        .catch(err => console.error('fetch err', err));
}
