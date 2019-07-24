const fetch = require('node-fetch');
const { KubeConfig } = require('kubernetes-client');
const Request = require('kubernetes-client/backends/request');
const Client = require('kubernetes-client').Client;

const kubeconfig = new KubeConfig();
kubeconfig.loadFromFile('/home/beyond/.kube/config');

const backend = new Request({ kubeconfig });
const client = new Client({ backend, version: '1.13' });


module.exports = {
	name: 'kubectl',
	description: 'kubernetes cmd line!',
	async execute(message, args) {
    console.log(`message is ${message} & args are ${args}`);
    const response = await client.api.v1.namespaces('default').pods().get();
    
    async function formatItForDiscord(response){
      response.body.items.filter( (currentObj,index,arr) => {
          let msgToSend=`${currentObj.metadata.name} ${currentObj.status.phase} ${currentObj.status.podIP}`; 
          if(currentObj.status.phase != 'Running'){
            msgToSend += ' :red_circle:';   
          }
          else{
            msgToSend += ' :green_heart:';
          }
          message.channel.send(msgToSend);
        });
    };

    formatItForDiscord(response);  
  } 
};