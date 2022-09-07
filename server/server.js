const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('server/public'));
//^boilerplate server set up

//create return object for both eq halves, opr and result
let equationObject = {
    valueOne: [],
    valOpr: [],
    valueTwo: [],
    eqRes: []
}
//SS AJAX POST
app.post('/sendData', (req, res) => {
    //console.log('hi', req.body)
    //place new values at the front of the historical array
    equationObject.valueOne.unshift(Number(req.body.vals[0]))
    equationObject.valOpr.unshift(req.body.opVal[0])
    equationObject.valueTwo.unshift(Number(req.body.vals[1]))
    //conditional chain to check which operator and then run the math
    if (equationObject.valOpr[0] === '+') {
        //console.log('in plus')
        equationObject.eqRes.unshift(equationObject.valueOne[0] + equationObject.valueTwo[0])
    }
    else if (equationObject.valOpr[0] === '-') {
        equationObject.eqRes.unshift(equationObject.valueOne[0] - equationObject.valueTwo[0])
        //console.log('in minus')
    }
    else if (equationObject.valOpr[0] === '/') {
        equationObject.eqRes.unshift(equationObject.valueOne[0] / equationObject.valueTwo[0])
        //console.log('in /')
    }
    else {
        equationObject.eqRes.unshift(equationObject.valueOne[0] * equationObject.valueTwo[0])
        //console.log('in *')
    }
    //console.log(equationObject)
    //send status OK
    res.sendStatus(201)
    //return obj for GET
    return equationObject
    }
)
//SS AJAX GET
app.get('/getData', (req, res) =>{
    //send equation/answer obj
    //console.log('eqObj in server side get', equationObject)
    res.send(equationObject)
})
//SS AJAX DELETE
app.delete('/delData', (req, res) => {
    //console.log('In delete');
    //Set return object to empty
    equationObject = {
        valueOne: [],
        valOpr: [],
        valueTwo: [],
        eqRes: []
    }
    //confirm del was handled
    res.sendStatus(200)


})



app.listen(PORT, () => {
    //console.log ('Server is running on port', PORT)
  })

  