$(document).ready(handleReady);

function handleReady() {
    //console.log('JS/JQ')
    //click listener for calc buttons, calls main function
    $('#calc').on('click','button', clickCollector)
    //click listener on ul for clicks on li items-- which are the
    //historical equations. Calls function to rerun.
    $('#eqRec').on('click', 'li', reRunEq)
}
//create string variables to store button clicks
let currentStr = ''
//var for buttons requiring special handling
let operandArr = ['-', '/', '+', '*', "C", "AC", '=']

//data object containing the two equation strings and an operator
let calcObj = {
    vals: [],
    opVal: []
}
//variable to enable checking for a rerun equation
let valCheck = 't'


//function to concat strings, need to track operand to switch str, then equals
function clickCollector() {
    //use this to capture which button was clicked on
    let inputVal = $(this).text()
    //console.log(`inputVal = ${inputVal}`)
    //conditional to check if the button was a special operator (array)
    if (operandArr.includes(inputVal)) {
        //conditional- if the operator is not -+/*:
        if (inputVal === 'C' || inputVal === 'AC' || inputVal === '=') {
            //handle C to clear the previous string, AC to reset or equals to send
            //console.log('A, AC, =')
            if (inputVal === 'C') {
                //if C is pushed clear the current string and set the screen text to nothing
                currentStr = ''
                $('#screen').text('')
            }
            else if (inputVal === 'AC') {
                //if AC was pressed empty current string, and the data object
                currentStr = ''
                calcObj.vals = [];
                calcObj.opVal = [];
                //call function containing a DELETE route to empty the server side records
                delHistory()
            }
            else {
                if (currentStr !== '') {
                    //if equals was pressed and if str is not empty push it to obj, 
                    //clear everything and call post function
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
                //current str is not empty and +-/* was pressed push string,
                //push operand, display operand and set str to empty
                calcObj.vals.push(Number(currentStr))
                calcObj.opVal.unshift(inputVal)
                $('#screen').text(`${inputVal}`)
                //console.log(`operand else ${calcObj}`)
                //console.log(calcObj)
                currentStr = ''
            }
            else {
                calcObj.opVal.unshift(inputVal)
                $('#screen').text(`${inputVal}`)
            }
        }
    }//end of special character handling
    else {
        //check if the current string is the evaluation of a previous equation
        if (currentStr == valCheck){
            //so if it was a previous total and a number was pressed, empty the str
            currentStr = '';
        }
        else if (inputVal === '.') {
            //if the input is a decimal 
            if(currentStr.includes('.')) {
                //check if the string already has a decimal and if it
                //does set the input value to an empty string instead
                inputVal = ''
            }
        }
        //add input to the current str
        currentStr += inputVal
        //console.log(`currentStr = ${currentStr}`)
        //set the screen display to whatever the current str value is
        $('#screen').text(`${currentStr}`)
    }
    return currentStr
}//end main eq function

//AJAX POST call function, passes data obj
function sendExpression() {
    //console.log(`calcObj.length, ${calcObj.vals} ${calcObj.vals.length}`)
    if (calcObj.vals.length === 2)
    //make sure we have the neccesary values in our object
        $.ajax({
            type: 'POST',
            url: '/sendData',
            data: calcObj
        }).then(function(response) {
            //call GET request function
            //when we receive confirmation from the server, 
            //set the client side object to empty and call GET
            calcObj.vals = [];
            calcObj.opVal = []
            fetchAnswer()
        })
        else {
            $('#Screen').text('Error!')
            //if the object does not contain the proper values display error and reset
            calcObj.vals.length = []
            calcObj.opVal.length = []
        }
}
//AJAX GET function
function fetchAnswer() {
    $.ajax({
        type: 'GET',
        url: '/getData'
    }).then(function(response) {
        //request the result of the passed equation
        //console.log(`response in fetch-then ${response.valueOne[0]}`)
        $('#eqRec').empty()
        //empty previously displayed values (since we have a record)
        valCheck = response.eqRes[0]
        //set valCheck so we can handle input after answer correctly
        if (response.eqRes[0]) {
            //if obj contains an answer display it
            currentStr = (`${response.eqRes[0]}`)}
        else {
            //otherwise empty the string
            currentStr = ''}
        $('#screen').text(`${currentStr}`)
        for(let i=0;i < response.valueOne.length;i++) {
            //loop through obj and display info on the DOM
            $('#eqRec').append(`
                <li data-eq="${response.eqRes[i]}">${response.valueOne[i]} ${response.valOpr[i]} ${response.valueTwo[i]} = <span>${response.eqRes[i]}</span>
            `)

        }
        
        //render data to DOM
            //answer to screen
        return valCheck        //equation to history
    })
}
//function to regrab previous equation answers via data attr set on render   
function reRunEq() {
    currentStr = $(this).attr('data-eq')
    //console.log($(this).closest('span').text())
    $('#screen').text(currentStr)
    //set screen and curStr to answer
    //empty client side data obj
    calcObj = {
        vals: [],
        opVal: []
    }
    //set value for answer handling in main function
    valCheck = currentStr
}
//AJAX DELETE function
function delHistory() {
    $.ajax({
        type: 'DELETE',
        url:'/delData'
        //send del request then run GET function to get empty obj
    }).then(function(response) {
        fetchAnswer()
    })
    
}