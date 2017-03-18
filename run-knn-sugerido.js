const read_file = require('./file-reader.js');
const gen_zs = require('./gen-zs.js');
const knnCalc = require('./calc-class-knn.js');
const bestK = require('./get-best-k.js');
const bestTr = require('./get-best-tr.js');
const calcTs = require('./calc-for-ts.js');

let seed = process.argv[2];

read_file ('iris.data')
    .then ((data) => gen_zs (data, seed, .25, .25, .50))
    .then ((data) => bestK (data.tr, data.ev, data.ts))
    .then ((data) => bestTr(
        'sugerido/' + seed + '_',
        data.tr,
        data.ev,
        data.ts,
        data.bestK,
        20
    ))
    .then ((data) => calcTs(
        data.bestTr,
        data.bestK,
        data.ts,
        'resultados/sugerido/' + seed + '-'
    ))
    .then ((data) => console.log((data.precision + "\t" + seed).replace('.', ',')))
    .catch ((err) => { throw err; })

