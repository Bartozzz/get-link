"use strict";

let url  = require( "url" );

const REGEX_URL     = /^(?:https?:\/\/)?(?:www\.)?([-a-zA-Z0-9_.=]{2,255}\.+(?:[a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel|local|internal)\b)(\/[-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)?/gi;
const REGEX_DYNAMIC = /^(?:javascript\:\S{1,})|(?:#\S{1,})/gi;

/**
 * Parses a link and returns its domain and path or undefined if the argument is
 * not a valid link.
 *
 * @param   string  link        Link to parse
 * @return  {object|undefined}  Domain/path or undefined if can't be parsed
 * @access  public
 */
let parseLink = function ( link ) {
    if ( link = new RegExp( REGEX_URL ).exec( link ) ) {
        return {
            domain : link[ 1 ],
            path   : link[ 2 ]
        };
    }
};

/**
 *
 *
 * @param   string  base    Website base absolute url
 * @param   string  link    Link to parse
 * @return  {string|false}  Absolute path
 * @access  public
 */
let getLink = function ( base, link ) {
    let pb = parseLink( base );
    let pl = parseLink( link );

    // Dynamic website - there's no link:
    if ( link.match( REGEX_DYNAMIC ) )
        return false;

    // Relative path:
    if ( ! pl )
        return url.resolve( base, link );

    // Absolute path from another domain:
    if ( pb.domain !== pl.domain )
        return false;

    // Absolute path from same domain:
    if ( pl.path )
        return url.resolve( base, pl.path );

    // Basically two same domains without path:
    return url.parse( base ).href;
};

module.exports.parseLink = parseLink;
module.exports.getLink   = getLink;
module.exports           = getLink;
