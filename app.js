const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const socketIO = require('socket.io');

const fs = require('fs'); // Ajoutez cette ligne

let homepage = fs.readFileSync('index.html', 'utf8');

const app = express();
app.use(bodyParser.text({limit: '50mb'}));

const server = http.createServer(app);
const io = socketIO(server);

app.post('/update', (req, res) => {
    const newHtml = req.body;
    homepage = homepage.replace('</body>', `${newHtml}</body>`);
    io.emit('update', {html: homepage});
    res.send('Page mise à jour avec succès');
});

app.get('/', (req, res) => {
    // Ajoutez les en-têtes CORS à la réponse
    res.send(homepage);
});

const PORT = process.env.LIVEDEBUG_PORT || 3030;
const URL = process.env.LIVEDEBUG_URL || 'http://localhost:3030';
console.log(process.env);
console.log(PORT);
console.log(URL);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

io.on('connection', (socket) => {
    console.log('Client connected');

    socket.emit('update', {html: homepage});
});

app.post('/clear', (req, res) => {
    homepage = fs.readFileSync('index.html', 'utf8').replace('##URL##', URL);
    io.emit('update', {html: homepage});
    console.log('Page cleared');
});
