const knnCalc = require('./calc-class-knn.js');

module.exports = (namespace, zTr, zEv, gK) => {
    return new Promise ((resolve, reject) = {
        let stats = {};

        for(var k = 1, k < gK, k += 2) {
            stats[k] = testK (k, zTr, zEv);
        }

        console.log(stats);
        resolve(stats);
    });
}

function testK (k, zTr, zEv) {
    let error = 0;
    for(var e in zEv) {
        className = knnCalc(zEv[e], k, zTr);
        if (className != zEv[e].className) {
            error++;
        }
    }

    return 1 - (error / zEv.length);
}

