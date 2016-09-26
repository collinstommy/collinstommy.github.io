
var input ="";
var currentCharIsOperator =false;
var calculationComplete =false;

$("document").ready(function(){
$( ".number" ).click(function() {
console.log("this : "+ this.value);
console.log("currentCharIsOperator: " +  currentCharIsOperator);
console.log("calculationComplete: "  + calculationComplete);

  if(currentCharIsOperator){
    $("#input_box").val("");
    currentCharIsOperator = false;
  }
  if(calculationComplete){
    $("#input_box").val("");
    calculationComplete = false;
  }

  var newInput = $("#input_box").val();
  var tooLong = newInput.length >= 15;
   
  if(charAllowed(input, this.value) && !tooLong){
    input = removeRepeatOperators(input, this.value)
    $("#input_box" ).val($("#input_box" ).val() + this.value);
  }
});

$( ".operator" ).click(function() {
  console.log("this : "+ this.value);

    input = removeRepeatOperators(input, this.value)
    $("#input_box" ).val(this.value);
    currentCharIsOperator = true;
});

$( "#all_clear" ).click(function() {
  input = "";
  $( "#input_box" ).val("");
});

$( "#clear" ).click(function() {
  
  $( "#input_box" ).val(stripLastEntry(input));
});

$( "#equals" ).click(function() {
  var result = calculate(input);
  console.log("result: " + result);
  console.log("input: " + input);
  if(isResultTooLong(result)){
    var output = addE(result);
    $( "#input_box" ).val(output);
    reset();
  }
  else
  {
    $( "#input_box" ).val(result);
    input = result + "";
  }
});
});

function stripLastEntry(input){
  return input;
}

function reset(){
     input = "";
     calculationComplete = true;
}

function addE(result){
    return result.toString().substring(0, 14) + "E";
}

function isResultTooLong(result){
  if(result.toString().length >= 10){
    return true;
  }
  return false;
}

function calculate(input){
    var result = 0;
    var split =  splitter(input);
    var numbers = split.numbers;
    var operators = split.operators;
    
    result = numbers.reduce(function(prev, curr, index, arr){
       switch(operators[index-1]){
           case "+":
               return doOperation(prev, curr, add);
            case "x":
                return doOperation(prev, curr, multiply);
            case "/":
                return doOperation(prev, curr, divide);
           case "-":
                return doOperation(prev, curr, minus);
            default:
                console.log("Operator " + operators[index-1] + " not supported");
       }
    });
    return result;
}

function isOperator(char){
  var reg = /^[-+/x]$/;
  return reg.test(char);
}

function charAllowed(userInput, newChar)
{
  if(!isFirstCharNumber(userInput, newChar))
    return false;
  if(repeatDecimal(userInput, newChar))
    return false;
  return true;
}

function removeRepeatOperators(userInput, newChar){
  var lastCharInString = userInput.charAt(userInput.length -1);
    if(isOperator(lastCharInString) && isOperator(newChar)){
      return userInput.substring(0, userInput.length -1) + newChar;
    }
  return userInput + newChar;
}

function repeatDecimal(userInput, newChar){
  if(newChar === "." && userInput.charAt(userInput.length -1) === ".")
    return true;
  return false;
}

function isFirstCharNumber(userInput, newChar){
  var firstChar = userInput.charAt(0);
  if(isNumeric(firstChar))
    return true;
  else if(isNumeric(newChar)){
    return true;
  }
  return false;
}

function isOperator(c) {
    return ['+', '-', '/', 'x'].indexOf(c.toLowerCase()) !== -1
}

function isNumber(char){
  var regex = /^\d+$/;
  return regex.test(char);
}

function isNumeric(val) {
    return Number(parseFloat(val))==val;
}

function doOperation(num1, num2, operation){
  console.log("num1: " + num1 +  "   num2: " +  num2);
  if(!isNumeric(num2)){
    return num1;
  }
  if(!isNumeric(num1)){
    return num2;
  }

  if(!isNumeric(num1) && !isNumeric(num2)){
    return 0;
  }
  
  var x = new Big(num1);
  var y = new Big(num2);
  return operation(x, y);
}

function add(x, y)
{
    return x.plus(y);
}

function minus(x, y)
{
    return x.minus(y);
}

function multiply(x, y)
{
    return x.times(y);
  }

function divide(x, y)
{
    return x.div(y);
}

function splitter(expression){
    var copy = expression;
    expression = expression.replace(/[0-9]+/g, "#").replace(/[\(|\|\.)]/g, "");
    var numbers = copy.split(/[^0-9\.]+/);
    var operators = expression.split("#").filter(function(n){return n});
    var result = [];
  
    for(var i = 0; i < numbers.length; i++){
         result.push(numbers[i]);
         if (i < operators.length) 
           result.push(operators[i]);
    }
  return {
        numbers: numbers,
        operators: operators
    };
}

