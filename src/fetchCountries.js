const BASE_URL = 'https://restcountries.com/v3.1/name/';

export const fetchCountries = name => {    
    return fetch(`${BASE_URL}${name}?fields=name,capital,population,flags,languages`)
    .then(response => {
        if (!response.ok) {
            return response.status;
        } 

        return response.json();
    })
    .then(data => {
        return data;
    })
    .catch(error => {
        return error;
    });
}

