$(document).ready(handleReady);

function handleReady() {
    console.log('JS/JQ')
    $('#calc').on('click','button', clickCollector)
}
//create string variables to store button clicks
let currentStr = ''
let operandArr = ['-', '/', '+', '*', "C", "AC", '=']

calcObj = {}


//function to concat strings, need to track operand to switch str, then equals
function clickCollector() {
    let inputVal = $(this).text()
    console.log(`inputVal = ${inputVal}`)
    if (operandArr.includes(inputVal)) {
        if (inputVal === 'C' || inputVal === 'AC' || inputVal === '=') {
            //handle C to clear the previous string, AC to reset or equals to send
            console.log('A, AC, =')
            if (inputVal === 'C') {
                currentStr = ''
            }
            else if (inputVal === 'AC') {
                currentStr = ''
                calcObj.length(0)
            }
            else {
                //call POST function
                calcObj.secondVal = Number(currentStr)
                sendExpression()
            }
        }
        else {
            //push string, push operand
            calcObj.firstVal = Number(currentStr)
            calcObj.opVal = inputVal
            $('#screen').text(`${inputVal}`)
            console.log(`operand else ${calcObj}`)
            currentStr = ''
        }
    }
    else {
        currentStr += inputVal
        console.log(`currentStr = ${currentStr}`)
        $('#screen').text(`${currentStr}`)
    }
    return currentStr
}

function sendExpression() {
    $.ajax({
        type: 'POST',
        url: '/sendData',
        data: calcObj
      }).then(function(response) {
        //call GET request function
        fetchAnswer()
      })
}

function fetchAnswer() {
    $.ajax({
        type: 'GET',
        url: '/getData'
    }).then(function(response) {
        //render data to DOM
            //answer to screen
            //equation to history
    })
}
    
