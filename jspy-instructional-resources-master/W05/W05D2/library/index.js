const Book = require('./book');
const Movie = require('./movie');
const Library = require('./library');
const Person = require('./person');

let bryce = new Person('Bryce', 77);
let alissa = new Person('Angela', 77);
let angela = new Person('Alissa', 77);

let sacLib = new Library('Sacramento Public Library', '123 Main Street');
let sfLib = new Library('San Francisco Public Library', '46 A Street');

let hp1Book = new Book("Harry Potter and the Sorcerer's Stone", 'Harry Potter', 1997, sacLib, 'J.K. Rowling', 200);
let hp2Book = new Book('Harry Potter and the Chamber of Secrets', 'Harry Potter', 1998, sacLib, 'J.K. Rowling', 250);
let hp3Book = new Book('Harry Potter and the Prisoner of Azkhaban', 'Harry Potter', 1999, sacLib, 'J.K. Rowling', 250);
let hp4Book = new Book('Harry Potter and the Goblet of Fire', 'Harry Potter', 2000, sacLib, 'J.K. Rowling', 9000);
let hp5Book = new Book('Harry Potter and the Order of the Phoenix', 'Harry Potter', 2003, sacLib, 'J.K. Rowling', 400);
let hp6Book = new Book('Harry Potter and the Half-Blood Prince', 'Harry Potter', 2005, sacLib, 'J.K. Rowling', 400);
let hp7Book = new Book('Harry Potter and the Deathly Hallows', 'Harry Potter', 2007, sacLib, 'J.K. Rowling', 500);

let lotr1Movie = new Movie(
	'Lord of the Rings: The Fellowship of the Ring',
	'Lord of the Rings',
	2001,
	sfLib,
	'PG13',
	140
);
let lotr2Movie = new Movie('Lord of the Rings: The Two Towers', 'Lord of the Rings', 2002, sfLib, 'PG13', 150);
let lotr3Movie = new Movie('Lord of the Rings: The Return of the King', 'Lord of the Rings', 2003, sfLib, 'PG13', 180);

let hp1Movie = new Movie("Harry Potter and the Sorcerer's Stone", 'Harry Potter', 2001, bryce, 'PG', 120);

let embarrassingBook = new Book('Embarassing Book Title', null, 2020, bryce, 'Random Author', 74);

// sacLib.displayBooks();
// bryce.displayBooks();

sacLib.lendItem(hp1Book, bryce);

// bryce.displayBooks();
// sacLib.displayBooks();

const hpAtSacLib = sacLib.findItems('Harry Potter');
sacLib.lendItem(hpAtSacLib[0], bryce);

// bryce.displayBooks();
// sacLib.displayBooks();

bryce.displayBooks();
bryce.displayMovies();

bryce.returnAllItems();

bryce.displayBooks();
bryce.displayMovies();

sacLib.displayBooks();
sacLib.displayMovies();

// // Lending items to other people
// alissa.displayBooks();
// alissa.displayMovies();

// angela.displayBooks();
// angela.displayMovies();

// bryce.lendItem(hp1Book, alissa);
// bryce.lendItem(hp1Movie, angela);

// bryce.displayBooks();
// bryce.displayMovies();

// alissa.displayBooks();
// alissa.displayMovies();

// angela.displayBooks();
// angela.displayMovies();
