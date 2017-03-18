const calcClass = require('./calc-class-knn.js');

module.exports = (zTr, zEv, zTs) => {
    return new Promise((resolve, reject) => {
        let results = [];
        for (var k = 1; k < 15; k += 2) {
            results.push({
                k : k,
                errorCount : test (k, zTr, zEv),
            });
        }

        results = results.sort((p, c) => p.errorCount - c.errorCount);

        resolve({
            bestK : results[0].k,
            errorCount : results[0].k,
            results : results,
            tr : zTr,
            ev : zEv,
            ts : zTs,
        });
    });
};

function test (k, zTr, zEv) {
    var className = "";
    let errCount = 0;
    for(var e in zEv) {
        className = calcClass (zEv[e], k, zTr);
        if (className != zEv[e].className) {
            errCount++;
        }
    }
    
    return errCount;
}

