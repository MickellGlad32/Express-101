const http = require('http');
const express = require('express');
const db = require('./db')

const exp = require('constants');
const { rawListeners } = require('process');
const hostname = '127.0.0.1';
const port = 3000

const app = express();
app.set('view engine', 'ejs')
app.set('views', 'views')

const server = http.createServer(app)

app.get('/', (req, res) => {
    res.render('home',{
        title: "JJ's Diner",
        special: "whatever you like!!!",
        user: {name: 'Billy Badass'}
    });
})

app.get('/menu', (req, res)=>{
    res.render('menu', {
        title: "Kell's Menu",
        specials: db.specials,

    })
})
app.get('/menu/:id', (req, res) =>{
    // get data from db.specials
    const foundSpecial = db.specials.find((special)=>{
        /* you could do a loose comparison (double equals) 
        and it would do the same thing as parseInt*/
        return special.id === parseInt(req.params.id)
    })
    // render the template
    res.render('menuitem',{
        title: "Kell's Menu",
        special: foundSpecial
    })
})
app.get('/*', (req, res) => {
    res.status(404)
    res.send('Page Not Found')
})
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);



})
