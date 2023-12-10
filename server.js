const express = require('express');
const crypto = require('crypto-js');
const ejs = require('ejs');
const app = express();

app.set('views',__dirname+'/views');
app.set('engine','ejs');

app.get('/c',(req,res)=>{res.sendFile(__dirname+'/style.css')})
app.get('/j',(req,res)=>{res.sendFile(__dirname+'/js.js')})
app.get('/f1',(req,res)=>{res.sendFile(__dirname+'/fonts/Duen081.ttf')})
app.get('/f2',(req,res)=>{res.sendFile(__dirname+'/fonts/jojar.ttf')})
app.get('/noti',(req,res)=>{res.sendFile(__dirname+'/noti.mp3')})
app.get('/logo',(req,res)=>{res.sendFile(__dirname+'/logo.png')})

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html')
})

app.post('/post',async(req,res)=>{
    const {name,photo,uid,text} = req.body;
    let data = {
        name:name,
        photo:photo,
        uid:uid,
        text:text
    }
    let got = crypto.AES.encrypt(data,'mongmao789').toString();
    res.render('getpost',{en:data});
})

app.listen(80,()=>console.log('server started with port 80'))