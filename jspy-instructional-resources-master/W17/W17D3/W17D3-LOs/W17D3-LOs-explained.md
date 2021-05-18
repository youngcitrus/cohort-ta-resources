## Python Basics Round 2 (W17D3) Learning Objectives

### Formatted Strings
1. Generate formatted output using `join`
- The `join` function is called on a separator string, passing in a list argument.
- The return value is each item in the list joined together with the separator between each element:
```py
shopping_list = ['bread','milk','eggs']
print(', '.join(shopping_list)) #> bread, milk, eggs
```
2. Generate formatted output using `format`
- The `format` function can take in many different options inside of the `{}` where data is being filled.
- These specifications can be very detailed, so a general reference to the docs is recommended for trying to accomplish a specific formatting: https://docs.python.org/3/library/string.html#formatspec
- The generic format from the docs:

| format_spec     | [[fill]align][sign][#][0][width][grouping_option][.precision][type]                           |
|:--------------- |:--------------------------------------------------------------------------------------------- |
| (spec name)     | (possible value)                                                                              |
| fill            | <any character>                                                                               |
| align           | "<" | ">" | "=" | "^"                                                                         |
| sign            | "+" | "-" | " "                                                                               |
| width           | digit+                                                                                        |
| grouping_option | "_" | ","                                                                                     |
| precision       | digit+                                                                                        |
| type            | "b" | "c" | "d" | "e" | "E" | "f" | "F" | "g" | "G" | "n" | "o" | "s" | "x" | "X" | "%"       |

- All of these options can be intimidating, so here are some common examples:
    - Comma as thousands separator:
    ```py
    print('{:,}'.format(1234567890)) # '1,234,567,890'
    ```
    - Date and Time:
    ```py
    d = datetime.datetime(2020, 7, 4, 12, 15, 58)
    print('{:%Y-%m-%d %H:%M:%S}'.format(d)) # '2020-07-04 12:15:58'
    ```
    - Percentage:
    ```py
    points = 190
    total = 220
    # Indicates a percentage rounded to two decimal places
    print('Correct answers: {:.2%}'.format(points/total)) # Correct answers: 86.36%
    ```
    - Data Table:
    ```py
    # defining the width of each "column" to be used in the format function
    width=8 
    # printing our table header
    print(' decimal      hex   binary')
    # printing the separator between the header and data
    print('-'*27)
    # iterating from numbers 1 to 15 to be printed in different formats
    for num in range(1,16):
        # we are iterating over each character d, X, and b, which we are using to indicate which integer presentation we are printing
        for base in 'dXb':
            # num is substituted in at the 0, the value to be formatted
            # width specifies the number of characters that should be printed out, prefilling with spaces
            # base indicates which number format to use. d is decimal, X is hex with capitalized letters, b is binary
            # end is an argument passed to print, NOT TO format. It indicates to end the print statement with a ' ' instead of the standard newline
            print('{0:{width}{base}}'.format(num, base=base, width=width), end=' ') 
        print() # prints a newline after all three representations have been printed
    # output printed below
    ```
    ```bash
     decimal      hex   binary
    ---------------------------
           1        1        1
           2        2       10
           3        3       11
           4        4      100
           5        5      101
           6        6      110
           7        7      111
           8        8     1000
           9        9     1001
          10        A     1010
          11        B     1011
          12        C     1100
          13        D     1101
          14        E     1110
          15        F     1111
    ```

### User Input
1. Gather user `input` through the terminal
- The `input` function takes in a prompt string to display to the user, then waits for input.
- When the user hits ENTER, the text that was typed up until that point is captured and returned from the `input` function
```py
answer = input('How are you? ')
print(f'Glad you are {answer}')
```

### Scripts vs Programs
1. Explain the difference between scripts and programs
- Scripts accomplish a straightforward task from start to finish. It is a set of code that runs in a linear order. In general, a script has very little if any user interaction, done with parameters passed in at the start or simple prompts.
- Programs are more complex than scripts. They will often include multiple UIs, use design patterns such as OOP, include multiple modules and packages, unit testing, environment configuration, etc.
- The main difference between a script and a program is the level of complexity. There is no defining line that separates the two.
2. Recall common use cases for Python
- Web applications: programs that generate HTML, CSS, and JavaScript to be displayed in a browser. Remember that browsers themselves do not run Python, but we can use Python to create those files that our browsers do interact with.
- APIs: an interface that acts as the middleman between a frontend (like our React frameworks) and our databases. We used Express.js to make JavaScript-based APIs previously.

### Structured Data
1. Define sequence, collection and iterable
- Sequence: an ordered set of data, with an assigned index (starting at 0) pointing to a value. Examples are strings, lists, tuples, and ranges.
- Collection: data sets that use hashable values to determine uniqueness. Examples are dictionaries (ordered collections where the hashable value is the key, similar to our POJOs in JavaScript) and sets (unordered collections where the hashable value is the item itself). Dictionaries being ordered is relatively new, with the change occuring in Python 3.6.
- Iterable: The generic term for a sequence or collection, i.e, any object which we can loop over to access individual elements
2. Explain immutable
- Immutable objects are those that cannot be changed. We can perform such actions as checking presence of an item or looping over the iterable, but we cannot add new items, remove items, order them, etc.

### Built-in Data Types
1. Declare a `list`, `tuple`, `range`, `dictionary` and `set` in Python
- List: Similar to a JavaScript array. Lists are ordered and mutable, so we can add, remove, sort, etc.
```py
empty_list = []
second_empty_list = list()
non_empty_list = ['Some', 'content']
non_empty_list.append('!!!')
print('Some' in non_empty_list) # True
print('???' in non_empty_list) # False
```
- Tuple: Similar to a list, but it is immutable. Because of this they are often used for constants.
```py
time_blocks = ('AM','PM')   # generally instantiated with parentheses
numbers = 1, 2, 3           # but leaving them off will still make a tuple
tuple('abc')                # we can cast other iterables to a tuple, this returns ('a', 'b', 'c')
tuple([1,2,3])              # returns (1, 2, 3)
print('AM' in time_blocks)  # we can check for inclusion, just like a list, this returns True
print('FM' in time_blocks)  # returns False
```
- Range: An immutable list of numbers in order. We can provide a start (default 0), stop (required), and step (default 1) argument. The range goes up (or down) to but does not include the stop number
```py
range(5)            # [0, 1, 2, 3, 4]
range(1,5)          # [1, 2, 3, 4]
range(0, 25, 5)     # [0, 5, 10, 15, 20]
range(0)            # [ ]
range(0, -5, -1)    # [0, -1, -2, -3, -4]
range(5, 0, -1)     # [5, 4, 3, 2, 1]
```
- Dictionary: Similar to a JavaScript POJO, dictionaries are collections of hashable keys referencing an object/value. We can use curly braces or the `dict` constructor, taking in named arguments or casting:
```py
a = {'one':1, 'two':2, 'three':3}
b = dict(one=1, two=2, three=3)
c = dict([('two', 2), ('one', 1), ('three', 3)])
print(a == b == c)   # => True, If keys and values are the same, they are considered equivalent, doesn't matter how they were defined

# The  `in` operator checks the KEYS of a dictionary
print(1 in {1: "one", 2: "two"})    #> True
print("1" in {1: "one", 2: "two"})  #> False
print(4 in {1: "one", 2: "two"})    #> False
```
- Set: an unordered collection of distinct, hashable objects, meaning they have to be unique. Sets are useful for removing duplicates from a sequence, testing for inclusion, and mathematical operators. Sets are mutable, meaning we can add/remove values from them. Making a set looks like making a dictionary, just with no values associated with the keys:
```py
school_bag = {'book','paper','pencil','pencil','book','book','book','eraser'}
print(school_bag)           # => {'book','pencil','eraser','paper'} the duplicates were dropped on creation

# The set constructor can be used to cast sequences
letters = set('abracadabra')
print(letters)              # {'a', 'r', 'b', 'c', 'd'}

print(1 in {1, 1, 2, 3})  #> True
print(4 in {1, 1, 2, 3})  #> False
```

### Built-in Functions
1. Use functions with iterables `filter`, `map`, `sorted`, `enumerate`, `zip`
- `filter(function, iterable)`: The `function` parameter takes in an item from the `iterable` and returns a boolean. The return of `filter` is a new iterable that contains each item from the `iterable` parameter that returned True in the `function`:
```py
def is_even(num):
    return num % 2 == 0

iterable = [1, 4, 6, 9]
filtered = filter(is_even, iterable) # [4, 6]
```
- `map(function, iterable)`: The `function` parameter takes in an item from the `iterable` and returns a new item (can be the same or a completely different type). The return of `map` is a new iterable that contains each item that was returned from the `function` parameter:
```py
def double(num):
    return num * 2

iterable = [1, 4, 6, 9]
mapped = map(double, iterable) # [2, 8, 12, 18]
```
- `sorted(iterable, key=None, reverse=False)`: Returns a new sorted list from the `iterable`, with the `key` being an optional function to be applied to each item for comparison purposes and `reverse` inverting the order of the returned list. If `key` or `reverse` are used, they must be named arguments:
```py
iterable = ['b', 'R', 'F', 'c']
sorted_list = sorted(iterable, key=str.lower, reverse=True) # ['R', 'F', 'c', 'b']
```
- `enumerate(iterable, start=0)`: Converts a sequence into a series of tuples, with the first element being the index (starting at the `start` parameter) and the second element being the value from the sequence. If `start` is used, it must be a named argument:
```py
quarters = ['First', 'Second', 'Third', 'Fourth']
enumerate(quarters)              # (0, 'First'), (1, 'Second'), (2, 'Third'), (3, 'Fourth')
enumerate(quarters, start=1)     # (1, 'First'), (2, 'Second'), (3, 'Third'), (4, 'Fourth')
```
- `zip(*iterables)`: Creates an object with tuples that combine an item from each iterable provided. If uneven lengths are given between iterables, the zip stops when the shortest iterable runs out of values:
```py
list1 = [1, 3, 4, 7]
list2 = ['a', 'x', 'g', 's', 'p']
list3 = ['Hello', 'World']

zip(list1, list2, list3)        # (1, 'a', 'Hello'), (3, 'x', 'World')
```

2. Analyze iterables using `len`, `max`, `min`, `sum`, `any`, `all`
- `len(iterable)`: returns the number of items in the iterable
- `max(*args, key=None)` or `max(iterable, key=None)`: returns the largest of the arguments given in `*args` or amongst items in the `iterable`. `key` is an optional function that is applied to each item for comparison purposes. If used, it must be passed as a named argument.
- `min(*args, key=None)` or `min(iterable, key=None)`: same as `max`, but returns the smallest.
- `sum(iterable)`: adds all items from the iterable together and returns the result (usually used with a list of numbers)
- `any(iterable)`: returns True if any item in the iterable is a truthy value
- `all(iterable)`: returns True if all items in the iterable are truthy values

3. Work with dictionaries using `dir`
- `dir(dictionary)` returns a list of all keys in a dictionary. It can also be used on objects and modules to return a list of their attributes.

4. Work with sets using operators `|`, `&`, `-`, `^`
- `|`: Union operator, can also be written as `union(*sets)`, returns a new set that combines all elements from each set
```py
a = {1, 2, 3}
b = {2, 4, 6}
print(a | b)        # => {1, 2, 3, 4, 6}
```
- `&`: Intersection operator, can also be written as `intersection(*sets)`, returns a new set that contains elements that are present in all sets
```py
a = {1, 2, 3}
b = {2, 4, 6}
print(a & b)        # => {2}
```
- `-`: Difference operator, can also be written as `difference(*sets)`, returns a new set that contains elements in the first set and not any of the others
```py
a = {1, 2, 3}
b = {2, 4, 6}
print(a - b)        # => {1, 3}
print(b - a)        # => {4, 6}
```
- `^`: Symmetric difference operator, can also be written as `symmetric_difference(*sets)`, returns a new set that contains all elements that are present in only one of the given sets
```py
a = {1, 2, 3}
b = {2, 4, 6}
c = {3, 4, 5}
print(a ^ b ^ c)    # => {1, 5, 6}
```

### For Loops
1. Implement a `for` loop with an iterable
- To make a `for` loop, we use the `for` keyword, a variable name to capture each item, the `in` keyword, an iterable that we are looping over, then a `:` and a block of code to execute for each item
- With a `range`:
```py
# Sum all even numbers from 0 to 20
total = 0
for num in range(0, 21, 2):
    total += num
print(total)
```
- With a `list`:
```py
# Print each element of a list
lst = [0, 1, 2, 3]
for i in lst:
    print(i)

# We can make a range to correspond to each index of a list
supplies = ['pens', 'staplers', 'flame-throwers', 'binders']
for i in range(len(supplies)):
    print('Index ' + str(i) + ' in supplies is: ' + supplies[i])

# We can destructure nested lists
l = [[1, 2], [3, 4], [5, 6]]
for a, b in l:
    print(a, ', ', b)

# Prints 1, 2
# Prints 3, 4
# Prints 5, 6
```
- With a `dictionary` (we will often use the `values()`, `keys()`, or `items()` methods to iterate over)
```py
spam = {'color': 'red', 'age': 42}

for v in spam.values():
    print(v)
# Prints red
# Prints 42

for k in spam.keys():
    print(k)
# Prints color
# Prints age

for k, v in spam.items():
    print('Key: ' + k + ' Value: ' + str(v))
# Prints Key: age Value: 42
# Prints Key: color Value: red
```
- With a `str`:
```py
for char in "abc":
    print(char)
# Prints a
# Prints b
# Prints c
```

### More on Functions
1. Capture variable-length positional arguments with `*`
- Specifying `*args` as a parameter in our function definition will collect any additional positional arguments (those not specified with a name in the function invocation) into a tuple that we can then access within the function:
```py
def add(a, b, *args):
    total = a + b
    for n in args:
        total += n
    return total

# 2 is captured as 'a', 3 is captured as 'b', and a tuple of (4, 5, 6) is captured as 'args'
add(2, 3, 4, 5, 6) # Returns 20
```
2. Capture variable-length keyword arguments with `**`
- Specifying `*kwargs` (short for keyword arguments) as a paramet in our function definition will collect any additional keyword arguments (those specified with a name in the function invocation) into a dictionary with each name as the key pointing to the value:
```py
def print_names_and_countries(greeting, **kwargs):
    for k, v in kwargs.items():
        print(greeting, k, "from", v)

# 'Hi' is captured as the greeting and each named argument is captured as the dictionary kwargs
print_names_and_countries("Hi",
                          Monica="Sweden",
                          Charles="British Virgin Islands",
                          Carlo="Portugal")
```
3. Correctly order parameters and arguments in function declarations and invocation
- When defining our functions, we must specify arguments in the following order:
    1. positional arguments
    2. `*args`
    3. keyword arguments with default values
    4. `**kwargs`
```py
def example(arg_1, arg_2, *args, kw_1="shark", kw_2="blowfish", **kwargs):
  pass

# 1 is captured as arg_1, 'b' is captured as arg_2, (3, 4) is captured as args, 'whale' is captured as kw_1, 'blowfish' is used as the default kw_2, { 'kw_4': 'octopus' } is captured as kwargs
example(1, 'b', 3, 4, kw_1='whale', kw_4='octopus')
```

### Importing in Python
1. Define module in Python
- A module is a way to split code into multiple files, similar to JavaScript packages. It can be a *Built-in* module, already present in Python, a *Third-party* module that we've downloaded, or a *Custom* module that we write ourselves
2. Use `import` to load a built-in module
```py
import math
print(math.floor(5.4))  # 5
print(math.ceil(5.4))   # 6

# importing specific functions:

from math import floor, ceil
print(floor(5.4))       # 5
print(ceil(5.4))        # 6
```
3. Understand the relationship between packages, modules and submodules
- A `package` is a path to a directory that contains modules
- A `submodule` is another file in a module's folder
- `__init__.py` is the default file for a package. The name of the folder becomes the name of the module, which can then be imported.
- A visualization is helpful to see these relationships:
```bash
project
│   README.md
│   __init__.py
|   shopping_cart.py         <== module
│
└───pet                      <== package
│   │
│   └───mammal               <== module (and package)
|   |   |   __init__.py
│   |   │   dog.py           <== submodule
│   |   │   cat.py           <== submodule
│   |   │   ...
│   │
│   └───fish                 <== module (and package)
|   |   |   __init__.py
│   │
│   └───bird                 <== module (and package)
|       |   __init__.py
│
└───housing                  <== module (and package)
    │   __init__.py
    │   aquarium.py          <== submodule
    │   cage.py              <== submodule
    │   kennel.py            <== submodule
```
4. Follow common best practices for importing modules
- Avoid importing whole packages or using wildcards; only import what you need to improve clarity and reduce the amount of code loaded into memory.
- When importing many items from a package, use multiple lines, typically sorted alphabetically. It is easier to read each function/class/etc. when it is on its own line and makes changes easier to pinpoint, especially on GitHub.

### Watching out for Python 2
1. Identify Python 2.7 in code examples found online
- These are not things that you will encounter regularly, but are good to be able to recognize have changed when looking at old code, answers to questions online, etc.:
    - `<>` was previously used where Python 3 now uses `!=`
    - `%` operator was previously used for string formatting, but we now prefer formatted strings with the `format` function or with `f''`
    - Unicode and binary data storage has changed. This is probably not a common topic that you'll interact with regularly, but good to know that binary and string data can no longer be mixed and must be explicitly converted.
    - Some module changes exist:
        - `md5` was removed in favor of using `hashlib`
        - `ConfigParser` was renamed `configparser`
        - `sets` was removed in favor of the `set()` class
    - `__init__.py` is no longer required in every folder of a module during development
2. Understand how to translate `print` from Python 2.7 to Python 3.8
- `print` was previously a statement in Python 2, whereas it is now a function in Python 3
- The difference that you'll notice practically is that we now pass what we want to print as an argument to `print`:
```py
# Python 2:
print 'Hello, world'

# Python 3:
print('Hello, world')
```
