import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
const countryListEl = inputEl.nextElementSibling;
const countryEl = countryListEl.nextElementSibling;

const optionsForMessage = {
    width: '450px',
    svgSize: '150px',
    fontSize: '20px',
    svgSize: '20px',
    borderRadius:'14px',
}

const renderMarkupList = array => {
    return array.map((country) => 
        `<li>
            <img src="${country.flags.svg}" alt="Flag of country" width="24">
            ${country.name.official}
        </li>`
    ).join('')
}

const renderMarkupElement = array => {
    return array.map((country) => 
        `<h1>
            <img src="${country.flags.svg}" alt="Flag of country" width="36">
            ${country.name.official}
        </h1>
        <p><span class='card-text'>Capital</span>: ${country.capital}</p>
        <p><span class='card-text'>Population</span>: ${country.population}</p>
        <p><span class='card-text'>Languages</span>: ${Object.values(country.languages).join(', ')}</p>`).join('')
}

const resetMurkup = () => {
    countryListEl.innerHTML = '';
    countryEl.innerHTML = '';
}

const checkFetchCountries = data => {
    if (data === 404) {
        Notiflix.Notify.failure('Oops, there is no country with that name', optionsForMessage);
    }
    if (data.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.', optionsForMessage,);
    } if (data.length >= 2 && data.length <= 10) {
        countryListEl.insertAdjacentHTML('beforeend', renderMarkupList(data));
    } if (data.length === 1) {
        countryEl.insertAdjacentHTML('beforeend', renderMarkupElement(data));
    }
}

const debouncedInputFunc = () => {
    return debounce((event) => {
        resetMurkup();
    
        const countryName = event.target.value.trim();
    
        if (countryName.length === 0) {
            return;
        }
    
        fetchCountries(countryName)
            .then(data => {
                checkFetchCountries(data);
            }
        )
    }, DEBOUNCE_DELAY)
}


inputEl.addEventListener('input', debouncedInputFunc());


    

