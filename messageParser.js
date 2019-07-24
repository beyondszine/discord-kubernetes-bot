var debug = require('debug')('messageParser.js');
const fetch = require('node-fetch');

async function msgParser(prefix,msg){
    const args = msg.content.slice(prefix.length).split(/ +/);
    debug("list of args seperated by space",args);

    const command = args.shift().toLowerCase();
    debug(command);
    if (command === 'ping') {
        msg.reply('pong');
    }
    if (command === 'cat') {
      var mfile = await fetch('https://aws.random.cat/meow')
                              .then(response => response.json())
                              .then(resp => {
                                debug(`resp is ${JSON.stringify(resp)}`);
                                return resp;
                              });
      msg.channel.send(mfile.file);
    }
  }

  module.exports = {
      msgParser : msgParser
  }