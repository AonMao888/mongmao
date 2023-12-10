const express = require('express');
const app = express();

app.get('/c',(req,res)=>{res.sendFile(__dirname+'/style.css')})
app.get('/j',(req,res)=>{res.sendFile(__dirname+'/js.js')})
app.get('/f1',(req,res)=>{res.sendFile(__dirname+'/fonts/Duen081.ttf')})
app.get('/f2',(req,res)=>{res.sendFile(__dirname+'/fonts/jojar.ttf')})
app.get('/noti',(req,res)=>{res.sendFile(__dirname+'/noti.mp3')})
app.get('/logo',(req,res)=>{res.sendFile(__dirname+'/logo.png')})

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html')
})

app.listen(80,()=>console.log('server started with port 80'))