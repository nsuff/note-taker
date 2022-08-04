const express = require('express');
const notetable = require('./db/db');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3001;


//const { animals } = require('./data/animals');
//app.get('/api/animals', (req, res) => {
//    res.json(animals);
//  });

//This should make routes for everything inside the public folder
//https://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/*
app.get('/', function(req, res) {
    res.render('/public/index.html', {});
});
*/
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/notes', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('/api/notes', function(req, res) {
    res.json(notetable);
});

app.post('/api/notes', function(req, res) {
    let currentnote = req.body;
    notetable.push(currentnote);

    let noteid = 1;
    for (let index = 0; index < notetable.length; index++) {

        if (notetable[index].id == noteid) {
            noteid += 1;
        };
        for (let i = 0; i < notetable.length; i++) {
            if (notetable[index].id == noteid) {
                noteid += 1;
            };  
                
        };
    };
    currentnote.id = noteid;

    let file = path.join(_dirname, '/db/db.json');
    fs.writeFile( file, JSON.stringify(notetable), function (err) {
        if (err) {
            return console.log(err);
        };
    });
    res.json(currentnote);
});




































app.listen(PORT, () => {
    console.log(`API server now on port 3001!`);
});