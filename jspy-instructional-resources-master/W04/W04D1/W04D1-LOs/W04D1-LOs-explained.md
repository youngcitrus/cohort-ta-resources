## Browser Basics (W4D1) - Learning Objectives

### Browser Basics
1. Explain the difference between the BOM (browser object model) and the DOM(document object model).
  - The DOM is the collection of nodes that represent the hierarchy of HTML elements that are rendered on the page. The BOM is the hierarchy of the browser objects, such as the window and the navigator of the browser. The DOM is thus a smaller part of the BOM.

2. Given a diagram of all the different parts of the Browser identify each part.
![Browser Parts](browser.png)

3. Use the Window API to change the innerHeight of a user's window.
```js
newWindow = window.open("https://www.google.com", "Google Homepage", "width=100, height=100");
newWindow.resizeTo(400, 200)
```

4. Identify the context of an anonymous function running in the Browser (the window).
  - We can double check by console logging `this` in the browser
```js
let func = () => {
  console.log(this)
}
func();

// OR we can use an IIFE (Immediately Invoked Function Expression)

(() => {
  console.log(this);
})()
```

5. Given a JS file and an HTML file, use a script tag to import the JS file and execute the code therein when all the elements on the page load (using `DOMContentLoaded`)
```html
<head>
  <script type='text/javascript' src='exampleScript.js'></script>
</head>
```
```js
window.addEventListener('DOMContentLoaded', () => { ...code } )
```

6. Given a JS file and an HTML file, use a script tag to import the JS file and execute the code therein when the page loads
```html
<head>
  <script type='text/javascript' src='exampleScript.js'></script>
</head>
```
```js
window.onload = () => { ...code }
```

7. Identify three ways to prevent JS code from executing until an entire HTML page is loaded
  - An event listener in the JavaScript file (`window.addEventListener('DOMContentLoaded', callback)` or `window.onload = callback`) <===> This method is most common
  - Have the script tag at the end of the HTML file
  - Use the keywords `async` and/or `defer` in the script tag

8. Label a diagram on the Request/Response cycle.
![Request Response Cycle](request-response-cycle.png)

9. Explain the Browser's main role in the request/response cycle.
  - Parsing HTML,CSS, JS
  - Rendering that information to the user by constructing a DOM tree and rendering it

10. Given several detractors - identify which real-world situations could be implemented with the Web Storage API
  - Shopping cart, form data, user preferences like a night mode

11. Given a website to visit that depends on cookies (like Amazon), students should be able to go to that site add something to their cart and then delete that cookie using the Chrome Developer tools in order to empty their cart.
  - Open Developer tools
  - Go to the Application tab
  - Open the Cookies section and either delete individual cookies or clear all
