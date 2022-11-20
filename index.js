const express = require('express');
const app = express();

app.get('/', function(req, res) {
   res.sendFile(__dirname + '/index.html');
});


const PORT = 3002
app.listen(PORT, () => console.log(`Server started on ${PORT}`));