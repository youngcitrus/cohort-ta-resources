const fetch = require('node-fetch');

// Get homeworld

fetch('https://swapi.dev/api/people/1')
    .then((response) => {
        return response.json();
    })
    .then(person => {
        return person.homeworld;
    })
    .then(homeworldUrl => {
        fetch(homeworldUrl)
            .then(res => res.json())
            .then(res => console.log(res));
    });

// Get all films

fetch('https://swapi.dev/api/people/1')
    .then(res => res.json())
    .then(person => {
        const promises = person.films.map(film => fetch(film));
        Promise.all(promises)
            .then(filmResponses => {
                jsonPromises = filmResponses.map(response => response.json());
                console.log(jsonPromises);
                Promise.all(jsonPromises)
                    .then(jsonFilms => {
                        jsonFilms.forEach(film => console.log(film.title))
                    });
            })
    });
