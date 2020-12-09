require('dotenv').config();
const axios = require('axios');
const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('../config.json');

const prefix = '!';

// logging in the bot
client.on('ready', () => {
    console.log('Bot online...')
});


client.on('message', async(message) =>{
    if(!message.content.startsWith(prefix)){
        return;
    }
    
    const args = message.content
        .slice(prefix.length)
        .trim()
        .split(/ +/g);

    const command = args.shift().toLowerCase();
    console.log(args);

    if(command === 'joke'){
        let getjoke = async () => {
            let response = await axios.get('https://official-joke-api.appspot.com/random_joke');
            let joke = response.data;
            return joke;
        }
        let jokeValue = await getjoke();
        console.log(jokeValue);
        message.reply(`You don't need any jokes since you already are one.\n xD just kidding, here.\n\n ${jokeValue.setup} \n ${jokeValue.punchline}`);
        
    }

    if(command === 'anime'){
        
        /**let animeQuote = async () => {
            let response = await axios.get('https://animechanapi.xyz/api/quotes/random');
            let quote = response.data;
            return quote;
        }
        let quoteValue = await animeQuote();
        console.log(quoteValue);
        //message.reply(`"${quoteValue.data[0].quote}" - ${quoteValue.data[0].character}`);**/
        
        const embed = new Discord.MessageEmbed()
        .addTitle('The joke');
        message.channel.send(embed);
    }


});

// Bot online
client.login(config.token);