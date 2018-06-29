"use strict";



const
    say = require("../utils/say"),
    path = require("path"),
    fs = require("fs"),
    fetchDB = require("../db_utils/fetch_db");


/** @param {string} fn */
const dlsfOnly = function(fn) {
    const
        DX = ".localstorage",
        DSV = "discordapp.com";

    let ext = path.extname(fn).toLowerCase();

    if (ext != DX) return false;
    fn = path.basename(fn, DX); //proto_domain_i 

    let patt = fn.match(/^([^_]*?)_([^_]+?)_(\d+)/);
    if (!patt) return false;

    let [, proto, domain, i] = patt;
    if (domain.toLowerCase() != DSV) return false;
    return true;
}


/** 
 * @param {{resolve: (value?: any)=>void, reject: (reason?: any)=>void}} promise  
 * @param {string} fn 
*/
const parseSQLiteFile = async function(promise, fn) {
    if(promise.resolved)
        return say(`No need of opening ${fn} because it was already resolved.`);
    
        say(`Fetching "${fn}" database for "token" value...`);
    
    
    let token = await fetchDB(fn, "ItemTable", "value", {key: "token"});
        
    if(promise.resolved)
        return say(`No need of proceeding on ${fn} because it was already resolved while that was fetched.`);
    
    if(token.length > 0){
        promise.resolved = true;
        token = token[0].value.toString("ucs2")
        promise.resolve(JSON.parse(`[${token}]`)[0]);
    }
}

/** 
 * @param {string} bpath
 * @param {{resolve: (value?: any)=>void, reject: (reason?: any)=>void}} promise  
 * @param {Error} err 
 * @param {String[]} list 
*/
const parseLSList = function (bpath, promise, err, list) {
    if(err)
        return promise.reject(err);


    promise.resolved = false;

    list
        .filter(dlsfOnly)
        .map(f => path.join(bpath, f))
        .forEach(parseSQLiteFile.bind(this, promise));
}



module.exports = exports = 
/** @returns {Promise<String>} */ 
function(discordPath){
    return new Promise((resolve, reject)=>{
        
        let discordLSPath = path.join(discordPath, "Local Storage");
        
        say(`Reading "${discordLSPath}"...`);

        fs.readdir(
            discordLSPath, 
            "utf8", 
            parseLSList.bind(this, discordLSPath, {resolve,reject})
        );
    
    });
}