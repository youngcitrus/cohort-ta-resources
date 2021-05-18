## API Security Learning Objectives
1. Define Cross-Origin Resource Sharing (CORS) and how it is implemented in some Web clients
  - Cross-Origin Resource Sharing is the process of accessing resources located at a different origin from the application making the request. An origin is the combination of three components:
    1. Protocol
    2. Domain
    3. Port
  - With CORS, we have the concept of "simple" requests, which will be sent to the server immediately, and then "preflighted" requests.
  - In order for a request to be considered simple, it has to meet certain criteria:
    - The HTTP method has to be either `GET`, `HEAD`, or `POST`
    - It can only use safe-listed request headers:
      - accept
      - accept-language
      - content-language
      - content-type
      - width
      - viewport-width
      - (a few more less common)
    - The `content-type` can only be `application/x-www-form-urlencoded`, `multipart/form-data`, or `text/plain`
  - If a request fails any of these criteria, it is a "preflighted" request. Before sending our request to the server, the browser makes an initial "preflight" check. It sends a request with the HTTP verb `OPTION`, which hits the server and determines if the response is CORS-compliant. If it is, it then sends the original request.

2. Explain that CORS is an opt-in feature of Web clients
  - Browsers implement CORS policies themselves. If a request resulting in CORS is made from a browser that implements CORS policies and the server responding has not signified that it allows CORS, the response's body is stripped by the browser, preventing the user from seeing the content of the response.
  - Important takeaway is that browsers such as Chrome or Firefox are the ones enforcing these policies in an attempt to protect their users.

3. Configure your API to use CORS to prevent unauthorized access from browser-based Web requests
  - We can use the `cors` package, which provides us middleware for our application.
  - We can add the middleware to specific routes, or use it on the application in general.
  - The easiest way to use CORS is to apply it as generic middleware to our application, then provide it the origin that we are allowing requests to come from.
  ```js
  const cors = require('cors');

  app.use(cors({ origin: "http://localhost:4000" }))
  ```

4. Explain the fundamental concepts of OAuth as a way to authenticate users
  - OAuth is a method of authenticating users using credentials from other applications. The user grants us permission to connect to the third-party application, then the application sends us a token that we can use on future requests in order to verify that we have been authorized. We can ask specify the scope of access that the user grants us, such as giving us basic user information or permissions to interact with the other application in some capacity.

5. Describe the workflow of OAuth resource owner password credentials grant (RFC 6749 Section 4.3)
  ![oauth_flow](./oauth_flow.png)
  1. We ask the user for permission to connect to the third-party.
  2. The user grants us permission in their response to our server.
  3. We send along the authorization grant to the third-party's authorization server.
  4. The authorization server checks the authorization grant and sends back a token that we can use for future requests to the resources server for this user's data.
  5. We send a request to the third-party's resource server for whatever information we may need related to the user, providing the token that we were issued for the specific user.
  6. The resource server checks the token and then sends back the requested information.

6. Describe the components of a JSON Web Token (JWT) and how it is constructed
- Three components of a JWT
  - Header
    - typ: identifies the type of token ("JWT")
    - alg: identifies the signature's hashing algorithm
  - Payload
    - Contains all of the information that we want the JWT to include.
    - We can specify any kind of data that we want here. Adding information that we will be using regularly about the user (username, roles, etc.) can be helpful so that we aren't constantly querying the database.
    - There are several predefined claims that we can specify to give standard information about the JWT, as well
  - Signature
    - Cryptographically signed header and payload.
- When the server receives a JWT, it regenerates the signature by hashing the header and payload together using the algorithm specified by the header, then comparing the result to the signature that was passed with the request. If the two match, we know the JWT was not modified.

7. Configure an Express application to use token-based authentication
  - We use two packages in our server in order to work with JWTs in our applications: `jsonwebtoken` and `express-bearer-token`
    - `jsonwebtoken` will be used to sign and verify our tokens
    - `express-bearer-token` will be used to extract the token from headers (looks for an `Authorization` key and ) and set it as a `token` key on the request object
  - To create a token we use the `sign` method on our jwt, passing in the payload to encode, the secret that we are using for encoding, and options to add to our JWT, especially of note is an expiresIn, which will allow us to set an expiry time for our authentication:
  ```js
  const getUserToken = (user) => {
    // Don't store the user's hashed password
    // in the token data.
    const userDataForToken = {
      id: user.id,
      email: user.email
    };

    // Create the token.
    const token = jwt.sign(
      { data: userDataForToken },
      secret,
      { expiresIn: parseInt(expiresIn, 10) } // 604,800 seconds = 1 week
    );

    return token;
  };
  ```
  - To decode a token, we use the `verify` method on our jwt. We must have first invoked our bearerToken middleware in order to get the token information onto our request object, but after doing so we can pass the token and secret to the `verify` function and use the result's payload to extract the data we originally stored there:
  ```js
  const restoreUser = (req, res, next) => {
    // token being parsed from request header by the bearerToken middleware
    // function in app.js:
    const { token } = req;

    if (!token) {
      return res.set('WWW-Authenticate', 'Bearer').status(401).end();
    }

    return jwt.verify(token, secret, null, async (err, jwtPayload) => {
      if (err) {
        err.status = 401;
        return next(err);
      }

      const { id } = jwtPayload.data;

      try {
        req.user = await User.findByPk(id);
      } catch (e) {
        e.status = 401;
        return next(e);
      }

      if (!req.user) {
        // Send a "401 Unauthorized" response status code
        // along with an "WWW-Authenticate" header value of "Bearer".
        return res.set('WWW-Authenticate', 'Bearer').status(401).end();
      }

      return next();
    });
  };
  ```
  - How we handle the token in terms of storage can vary (cookies vs. localStorage). Using localStorage is a very common approach, however, that allows us to set headers on our frontend to attach the authorization token on future requests to our backend server.
    - After logging in, our frontend can set a localStorage item 
    ```js
    localStorage.setItem("TWITTER_LITE_ACCESS_TOKEN", token);
    ```
    - When we make a request to our backend, we can provide the token in a header
    ```js
    const res = await fetch("http://localhost:8080/tweets", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(
          "TWITTER_LITE_ACCESS_TOKEN"
        )}`,
      },
    });
    ```
