## What is OAuth?
- Convenient for both the user and you, don't have to set up your own login system from scratch and the user doesn't have to remember additional credentials, etc.
- Secure; large applications have secure login systems and we can leverage that in our own app
- A method of authenticating users using credentials from other applications.
- The user grants us permission to connect to a third-party application, then that application sends us a token that we can use on future requests in order to verify that we have been authorized.
- We can specify the scope of access that the user grants us, such as just giving us basic user information if we only care about authenticating, or as far as permissions to interact with the other application in some capacity and make changes on their servers.

## What does the OAuth process look like?
![oauth_flow](./oauth_flow.png)
1. We ask the user for permission to connect to the third-party.
2. The user grants us permission in their response to our server.
3. We send along the authorization grant to the third-party's authorization server.
4. The authorization server checks the authorization grant and sends back a token that we can use for future requests to the resources server for this user's data.
5. We send a request to the third-party's resource server for whatever information we may need related to the user, providing the token that we were issued for the specific user.
6. The resource server checks the token and then sends back the requested information.

## What are the components of a JSON Web Token (JWT)
- Header
  - typ: type of the token ("JWT")
  - alg: identifies the signature's hashing algorithm
- Payload
  - What we want to encode (each piece of info is called a claim)
  - 7 predefined claims - all are optional
  - Can add in any additional information besides these claims as well
  - Things that we may want to add:
    - expiration date
    - start date
    - username, roles, id: things that are important for us on the frontend of our application, but are not sensitive information
- Signature
  - Cryptographically signed version of header and payload

## How is a JWT constructed?
- The header and the payload are each base-64 encoded.
- After encoding, they are concatenated with a '.' and the combination is also base-64 encoded.
- The encoded combination is then hashed using a secret key held by the server according to a hashing algorithm specified in the header. This hashed result is the signature.
- The JWT is the combination of `<<encoded_header>>.<<encoded_payload>>.<<signature>>`

## How do we know a JWT hasn't been tampered with?
- When the server receives a JWT, it regenerates the signature. It concatenates the encoded header with a '.' and the encoded payload, then hash the combination using the same algorithm specified by the header and the secret key that it has held on to.
- By comparing the result to the signature that was passed with the request, we can determine if the payload or header were modified in any way. If the two match, we know the JWT was not modified and we can trust its contents as valid, ie things that we specified when we created the JWT.
