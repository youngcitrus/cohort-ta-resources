# JSON
## What does JSON stand for? What is it?
  - JavaScript Object Notation
  - A string representation of an object

## Why is JSON relevent?
  - It allows us to convert any data into a universal string representation
  - We can use those strings for transferring data between computers, storing in localStorage, etc.

## What is serialization? What is deserialization?
  - Serialization: When you have some data and want to turn it into a string
  - Deserialization: When you convert a string into data

## How do we serialize and deserialize using JavaScript's JSON object?
  - Serialize: JSON.stringify(data)
  - Deserialize: JSON.parse(str)

## How would a string, array, or object appear in JSON?
  - String of "hello": '"hello"'
  - Array of [1, 2, "three"]: '[1, 2, "three"]'
  - Object of {key1: "value", key2: 12}: '{"key1": "value", "key2": 12}'

# Cookies and Web Storage
## What is the difference between a cookie and the Web Storage API?
  - Cookies are much smaller (4KB vs 5MB)
  - Cookies are sent with each request/response cycle
  - Web Storage like localStorage and sessionStorage are kept on the browser, not sent to the server

## When does each expire? Cookie, sessionStorage, localStorage?
  - Cookie: We can specify an expiration date. If it's not specified, it is discarded when we close the browser //Note that the browser won't set a cookie for a filepath, we have to have a server running.
  - sessionStorage: When our tab is closed
  - localStorage: Only when we delete it

## What would be a use-case for a cookie? For Web Storage?
  - Cookie: session cookie can keep track of a logged in user
    - We would want to send the current user to our server on each request for verification
  - Storage: user preferences, like a night-mode
    - We probably don't need to do anything on our server with this information
    - If a user decides to clear out their localStorage, they can easily reset this preference

## (Review) How do we set a cookie? How do we retrieve a cookie?
  - Setting: document.cookie = "session_id=12345"
  - Retrieving: document.cookie will return all of our cookies as one string
      - "session_id=12345; my_dog=cosmo; favorite_drink=coffee"
      - We either have to split this long string to find what we're looking for, or use regex to match a pattern (don't need to memorize this!)
      ```javascript
      function getCookie(key) {
        const value = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
        return value ? value[2] : null;
      }
      ```

## How do we set local or session storage? How do we retrieve that data?
  - Setting: localStorage.setItem(key, dataString)
  - Retrieving: localStorage.getItem(key)

## What if we're not just working with strings? How do we set that storage? How do we retrieve and work with it?
  - Setting: Serialize it! sessionStorage.setItem("dogs", JSON.stringify({dog1: "Lucy", dog2: "Albert"}))
  - Retrieving: Deserialize it! JSON.parse(sessionStorage.getItem("dogs"))



# Notes for today
  - In Parse some JSON and Generate some JSON REPLs, only need to change the top lines "YOUR VALUE HERE". Other code is for testing
  - Two projects for today: shopping cart that focuses mostly on storage, then tic tac toe.
  - Tic Tac Toe is a two day project. It touches on learning objectives from throughout the whole week.
  - Format of the project is a little bit different than what you might be used to. The Overview section explains it:
    - The first page of each section is a list of requirements for that particular feature. Player Clicks lists out the requirements for how the page should respond when a user clicks on the grid, for example.
    - The second page of the section is a list of hints. These are going to give you more details on how you could more specifically implement the requirements from the previous page. The idea is that if you get stuck with just the requirements, these will give you some more guidance
    - The third page of the section is a walkthrough. Curtis goes through how he actually implemented the requirements. Ideally this would be used as a comparison for after you implemented your solution to see how Curtis' compares, but if you are working off of the hints page and are still not understanding what's going on, this can also be an additional resource for you.
  - With all of these resources, don't forget to use the question button as well. I think working through some of these struggles with a little more explanation/guidance is better than just copying solutions.
  - If you and your partner happen to get through all of the sections that are listed for Thursday, ping us so that we know, but continue to work on the next sections that are listed for Friday. If you don't get through today's section, that is perfectly fine! We'll have tomorrow to continue to work on the project with the same pairs.
