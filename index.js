"use strict"

// const
// const cli = new discord.Client();

const 
    say = require("./utils/say"),
    buildSQL = require("./db_utils/build_sql"),    
    fetchDB = require("./db_utils/fetch_db"),
    findDiscordPath = require("./discord_utils/find_discord_path"),
    findToken =  require("./discord_utils/find_token"),
    Discord = require("discord.js");

/** @type {Discord.Client} */
let discordCli;

/** @param {Discord.Message} msg */
const debugdm = function(msg){

}


const checkPrefix = function(msg, prefix){
    return msg.startsWith(prefix);
}

/** @param {Discord.Message} msg */
const parseEmbedCommand = async function(msg){
    let [, ...embedTextParts] = msg.content.split(" ");
    let [embedText, ...replyText] = embedTextParts.join(" ").split(/\r\n\r\n|\r\r|\n\n/);
    replyText = replyText.join("\r\n\r\n");

    /** @type {Discord.Message} */
    let replyMsg;

    if(embedText.match(/^\d+$/g)){// it's an message id
        say("Replying to '"+embedText+"' mid.");
        replyMsg = await msg.channel.fetchMessage(embedText);
        replyText = `<@${replyMsg.author.id}> ${replyText}`;
    } 
    else {
        replyMsg = {
            content: embedText + "\r\n\r\n" + replyText,
            createdAt: msg.createdAt,
            author: {
                avatarURL: discordCli.user.avatarURL,
                username: discordCli.user.username,
                id: discordCli.user.id
            },
            member: {
                displayColor: msg.member.displayColor
            }
        };
        replyText = "";
    };


    
    msg.edit(replyText, {
        embed: {
            color: replyMsg.member.displayColor,
            description: replyMsg.content,
            timestamp: replyMsg.createdAt,
            author: {
                icon_url: replyMsg.author.avatarURL,
                name: replyMsg.author.username
            }
        }
    });
}
/** @param {Discord.Message} msg */
const handleDiscordMessage = function(msg){

    if(discordCli.user.id !== msg.author.id) 
        return debugdm(msg); //Ignore msg from others.

    if(checkPrefix(msg.content,"<@"+discordCli.user.id+">:embed"))
        parseEmbedCommand(msg);
}



const initDiscord = async function(token){
    say("Starting new Discord instance...");
    discordCli = new Discord.Client();

    discordCli.on("ready", function(){
        say("Ready 2 go, discord");
    }).on("message", handleDiscordMessage);
   
    say("Logging in with that token...");
   
    let resu = await discordCli.login(token);
    say(`Login result: ${resu}`);
}


const init = async function(){
    try {
        let discordLocation = await findDiscordPath();
        let token = await findToken(discordLocation);
        say("Got token: ", token);
        initDiscord(token);
    }
    catch(e){
        return console.error(e);
    }

}
init();