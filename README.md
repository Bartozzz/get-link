# get-link

Returns an absolute URL relative to another URL. Not vulnerable to *Denial-of-Service* attacks.

## Installation

```bash
$ npm install get-link
```

## Usage

`getLink( base, link );`

```javascript
import getLink from "get-link";
// or window.getLink if used outside Node.js environment

getLink( "http://example.com", "/foo/bar" );
// => http://example.com/foo/bar

getLink( "http://example.com", "/foo.php" );
// => http://example.com/foo.php

getLink( "http://example.com", "http://example.com/foo.html" );
// => http://example.com/foo.html

getLink( "http://example.com/some/deep/path", "../../styles" );
// => http://example.com/some/styles

getLink( "http://example.com", "http://domain.com" );
// => false

getLink( "http://example.com", "#dynamic-website" );
// => false

getLink( "http://example.com", "javascript:void(0)" );
// => false
```

## Tests

```bash
$ npm test
```
