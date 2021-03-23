const fetch = require('node-fetch');

// function to get a person
const getPerson = function(id) {
    return fetch(`https://swapi.dev/api/people/${id}`)
                .then(personResponse => personResponse.json())
}

// call function to get person with id: 1
getPerson(1)
    .then(person => console.log(person));


// helper functions to get homeworld
const getHomeworld = function(homeworldUrl) {
    return fetch(homeworldUrl)
                .then(locationResponse => locationResponse.json())
}

getHomeworldOfPerson = function(id) {
    return getPerson(1)
        .then(person => {
            return getHomeworld(person.homeworld);
        });
}

// call function to get planet of person with id: 1
getHomeworldOfPerson(1)
    .then(homeworld => console.log(homeworld));

// helper functions to get films


