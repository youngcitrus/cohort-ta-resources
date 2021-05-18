## Regular Expressions and Node HTTP (W11D1) - Learning Objectives

### Regular Expressions
1. Define the effect of the * operator and use it in a regular expression
2. Define the effect of the ? operator and use it in a regular expression
3. Define the effect of the + operator and use it in a regular expression
4. Define the effect of the . operator and use it in a regular expression
5. Define the effect of the ^ operator and use it in a regular expression
6. Define the effect of the $ operator and use it in a regular expression
7. Define the effect of the [] bracket expression and use it in a regular expression
8. Define the effect of the - inside brackets and use it in a regular expression
9. Define the effect of the ^ inside brackets and use it in a regular expression

### Regex cheatsheet:
| Regex Symbol   | Meaning                          |
|:--------------:|:---------------------------------|
| *              | zero or more                     |
| +              | one or more                      |
| ?              | zero or one                      |
| {m, n}         | from m to n number of characters |
| ^              | start of input                   |
| $              | end of input                     |
| .              | any single character             |
| \              | escape a special character       |
| []             | match anything inside (or)       |
| [a-z] or [0-9] | range of characters              |
| [^a-zA-Z]      | not those characters             |
| ()             | group these characters           |
| \s             | whitespace                       |
| \d             | digit                            |
| \w             | wordy (letter, digit, or _)      |
| \S             | not whitespace                   |
| \D             | not digit                        |
| \W             | not wordy                        |

### Using Regex in JavaScript - aka How Do I Apply This Stuff?
- To create a regular expression we use / at the beginning and end of the pattern
```javascript
const regex = /pattern/;
```
- Two flags that we can use at the end of our regex to make them even more powerful are `i` and `g`
  - `i` indicates that we want our regex to be case-insensitive. We can accomplish the same thing by expanding our pattern to include either case (`/[Hh][Ii]/` instead of `hi`, for example), but this is a convenient shorthand
  - `g` indicates that we want the regex to apply globally, meaning catch all matches, not just the first one. This is especially useful when we use regex in a `.replace()` function, indicating we want to change all matches.
```javascript
const regex = /pattern/ig;
```
- We can use a regex's `.test()` method to see if a match is found within a string argument.
```javascript
const pattern = /pattern/;

console.log(pattern.test('this pattern is plaid')); // true
console.log(pattern.test('THIS PATTERN IS PLAID')); // false (case-sensitive)
```
- We can use a string's `.replace()` method and pass in regex as the first argument in order to replace many instances of our matching pattern, no matter how complicated.
```javascript
const s = 'An Advancing Aardvark';
const replaced = s.replace(/a/gi, 'X');
console.log(replaced); // Xn XdvXncing XXrdvXrk
```
- The `.replace()` method can also take a callback function. The return value of the callback is what will be replaced. This allows us to change the value that is being inserted dynamically.
```javascript
let index = 0;
const s = 'An Advancing Aardvark';
const replaced = s.replace(/a/gi, match => {
  index += 1;
  return index;
});
console.log(replaced); // 1n 2dv3ncing 45rdv6rk
```
- The `.search()` method of a string can take regex as an argument instead of a string, as well. It returns the starting index of the match
```javascript
let test = ['this', 'that', 'the other', 'and this?'];
let indices = test.map(function(e){
  // search is returning the index that starts the match, or -1 if not found
  return e.search(/(this)|(that)/); // [0, 0, -1, 4]
});
console.log(indices); 
```

### HTTP Full-Stack
1. Identify the five parts of a URL
```text
  foo://example.com:8042/over/there?name=ferret#nose
  \_/   \______________/\_________/ \_________/ \__/
   |           |            |            |        |
scheme     authority       path        query   fragment
```
- `Scheme`: Formerly known as "protocol", tells the browser what kind of connection you are making. Examples would include `http`, `https`, `file`, `ws`, etc.
- `Authority`: Normally the domain name, but may include the port, such as `localhost:3000`
- `Path`: The first part of an HTTP request, they indicate the location within the application. `https://google.com/images` has a path of `/images`. If no path is specified in the URL, it is assumed to be `/`
- `Query`: Extra information sent to the browser for processing the request. They are URL encoded key-value pairs, with an `=` between key and value, and pairs concatenated by `&`. Special characters are replaed with ASCII Code value, such as `$` being replaced with `%24`.
- `Fragment`: This part is not sent to the server; it's used by the browser to navigate to a specific section of the page on load. Often seen when clicking a navigation link that takes to you a spot further down the page. Changing this value will not reload the page

2. Identify at least three protocols handled by the browser
- See above. `http`, `https`, and `file` have all been used in this course so far.

3. Use an `IncomingMessage` (typically called the `req`) object to
- access the headers sent by a client (like a Web browser) as part of the HTTP request
```javascript
const headers = req.headers;
// The headers are represented as a POJO with header names as keys
// { 'user-agent': 'curl/7.22.0',
//   host: '127.0.0.1:8000',
//   accept: '*/*' }
```
- access the HTTP method of the request
```javascript
const method = req.method;
// The headers are represented as a string such as 'GET' or 'POST'
```
- access the path of the request
  - If we want to work with the full path we can use `req.url`
  ```javascript
  const path = req.url; // gives full path of request, such as '/images'
  ```
  - If we want to manipulate the path, we can use the `path` library, as well. This can be useful if we want to check the extension name that is being requested.
  ```javascript
  const path = require('path');

  const server = http.createServer(async (req, res) => {
    const ext = path.extname(req.url);

    if (ext === '.jpg'){
      // ...
    }
  })
  ```
- access and read the stream of content for requests that have a body
  - The body of a request comes in to the server in pieces, or "chunks". We'll see this a lot when we make a `POST` request with a form. We can wait for the body to arrive and build it back up:
  ```javascript
  if (req.method === 'POST') {
    let bodyContent = '';
    for await (let chunk of req) {
      bodyContent += chunk;
    }
  ```
  - At this point the `bodyContent` is in the form `key1=encoded+value+1&key2=encoded+value+2`, etc., where key/value pairs are joined with `=`, pairs are separated with `&` and the values supplied use `+` for spaces and url encoding for special characters. We can split and map over this string in order to convert it into a more user-friendly POJO (this doesn't need to be memorized, but the process should make sense)
  ```javascript
  // bodyContent = 'my-input=In+this+box%3&another-input=Yes%2C+this+box%2C+here.'

  const keyValuePairs = bodyContent
    .split('&') // ['my-input=In+this+box%3', 'another-input=Yes%2C+this+box%2C+here.']
    .map((keyValuePair) => keyValuePair.split('=')) // [['my-input', 'In+this+box%3'], ['another-input', 'Yes%2C+this+box%2C+here.']]
    .map(([ key, value ]) => [ key, value.replace(/\+/g, ' ') ]) // [['my-input', 'In this box%3'], ['another-input', 'Yes%2C this box%2C here.']]
    .map(([ key, value ]) => [ key, decodeURIComponent(value) ]) // [['my-input', 'In this box?'], ['another-input', 'Yes, this box, here.']]
    .reduce((acc, [ key, value ]) => {
      acc[key] = value; // { 'my-input': 'In this box?', 'another-input': 'Yes, this box, here.' }
      return acc; // We have to return acc to make sure we use the updated value for the next iteration (adding in new key/value pairs for each iteration)
    }, {}); // This {} is the starting value of acc (the accumulator). It's allowing us to make a key/value pair for each inner array that we are destructuring.
    
    // keyValuePairs = { 'my-input': 'In this box?', 'another-input': 'Yes, this box, here.' }
  ```

4. Use a `ServerResponse` (typically called the `res`) object to
- write the status code, message, and headers for an HTTP response
```javascript
res.statusCode = 400; // We can set the statusCode directly through assignment
res.statusMessage = "That password doesn't match"; // We can specify a custom status message if it differs from the default related to the code
res.setHeader('Content-Type', 'text/plain'); // .setHeader(<<headerName>>, <<headerContent>>)
```
- write the content of the body of the response
```javascript
// If we have a single string to pass as the content we can give it as the argument directly to .end()
res.end('NOT FOUND');

// instead of using .end('message'), we can build up our response with .write('messagePart')
for (let i = 1; i <= 10; i++) {
  res.write(`<p>This is p-tag #${i}</p>`);
}
res.end();
```
- properly end the response to indicate to the client (like a Web browser) that all content has been written
  - As above, we need to include `.end()` to indicate that the content is written and can be sent back to the client. If no arguments are given, it will send what has been built up with `.write()` (if anything) as the content. If an argument is given, it will add it on before sending back that content. (A common approach would be to build up a `content` variable in the javascript above, then pass the built up result to end, with `res.end(content)`)
  