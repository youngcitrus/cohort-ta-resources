## Intro to Python (W17D2) Learning Objectives

### Basics
1. Use PEP 8 as a reference for how to write your code
- The official style guide for Python, currently PEP 8 (Python Enhancement Proposals v8), can be found here: https://www.python.org/dev/peps/pep-0008/
- The style guide is curated by the Python community and creators with the intention of providing a standard format for Python code to be written in
2. `print` messages to the console terminal
- The `print` function is similar to JavaScript's `console.log`, in that whatever we pass in as an argument will be printed to the terminal.
3. Use `#` and `"""` to write code comments
- We can use a `#` to create a comment, similar to JavaScript's `//`
- `"""` can be used to make a multi-line string. This can be used to allow for comments to stretch across multiple lines without using `#` on each line. This syntax is also used at the beginning of a function declaration to create the documentation displayed for the function's `help` page (and VSCode's tooltips!).

### Number Data Types
1. Explain the most common types of numbers in Python
- We'll most commonly interact with `int` and `float` numbers, but `complex` numbers also exist.
- `int`, or integers, are counting numbers with no decimal points
- `float`, or floating point numbers, are numbers with deciaml places. They may occasionally have rounding errors, just like JavaScript
2. Evaluate arithmetic expressions that include familiar operators and `**`, `//` and `%`
- There are seven major operators that we may encounter:

| Operator | Meaning          | Example               |
|:--------:|:---------------- |:--------------------- |
|    +     | addition         | print(10+4)  #> 14    |
|    -     | subtraction      | print(10-4)  #> 6     |
|    *     | multiplication   | print(10*4)  #> 40    |
|    /     | division         | print(10/4)  #> 2.25  |
|    %     | modulo           | print(10%4)  #> 2     |
|    **    | exponent         | print(10**4) #> 10000 |
|    //    | integer division | print(10//4) #> 2     |

3. Predict when an arithmetic expression will throw an error
- Using the addition operator to concatenate strings with numbers will throw an error since we are attempting to combine multiple types. We must first cast the numbers to strings (or interpolate them)
```py
17.0 + ' and ' + 17 # TypeError
str(17.0) + ' and ' + str(17) # No error
```
- We may run into an `OverflowError` when working with extremely large floats
```py
10**100 # This integer is ok
10.0**100 # Floats take up more space in memory, this will be an OverflowError
```
- We won't use them, but a good note is that complex numbers will result in TypeErrors if we try to use integer division or modulo
```py
complex(47) // 8 # TypeError: can't take floor of complex number.
complex(47) % 8 # TypeError: can't mod complex number.
```
4. Know how to use assignment shorthand for arithmetic operators
- For each of the arithmetic operators (`+`, `//`, `%`, etc.), we can use the assignment shorthand by adding on an `=`.
- Like JavaScript, the assignment shorthand applies the operation to the variable on the left and reassigns its value:
```py
a = 2
a += 3 #> 5
a *= 2 #> 10
```

### String Data Type
1. Write strings using the correct syntax
- We can use single quotes, double quotes, or three quotes for multi-line strings:
```py
a = 'Hey'
b = "Hi"
c = '''Hello
there,
friend!'''
```
2. Use `len()` to obtain a count of the number of characters in a string
- In JavaScript, we used the `.length` property on a string to get the number of characters.
- In Python, we use the `len()` function and pass in the string as an argument:
```py
print(len('Hello')) #> 5
```
3. Refer to one or more characters in a string
- We can use indices and ranges to refer to single characters or substrings.
- Passing a single integer to square brackets will get the character at that index. Negative numbers can also be used to indicate we would like characters from the end of the string:
```py
'Hello'[4]   #> o
'Hello'[-1]  #> o
'Hello'[17]  #> IndexError
```
- Using `:` inside the square brackets indicates a range that we would like the substring for, starting at the index of the first value and going up to but not including the second index.
- Omitting the first integer indicates we want to start at the beginning of the string, and omitting the second integer takes all characters to the end of the string.
- Unlike specific indices, providing numbers outside of the valid indices will not cause an error when dealing with ranges:
```py
# Indexing with ranges
print("Spaghetti"[1:4])  # => pag
print("Spaghetti"[4:-1])    # => hett
print("Spaghetti"[4:4])  # => (empty string)
print("Spaghetti"[:4])  # => Spag
print("Spaghetti"[:-1])    # => Spaghett
print("Spaghetti"[1:])  # => paghetti
print("Spaghetti"[-4:])    # => etti

# Using invalid indices
# print("Spaghetti"[15])    # => IndexError: string index out of range
# print("Spaghetti"[-15])    # => IndexError: string index out of range
print("Spaghetti"[:15])    # => Spaghetti
print("Spaghetti"[15:])    # => (empty string)
print("Spaghetti"[-15:])    # => Spaghetti
print("Spaghetti"[:-15])    # => (empty string)
print("Spaghetti"[15:20])    # => (empty string)
```
4. Concatenate strings together
- We can use a simple `+` to concatenate strings:
```py
a = 'Hello'
b = 'World'
print(a+b) #> HelloWorld
```

### Variables
1. Explain duck-typing
- We follow the paradigm it's easier to ask for forgiveness than permission.
- We would prefer to attempt to invoke a function or access an attribute on an object and catch an exception if it occurs than to check for a type on each instance.
- This primarily stems from Python being dynamically typed, meaning the objects that we interact with may change types, collections may house a mixture of types, etc.
- We commonly see this in practice when we refer to instances of different classes. If we have many animal classes and all of them know how to `speak` but do so in different ways, we can iterate over a collection of them and invoke the `speak` method. We don't care what specific type of animal it is, we just know that animals in general should be able to speak.
2. Predict when errors will be thrown when using variables and expressions
- The main takeaways for this learning objective is that variables can be reassigned to different types and as long as those new types are interacted with accordingly, we will not throw any errors. For example:
```py
a = 17
print(a)         # => 17
a = 'seventeen'
print(len(a))    # => 9
```
- No errors are thrown above because we interacted with `a` appropriately at all stages.
- Errors will be thrown pretty commonly if we try to mix data types together. For example:
```py
a = '7'
a /= 2
print(a) # TypeError: unsupported operand type(s) for /=: 'str' and 'int'
```
- We get a TypeError because we cannot combine strings and integers in our arithmetic operations.
3. Explain the meaning of `None` in Python
- `None` has a similar function to JavaScript's `null`. It represents an absence of value.
- It can be assigned to a variable to indicate that it does not have a value at this time.
- `None` is also returned from a function if no return value is specified (similar to JavaScript's `undefined`)

### Boolean Data Type
1. Predict the evaluation of expressions that use the boolean operations of `and`, `or` and `not`
- Python's `and`, `or`, and `not` replace JavaScript's `&&`, `||`, and `!`
```py
print(True and False)     #> False
print(True or False)      #> True
print(True and not False) #> True
```
- They can also be grouped with parentheses:
```py
print(False and (True or True)) #> False
print((False and True) or True) #> True
```
2. Explain how Python handles non-Boolean objects in conditional statements
- Conditional statements are evaluated on "truthy" and "falsy" values, not strict `True` or `False` booleans.
- There are a few values that are considered falsy and will be treated like a `False` in a conditional:
  - 0, 0.0, 0j (complex number)
  - ''
  - False
  - None
  - []
  - ()
  - {}
  - set()
  - range(0)
- Other values will be considered truthy in a conditional statement

### Comparison Operators
1. Predict the result of expressions that utilize the operators `>`, `<`, `>=`, `<=`, `==`, and `!=`
- Pretty straight-forward mathematical comparisons

| Operator | Meaning                  | Example            |
|:--------:|:------------------------ |:------------------ |
|    >     | greater than             | 10 > 4    #> True  |
|    <     | less than                | 10 < 4    #> False |
|    >=    | greater than or equal to | 10 >= 10  #> True  |
|    <=    | less than or equal to    | 10 <= 7   #> False |
|    ==    | equal to                 | 10 == 7   #> False |
|    !=    | not equal to             | 10 != 7   #> True  |

2. Explain how to short-circuit conditional expressions
- Python will not bother evaluating the rest of the statement if the overall result of the conditional expression is already determined (`False and ...` is always False, `True or ...` is always True):
```py
# False and (anything else) is always False, so the print is not evaluated
False and print("not printed")
# Cannot determine overall value so we have to evaluate the right side, printing the statement
False or print("printed #1") 
# Cannot determine overall value so we have to evaluate the right side, printing the statement
True and print("printed #2")
# True or (anything else) is always True, so the print is not evaluated
True or print("not printed")
```

### Identity vs. Equality
1. Explain the difference between `==` and `is`
- `==` checks for equivalent values. We can compare two variables or literals to see if their values are the same. A notable point is that `int` and `float` values will be treated as equivalent, but comparing these numbers to their `str` counterpart will not:
```py
print(1 == 1.0) #> True
print(1 == "1") #> False
a = 1
print(a == 1) #> True
```
- `is` checks for strict equality, i.e., do these point to the same location in memory (similar to JavaScript's `===`). We likely won't be using these with simple floats or ints, but will come in handy when checking to see if we have the same instances of an object, for example. Keep this in mind when we work with more complex data types, like lists or instances of classes.
```py
print(1 is 1.0) #> False
print(1 is "1") #> False
a = 1
print(a is 1) #> True (integers [up to a very large limit] are cached with the same object id, so will point to the same location in memory)
```
2. Explain when `not` will throw an exception
- `not` is processed after the equality operator (`==`), so a common mistake is incorrectly attempting to negate an expression used in this comparison:
```py
print(a == not b)    # => SyntaxError
```
- In the above example, the equality operator compares `a` to `not`, resulting in a SyntaxError. If we are attempting to negate `b`, we should surround the expression with parentheses to ensure that the `not` is evaluated before the `==`:
```py
print(a == (not b))    # => No error
```

### If Statements
1. Write an `if` statement, including use of `elif` and `else`
- `if` statements are very similar to how we write them in JavaScript. The main differences are our use of the standard Python `:` and indentation as well as using the keyword `elif` instead of the combination `else if` that we used in JavaScript:
```py
a = 1
b = 1.0
c = "1"

if (a == c):
    print("match")
elif (a == b):
    print("a matches b")
else:
    print("not a match")
```
- Just like in JavaScript, only one block will be entered, at max. If both `a == c` and `a == b` are truthy in the above code, only the first `a == c` block will be executed since we entered that block and ignored the rest of the conditions.

### While Statements
1. Write a `while` loop
- While loops are also very similar to JavaScript, we just need to remember to use the `:` and indentation:
```py
i = 0
while i < 5:
  print(f'{i + 1}. Hello World!')
  i += 1
```
- Remember to include your incrementing (`i += 1`), or whatever condition you are including to take you out of your iteration condition (`i < 5`)
2. Be able to use `continue` and `break` to move to the next iteration or break out of a loop
```py
# The 'continue' keyword goes to the next loop
# The 'break' keyword exits out of the loop completely
i = 0
while True:
  print(f'{i+1}. Hello, world.')
  if i < 4:
    i += 1
    continue
  print("You've printed 5 times. Goodbye.")
  break
```

### Error Handling
1. Write a try statement to catch and handle exceptions in Python
- We can wrap our statements that may fail in a `try` block
- An `except` statement will catch an error that is thrown. We can specify a specific type of error as well as capture the error itself using the `as` keyword.
- An `else` block will only be run if no exceptions were caught, whereas a `finally` block will run no matter what.
```py
a = 'False'
b = 6
c = 2
try:
    print(len(a))
    print(b/c)
    print(a[47])
except TypeError:
    print(f'{a} has no length')
except ZeroDivisionError as err:
    print(f'Cannot divide by zero! Error: {err}')
except:
    print('Uh oh, unknown error')
else:
    print('No errors! Nice!')
finally:
    print('Thanks for using the program!')
```
2. Handle different types of errors
- See demo above, where we use a generic `except` as well as specifically handling `TypeError` and `ZeroDivisionError`
3. Use `hasattr` to prevent an error from occurring
- Less common compared to using `try`/`except`, we can check if an attribute exists before using it:
```py
a = ['Hello', 'World']
b = 4

# Checks if the __len__ attribute exists on a (what the len() function is looking at)
# If it does (like with 'a'), print the length.
# If it doesn't (like with 'b'), we don't enter the conditional, so no error occurs
if hasattr(a, '__len__'):
  print(len(a))   #> 2

if hasattr(b, '__len__'):
  print(len(b))   # We don't make it inside this block, nothing prints, no errors
```

### Pass Keyword
1. Know how to use `pass` to allow for empty blocks in code
- `pass` is used to indicate that we left a block empty intentionally
- Possible reasons are for stubbing out code in development or perhaps we want to allow for a particular exception to occur but we don't want to do anything in particular with it:
```py
a = 100
# b = "5"
try:
    print(a / b)
# If we get a ZeroDivisionError, continue on with the rest of our code instead of stopping execution for the unhandled error
except ZeroDivisionError:
    pass
except (TypeError, NameError):
    print("ERROR!")
```
```py
if num < 10:
  print("That's a small number!")
# TODO: Figure out what to do with large numbers
else:
  pass
```

### NoneType Data Type
1. Know how to use `None` and its relation to JavaScript's `undefined` and `null` types
- We will often use `None` as a default to indicate that no value has been assigned.
- It indicates an intentional lack of value
- `None` is also the return value of a function if no explicit return is specified.

### Functions
1. Describe how to define a function in Python
- We use the `def` keyword to define a function, followed by the name of the function, the arguments that it accepts, then open up a new block with a `:` and an indented block:
```py
def is_even(num):
  return num % 2 == 0

print(is_even(5)) #> False
print(is_even(2)) #> True
```
- For simple one-line functions, we can also use a lambda, which takes in the arguments and then returns the value resulting from the right side of the `:`
```py
is_even = lambda num: num % 2 == 0

print(is_even(8)) #> True
```
2. Demonstrate how to invoke a function
- After a function is declared, we can invoke it with parentheses passing in arguments.
- We can also specify arguments by name when invoked.
- A default value can be assigned to a parameter during the function declaration:
```py
def is_divisible(num, divisor=4):
  return num % divisor == 0

print(is_divisible(6, 3)) #> True
print(is_divisible(divisor=8, num=4)) #> False (we changed the order that the arguments were passed in)
print(is_divisible(8) #> True (the default of 4 was used for the divisor)
```
3. Write a function which accepts parameters and returns a value
- See examples above
