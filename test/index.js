var getLink = require( "./../src" );
var assert  = require( "assert" );

var TEST_URL_0 = "http://example.com";
var TEST_RES_0 = "http://example.com/";

var TEST_URL_1 = "http://example.com";
var TEST_RES_1 = "http://example.com/test.html";

var TEST_URL_2 = "http://www.example.com/";
var TEST_RES_2 = "http://www.example.com/test.html";

var TEST_URL_3 = "http://www.example.com";
var TEST_RES_3 = "http://www.example.com/test/foo.php";

describe( "Test", function () {
    it( `should return ${TEST_RES_0}`, function () {
        assert.equal( TEST_RES_0, getLink( TEST_URL_0, "http://www.example.com/" ) );
        assert.equal( TEST_RES_0, getLink( TEST_URL_0, "http://example.com/" ) );
        assert.equal( TEST_RES_0, getLink( TEST_URL_0, "http://www.example.com" ) );
        assert.equal( TEST_RES_0, getLink( TEST_URL_0, "http://example.com" ) );
        assert.equal( TEST_RES_0, getLink( TEST_URL_0, "https://www.example.com/" ) );
        assert.equal( TEST_RES_0, getLink( TEST_URL_0, "https://example.com/" ) );
        assert.equal( TEST_RES_0, getLink( TEST_URL_0, "https://www.example.com" ) );
        assert.equal( TEST_RES_0, getLink( TEST_URL_0, "https://example.com" ) );
        assert.equal( TEST_RES_0, getLink( TEST_URL_0, "www.example.com" ) );
        assert.equal( TEST_RES_0, getLink( TEST_URL_0, "www.example.com/" ) );
        assert.equal( TEST_RES_0, getLink( TEST_URL_0, "example.com" ) );
        assert.equal( TEST_RES_0, getLink( TEST_URL_0, "example.com/" ) );
    } );

    it( `should return ${TEST_RES_1}`, function () {
        assert.equal( TEST_RES_1, getLink( TEST_URL_1, "http://www.example.com/test.html" ) );
        assert.equal( TEST_RES_1, getLink( TEST_URL_1, "http://example.com/test.html" ) );
        assert.equal( TEST_RES_1, getLink( TEST_URL_1, "https://www.example.com/test.html" ) );
        assert.equal( TEST_RES_1, getLink( TEST_URL_1, "https://example.com/test.html" ) );
        assert.equal( TEST_RES_1, getLink( TEST_URL_1, "example.com/test.html" ) );
        assert.equal( TEST_RES_1, getLink( TEST_URL_1, "/test.html" ) );
        assert.equal( TEST_RES_1, getLink( TEST_URL_1, "test.html" ) );
    } );

    it( `should return ${TEST_RES_2}`, function () {
        assert.equal( TEST_RES_2, getLink( TEST_URL_2, "http://www.example.com/test.html" ) );
        assert.equal( TEST_RES_2, getLink( TEST_URL_2, "http://example.com/test.html" ) );
        assert.equal( TEST_RES_2, getLink( TEST_URL_2, "https://www.example.com/test.html" ) );
        assert.equal( TEST_RES_2, getLink( TEST_URL_2, "https://example.com/test.html" ) );
        assert.equal( TEST_RES_2, getLink( TEST_URL_2, "example.com/test.html" ) );
        assert.equal( TEST_RES_2, getLink( TEST_URL_2, "/test.html" ) );
        assert.equal( TEST_RES_2, getLink( TEST_URL_2, "test.html" ) );
    } );

    it( "should return false", function () {
        assert.equal( false, getLink( TEST_URL_1, "https://www.example.gov/" ) );
        assert.equal( false, getLink( TEST_URL_1, "http://www.example.gov/" ) );
        assert.equal( false, getLink( TEST_URL_1, "https://example.gov/" ) );
        assert.equal( false, getLink( TEST_URL_1, "http://example.gov/" ) );
        assert.equal( false, getLink( TEST_URL_1, "example.gov" ) );
        assert.equal( false, getLink( TEST_URL_1, "javascript:void(0)" ) );
        assert.equal( false, getLink( TEST_URL_1, "#dynamic" ) );
    } );
} );
