const fs = require('fs');
const calcClass = require('./calc-class-knn.js');
const writeZ = require('./write-z-files.js');
const gen = require('random-seed');

module.exports = (namespace, zTr, zEv, zTs, k, times) => {
    return new Promise((resolve, reject) => {
        let seed = gen.create('iris-test');
        var errorIndexes = null;
        var stats = [];

        for(var t = 0; t < times; t++) {
            writeZ (namespace + 'tr_' + t + '.json', zTr);
            writeZ (namespace + 'ev_' + t + '.json', zEv);

            errorIndexes = get_error_indexes (k, zTr, zEv);
            stats.push({
                tr : namespace + "tr_" + t + '.json',
                ev : namespace + "ev_" + t + '.json',
                errorsIndexes : errorIndexes,
                errorCount : errorIndexes.length,
            });

            if (errorIndexes.length == 0) {
                break;
            }

            change_error_indexes(zTr, zEv, errorIndexes, seed);
        }

        zTr = stats.sort((p, c) => p.errorCount - c.errorCount)[0];
        var tr = fs.readFileSync (zTr.tr, 'utf8');
        var ev = fs.readFileSync (zTr.ev, 'utf8');
        
        resolve({
            ts : zTs,
            stats : stats,
            bestK : k,
            bestTr : JSON.parse(tr),
            bestEv : JSON.parse(ev),
        });
    });
};

function get_error_indexes (k, zTr, zEv) {
    let indexes = [];

    for (var e in zEv) {
        className = calcClass(zEv[e], k, zTr);
        if (className != zEv[e].className) {
            indexes.push(e);
        }
    }

    return indexes;
}

function change_error_indexes (zTr, zEv, errorIndexes, seed) {
    let model = null;
    let found = false;
    let indexChange = 0;
    for(var i in errorIndexes) {
        model = zEv.splice(errorIndexes[i], 1)[0];
        found = false;
        while(!found) {
            indexChange = seed.intBetween(0, zTr.length - 1);
            found = zTr[indexChange].className == model.className;
        }

        changeModel = zTr.splice(indexChange, 1)[0];

        zTr.push(model);
        zEv.push(changeModel);
    }
}

