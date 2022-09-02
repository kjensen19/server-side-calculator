$(document).ready(handleReady);

function handleReady() {
    console.log('JS/JQ')
    $('#calc').on('click','button', clickCollector)
}
//create string variables to store button clicks
let currentStr = ''
let operandArr = ['-', '/', '+', '*', "C", "AC", '=']

calcObj = []


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
                calcObj.push(currentStr)
                sendExpression()
            }
        }
        else {
            //push string, push operand
            calcObj.push(currentStr)
            calcObj.push(inputVal)
            console.log(`operand else ${calcObj}`)
            currentStr = ''
        }
    }
    else {
        currentStr += inputVal
        console.log(`currentStr = ${currentStr}`)
    }
    return currentStr
}

function sendExpression() {
    $.ajax({
        type: 'POST',
        url: '/sendData',
        data: {calcObj}
      }).then(function(response) {
        
      })
}
    
    
