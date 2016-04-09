# get-link

> Returns an absolute URL from a string or relative URL. Works perfectly from static websites.

## Usage

```javascript
import { getLink, parseLink } from "get-link";

getLink( "http://example.com", "/foo/bar" );
// => http://example.com/foo/bar

getLink( "http://example.com", "/foo.php" );
// => http://example.com/foo.php

getLink( "http://example.com", "http://example.com/foo.html" );
// => http://example.com/foo.html

getLink( "http://example.com", "http://domain.com" );
// => false

getLink( "http://example.com", "#dynamic-website" );
// => false

getLink( "http://example.com", "javascript:void(0)" );
// => false
```
