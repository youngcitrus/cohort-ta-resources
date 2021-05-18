These short notes reference the http-vs-json code demo attached.

## Why Serve JSON?
- Allows use to send raw data to the client.
- We can set up a front-end application that the user interacts with which then interacts with our back-end server application. Our front-end can be concerned with converting the data into HTML while our back-end can be concerned with querying for and formatting the data. (This will be expanded upon even more when we start working with React, or any other front-end framework)
- Can also be useful for third parties that are interacting with our data.

## How Do We Implement It?
- Format the object however we want to serve it, then use `res.json(data)` passing in the data that we are sending back to the client.
```js
router.get('/:id', asyncHandler(async function(req, res) {
  const pet = await Pet.findByPk(id, {
    include: [Owner, PetType]
  });
  res.render('pets/detail', { pet })
  res.json(pet)
}));
```

## Serving Both HTML and JSON
- Since we are using the same data in our HTML as we are generating for our JSON, we can DRY up our code by making functions to fetch this data from our database, then either serve the JSON or use it to create HTML in the respective routes.
```js
// pet-data.js
async function all() {
  const pets = await Pet.findAll({
    order: ['name'],
    include: [Owner]
  });
  return pets.map(pet => ({
    id: pet.id,
    name: pet.name,
    numberOfOwners: pet.Owners.length,
    href: `/pets/${pet.id}`
  }));
}


// pets.js (HTML route)
const { all, one } = require('../data/pet-data');
router.get('/', asyncHandler(async function(_, res) {
  const pets = await all();
  res.render('pets/index', { pets });
}));


// api-pets.js (JSON route)
const { all, one } = require('../data/pet-data');
router.get('/', asyncHandler(async function(_, res) {
  const data = await all();
  res.json(data);
}));
```