import express from "express";
import chat from "./controllers/chat";

const app = express();
const http = require('http').createServer(app);
const PORT = process.env.PORT || 8000;

//request and response
app.get('/api', (req,res) =>{
    res.json({
        data: "hello from nodejs api",
        port: PORT,
    });
});


http.listen(PORT, () => console.log('Server running on Port: '+PORT));
chat(http); //make http accessable in chat.js