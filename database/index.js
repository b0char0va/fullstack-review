const mongoose = require('mongoose');
mongoose.connect('mongodb://admin:student@localhost:27017/fetcher?authSource=admin');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
    username : String,
    repo_id : Number,
    repo_name: String,
    repo_forks: Number,
    repo_url: String
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (data, callback) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
    var parsedData = JSON.parse(data);
    var array = [];

    parsedData.forEach((el) => {
                array.push({
                    username : el.owner.login,
                    repo_id : el.id,
                    repo_name: el.name,
                    repo_forks: el.forks_count,
                    repo_url: el.html_url,

                });
    });

    array.forEach((el)=>{
        Repo.find({repo_id: el.id}).exec((err, data)=>{
            if(!data.length) {
                    Repo.collection.insert(el, (err) => {
                        if(err) {
                            console.log('hey');
                            callback(err);
                        }else{
                            console.log('hi');
                            callback('saved');
                        }
                    })
                }
        })
    });

};


let retrieve = (username, callback) => {

    Repo.find({}).sort({repo_forks: 'descending'}).limit(25).exec((err, data) => {
        if(err){
            callback(err, null);
        }else{
            callback(null, data);
        }
    })

};

module.exports.save = save;
module.exports.retrieve = retrieve;