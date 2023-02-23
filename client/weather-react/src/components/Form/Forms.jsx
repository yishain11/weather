import { useRef } from 'react';
import { FormEl, FieldsContainer, Label, Input } from './Form.styled';

export default function Form() {
    const countryInput = useRef(null);
    const cityInput = useRef(null);
    const serverURL = useRef(import.meta.env.VITE_SERVER_URL_DEV);

    function handleSubmit(e) {
        e.preventDefault();
        const country = countryInput.current.value.toLowerCase();
        const city = cityInput.current.value.toLowerCase();
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        fetch(`http://${serverURL.current}/weather`, {
            method: 'POST',
            body: JSON.stringify({ country, city }),
            headers: headers
        })
            .then(res => res.text()).then(res => { console.log('res client', res); })
            .catch(err => console.error('fetch err', err))
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
