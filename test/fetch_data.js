var Firebase = require("firebase");
var fs = require('fs');

var dbRef = new Firebase("https://blinding-fire-1192.firebaseio.com/");
dbRef.on("value", function(elem) {
    var db = [];
    for (var key in elem.val()) {
        var data = elem.val()[key];
        data.key = key;
        db.push(data);
    }
    fs.writeFile('output.txt', JSON.stringify(db, null, 2), function (err) {
        if (err) throw err;
        console.log('Save Succ.');
        process.exit(0);
    });
});

