<div align="center">
  <h1>get-link</h1>

[![Default CI/CD](https://github.com/Bartozzz/get-link/workflows/Default%20CI/CD/badge.svg)](https://github.com/Bartozzz/get-link/actions)
[![Known Vulnerabilities](https://snyk.io/test/github/Bartozzz/get-link/badge.svg?targetFile=package.json)](https://snyk.io/test/github/Bartozzz/get-link?targetFile=package.json)
[![npm package size](https://img.badgesize.io/Bartozzz/get-link/master/dist/index.js?compression=gzip)](https://www.npmjs.com/package/get-link)
[![npm version](https://img.shields.io/npm/v/get-link.svg)](https://www.npmjs.com/package/get-link)
[![npm dependency Status](https://david-dm.org/Bartozzz/get-link.svg)](https://www.npmjs.com/package/get-link)
[![npm downloads](https://img.shields.io/npm/dt/get-link.svg)](https://www.npmjs.com/package/get-link)
<br>

`get-link` builds an absolute URL based on an absolute `base` URL and a `link`. Makes sure that both `base` and `link` are valid, on the same host and HTTP/HTTPS protocol. Stripes hashes. [WHATWG URL](https://url.spec.whatwg.org/) compatible.

</div>

## Installation

```bash
$ npm install get-link
```

## Usage

`getLink(base: string, link: string): string`

```javascript
import getLink from "get-link";

getLink("http://example.com", "/foo.html#hash");
getLink("http://example.com", "http://example.com/foo.html#hash");
// => http://example.com/foo.html

getLink("http://example.com", "javascript:void(0)");
getLink("http://example.com", "mailto:email@example.com");
// => http://example.com

getLink("http://example.com/some/deep/path", "../../styles");
// => http://example.com/styles

getLink("http://example.com", "http://domain.com");
// => http://example.com

getLink("invalid base");
// => TypeError
```

## Tests

```bash
$ npm test
```
