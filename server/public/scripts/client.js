$(document).ready(handleReady);

function handleReady() {
    console.log('JS/JQ')
    $('#calc').on('click','button', clickCollector)
    $('#eqRec').on('click', 'li', reRunEq)
}
//create string variables to store button clicks
let currentStr = ''
let operandArr = ['-', '/', '+', '*', "C", "AC", '=']


let calcObj = {
    vals: [],
    opVal: []
}
let valCheck = 't'


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
                $('#screen').text('')
            }
            else if (inputVal === 'AC') {
                currentStr = ''
                calcObj.vals = [];
                calcObj.opVal = [];
                delHistory()
            }
            else {
                if (currentStr !== '') {
                    calcObj.vals.push(Number(currentStr))
                    $('#screen').text('')
                    currentStr = ''
                    sendExpression()
                }
            }
        }
        else {
            //push string, push operand
            if (currentStr !== '') {
                calcObj.vals.push(Number(currentStr))
                calcObj.opVal.unshift(inputVal)
                $('#screen').text(`${inputVal}`)
                console.log(`operand else ${calcObj}`)
                console.log(calcObj)
                currentStr = ''
            }
            else {
                calcObj.opVal.unshift(inputVal)
                $('#screen').text(`${inputVal}`)
            }
        }
    }
    else {
        if (currentStr == valCheck){
            currentStr = '';
        }
        else if (inputVal === '.') {
            if(currentStr.includes('.')) {
                inputVal = ''
            }
        }
        currentStr += inputVal
        console.log(`currentStr = ${currentStr}`)
        $('#screen').text(`${currentStr}`)
    }
    return currentStr
}

function sendExpression() {
    console.log(`calcObj.length, ${calcObj.vals} ${calcObj.vals.length}`)
    if (calcObj.vals.length === 2)
        $.ajax({
            type: 'POST',
            url: '/sendData',
            data: calcObj
        }).then(function(response) {
            //call GET request function
            calcObj.vals = [];
            calcObj.opVal = []
            fetchAnswer()
        })
        else {
            $('#Screen').text('Error!')
            calcObj.vals.length = []
            calcObj.opVal.length = []
        }
}

function fetchAnswer() {
    $.ajax({
        type: 'GET',
        url: '/getData'
    }).then(function(response) {
        console.log(`response in fetch-then ${response.valueOne[0]}`)
        $('#eqRec').empty()
        valCheck = response.eqRes[0]
        if (response.eqRes[0]) {
            currentStr = (`${response.eqRes[0]}`)}
        else{
            currentStr = ''}
        $('#screen').text(`${currentStr}`)
        for(let i=0;i < response.valueOne.length;i++) {
            $('#eqRec').append(`
                <li data-eq="${response.eqRes[i]}">${response.valueOne[i]} ${response.valOpr[i]} ${response.valueTwo[i]} = <span>${response.eqRes[i]}</span>
            `)

        }
        
        //render data to DOM
            //answer to screen
        return valCheck        //equation to history
    })
}
    
function reRunEq() {
    currentStr = $(this).attr('data-eq')
    console.log($(this).closest('span').text())
    $('#screen').text(currentStr)
    calcObj = {
        vals: [],
        opVal: []
    }
    valCheck = currentStr
}

function delHistory() {
    $.ajax({
        type: 'DELETE',
        url:'/delData'
    }).then(function(response) {
        fetchAnswer()
    })
    
}