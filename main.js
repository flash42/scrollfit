var scrollArea = $("#scrollArea");
var detectCanvas = $("#detect_canvas");
var detectCtx = detectCanvas[0] ? detectCanvas[0].getContext("2d") : null;
var yD = [];
var tD = [];
var eventTimes = [];

var m_yD = [];
var m_tD = [];
var m_eventTimes = [];

$(".speedValue").each(function() {
    $(this).text(window.location.search.split('?')[1]);
})


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
        speed: $('#speedValue').text(),
        yD: yD,
        tD: tD
    }
}

function updateUI() {
    $("#dataToSend").empty();
    $("#dataToSend").append(JSON.stringify(getMeasurements()));
}

// Event listeners
scrollArea.mousewheel(function(event) {
    console.log('@scrollArea:event:', event.deltaX, event.deltaY, event.deltaFactor);
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
    console.log("@saveMeasurement:speed:", $('.speedValue').text(), ":yD:", yD, ":tD:", tD);
    var myFirebaseRef = new Firebase("https://blinding-fire-1192.firebaseio.com/");
    myFirebaseRef.push(getMeasurements());
    resetMeasurement();
    updateUI();
}

function showResult(resultText) {
    $("#decisionResult").empty();
    $("#decisionResult").append(resultText);
    
}

function handleDetect(tD, yD) {
    var fast = detectSpeed(m_tD, m_yD);
    showResult(fast ? "fast" : "normal");
    resetMeasurement();
}

// Draw canvas

if (detectCtx) {
    detectCtx.beginPath();
    detectCtx.font="20px Georgia";
    detectCtx.fillText("Scroll here", 25,75);
    detectCtx.stroke();
}


