const fetch = require("node-fetch");

let apiKey = "afab3d6d";

// TODO: lets take our solution to yesterday's practice and convert it to using
// async and await !
// - below you will find the commented out solution from yesterday
// - define a new `fetchMovie` function below and double check you
//   still receive the same output

// function fetchMovie(movie) {
// 	let parsedMovie = movie.split(' ').join('+');
// 	fetch(`http://www.omdbapi.com/?apikey=${apiKey}&t=${parsedMovie}`)
// 		.then(res => res.json())
// 		.then(json => {
// 			console.log(json);
// 			if (json.Error) {
// 				throw Error(json.Error)
// 			} else {
// 				parseMovie(json)
// 			}
// 		})
// 		.catch(err => console.log('ERROR: ', err))
// }

// CREATE YOUR NEW `fetchMovie` FUNCTION HERE

async function fetchMovie(movie) {
    let movieUrlSuffix = movie.split(' ').join('+');
    try {
        const movieResponse = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&t=${movieUrlSuffix}`);
        const movieToJson = await movieResponse.json();
        return movieToJson;
    } catch (e) {
        console.log(error);
    }
}

function parseMovie(movie) {
    let title = movie.Title;
    let director = movie.Director;
    let year = movie.Year;

    console.log(`${title} was directed by ${director} and released in ${year}`);
}

async function setValue(variable, fetchMovie, movieTitle) {
    variable = await fetchMovie(movieTitle);
    console.log(variable);
}

// let x;
// setValue(x, fetchMovie, "harry potter");


// Zoolander was directed by Ben Stiller and released in 2001

// fetchMovie("zoolander");
// // Mean Girls was directed by Mark Waters and released in 2004

// fetchMovie("mean girls");
// // Harry Potter and the Deathly Hallows: Part 2 was directed by David Yates and released in 2011
