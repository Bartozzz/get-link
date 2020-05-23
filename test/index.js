const getLink = require("../dist");
const assert = require("assert");

describe("getLink(base, link)", () => {
  it("should throw a TypeError if 'base'", () => {
    assert.throws(() => getLink("invalid", "https://example.com"));
  });

  it("should return 'base' if 'link' is invalid", () => {
    const base = "http://example.com/";

    assert.equal(base, getLink(base, "#dynamic"));
    assert.equal(base, getLink(base, "mailto:mailt@ex.com"));
    assert.equal(base, getLink(base, "javascript:void(0)"));
  });

  it("should return 'base' if 'link' is on a different host", () => {
    const base = "http://example.com/";

    // Same domain, different subdomain:
    assert.equal(base, getLink(base, "http://www.example.com/"));
    assert.equal(base, getLink(base, "http://www.example.com"));
    assert.equal(base, getLink(base, "https://www.example.com/"));
    assert.equal(base, getLink(base, "https://www.example.com"));

    // Same domain, different port:
    assert.equal(base, getLink(base, "http://example:80.com/"));
    assert.equal(base, getLink(base, "http://example:80.com"));
    assert.equal(base, getLink(base, "https://example:80.com/"));
    assert.equal(base, getLink(base, "https://example:80.com"));

    // Different top-level domain:
    assert.equal(base, getLink(base, "http://example.org/"));
    assert.equal(base, getLink(base, "http://example.org"));
    assert.equal(base, getLink(base, "https://example.org/"));
    assert.equal(base, getLink(base, "https://example.org"));
  });

  it(`should resolve absolute paths`, () => {
    const base = "http://www.example.com/";

    assert.equal(
      "http://www.example.com/test.html",
      getLink(base, "http://www.example.com/test.html")
    );

    assert.equal(
      "https://www.example.com/test.html",
      getLink(base, "https://www.example.com/test.html")
    );
  });

  it(`should resolve relative paths`, () => {
    const base = "http://www.example.com/style/base/";
    const output = "http://www.example.com/style/style.css";

    assert.equal(output, getLink(base, "./../style.css"));
    assert.equal(output, getLink(base, "../style.css"));
    assert.equal(output, getLink(base, "/style/style.css"));
  });

  it("should resolve ports", () => {
    assert.equal(
      getLink("http://example.com:1234/", "hello.html"),
      "http://example.com:1234/hello.html"
    );
  });

  it("should strip hash", () => {
    assert.equal(
      "http://example.com/",
      getLink("http://example.com/", "#test")
    );

    assert.equal(
      "http://example.com/",
      getLink("http://example.com/#test", "#test")
    );
  });
});
