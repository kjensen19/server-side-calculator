const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('server/public'));

app.post('/sendData', (req, res) => {
    console.log('hi', req.body)
    let valArr = req.body.vals
    let opArr = req.body.opVal
    let calcD = 0
    res.sendStatus(201)
    for (let i=0; i<valArr.length;i++) {
        calcD = valArr[i] {opArr[i]} valArr[i+1]
    }
})

app.get('/getData', (req, res) =>{
    //send equation/answer obj
    res.send()
})



app.listen(PORT, () => {
    console.log ('Server is running on port', PORT)
  })

  //Math function calcVals(num1, num2) {

  }