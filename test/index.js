const getLink = require("../dist");
const assert = require("assert");

describe("Test", function() {
    const TEST_URL_0 = "http://example.com";
    const TEST_RES_0 = "http://example.com/";
    it(`should return ${TEST_RES_0}`, function() {
        assert.equal(TEST_RES_0, getLink(TEST_URL_0, "http://www.example.com/"));
        assert.equal(TEST_RES_0, getLink(TEST_URL_0, "http://example.com/"));
        assert.equal(TEST_RES_0, getLink(TEST_URL_0, "http://www.example.com"));
        assert.equal(TEST_RES_0, getLink(TEST_URL_0, "http://example.com"));
        assert.equal(TEST_RES_0, getLink(TEST_URL_0, "https://www.example.com/"));
        assert.equal(TEST_RES_0, getLink(TEST_URL_0, "https://example.com/"));
        assert.equal(TEST_RES_0, getLink(TEST_URL_0, "https://www.example.com"));
        assert.equal(TEST_RES_0, getLink(TEST_URL_0, "https://example.com"));
    });

    const TEST_URL_1 = "http://example.com";
    const TEST_RES_1 = "http://example.com/test.html";
    it(`should return ${TEST_RES_1}`, function() {
        assert.equal(TEST_RES_1, getLink(TEST_URL_1, "http://www.example.com/test.html"));
        assert.equal(TEST_RES_1, getLink(TEST_URL_1, "http://example.com/test.html"));
        assert.equal(TEST_RES_1, getLink(TEST_URL_1, "https://www.example.com/test.html"));
        assert.equal(TEST_RES_1, getLink(TEST_URL_1, "https://example.com/test.html"));
        assert.equal(TEST_RES_1, getLink(TEST_URL_1, "/test.html"));
        assert.equal(TEST_RES_1, getLink(TEST_URL_1, "test.html"));
    });

    const TEST_URL_2 = "http://www.example.com/";
    const TEST_RES_2 = "http://www.example.com/test.html";
    it(`should return ${TEST_RES_2}`, function() {
        assert.equal(TEST_RES_2, getLink(TEST_URL_2, "http://www.example.com/test.html"));
        assert.equal(TEST_RES_2, getLink(TEST_URL_2, "http://example.com/test.html"));
        assert.equal(TEST_RES_2, getLink(TEST_URL_2, "https://www.example.com/test.html"));
        assert.equal(TEST_RES_2, getLink(TEST_URL_2, "https://example.com/test.html"));
        assert.equal(TEST_RES_2, getLink(TEST_URL_2, "/test.html"));
        assert.equal(TEST_RES_2, getLink(TEST_URL_2, "test.html"));
    });

    const TEST_URL_3 = "http://www.example.com/style/base/";
    const TEST_RES_3 = "http://www.example.com/style/style.css";
    it(`should return ${TEST_RES_3}`, function() {
        assert.equal(TEST_RES_3, getLink(TEST_URL_3, "./../style.css"));
        assert.equal(TEST_RES_3, getLink(TEST_URL_3, "../style.css"));
        assert.equal(TEST_RES_3, getLink(TEST_URL_3, "/style/style.css"));
    });

    const TEST_URL_4 = "example.com";
    const TEST_RES_4 = "example.com";
    it("should return base", function() {
        assert.equal(TEST_RES_4, getLink(TEST_URL_4, {}));
        assert.equal(TEST_RES_4, getLink(TEST_URL_4, NaN));
        assert.equal(TEST_RES_4, getLink(TEST_URL_4, 123));
        assert.equal(TEST_RES_4, getLink(TEST_URL_4, null));
        assert.equal(TEST_RES_4, getLink(TEST_URL_4, undefined));
        assert.equal(TEST_RES_4, getLink(TEST_URL_4, "#dynamic"));
        assert.equal(TEST_RES_4, getLink(TEST_URL_4, "mailto:mailt@ex.com"));
        assert.equal(TEST_RES_4, getLink(TEST_URL_4, "javascript:void(0)"));
    });

    it("should return false", function() {
        assert.equal(false, getLink(TEST_URL_1, "https://www.example.gov/"));
        assert.equal(false, getLink(TEST_URL_1, "http://www.example.gov/"));
        assert.equal(false, getLink(TEST_URL_1, "https://example.gov/"));
        assert.equal(false, getLink(TEST_URL_1, "http://example.gov/"));
    });
});
