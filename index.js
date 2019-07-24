(async function (){
  'use strict';
  const Discord = require('discord.js');
  const client = new Discord.Client();
  const fs = require('fs');

  var debug = require('debug')('discord');
  const path = require('path');
  const config = require('config');
  const discordConfig = config.get('Discord.config');

  const prefix = '!'; // or overload it with some environment variable.

  client.commands = new Discord.Collection();
  const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
  }  


  client.on('ready', () => {
    debug(`Logged in as ${client.user.tag}!`);
    debug(`Env vars: ${JSON.stringify(discordConfig)}`);  
    client.channels.get(discordConfig.channelID).send('Almighty Bot has joined the Notifications channel!');
  });

  client.on('message',async msg => {
    console.log("msg recieved",msg.content);
    if (!msg.content.startsWith(prefix) || msg.author.bot){
      debug('Either msg is not for Bot or is by Bot. bwahaha');
      return;
    } 

    const args = msg.content.slice(prefix.length).split(/ +/);
    debug("list of args seperated by space",args);

    const command = args.shift().toLowerCase(); // first word that accompanies the prefix.

    if (!client.commands.has(command)) return;

    try {
      client.commands.get(command).execute(msg, args);
    } 
    catch (error) {
      console.error(error);
      msg.reply('there was an error trying to execute that command!');
    }
  
  });

  client.on('error', console.error);


  client.login(discordConfig.discordBotKey);
})();
