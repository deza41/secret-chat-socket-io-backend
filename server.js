import express from "express";
import chat from "./controllers/chat";

const app = express();
const http = require('http').createServer(app);
const PORT = process.env.PORT || 8000;
// const pool = require("./controllers/db");
const INDEX = '/index.html';

app.use(express.json()); //used to parse res.body

//request and response

// app.use((req, res) => res.sendFile(INDEX, { root: __dirname }))


const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect(function(error){
    console.log("connected to db")
});







app.get('/', function(req, res){
    res.sendFile(INDEX, { root: __dirname } );
});

app.get('/api', (req,res) =>{
    res.json({
        data: "hello from nodejs api",
        port: PORT,
    });
});


app.post("/chatlist", async (req,res) =>{
    try{

         const { message } = req.body;
         if(message === undefined)
         {
            res.json({
                data: "Error: No input",
            });   
         }
         else{
            const newTodo = await client.query("INSERT INTO msg_log (msg_log) VALUES ($1)", [message])
            res.json(newTodo);
         }

    } catch (err){
        console.error(err.message);
    }



});

app.get("/chatlist", async (req,res) =>{
    try{
        //  const newTodo = await pool.query("SELECT * FROM msg_log")
         const newTodo = await client.query(" SELECT t.*FROM(SELECT * FROM msg_log ORDER BY msg_id DESC LIMIT 5 ) t ORDER BY t.msg_id ASC")
         res.json(newTodo);
    } catch (err){
        console.error(err.message);
        res.json(err.message)
    }


});



http.listen(PORT, () => console.log('Server running on Port: '+PORT));
chat(http, client); //make http accessable in chat.js