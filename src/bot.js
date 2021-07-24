require('dotenv').config();
const axios = require('axios');
const Discord = require('discord.js');
const { request } = require('https');
const client = new Discord.Client();
const command = require('../command/command.js');
const cheerio = require('cheerio');
const Request = require('request');


// logging in the bot
client.on('ready', () => {
    console.log('Bot online...')
    client.login(process.env.TOKEN)
});

// Bot online

// setting up rich presence for the bot
client.user.setPresence({
    activity: { name: "out for $commands", type: "WATCHING" },
    status: "online",
});

// ********** JOKE COMMAND **********

command(client, 'joke', message => {
    let getjoke = async () => {
        let response = await axios.get('https://official-joke-api.appspot.com/random_joke');
        let joke = response.data;
        const embed = new Discord.MessageEmbed()
        .addField(`Here's a joke for you`, `<@${message.author.id}>`)
        .setDescription(`${joke.setup} \n ${joke.punchline}`)
        .setColor('f6e817')
        .setThumbnail('https://media.tenor.com/images/155726bee44580a66a5ad2aa484dd7c3/tenor.png')
        message.channel.send(embed);
    }
    getjoke(message);
});

// ********** ANIME COMMAND **********   

command(client, 'anime', message => {
    let animeQuote = async () => {
        let response = await axios.get('https://animechan.vercel.app/api/random');
        let animeQuote = response.data;
        let results = animeQuote.data[0].character;
        const embed = new Discord.MessageEmbed()
        .addField(`Here's a bad-ass anime quote for you `,
        `<@${message.author.id}>`)
        .setDescription(`"${animeQuote.data[0].quote}" - **${animeQuote.data[0].character}** from ${animeQuote.data[0].anime}`)
        .setColor('f4e9ea')
        .setThumbnail(image(message, results))
        //.setThumbnail('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/1bb2df56-4c6f-418e-bd9f-ab3864f0fd63/dajd932-6930d790-8f1c-4aa3-9484-22b77bcd13d9.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvMWJiMmRmNTYtNGM2Zi00MThlLWJkOWYtYWIzODY0ZjBmZDYzXC9kYWpkOTMyLTY5MzBkNzkwLThmMWMtNGFhMy05NDg0LTIyYjc3YmNkMTNkOS5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.zn7imjOALAyabcOeB8hKmy52TaNpsjPyE0uF7db1iHU')
        message.channel.send(embed);
        //message.reply(`"${animeQuote.data[0].quote}" - ${animeQuote.data[0].character}`);
    }
    animeQuote(message);
});

// ********** CLEAR COMMAND **********

command(client, ['clear', 'cc'], message => {
    if(message.member.hasPermission('ADMINISTRATOR')){
        message.channel.messages.fetch()
        .then((results) => {
            message.channel.bulkDelete(results);
        });
    }
});


// ************* HELP COMMAND ************

command(client, 'help', message => {
    const embed = new Discord.MessageEmbed()
    .setTitle(`I'm ${client.user.username}`)
    .setDescription(`Hey there fella! <@${message.author.id}>. I have a purpose and that is to provide you my services.
    By the way, this guy <@581675710515511306> invented me eventhough he's emotionally unstable.`)
    .addField(
        "Critical info:",
        `Feel free to try my commands by typing \`!commands\``,
        true
    )
    .setColor('20f937')
    .setThumbnail('https://st4.depositphotos.com/1479444/27951/v/1600/depositphotos_279519326-stock-illustration-hitler-shows-hand-gesture-up.jpg')
    message.channel.send(embed);
});

// ********** QUOTES COMMAND **********

command(client, 'quotes', message => {
    let Quote = async () => {
        let response = await axios.get('https://zenquotes.io/api/random');
        let Quote = response.data;
        let results = Quote[0].a;
        const embed = new Discord.MessageEmbed()
        .addField(`Here's a motivational quote for you`, `<@${message.author.id}>` )
        .setDescription(`"${Quote[0].q}" - **${Quote[0].a}**`)
        .setColor('f5141b')
        .setThumbnail(image(message, results))
        message.channel.send(embed);
    }
    Quote(message);
});

// ********** COMMAND DESCRIPTION **********

command(client, 'commands', message => {
    const embed = new Discord.MessageEmbed()
    .setTitle(`Commands inside me, the legendary ${client.user.username}`)
    .setDescription(`You guys can access me by start typing after a \`!\` prefix.`)
    .addField(
        "command info:",
        `<@${message.author.id}> These are my available commands
        \`!anime\` - I will send you a kick-ass anime quote
        \`!joke\` - A cheesy joke for you from me
        \`!quotes\` - Motivational quote to make your day better\n
        These are my commands for now, if you want to provide my developer a feedback, feel free to send a message to this guy, <@${process.env.MYID}>, He's lying btw lol, He indeed is a SIMP and he's not proud of it.`,
        true
    )
    .setColor('20f937')
    .setThumbnail('https://st4.depositphotos.com/1479444/27951/v/1600/depositphotos_279519326-stock-illustration-hitler-shows-hand-gesture-up.jpg')
    message.channel.send(embed);
});

command(client, 'image', message => {
    image(message);
})

// ********** IMAGE SEARCH **********

 function image(message, results){
    var options = {
        url: `https://results.dogpile.com/serp?qc=images&q=${results}`,
        method: "GET",
        headers: {
            "Accept": "text/html",
            "User-Agent": "Chrome"
        }    };
    Request(options, function(error, response, responseBody){
        if(error){
            return console.log(error);
        } // If there is an error
        $ = cheerio.load(responseBody);
        var links = $('.image a.link');
        var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr('href'));
        console.log(urls);
        if(!urls.length){
            return console.log('No results found');
        } // See if there are any results
        const embed = new Discord.MessageEmbed()
        .setImage(urls[0])
        .setFooter('Searched by '+message.author.username);
        message.channel.send(embed);
    });
}
