<div align="center">
  <h1>get-link</h1>

[![Greenkeeper badge](https://badges.greenkeeper.io/Bartozzz/get-link.svg)](https://greenkeeper.io/)
[![Build Status](https://img.shields.io/travis/Bartozzz/get-link.svg)](https://travis-ci.org/Bartozzz/get-link/)
[![License](https://img.shields.io/github/license/Bartozzz/get-link.svg)](LICENSE)
[![npm version](https://img.shields.io/npm/v/get-link.svg)](https://www.npmjs.com/package/get-link)
[![npm downloads](https://img.shields.io/npm/dt/get-link.svg)](https://www.npmjs.com/package/get-link)
  <br>

Returns an absolute URL relative to another URL. Not vulnerable to *Denial-of-Service* attacks.
</div>

## Installation

```bash
$ npm install get-link
```

## Usage

`getLink(base: string, link:string): string|false`

```javascript
import getLink from "get-link";

getLink("http://example.com", "/foo/bar");
// => http://example.com/foo/bar

getLink("http://example.com", "/foo.php");
// => http://example.com/foo.php

getLink("http://example.com", "http://example.com/foo.html");
// => http://example.com/foo.html

getLink("http://example.com/some/deep/path", "../../styles");
// => http://example.com/some/styles

getLink("http://example.com", "#dynamic-website");
// => http://example.com

getLink("http://example.com", "javascript:void(0)");
// => http://example.com

getLink("http://example.com", "mailto:email@example.com");
// => http://example.com

getLink("http://example.com", "http://domain.com");
// => false
```

## Tests

```bash
$ npm test
```
