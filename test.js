var measureCanvas = $("#measure_canvas");
var detectCanvas = $("#detect_canvas");
var measureCtx = measureCanvas[0].getContext("2d");
var detectCtx = detectCanvas[0].getContext("2d");
var yD = [];
var tD = [];
var eventTimes = [];

var m_yD = [];
var m_tD = [];
var m_eventTimes = [];


function resetHandler() {
    resetMeasurement();
    updateUI();
}

function resetMeasurement() {
    yD = [];
    tD = [];
    eventTimes = [];
    m_yD = [];
    m_tD = [];
    m_eventTimes = [];
}

function getMeasurements() {
    return {
        speed: $('#speedSelection').val(),
        yD: yD,
        tD: tD
    }
}

function updateUI() {
    $("#dataToSend").empty();
    $("#dataToSend").append(JSON.stringify(getMeasurements()));
}

// Event listeners
$('#speedSelection').change(function(e) {
    resetMeasurement();
    updateUI();
});

measureCanvas.mousewheel(function(event) {
    console.log('@measureCanvas:event:', event.deltaX, event.deltaY, event.deltaFactor);
    var currentTime = Date.now();
    var lastTime = eventTimes[eventTimes.length - 1];
    if (lastTime)
        tD.push(currentTime - lastTime);
    else
        tD.push(0);
    yD.push(event.deltaY);
    eventTimes.push(currentTime);
    updateUI();
    event.stopPropagation();
    event.preventDefault();
});

detectCanvas.mousewheel(function(event) {
    console.log('@detectCanvas:event:', event.deltaX, event.deltaY, event.deltaFactor);
    var currentTime = Date.now();
    var lastTime = m_eventTimes[m_eventTimes.length - 1];
    if (lastTime)
        m_tD.push(currentTime - lastTime);
    else
        m_tD.push(0);
    m_yD.push(event.deltaY);
    m_eventTimes.push(currentTime);
    showResult("");
    event.stopPropagation();
    event.preventDefault();
});

function saveMeasurement() {
    console.log("@saveMeasurement:speed:", $('#speedSelection').val(), ":yD:", yD, ":tD:", tD);
    var myFirebaseRef = new Firebase("https://blinding-fire-1192.firebaseio.com/");
    myFirebaseRef.push(getMeasurements());
    resetMeasurement();
    updateUI();
}

function showResult(resultText) {
    $("#decisionResult").empty();
    $("#decisionResult").append(resultText);
    
}

function detectSpeed() {
    var i = 0;
    var fast = false;
    for (; i < m_tD.length; i++) {
        if (m_tD[i] != 0 && 1.9 < Math.abs((m_yD[i] / m_tD[i]))) {
            var spd = m_yD[i] / m_tD[i];
            console.log("@detectSpeed:fast:yD:", m_yD[i], ":tD:", m_tD[i], ":speed:", spd);
            fast = true;
            break;
        }
    }
    showResult(fast ? "fast" : "slow");
    resetMeasurement();
}

// Draw canvas
measureCtx.beginPath();
measureCtx.fillStyle = "black";
measureCtx.font="20px Georgia";
measureCtx.fillText("Scroll here", 0,75);
detectCtx.beginPath();
detectCtx.arc(100,75,50,0,2*Math.PI);
detectCtx.stroke();