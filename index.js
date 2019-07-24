(async function (){
  'use strict';
  const Discord = require('discord.js');
  const client = new Discord.Client();

  const messageParser = require('./messageParser');

  var debug = require('debug')('discord');
  
  const config = require('config');
  const discordConfig = config.get('Discord.config');
  const prefix = '!';

  debug(`Env vars: ${JSON.stringify(discordConfig)}`);  

  client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.channels.get(discordConfig.channelID).send('Almighty Bot has joined the Notifications channel!');
  });

  client.on('message',async msg => {
    console.log("msg recieved",msg.content);
    if (!msg.content.startsWith(prefix) || msg.author.bot){
      debug('Either msg is not for Bot or is by Bot. bwahaha');
      return;
    } 
    messageParser.msgParser(prefix,msg);
  });

  client.login(discordConfig.discordBotKey);
})();
