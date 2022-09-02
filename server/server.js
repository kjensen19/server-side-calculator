const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('server/public'));

app.post('/sendData', (req, res) => {
    console.log('hi', req.body)
    res.sendStatus(201)
})

app.get('/getData', (req, res) =>{
    //send equation/answer obj
    res.send()
})



app.listen(PORT, () => {
    console.log ('Server is running on port', PORT)
  })