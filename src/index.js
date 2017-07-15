import url from "url";

const REGEX_URL      = /^(?:https?:\/\/)?(?:www\.)?([-a-zA-Z0-9_.=]{2,255}\.+(?:[a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel|local|internal)\b)(\/[-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)?/gi;
const REGEX_DYNAMIC  = /^(?:javascript\:\S{1,})|(?:#\S{1,})/gi;
const REGEX_ABSOLUTE = /^https?:\/\//i;

/**
 * Parses a link and returns its domain and path or undefined if the argument is
 * not a valid link.
 *
 * @param   {string}    link        Link to parse
 * @return  {object|undefined}      Domain/path or undefined if can't be parsed
 * @access  public
 */
const parseLink = link => {
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
 * @param   {string}    base    Basic, absolute url
 * @param   {string}    link    Link to parse
 * @return  {string|false}      Absolute path
 *
 * @export  {function}
 * @access  public
 */
export default function ( base, link ) {
    // Dynamic stuff - there's no link:
    if ( typeof link !== "string" || link.match( REGEX_DYNAMIC ) ) {
        return base;
    }

    // Link is absolute:
    if ( link.match( REGEX_ABSOLUTE ) ) {
        const parsedBase = parseLink( base );
        const parsedLink = parseLink( link );

        // Both `base` and `link` are on different domains:
        if ( parsedBase.domain !== parsedLink.domain ) {
            return false;
        }

        // Absolute path from same domain:
        if ( parsedLink.path ) {
            return url.resolve( base, parsedLink.path );
        }

        // Two same domains without path:
        return url.parse( base ).href;
    }

    const parsedBase = url.parse( base );
    const parsedLink = link.split( "/" );
    let linkParts = [];

    if ( link.startsWith( "/" ) ) {
        linkParts = [];
    } else {
        linkParts = parsedBase.pathname.split( "/" );
        linkParts.pop();
    }

    for ( const part of parsedLink ) {
        // Current directory:
        if ( part === "." ) {
            continue;
        }

        // Parent directory:
        if ( part === ".." ) {
            // Wrong url - accessing non-existing parent directories:
            if ( ! linkParts.pop() || linkParts.length === 0 ) {
                return null;
            }
        } else {
            linkParts.push( part );
        }
    }

    return `${parsedBase.protocol}//${parsedBase.hostname}${linkParts.join( "/" )}`;
};
