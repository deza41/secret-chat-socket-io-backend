export default (http, client) => {

    const io = require('socket.io')(http, {
        cors:{
            origin: ["https://secretchat-socket-io.netlify.app"],
            methods: ["GET", "POST"]
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

        //recieve and broadcast messages to clients
        socket.on('last-chat', async () => {
            const getmsg = await getQuery()
            console.log(getmsg)
            socket.emit('get-chat', getmsg)
          })


    

    });

    async function getQuery() {
        return await client.query(" SELECT t.*FROM(SELECT * FROM msg_log ORDER BY msg_id DESC LIMIT 5 ) t ORDER BY t.msg_id ASC")
    }
};
