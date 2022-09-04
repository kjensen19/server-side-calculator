const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('server/public'));

let equationObject = {
    valueOne: [],
    valOpr: [],
    valueTwo: [],
    eqRes: []
}

app.post('/sendData', (req, res) => {
    console.log('hi', req.body)
    equationObject.valueOne.unshift(Number(req.body.vals[0]))
    equationObject.valOpr.unshift(req.body.opVal[0])
    equationObject.valueTwo.unshift(Number(req.body.vals[1]))
    if (equationObject.valOpr[0] === '+') {
        console.log('in plus')
        equationObject.eqRes.unshift(equationObject.valueOne[0] + equationObject.valueTwo[0])
    }
    else if (equationObject.valOpr[0] === '-') {
        equationObject.eqRes.unshift(equationObject.valueOne[0] - equationObject.valueTwo[0])
        console.log('in minus')
    }
    else if (equationObject.valOpr[0] === '/') {
        equationObject.eqRes.unshift(equationObject.valueOne[0] / equationObject.valueTwo[0])
        console.log('in /')
    }
    else {
        equationObject.eqRes.unshift(equationObject.valueOne[0] * equationObject.valueTwo[0])
        console.log('in *')
    }
    console.log(equationObject)

    res.sendStatus(201)
    return equationObject
    }
)

app.get('/getData', (req, res) =>{
    //send equation/answer obj
    console.log('eqObj in server side get', equationObject)
    res.send(equationObject)
})

app.delete('/delData', (req, res) => {
    console.log('In delete');
    equationObject = {
        valueOne: [],
        valOpr: [],
        valueTwo: [],
        eqRes: []
    }
    res.sendStatus(200)


})



app.listen(PORT, () => {
    console.log ('Server is running on port', PORT)
  })

  //Math function calcVals(num1, num2) {

  