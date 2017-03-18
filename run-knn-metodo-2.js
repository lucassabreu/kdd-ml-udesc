const read_file = require('./file-reader.js');
const gen_zs = require('./gen-zs.js');
const knnCalc = require('./calc-class-knn.js');
const bestK = require('./get-best-k.js');
const bestTr = require('./get-best-tr.js');
const calcTs = require('./calc-for-ts.js');

let seed = process.argv[2];

read_file ('iris.data')
    .then ((data) => gen_zs (data, seed, .25, .25, .50))
    .then((data) => {
        var promises = [];

        for(var k = 1; k < 10; k += 2) {
            promises.push(bestTr(
                'metodo-2/' + seed + '_' + k + '_',
                data.tr,
                data.ev,
                data.ts,
                k,
                20
            ));
        }

        return Promise.all(promises);
    })
    .then((data) => {
        var promises = [];
        for(var i in data) {
            promises.push(bestK(data[i].bestTr, data[i].bestEv, data[i].ts));
        }

        return Promise.all(promises);
    })
    .then((data) => {
        return new Promise ((resolve, reject) => {
            return resolve(data.sort((p, c) => p.errorCount - c.errorCount)[0]);
        });
    })
    .then ((data) => calcTs(
        data.tr, 
        data.bestK, 
        data.ts,
        'resultados/sugerido/' + seed + '-'
    ))
    .then ((data) => console.log((data.precision + "\t" + seed).replace('.', ',')))
    .catch ((err) => { throw err; })

