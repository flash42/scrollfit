var detection = {};

function detectSpeed(tD, yD) {
    var i = 0;
    var fast = false;
    var maxSpeed = 0;
    var avgSpeed = 0;
    for (; i < tD.length; i++) {
        if (tD[i] == 0) continue;
        
        var spd = Math.abs((yD[i] / tD[i]));
        if (maxSpeed < spd) {
            maxSpeed = spd;    
        }
        if (1.9 < Math.abs((yD[i] / tD[i]))) {
            fast = true;
            break;
        }
    }
    console.log("@detectedMaxSpeed:", maxSpeed);
    
    return fast;
}

detection.detectSpeed = detectSpeed;
module.exports = detection; 
