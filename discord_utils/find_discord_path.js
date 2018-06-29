"use strict";


const 
    path = require("path"),
    fs = require("fs");

module.exports = exports = 
/** @returns {Promise<String>} */
function(){
    return new Promise((resolve,reject)=>{
        if(!("HOME" in process.env | "home" in process.env))
            return reject("HOME environment variable is undefined.");
        
        let discord_path = path.join(process.env.HOME, ".config", "discord");


        fs.access(discord_path, fs.constants.R_OK, err=>{
            if(err)
                return reject(err);
            
            return resolve(discord_path);
        });
    });
    

}