"use strict";

const 
    typeAssert = require("../utils/type_assert"),
    buildSQL = require("../db_utils/build_sql"),
    sqlite = require("sqlite");



module.exports =  exports = 
/**
 * @param {string} dbFile
 * @param {string} table
 * @param {string|string[]} columns
 * @param {Object.<string, string>} conditions
 */

async function(dbFile, table, columns, conditions){
    typeAssert(dbFile, "dbFile", "string");
    let sql = buildSQL(table, columns, conditions);
    let db = await sqlite.open(dbFile);
    let results = await db.all(sql);
    return results;
}

module.exports.Array = buildSQL.Array;