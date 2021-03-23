const fetch = require('node-fetch');
const fs = require('fs').promises;


// Get homeworld

// fetch('https://swapi.dev/api/people/1')
//     .then((response) => {
//         return response.json();
//     })
//     .then(person => {
//         return person.homeworld;
//     })
//     .then(homeworldUrl => {
//         return fetch(homeworldUrl)
//     })
//     .then(res => res.json())
//     .then(res => console.log(res));

// // Get all films

// fetch('https://swapi.dev/api/people/1')
//     .then(res => res.json())
//     .then(person => {
//         const promises = person.films.map(film => fetch(film));
//         return Promise.all(promises)
//     })
//     .then(filmResponses => {
//         jsonPromises = filmResponses.map(response => response.json());
//         return Promise.all(jsonPromises)
//     })
//     .then(jsonFilms => {
//         jsonFilms.forEach(film => console.log(film))
//     });

// Bonus:

fetch('https://swapi.dev/api/people/1')
    .then(response => response.json())
    .then(person => {
        return Promise.all([person, fetch(person.homeworld), Promise.all(person.films.map(url => fetch(url)))])
    })
    .then(result => {
        const person = result[0];
        const homeworldJsonPromise = result[1].json();
        const filmsJsonPromises = result[2].map(response=>response.json());
        return Promise.all([person, homeworldJsonPromise, ...filmsJsonPromises]);
    })
    .then(finalResult => {
        
    })
