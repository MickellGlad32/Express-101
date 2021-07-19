const http = require('http');
const express = require('express');
const db = require('./db')

const exp = require('constants');
const { rawListeners } = require('process');
const hostname = '127.0.0.1';
const port = 3000

const app = express();

const server = http.createServer(app)

app.get('/', (req, res) => {
    res.send('Home Page');
})
app.get('/hello', (req, res) => {
    res.send('Hello World')
})
app.get('/cats', (req,res) =>{
    res.send('Meow!')
})
app.get('/dogs', (req,res) =>{
    res.send('Woof!')
})
app.get('/cats_and_dogs', (req, res)=> {
    res.send('Dogs and cats living together...mass hysteria!!')
})
app.get('/api/friends', (req, res) => {
    res.json(db.friends)
})
app.get('/greet/:handle', (req, res)=>{
    const {handle} = req.params
    res.send(`Hello, ${handle}!`);
})
app.get('/api/friends/:handle', (req, res) => {
    /* we use params because we are searching for something inside the url.
    That's just the way that express works*/
    console.log(req.params.handle)
    const foundFriend = db.friends.find((friend) => {
        if (friend.handle === req.params.handle) {
            return true
        } else {
            return false
        }
    })
    if (!foundFriend) {
        res.status(404)
        res.json()
    } else {
        res.json(foundFriend)
    }
})
app.get('/*', (req, res) => {
    res.status(404)
    res.send('Page not found')
})
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})