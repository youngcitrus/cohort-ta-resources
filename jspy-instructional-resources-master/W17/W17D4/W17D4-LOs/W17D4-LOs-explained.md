## Classes and List Comprehensions (W17D4) Learning Objectives

### Classes in Python
1. How to use the `class` keyword to define a class
- Similar to defining a function, we can use the `class` keyword followed by the name of the class that we are creating and a `:` before indenting our block of code
```py
class Animal:
  # code for class definition
```

2. How to name classes
- See above, we follow the `class` keyword with the name of our class.

3. How to create instances from classes
- After we have defined a class, we can invoke it like we would a function, using parentheses.
- The return value of this invocation is a reference to the instance that we created.
```py
class Animal: 
  # code for class definition

bird = Animal()
```

4. How to initialize classes with the "dunder method" `__init__()`
- In JavaScript, we created `constructor()` functions to set up initial states of class instances.
- In Python, the `__init__()` function is our initialization function.
- Any instance method in our classes take in a reference to the instance itself as a first argument. This argument is automatically passed by Python when we invoke the function. Traditionally we call this reference `self`.
- `self` is similar to JavaScript's `this`. In order to create instance variables in our `__init__`, we can use `self.<<variable name>>`, just like we would use `this.<<variable name>>` in JavaScript.
- We can allow our code to take in arguments to initialize these values on creation of our instance by specifying these parameters in our `__init__`, just like we would do with a JavaScript `constructor`:
```py
class Animal:
  def __init__(self, name='Bessy', sound='moo'):
    self.name = name
    self.sound = sound

dog = Animal('Trudy', 'woof')
cat = Animal(sound='meow', name='Milo')
cow = Animal()
```

5. How to use the "dunder class variable" `__slots__` to reserve memory for instance variables
- Using `__slots__` increases performance of creating instances of your class by reserving space in memory for 
these variables when the instance itself is created instead of going back and reallocating that space when it sees the definition later on.
- We can add the class variable `__slots__` at the beginning of our class definition that points to a list of variable names we would like to allocate space for.
- This process is optional, but can improve performance, especially if we are going to be making many instances of a class. We'll typically go back and add this performance increase once we know which variables are utilized within our class:
```py
class Animal:
  __slots__ = [ 'name', 'sound' ]

  def __init__(self, name='Bessy', sound='moo'):
    self.name = name
    self.sound = sound
```

6. How to make string representations of classes using the "dunder method" `__repr__()` for use by `print()`
- We can specify what we want our class instances to look like when we print them out as strings by overwriting the `__repr__()` method.
- The return value of `__repr__()` should be the string that we would like to represent our instance:
```py
class Animal:
  __slots__ = [ 'name', 'sound' ]

  def __init__(self, name='Bessy', sound='moo'):
    self.name = name
    self.sound = sound

  def __repr__(self):
    return f'<Animal (named {self.name}, says {self.sound})>'

dog = Animal('Trudy', 'woof')
print(dog) # <Animal (named Trudy, says woof)>
```

7. How to declare instance methods for a class
- Instance methods can be declared like any other function, they just have to be nested inside of the class and take in the reference to the instance (`self`) as the first argument.
- Remember that Python will automatically pass this reference when the method is invoked, so we do not have to pass it in manually:
```py
class Animal:
  __slots__ = [ 'name', 'sound' ]

  def __init__(self, name='Bessy', sound='moo'):
    self.name = name
    self.sound = sound

  def change_name(self, name):
    self.name = name
    print(f'Name changed to {name}')

  def make_noise(self):
    print(f'{self.name} says {self.sound}!')

  def __repr__(self):
    return f'<Animal (named {self.name}, says {self.sound})>'


dog = Animal('Trudy', 'woof')
dog.make_noise()          # Trudy says woof!
dog.change_name('Maggie') # Name changed to Maggie
dog.make_noise()          # Maggie says woof!
```


### Inheritance in Python
1. How to specify a parent class
- Specifying a parent class is as easy as passing a reference to that class as an argument in the class definition. We do so by adding parentheses after our class name and passing the parent class as the argument:
```py
class Animal:
  def __init__(self, name):
    self.name = name

class Cow(Animal):
  # class definition
```

2. How to use `super` to access parent class methods
- We often want to extend the functionality of a method defined in the parent class, or invoke it for some other reason in the child. We can use the `super()` function to get a reference to the parent class, then invoke the desired function:
```py
class Animal:
  def __init__(self, name):
    self.name = name

  def get_name(self):
    return self.name

class Cow(Animal):
  def __init(self, name='Bessy', sound='moo'):
    super().__init__(name)
    self.sound = sound

  def make_noise(self):
    print(f'{self.name} says {self.sound}!')

my_cow = Cow()
print(f'The name of my cow is {my_cow.get_name()}')
my_cow.make_noise()
```

### Properties for Classes
1. Define a "getter" method for a class' property using the `@property` decorator
- We can use a decorator, which is a wrapper for a function that performs some addititional functionality for us. In this case, the `@property` decorator creates references to these instance variables as attributes, removing the need for us to invoke a function to get access to these attributes. We add this decorator before a function definition with the name of the attribute we want to create access to on for our users, returning the instance variable:
```py
class Animal:
  # I'm using the _ before the names of these variable names to indicate they shouldn't be interacted with directly. It's a way of telling other developers they should really be using the methods that we created.
  __slots__ = [ '_name', '_sound' ]

  def __init__(self, name='Bessy', sound='moo'):
    self._name = name
    self._sound = sound

  @property
  def name(self):
    return self._name

  @property
  def sound(self):
    return self._sound

cow = Animal()
# Notice how we can reference `.name` instead of having to invoke a function
print(f'The name of the cow is {cow.name}. It says {cow.sound}')
```

2. Define a "setter" method for a class' property using the `@<<getter_method_name>>.setter`
- Similar to getters that allow us to get a value of an instance variable, we can define setters that change these instance variable values. We use the decorator `@<<getter_method_name>>.setter` before the function definition with the name of the attribute:
```py
class Animal:
  # I'm using the _ before the names of these variable names to indicate they shouldn't be interacted with directly. It's a way of telling other developers they should really be using the methods that we created.
  __slots__ = [ '_name', '_sound' ]

  def __init__(self, name='Bessy', sound='moo'):
    self._name = name
    self._sound = sound

  @property
  def name(self):
    return self._name

  @name.setter
  def name(self, value):
    self._name = value

  @property
  def sound(self):
    return self._sound

  @sound.setter
  def sound(self, value):
    self._sound = value

cow = Animal()
# Notice how we can reference `.name` instead of having to invoke a function
print(f'The name of the cow is {cow.name}. It says {cow.sound}')
cow.name = 'Delilah'
cow.sound = 'MOOOOOO'
print(f'The name of the cow is {cow.name}. It says {cow.sound}')
```

### Tree Refresher
1. Understand the basic structure of a tree, including the concepts of a `root` and `children`
- A tree is a collection of nodes, each node can have a maximum of one parent.
- The node at the top of a tree which has no parent is the root node.
- Depending on the type of tree, a node can have multiple children, but in a binary tree it can have a maximum of two.
- Nodes with no children are called leaf nodes.
- Every node in a tree is also the root of a subtree. We often use this idea when we use recursion while working with trees, such as searching for an entry in a binary search tree.
2. Understand the algorithm of traversing a tree with a depth first search (what nodes would we visit)
- In a depth-first traversal of a tree, we fully explore the left side of a tree and each subtree before moving on to the right side. This is often accomplished by adding the children of our current node to a stack that we would like to traverse.
- The numbers in the tree below indicate the order that we would reach that node in a depth-first traversal.
```bash
          1
         / \
        2   5
       /   / \
      3   6   9
     /   / \
    4   7   8
```
3. Understand the algorithm of traversing a tree with a breadth first search (what nodes would we visit)
- In a breadth-first traversal of a tree, we explore all children of a node before moving on to the next level of the tree. This is often accomplished by adding the children of our current node to a queue that we would like to traverse.
- The numbers in the tree below indicate the order that we would reach that node in a breadth-first traversal.
```bash
          1
         / \
        2   3
       /   / \
      4   5   6
     /   / \
    7   8   9
```

### List Comprehensions
1. Rewrite loops and `map()` calls as a list comprehension in Python
- The general format for using a list comprehension is `new_list = [expression for member in iterable]`
- The expression is invoked for each element in the iterable, with the result being added to the list:
```py
squares = [i**2 for i in range(10)]

print(squares)  # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
```

2. Choose between comprehensions, loops, and `map()` calls
- The single-line nature of comprehensions can be very convenient, but can also be confusing for more complicated operations.
- One of the most important parts of coding is writing code that other people understand and can interact with. If the comprehension is difficult for you to understand as the coder, it is probably even more difficult to understand as an outsider.
- A classic example of when this may be the case is flattening a matrix. It can be done, but the syntax is confusing. Using a map or multiple loops may take more lines, but is much more clear what is happening:
```py
matrix = [
    [0, 0, 0],
    [1, 1, 1],
    [2, 2, 2],
]

flat_comprehension = [num for row in matrix for num in row]

# This is more lines of code, but performs the same function and is easier to understand the intent
flat_loops = []
for row in matrix:
  for num in row:
    flat_loops.append(num)
```

3. Supercharge your comprehensions with conditional logic
- We can add in a conditional to the comprehension in order to only run the expression if the element passes the condition.
- The general format then becomes `new_list = [expression for member in iterable (if conditional)]`
```py
sentence = 'Mary, Mary, quite contrary, how does your garden grow?'
def is_consonant(letter):
    vowels = "aeiou"
    return letter.isalpha() and letter.lower() not in vowels

# Only add in the character if it is a consonant
consonants = [i for i in sentence if is_consonant(i)]

print(consonants)
# Prints ['M', 'r', 'y', 'M', 'r', 'y', 'q', 't', 'c',
# 'n', 't', 'r', 'r', 'y', 'h', 'w', 'd', 's', 'y',
# 'r', 'g', 'r', 'd', 'n', 'g', 'r', 'w']
```

- We can also change where our conditional is written in order to alter what values are added in to our list.
- This general format becomes `new_list = [expression (if conditional (else other_value)) for member in iterable]`
```py
original_prices = [1.25, -9.45, 10.22, 3.78, -5.92, 1.16]
# If a negative value is given, add in a 0 instead
prices = [i if i > 0 else 0 for i in original_prices]

print(prices)
# Prints [1.25, 0, 10.22, 3.78, 0, 1.16]
```

4. Use comprehensions to replace `filter()`
- See the example above. We can provide a conditional function to the end of our list comprehension just like we provide the function as an argument to `filter`

5. Use a comprehension to combine lists into a dictionary
- We follow a similar format for dictionary comprehensions compared to list comprehensions.
In general we us `new_dict = { key: value for member in iterable }`:
```py
keys = ['name', 'AGE', 'Height']
values = ['Bill', 43, 70]

user = { keys[i].title(): values[i] for i in range(len(keys)) }

# OR, using zip

user = { key: value for key, value in zip(keys, values) }
```
