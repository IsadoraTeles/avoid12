/**
* SERVER SIDE - GESTION DES CONNEXIONS
*/
// 'use strict';

// const express = require('express');
// const socketIO = require('socket.io');
// var path = require('path');
// const  PORT = process.env.PORT || 3000;
// const INDEX = 'public/';

// const server = express()
//     .use(express.static(patPORTh.join(__dirname, 'public')))
//     .listen(PORT, () => console.log(`Listening on ${PORT}`));

// const io = socketIO(server, { transports: ['websocket'] });

// let portOut = process.env.PORT;
// if (portOut == null || portOut == "") {
//     portOut = 3000;
// }

// var io = require('socket.io')(portOut);

const express = require('express');
const app = express();
const path = require('path');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(path.join(__dirname, 'public')));

//console.log("We have a new client: ");


/**
* List of connected users
*/
var clientsData; // list of data for blobs

// construction function
function Clicli(id, username) {
    //this.id = id;
    this.username = username;
}

function Host(id, username) {
    //this.id = id;
    this.username = username;
}

// Chatroom

let numUsers = 0;

// setInterval(heartbeat, 33);

// function heartbeat() {
//     io.sockets.emit('heartbeat', blobs);
// }

io.on('connection', (socket) => {
    let addedUser = false;

    //console.log('new connection');
    //console.log('num users : ' + numUsers);


    // when the client emits 'add user', this listens and executes
    socket.on('add user', (username) => {
        if (addedUser) return;

        // we store the username in the socket session for this client
        socket.username = username;
        ++numUsers;
        addedUser = true;

        // console.log('new user connected : ' + username);
        // console.log('num users : ' + numUsers);

        socket.emit('login', {
            numUsers: numUsers
        });
        // echo globally (all clients) that a person has connected
        socket.broadcast.emit('user joined', {
            username: socket.username,
            numUsers: numUsers
        });
    });


    // when the user disconnects.. perform this
    socket.on('disconnect', () => {
        if (addedUser) {
            --numUsers;

            // console.log('new disconnection  of : ' + socket.username);
            //console.log('num users : ' + numUsers);

            // echo globally that this client has left
            socket.broadcast.emit('user left', {
                username: socket.username,
                numUsers: numUsers
            });
        }
    });

    socket.on('GUIupdate1', (data) => {

        socket.broadcast.emit('GUIupdate1', data);

    });

    socket.on('GUIupdate2', (data) => {

        socket.broadcast.emit('GUIupdate2', data);

    });

    socket.on('GUIupdate3', (data) => {

        socket.broadcast.emit('GUIupdate3', data);

    });

    socket.on('GUIupdate5', (data) => {

        socket.broadcast.emit('GUIupdate5', data);

    });

    socket.on('GUIupdate6', (data) => {

        socket.broadcast.emit('GUIupdate6', data);

    });

    socket.on('GUIupdate8', (data) => {

        socket.broadcast.emit('GUIupdate8', data);

    });

    socket.on('GUIupdate9', (data) => {

        socket.broadcast.emit('GUIupdate9', data);

    });

    socket.on('volume', (data) => {

        socket.broadcast.emit('volume', data);

    });

    // socket.on('vehiculeUpdate', (data) => {

    //     socket.broadcast.emit('vehiculeUpdate', data);
    // });
});

