## API (Application Programming Interfaces) Learning Objectives
1. Recall that REST is an acronym for Representational State Transfer

2. Describe how RESTful endpoints differ from traditional remote-procedure call (RPC) services

3. Identify and describe the RESTful meanings of the combinations of HTTP verbs and endpoint types for both HTML-based applications and APIs
  - HTTP verbs: GET, POST, PUT, PATCH, and DELETE
  - Endpoint types: collections of resources and singular resources

| HTTP Verb | Collection URL Meaning (`/posts`)    | Single-Resource URL Meaning (`/posts/19`) |
|-----------|--------------------------------------|-------------------------------------------|
| GET       |                                      |                                           |
| POST      |                                      |                                           |
| PUT       |                                      |                                           |
| PATCH     |                                      |                                           |
| DELETE    |                                      |                                           |


4. Recall that RESTful is not a standard (like ECMAScript or URLs), but a common way to organize data interactions

5. Explain how RESTful APIs are meant to be stateless

6. Given a data model, design RESTful endpoints that interact with the data model to define application functionality
![RESTful routes](RESTful-routes-source.png)
- Get all of the posts: 
- Get a specific post: 
- Create a new post: 
- Delete a specific post: 
- Update a specific post: 
- Get all comments on a post: 
- Get a specific comment: 
- Create a comment on a post: 
- Delete a specific comment: 
- Update a specific comment: 

7. Use the express.json() middleware to parse HTTP request bodies with type application/json

8. Determine the maximum data an API response needs and map the content from a Sequelize object to a more limited data object

9. Define a global Express error handler to return appropriate responses and status codes
