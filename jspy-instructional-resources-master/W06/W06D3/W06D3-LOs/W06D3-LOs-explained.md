## Promises - Part 2 and HTML Review (W6D3) - Learning Objectives

### Promises
1. Use async/await with promise-based functions to write asynchronous code that behaves synchronously.
```javascript
// Without async/await, we can use .then chains
// We use a .catch method to catch errors
function wrapper() {
  promise1("hello", 1)
    .then(res1 => {
      console.log(res1);
      return promise2("hi", 2);
    })
    .then(res2 => {
      console.log(res2);
      return promise3("hey", 3);
    })
    .then(res3 => {
      console.log(res3);
      return promise4("what's up", 1);
    })
    .then(res4 => {
      console.log(res4);
    })
    .catch(err => {
      console.error("Error encountered:", err)
    });;
};

wrapper();

// With async/await, our code looks more like synchronous code
// We use a standard try/catch block to handle errors
// In order for us to use `await` we must be in a function declared with `async`
async function wrapper() {
  try {
    console.log(await promise1("hello", 1));
    console.log(await promise2("hi", 2));
    console.log(await promise3("hey", 3));
    console.log(await promise4("what's up", 1));
  } catch (err) {
    console.error("Error encountered:", err)
  }
}

wrapper();
```

### HTML
- Be comfortable with using the following tags. This is review/tangential material and will not be tested directly on the assessment, but if it would appear in a problem, you should know what it is doing.
- <html></html>
    - the root element of the HTML document
    - valid child elements are <head> and <body>
- <head></head>
    - contains metadata for the HTML
    - often will include a <title> as well as <link> and <script> tags
- <title></title>
    - what appears in the tab or title bar of the browser
- <link>
    - allows us to link another file, we'll often see it for our css
    - `rel` attribute specifies the relation of the link ("stylesheet", less common may be "icon", "author", etc.)
    - `href` attribute specifies the URL of the linked file (can be an absolute url or relative path to file in your project)
- <script></script>
    - allows us to add JavaScript to be run
    - can include code between tags, or provide a src
    - `src` attribute specifies the URL of the linked script (if this attribute is present, the <script> element must be empty)
- <h1>...</h6>
    - header tags
    - six versions (h1 through h6), indicating decreasing levels
    - default styling in browsers will make h1 largest, down to h6, but the semantic meaning of labeling a section is the importance
- <p></p>
    - paragraph tags
    - allows us to add content typically displayed as blocks of text
- <article></article>
    - a self-contained composition in a document, i.e., it could be consumed independently and not lose any meaning
- <section></section>
    - a standalone section of the document
    - groups content, but might not be independently consumable like an article
- <main></main>
    - the main/central content of the body
- <nav></nav>
    - typically contains navigation links either to sections of the document or to other documents
- <header></header>
    - introductory content for the page
    - we'll often see elements such as headers, logo images, nav bars, etc.
- <footer></footer>
    - opposite of <header>, typically will have supplement information at the bottom of a section or page
    - may include details such as copyright, links, author info, etc.
- <ul></ul>
    - an unordered list
    - typically has many list elements (<li>) represented as bullet points
- <ol></ol>
    - an ordered list
    - typically has many list elements (<li>) represented as numbered or lettered entries
- <li></li>
    - a list element
    - must be part of either an unordered (<ul>) or an ordered (<ol>) list
- <a></a>
    - an anchor tag
    - creates a hyperlink to another resource
    - `href` attribute specifies the URL for the desired link content
    - content inside the element (between the opening and closing tags) will be what is shown on the page as the clickable link
- <img>
    - embeds an image into the document
    - `src` attribute specifies the source, or path to the image that is to be displayed (can be an absolute URL or relative path)
    - `alt` attribute gives a text description of the image. It is used by screen readers and is also displayed if the image cannot be rendered for whatever reason
- <table></table>
    - encloses elements that represent data to be represented in a table format (all elements below can be included)
- <thead></thead>
    - defines a header for a table, typically housing the row that represents column headers
- <tbody></tbody>
    - defines the body of the table, as opposed to the head or foot.
    - rows in the body represent the actual data of the table
- <tfoot></tfoot>
    - defines the final, summarizing set of rows in a table
- <tr></tr>
    - defines a row in the table
    - seen in all three sections, head, body, and foot
- <th></th>
    - defines a cell header
    - in a row in the body, this may be the label for that row
    - in a row in the head, there may be many of these elements in order to label each column
    - `scope` attribute tells us whether this is a header for a 'row' or a 'column'
- <td></td>
    - defines a data cell
    - these are the main elements that compose a row in the body of the table (<tbody>)
    