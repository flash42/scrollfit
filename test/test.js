var assert = require("assert")
var fs = require('fs');
var detection = require('../detection.js')

var dataSet = JSON.parse(fs.readFileSync('test/output.txt'));


describe('Detection algorithms', function() {
    describe('Simple speed detection', function() {
        it('should be better than random guessing', function() {
            var succCnt = 0;
            var allCnt = 0;
            for (var key in dataSet) {
                if (dataSet.hasOwnProperty(key)) {
                    var elem = dataSet[key];
                    if (detection.detectSpeed(elem.tD, elem.yD) && elem.speed == "fast"
                        || !detection.detectSpeed(elem.tD, elem.yD) && elem.speed == "slow") {
                        succCnt++;    
                    }
                    else {
                        console.log("@failed on:", elem.speed);
                    }
                    allCnt++;
                }
            }
            var allowedMissRatio = 0.72;
            assert(allowedMissRatio < succCnt / allCnt, 'Algorithm is worse than allowed miss ratio:' + allowedMissRatio + ':correct:' + succCnt + ":from:" + allCnt);
        })
    })
})
