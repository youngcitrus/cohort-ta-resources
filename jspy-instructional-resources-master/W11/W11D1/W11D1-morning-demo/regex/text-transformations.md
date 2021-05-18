# Regular Expressions in JavaScript

Like objects and arrays have literal syntaxes, so do regular expressions.

```js
const obj = { name: 'Mxyzptlk' };
const arr = [ 1, 2, obj ];
const re = /abc/; // regex with pattern: abc
```

## Testing if a regular expression matches a string

You can use a regular expression to test a string to see if it matches the
pattern using the `test` method of the regular expression object.

```js
const pattern = /pattern/;

console.log(pattern.test('this pattern is plaid'));
console.log(pattern.test('THIS PATTERN IS PLAID'));
```

You can turn on case-insensitive matching using the "i" flag _after_ the last
slash of the regular expression literal.

```js
const pattern = /pattern/i;

console.log(pattern.test('this pattern is plaid'));
console.log(pattern.test('THIS PATTERN IS PLAID'));
```

## Replacing values in a string

Problem: `replace` function only replaces first occurrence when given a string

```js
const s = 'An Advancing Aardvark';
const replaced = s.replace('a', 'X');
console.log(replaced);
```

The first argument can also be a regular expression. A regular expression with
no flags will do the same thing.


```js
const s = 'An Advancing Aardvark';
const replaced = s.replace(/a/, 'X');
console.log(replaced);
```

When you apply the global flag "g", then it will replace all matches.

```js
const s = 'An Advancing Aardvark';
const replaced = s.replace(/a/g, 'X');
console.log(replaced);
```

Apply both the global and case insensitive flags to replace all characters
regardless of uppercase or lowercase.

```js
const s = 'An Advancing Aardvark';
const replaced = s.replace(/a/gi, 'X');
console.log(replaced);
```

You can also replace the second parameter with a function instead of a string
which allows for dynamic replacement of values.

```js
let index = 0;
const s = 'An Advancing Aardvark';
const replaced = s.replace(/a/gi, match => {
  index += 1;
  return index;
});
console.log(replaced);
```

```js
let index = 0;
const s = 'An Advancing Aardvark';
const replaced = s.replace(/a./gi, match => {
  console.log(match);
  index += 1;
  return index;
});
console.log(replaced);
```

## Using grouping for sub-matches

The problem: replacing tokens in a string.

```js
const data = { name: 'Mxyzptlk', age: 'unknown' };
const s = "My name is %name%, and my age is %age%.";

const pattern = /%\w+%/g;

const replace = s.replace(pattern, match => {
  const key = match.replace(/%/g, '');
  return data[key];
});
console.log(replace);
```

# Pipe-delimited text to SQL insert statements

Demonstrated in Regexr.com
* https://regexr.com/53rca

| City              | Latitude |
|-------------------|----------|
| tallinn           | 59.43N   |
| port louis        | 10.16S   |
| n'djamena         | 12.10N   |
| yerevan           | 10.18N   |
| moscow            | 55.76N   |
| kiev              | 50.45N   |
| warsaw            | 52.25N   |
| jakarta           | 6.17S    |
| bogota            | 4.66N    |
| abuja             | 9.05N    |
| lima              | 12.06S   |
| south black hills | 43.02N   |

REGEX: \| ([\w']+( \w+)*)\s+\| (\d+\.\d+[NS])\s+\|
REPLACE: ('$1', '$3'),


### | operator example with .search()
```javascript
let test = ['this', 'that', 'the other', 'and this?'];
let indices = test.map(function(e){
  // search is returning the index that starts the match, or -1 if not found
  return e.search(/(this)|(that)/); // [0, 0, -1, 4]
});
console.log(indices); 
```