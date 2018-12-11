const express = require('express');
const bodyParser = require('body-parser');
const github = require('../helpers/github.js');
const db = require('../database/index.js');
let app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
    let username = req.body.term;
    github.getReposByUsername(username, (err, data) => {
        if (err) {
            res.end(err);
        } else {
            db.save(data.body, (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('success');
                }
            });
        }
    })
});

app.get('/repos', function (req, res) {
    db.retrieve({}, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(data));
        }
    })
});

let port = 1128;

app.listen(port, function () {
    console.log(`listening on port ${port}`);
});

