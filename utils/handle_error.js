"use strict";

/** @param {Error} err @param */
const handleErr = function(err) {
    if(err) {
        console.error(`${err}`);
    }
    return !!err;
}

module.exports = exports = handleErr;