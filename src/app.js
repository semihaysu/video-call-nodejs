const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const stream = require('./ws/stream');
const path = require('path');
const favicon = require('serve-favicon');

const app = express();
const server = http.createServer(app); // HTTP sunucusu
const io = socketIO(server); // Socket.IO ile sunucu oluşturma

app.use(favicon(path.join(__dirname, 'favicon.ico')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Socket.IO stream bağlantısı
io.of('/stream').on('connection', stream);

// Sunucuyu başlatma
server.listen(3000, () => {
    console.log('Sunucu 3000 portunda çalışıyor.');
});
