
$("document").ready(function(){

var secondsLeftInInterval = 0;
var sessionLength =0;
var breakLength = 0;
var currentState = "stopped";
var intervalID = 0;
init(5, 2);

$("#minusBreak").click(function(){
  if(breakLength > 0) {
    breakLength --; 
    updateLengths();
  }
});
  
$("#minusSession").click(function(){ 
  if(sessionLength > 0){
    sessionLength -- ;
    updateLengths();
  }
});

$("#plusBreak").click(function(){ 
  breakLength ++;
  updateLengths();
});

$("#plusSession").click(function(){ 
  sessionLength ++ ; 
  updateLengths();
});

$("#reset").click(function(){ 
    resetSession();
});

$("#startSession").click(function(){
    startSession(sessionLength);
});

function animate(type){
    var cogClass = "fa fa-cog fa-spin fa-2x";
    var breakClass = "fa fa-coffee fa-2x";

    if(type === "session"){
        $("#currentStatus").removeClass(breakClass).addClass(cogClass);
    }
    else if (type === "break"){
        $("#currentStatus").removeClass(cogClass).addClass(breakClass);
    }
    else if(type==="off"){
        $("#currentStatus").removeClass(breakClass).removeClass(cogClass);
    }
}

function endSession(){
    window.clearInterval(intervalID);
}

function endBreak(){
    window.clearInterval(intervalID);
}

function init(sessionMins, breakMins){
    $("#elapsed").html(sessionMins + ":00");
    sessionLength = sessionMins;
    breakLength = breakMins;
    updateLengths();
}

function resetSession(){
    window.clearInterval(intervalID);
    RenderTime(sessionLength, 0);
    secondsLeftInInterval=0;
    animate("off");
    currentState = "stopped";
}

function startSession(mins){
    currentState = "session";
    startTimer(mins);
    animate("session");
}

function startBreak(mins){
    currentState ="break";
    startTimer(mins);
    animate("break");
}

function startTimer(mins){
    if(intervalID > 0)  window.clearInterval(intervalID);
    secondsLeftInInterval = mins*60;
    intervalID = window.setInterval(decrementTimer, 300);
}

function updateLengths(){
  $("#sessionLength").html(sessionLength);
  $("#breakLength").html(breakLength);

  if(currentState ==="stopped"){
      RenderTime(sessionLength, 0);
  }
}

function decrementTimer() {
    if(secondsLeftInInterval > 0){
        secondsLeftInInterval -= 1;
        console.log(secondsLeftInInterval);
        var mins = 0;
        var secs = 0;
        
        if(secondsLeftInInterval > 59){
            mins = Math.floor(secondsLeftInInterval / 60);
            secs = secondsLeftInInterval % 60;
        }
        else{
            secs = secondsLeftInInterval;
            mins = mins;
        }
        RenderTime(mins, secs);
        
    }
    else{
        if(currentState === "session"){
            endSession();
            startBreak(breakLength);
        }
        else if (currentState === "break"){
            endBreak();
            startSession(sessionLength);
        }
    }
}
});

function RenderTime(mins, secs){
    $("#elapsed").html("" + formatTime(mins) + ":" + formatTime(secs) + "");
}

function formatTime(t) {
    if (t< 10) {
        t = "0" + t;
    }
    return t;
}