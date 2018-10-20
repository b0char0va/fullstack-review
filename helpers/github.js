const request = require('request');
const config = require('../config.js');

let getReposByUsername = (username, callback) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out, 
  // but you'll have to fill in the URL
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  request(options, (err, response)=>{
    if(err) {
      callback(err, null);
    }else{
      console.log(response);
      callback(null, response);
    }
  })
};

module.exports.getReposByUsername = getReposByUsername;


//curl -H "Authorization: token 1c05ba78ca4cc2717c8ef7ec1cad2dccb7f286c3" https://api.github.com/users/b0char0va/repos