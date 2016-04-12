# get-link

> Returns an absolute URL from a string or relative URL. Works perfectly for static websites.

## Usage

```javascript
import getLink from "get-link";

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
