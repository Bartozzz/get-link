// @flow

import {parse as parseURL, resolve as resolveURL} from "url";

// eslint-disable-next-line
const REGEX_URL: RegExp = /^(?:https?:\/\/)?(?:www\.)?([-a-zA-Z0-9_.=]{2,255}\.+(?:[a-z]{2,6})\b)(\/[-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)?/gi;
const REGEX_DYNAMIC: RegExp = /^(?:[a-z]+\:[^\/]\S{1,})|(?:#\S{1,})/gi;
const REGEX_ABSOLUTE: RegExp = /^https?:\/\//i;

/**
 * Parse a link and return its "normalized" (without the `https://www.` prefix)
 * domain and path.
 *
 * @param   {string}    link    Link to parse
 * @return  {object}            Normalized domain and path
 * @throws  {Error}             When domain could not be resolved
 */
function parseLink(link: string): Object {
  const match: Object = new RegExp(REGEX_URL).exec(link);

  // 0 = link; 1 = domain; 2 = path
  if (!("1" in match)) {
    throw new Error(`Invalid domain ${link}`);
  }

  return {
    domain: match[1],
    path: match[2],
  };
}

/**
 * Regenerates an absolute URL from `base` and relative `link`.
 *
 * @param   {string}    base    Absolute base url
 * @param   {string}    link    Relative link
 * @return  {string|null}
 */
function regenerateLink(base: string, link: string): string | null {
  const parsedBase: Object = parseURL(base);
  const parsedLink: Array<string> = link.split("/");
  let parts = [];
  let port = "";

  if (!link.startsWith("/")) {
    parts = parsedBase.pathname.split("/");
    parts.pop();
  }

  for (const part of parsedLink) {
    // Current directory:
    if (part === ".") {
      continue;
    }

    // Parent directory:
    if (part === "..") {
      // Accessing non-existing parent directories:
      if (!parts.pop() || parts.length === 0) {
        return null;
      }
    } else {
      parts.push(part);
    }
  }

  if (parsedBase.port) {
    port = ":" + parsedBase.port;
  }

  // eslint-disable-next-line max-len
  return `${parsedBase.protocol}//${parsedBase.hostname}${port}${parts.join("/")}`;
}

/**
 * Transform a relative path into an absolute url.
 *
 * @param   {string}    base    Absolute base url
 * @param   {string}    link    Link to parse
 * @return  {string|false}      Absolute path
 */
export default function(base: string, link: string): null | string | boolean {
  // Dynamic stuff:
  if (typeof link !== "string" || link.match(REGEX_DYNAMIC)) {
    return base;
  }

  // Link is absolute:
  if (link.match(REGEX_ABSOLUTE)) {
    try {
      const parsedBase: Object = parseLink(base);
      const parsedLink: Object = parseLink(link);

      // Both `base` and `link` are on different domains:
      if (parsedBase.domain !== parsedLink.domain) {
        return false;
      }

      // Absolute path from same domain:
      if (parsedLink.path) {
        return resolveURL(base, parsedLink.path);
      }

      // Same domains without path:
      return parseURL(base).href;
    } catch (err) {
      return false;
    }
  }

  // Relative stuff:
  return regenerateLink(base, link);
}
