## Python Environment Management and Unit Testing (W18D1) Learning Objectives

### Environment Management
1. Describe `pip`
- Standard package management system for Python, used to install packages globally
- Similar to `npm --global` for JavaScript

2. Describe `virtualenv`
- Creates a virtual environment
- An isolated working copy of Python, allowing you to work on a specific project without affecting other projects
- Allows multiple side-by-side installations of Python, one for each project
- Keeps project environments isolated from each other

3. Demonstrate how to use `pipenv` to initialize a project and install dependencies
- Create your virtual environment
    - Using a specific python version:
        - pipenv install --python "$PYENV_ROOT/versions/3.8.3/bin/python"
    - Using the current active python version:
        - pipenv install --python "$PYENV_ROOT/shims/python"
- Activate the virtual environment
    - pipenv shell
- Install a dependency
    - pipenv install pytest
    - pipenv install "pytest<=5.3" (installs specifically version <=5.3)
- Uninstall a dependency
    - pipenv uninstall pytest
- Install a development-only package
    - pipenv install --dev pytest (adds as a development-only package)

4. Demonstrate how to run a Python program using `pipenv` using its shell
    - Open the shell
        - pipenv shell
    - Run the program as usual
        - python app.py (program)
        - python -m app (module)
        - pytest (executable)

5. Demonstrate how to run a Python program using `pipenv` using the `run` command
    - Using `run` will start the virtual environment, run the program, then exit the virtual environment
    - pipenv run pytest

6. Describe how modules and packages are found and loaded from import statements
- The `sys` module has an attribute called `path`, which represents the different locations to look for a module
- When we import a module, we check each of these locations in order until we find a matching module
- The current directory is at the top of this list, meaning a local module will take precedence over a module that we've installed
- We can add in another path to look for modules by using the `PYTHONPATH` environment variable. That path(s) that we specify will be added directly after the current directory in the list

7. Describe the purpose of and when `__init__.py` runs
- Initializes the directory module when it is imported or ran as a program.
- Importing nested modules will run all `__init__.py` from the top module down to each submodule.

8. Describe the purpose of and when `__main__.py` runs
- This file is only run when the module is invoked as a program
- `__main__.py` is run after every `__init__.py` file leading up to it is executed
- Without a `__main__.py` we wouldn't be able to execute the module directly, which is something that we may or may not wish to be able to do 

### Unit Testing
1. Use the built-in `unittest` package to write unit tests
- Running unittest tests:
    - python -m unittest
- Create a test directory to house our test files and make it a module. We can make it a module by creating a `__init__.py` file within the directory. The presence of this file is enough, it does not need any code.
- Each test file should import unittest and create a class that inherits from unittest.TestCase. We'll also want to import the module that we are testing:
```py
import unittest
from stack import Stack

class TestStack(unittest.TestCase):
    pass
```
- The methods of the test class are the unit tests. We create a new method starting with `test_` for each unit test we would like to make:
```py
def test_new_stack_has_zero_elements(self):
    pass
```
- We inherit many assertion methods from the `TestCase` class. We follow our standard Arrange, Act, Assert formula for creating our tests. If any of our assertions are not true, our test fails:
```py
def test_new_stack_has_zero_elements(self):
    # Arrange
    s = Stack()

    # Act
    result = len(s)

    # Assert
    self.assertEqual(result, 0)
```
- Some comonm assertion methods that we can use are:

| Method                    | Check that              |
|:------------------------- |:----------------------- |
| assertEqual(a, b)	        | a == b                  |
| assertNotEqual(a, b)      | a != b                  |
| assertTrue(x)             | bool(x) is True         |
| assertFalse(x)            | bool(x) is False        |
| assertIs(a, b)            | a is b                  |
| assertIsNot(a, b)         | a is not b              |
| assertIsNone(x)           | x is None               |
| assertIsNotNone(x)        | x is not None           |
| assertIn(a, b)            | a in b                  |
| assertNotIn(a, b)         | a not in b              |
| assertIsInstance(a, b)    | isinstance(a, b)        |
| assertNotIsInstance(a, b)	| not isinstance(a, b)    |

- Note that `assertEqual` is smart enough to check the content of lists, dictionaries, etc., doing a pairwise comparison, index by index, instead of checking if they are the same memory location.
- More advanced use cases can be found in the docs: https://docs.python.org/3/library/unittest.html#test-cases

2. Install and use the `pytest` package to write unit tests
- If you haven't yet, create a virtual environment and enter the shell:
    - pipenv install --python "$PYENV_ROOT/shims/python"
    - pipenv shell
    - (Make sure VSCode is using the pipenv environment by selecting it at the bottom left)
    - (Install a linter in the virtual environment if desired with `pipenv install --dev pylint`, or pycodestyle, etc.)
- Install `pytest` in your virtual environment
    - pipenv install --dev pytest
- Add a `test` directory and make it a module by adding in a `__init__.py` file, just like we did with `unittest`
- We can run our tests with the `pytest` command, since an executable was added to our environment's `bin` when we installed `pytest`
- Our test files will be placed in the `test` directory and must either begin or end with the `test` keyword, ie `test_*.py` or `*_test.py`. Following this naming convention allows pytest to understand that this file contains tests to run.
- Inside of our file, we can define functions directly (no need for classes) that represent our unit tests. Each function that begins with `test` will be treated as a unit test:
```py
def test_new_stack_has_zero_elements(self):
    pass
```
- We will still want to import the module that we are writing tests for, but we don't need to import pytest, unlike how we had to import unittest.
- Instead of having specific assertion methods like unittest, pytest uses the `assert` keyword. If all assertions are true, our unit test passes:
```py
def test_new_stack_has_zero_elements(self):
    # Arrange
    s = Stack()

    # Act
    result = len(s)

    # Assert
    assert result == 0

# Condensed version:
def test_new_stack_has_zero_elements(self):
    assert len(Stack()) == 0
```
- More advanced use cases can be found in the docs: https://docs.pytest.org/en/stable/contents.html#toc
