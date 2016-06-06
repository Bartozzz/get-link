"use strict";

let url  = require( "url" );

const REGEX_URL      = /^(?:https?:\/\/)?(?:www\.)?([-a-zA-Z0-9_.=]{2,255}\.+(?:[a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel|local|internal)\b)(\/[-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)?/gi;
const REGEX_DYNAMIC  = /^(?:javascript\:\S{1,})|(?:#\S{1,})/gi;
const REGEX_ABSOLUTE = /^https?:\/\//i;

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
 * Transforms a relative path into an absolute url.
 *
 * @param   string  base    Website base absolute url
 * @param   string  link    Link to parse
 * @return  {string|false}  Absolute path
 * @access  public
 */
module.exports = function ( base, link ) {
    if ( typeof link !== "string" ) {
        return base;
    }

    // Dynamic website - there's no link:
    if ( link.match( REGEX_DYNAMIC ) ) {
        return false;
    }

    // Link is absolute:
    if ( link.match( REGEX_ABSOLUTE ) ) {
        let parsedBase = parseLink( base );
        let parsedLink = parseLink( link );

        // Absolute path from another domain:
        if ( parsedBase.domain !== parsedLink.domain ) {
            return false;
        }

        // Absolute path from same domain:
        if ( parsedLink.path ) {
            return url.resolve( base, parsedLink.path );
        }

        // Basically two same domains without path:
        return url.parse( base ).href;
    } else {
        let parsedBase = url.parse( base );
        let parsedLink = link.split( "/" );
        let linkParts  = [];

        if ( link.startsWith( "/" ) ) {
            linkParts = [];
        } else {
            linkParts = parsedBase.pathname.split( "/" );
            linkParts.pop();
        }

        for ( let i = 0; i < parsedLink.length; ++i ) {
            // Current directory:
            if ( parsedLink[ i ] === "." ) {
                continue;
            }

            // Parent directory:
            if ( parsedLink[ i ] === ".." ) {
                // Wrong url accessing non-existing parent directories:
                if ( ! linkParts.pop() || linkParts.length === 0 ) {
                    return null;
                }
            } else {
                linkParts.push( parsedLink[ i ] );
            }
        }

        return `${parsedBase.protocol}//${parsedBase.hostname}${linkParts.join( "/" )}`;
    }
};
