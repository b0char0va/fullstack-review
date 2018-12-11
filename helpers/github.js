const request = require('request');
const config = require('../config.js');

let getReposByUsername = (username, callback) => {
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