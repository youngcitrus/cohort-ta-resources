const fetch = require('node-fetch');
const fs = require('fs').promises;
const writeAFileFor = (characterId) => {
    let characterClosure = undefined;
    const fetchingMyCharacter = fetch(`https://swapi.dev/api/people/${characterId}/`);
    fetchingMyCharacter
        .then(res => {
            // res is an object that represents the HTTP response.
            // But the full response has not yet been received.
            // Only the status code and headers.
            const fetchingRestOfJSONData = res.json();
            return fetchingRestOfJSONData;
        })
        .then(characterData => {
            characterClosure = characterData;
            const homeworldUrl = characterData.homeworld;
            const grabbingHomeworld = fetch(homeworldUrl).then(res => res.json());
            return grabbingHomeworld;
        })
        .then(homeworldData => {
            console.log(homeworldData.name);
            const filmsINeedToGet = characterClosure.films;
            const fetchesForFilmInfo = filmsINeedToGet.map((filmUrl) => {
                return fetch(filmUrl).then(res => res.json());
            });
            const fetchingAllFilms = Promise.all(fetchesForFilmInfo);
            fetchingAllFilms.then((filmObjects) => {
                const stringToWrite = `
                My name is ${characterClosure.name} and I am from ${homeworldData.name}. 
                I starred in the following films: 
                ${filmObjects.map(film => film.title).join(', ')}
                `;
                fs.writeFile(`${characterId}.txt`, stringToWrite);
            });
        })
}
["1", "2", "3", "4"].forEach(writeAFileFor);