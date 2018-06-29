# Discord Self-Bot

**What it differs from other selfbots:** it automatically gets the `token` by scanning  Discord's user folder (more precisely, the `token` is stored inside its "Local Storage", whose files are SQLite databases). No need of opening DevTools and copying it by hand.

**What it does:** Currently, **the only thing it does is embedding** Discord message replies. 

## Message replying:

1. Activate **Developer Mode** inside Discord's settings. 
2. Find out the message to be replied, right-click the message contents and choose "Copy ID". 
3. Type "**@your_username** ", followed by the number you copied (separated by one space), followed by two linebreaks, followed by the reply message. 
4. After sending it, the self-bot will automatically fetch the message ID and embed it in a fancy style.
5. For technical reasons, you should mention the user inside your reply if you want it to ping as mentions made after sending the message won't ping the replied user.

That's all it does for now, currently. I think it doesn't violates the ToC. **Use it with prudence.**

License: [![WTFPL - Do What The F*** You Want Public License](http://www.wtfpl.net/wp-content/uploads/2012/12/wtfpl-badge-2.png)](http://www.wtfpl.net/)
