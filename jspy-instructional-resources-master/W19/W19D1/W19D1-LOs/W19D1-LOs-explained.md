## Alpine Linux and Python Threading (W19D1) - Learning Objectives

### Alpine Linux - Learning Objectives
1. How to install packages using Alpine Package Keeper (apk)
- Make sure you are in your virtual machine (or wherevere alpine is running)
- Determine which package you would like to install
  - pkgs.alpinelinux.org is an online database that is useful in finding these
  - `apk search {package name}` will also search in the command line
  - `apk search cmd:{command name}` will search for a package by the name of the command used in the command line
  - Adding a `-e` flag to these commands indicates an exact search
- `apk add {package name}` will add the specified package (defaults to most recent non-edge, compatible with your architecture)
- `apk upgrade --available` will update available packages 
- `apk del {package name}` will remove a package
  - `-r` is recursive, deleting 
  

2. How to make sure your network is configured properly using the `ifconfig` command
- The `ifconfig` command displays network settings, including your IP address

### Python Threading - Learning Objectives
1. Identify that JavaScript is a single-threaded language
- At no point does more than one block of code have simultaneous access to the memory that you are using.

2. Identify that Python is a pseudo-multi-threaded language
- Multiple sections of code can be run at the same time by different cpus in Python.
- Many of the packages that we use (like Flask) go through great lengths to obscure the multithreading processes that are occurring behind the scenes.
- We can make sure that memory-sensitive code is handled with this possibility in mind through thread synchronization, such as implementing locks (which is what we'll be looking at), barriers, or semaphores.

3. Describe what a lock is for thread synchronization purposes
- A lock is a method of thread synchronization. It creates a mutually exclusive block of code.
- When a lock is created, no other block of code that depends on that lock can be executed until the lock has been released. This helps prevent memory that is critical to the execution of the block to be affected if an interrupt were to occur.


4. Recall what the Global Interpreter Lock (GIL) is in CPython
- CPython is multithreaded, but the GIL only allows one thread of execution at a time.
- Even though there is only one thread of execution at a time, you still have multiple threads accessing the same memory, so many of the same multithreading issues can still arise.


5. Use the `threading.Lock` thread synchronization primitive in Python code
- We can create a `Lock` instance from the `threading` module, which will prevent execution of any other block of code that depends on the lock if another block is already being executed:
```py
from threading import Lock

x = 0
lock = Lock()

def thread_1():
  with lock:
    a = x
    b = a + 1
    # interrupt occurs
    a = a + b
    x = a
    print(x)

def thread_2():
  # cannot execute this block because it depends on the same lock
  # wait until the lock has been cleared
  # thread_1 finishes executing, frees up the lock, then we can continue
  with lock:
    a = x
    a = a + 1
    x = a
    print(x)
```


6. Use `join` to wait on executing threads
- By default, threads that we create with `threading.Thread` are nondaemon threads, meaning they will keep the main thread of execution of our program open until they have finished.
- We can change this behavior by giving the thread instance the `daemon=True` kwarg at instantiation. This means that if our main thread of execution is ready to shut down, it will close out any daemon threads instead of waiting for them to finish.
- If we would like to wait on a daemon thread to finish executing (maybe it was defined somewhere else, like another package, as a background thread but we want to make sure it runs), we can use the `.join()` method on the thread we would like to wait on.
- `.join()` tells the main process to wait on this thread instead of closing it out like it normally would.
```py
import threading
from random import randint
from time import sleep

def func(s):
  print(f"Hello, {s}!")
  sleep_time = randint(0, 3)
  print(f"Sleeping for {sleep_time} seconds")
  sleep(sleep_time)
  print(f"Good-bye, {S}!")

# Create two threads, with the function to execute as the target, specifying they are daemon (background) threads, and providing a tuple of arguments
thread1 = threading.Thread(target=func, daemon=True, args=("Judy",))
thread2 = threading.Thread(target=func, daemon=True, args=("Petra",))

# Start each thread. They will execute simultaneously, alongside our main thread
thread1.start()
thread2.start()

print("All threads started.")
# Join our threads back to our main thread. This isn't the most practical, since we could have just defined them as nondaemon (the default), but if we wanted to conditionally join them on, or join on a thread that we are referencing defined elsewhere, the `join` method allows us to do so.
thread1.join()
thread2.join()
print("Done with this.")
```
