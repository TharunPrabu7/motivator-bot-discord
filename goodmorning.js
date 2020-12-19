const Discord = require('discord.js');
const client = new Discord.Client();

client.login(process.env.TOKEN).then(() => {
    console.log("I am ready");
    var guild = client.guilds.get('785738301021224961');
    if(guild && guild.channels.get('785738301515628596')){
        guild.channels.get('785738301515628596').send("Good Morning").then(() => client.destroy());
    } else {
        console.log("nope");
        //if the bot doesn't have guild with the id guildid
        // or if the guild doesn't have the channel with id channelid
    }
    client.destroy();
});