var detection = {};

function detectSpeed(tD, yD) {
    var i = 0;
    var fast = false;
    var maxSpeed = 0;
    var cumulativeSpeed = 0;
    if (tD.length < 3) {
        console.log("@notEnoughData");
        return null;
    }
    for (; i < tD.length; i++) {
        if (tD[i] == 0) continue;
        
        var spd = Math.abs((yD[i] / tD[i]));
        cumulativeSpeed += spd;
        if (maxSpeed < spd) {
            maxSpeed = spd;    
        }
        if (1.9 < Math.abs((yD[i] / tD[i]))) {
            fast = true;
            break;
        }
    }
    
    console.log("@detectedMaxSpeed:", maxSpeed);
    console.log("@detectedAvgSpeed:", cumulativeSpeed / (tD.length - 1));
    
    return fast;
}

detection.detectSpeed = detectSpeed;
try {
    module.exports = detection; 
}
catch (e) {
    // prototype code.
    }
    
