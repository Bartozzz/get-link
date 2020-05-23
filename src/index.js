// @flow
import { URL } from "url";

export default function getLink(base: string, link: string) {
  const parsedBase = new URL(base);

  try {
    const parsedLink = new URL(link, base);

    if (!["https:", "http:"].includes(parsedLink.protocol)) {
      throw new Error("'base' or 'link' have invalid protocol");
    }

    if (parsedBase.host !== parsedLink.host) {
      throw new Error("'base' and 'link' are on different hosts");
    }

    parsedLink.hash = "";

    return parsedLink.toString();
  } catch (err) {
    return base;
  }
}
