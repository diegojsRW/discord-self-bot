"use strict";

const 
    typeAssert = require("../utils/type_assert");



const literalize = function(o){
    if(["string", "object"].includes(typeof o))
        return `"${o}"`;
    return `${o}`;
}

class SQLArray {
    constructor(...items){
        this.items = items;

    }
    toString(){
        return this.items.map(v=>literalize(v)).join(",");
    }
};

const _SQLArray = function(...items){
    return new SQLArray(...items);
} 



/** 
 * @param {string} key 
 * @param {any} val 
*/
const pair2str = function(key,val){

    if(val instanceof SQLArray){
        return `${key} IN (${val})`;
    }

    val = literalize(val);
    
    return `${key} = ${val}`;
}



/** 
 * @param {Object.<string, string>} pairs
 * @returns {string}
 */
const pairs2str = function(pairs){
    return Object
    .entries(pairs)
    .map(
        ([column,val])=>
        Array.isArray(val) ? 
            "(" + 
                val
                    .map(v=>pair2str(column,v))
                    .join(" OR ") 
            + ")" 
            : 
            pair2str(column,val)
    ).join(" AND ");
}

module.exports = exports = 
/**
 * @param {string} table
 * @param {string|string[]} columns
 * @param {Object.<string, string>} conditions
 */
function(table, columns, conditions){
    typeAssert(table, "table", "string");
    
    let columnStr = (Array.isArray(columns) ? columns.join(",") : columns);
    typeAssert(columnStr, "columnStr", "string");

    let conditionStr = pairs2str(conditions);

    let sql = `SELECT ${columnStr} FROM ${table} WHERE (${conditionStr})`;
    return sql;
};


module.exports.Array = exports.Array = _SQLArray;
