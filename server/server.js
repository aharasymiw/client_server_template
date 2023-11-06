const express = require('express');

const app = express();


app.use(express.static('server/public'));
app.use(express.json());


app.get('/thing', (req, res) => {
    console.log('GET /thing request received!');
    res.send('GET /thing response');
})

app.post('/thing', (req, res) => {
    console.log('POST /thing request received');
    let requestedThing = req.body;
    console.log('POST /thing request:', requestedThing);


    res.sendStatus(201);
})

app.listen(5000, function () {
    console.log(`You started the server! It is running on port 5000.`);
})

