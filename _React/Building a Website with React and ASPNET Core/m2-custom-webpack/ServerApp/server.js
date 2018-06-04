
const express = require('express');
const app = express();

app.use(express.static('public',{
    index: false
}));

import Renderer from './Renderer';
app.get('*', (req, res) => {
    const rendererInstance = Renderer(req);

    // pokud je route nevalidni pro react application, tak se posle status code 404 (z react app)
    // a server odesle odpoved se statusem 404
    if (rendererInstance.routestatus == 404){
        res.status(404).end("Not found, 404 status returned");
    } else {
        res.send(Renderer(req).htmlcode);
    }
});

app.listen(3040, function () {
    console.log('Listening on port 3040!');
});