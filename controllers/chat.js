export default (http) => {
    const io = require('socket.io')(http, {
        cors:{
            origin: ["http://localhost:3000"],
        },
    });

    io.on('connection', (socket) =>{
        // broadcast connnected users to clients
        console.log('Connected Users:'+ io.engine.clientsCount);
        io.emit('current-Users', io.engine.clientsCount);

        //tracks diconnects and pushes connected clients numbers
        socket.on("disconnecting", () => {
            console.log(socket.id + " disconnected");
            io.emit('current-Users', io.engine.clientsCount); 
            console.log('Connected Users:'+ io.engine.clientsCount);
            // console.log(socket.rooms); // Set { ... }
        });

        //recieve and broadcast messages to clients
        socket.on('send-message', (message) => {
            console.log('Message from client: '+ socket.id + " => "+message);
            socket.broadcast.emit('receive-message', message);

        })

    });
};
