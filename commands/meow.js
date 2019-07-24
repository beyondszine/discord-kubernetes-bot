const fetch = require('node-fetch');

module.exports = {
	name: 'meow',
	description: 'Meoww!',
	async execute(message, args) {
        var mfile = await fetch('https://aws.random.cat/meow')
                              .then(response => response.json())
                              .then(resp => {
                                console.log(`resp is ${JSON.stringify(resp)}`);
                                return resp;
                              });
      message.channel.send(mfile.file);
	},
};