"use strict";


/** 
 * @param {any} what 
 * @param {string} whatName 
 * @param {string} whatType 
*/
module.exports = exports = function(what, whatName, whatType){
    if(typeof what !== whatType) 
        throw new Error(whatName + " has to be " + whatType);
}
