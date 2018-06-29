"use strict";

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
