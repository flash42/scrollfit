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
                    var res = detection.detectSpeed(elem.tD, elem.yD);
                    if (res === null) continue;
                    
                    if (res && elem.speed == "fast"
                        || !res && elem.speed == "slow") {
                        succCnt++;    
                    }
                    else {
                        console.log("@failed on:key:", elem.key, ":speed:", elem.speed);
                    }
                    allCnt++;
                }
            }
            var allowedMissRatio = 0.95;
            assert(allowedMissRatio < succCnt / allCnt, 'Algorithm is worse than allowed miss ratio:' + allowedMissRatio + ':correct:' + succCnt + ":from:" + allCnt);
        })
    })
})
