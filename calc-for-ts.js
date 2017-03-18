const calcClass = require('./calc-class-knn.js');
const writeZ = require('./write-z-files.js');

module.exports = (tr, k, ts, namespace) => {
    return new Promise((resolve, reject) => {
        let errCount = 0;
        for(var e in ts) {
            className = calcClass (ts[e], k, tr);
            if (className != ts[e].className) {
                errCount++;
            }
        }

        writeZ (namespace + 'tr.json', JSON.stringify(tr));
        writeZ (namespace + 'ts.json', JSON.stringify(tr));
        return resolve ({
            precision : (1 - (errCount / ts.length)) * 100,
        });
    });
}
