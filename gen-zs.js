const gen = require('random-seed');

module.exports = function (data, seedString, trainingPerc, evaluatePerc, testPerc) {
    return new Promise (function (resolve, reject) {
        let qtyTr = {
            virginica : parseInt(data.virginica.length * trainingPerc),
            setosa : parseInt(data.setosa.length * trainingPerc),
            versicolor : parseInt(data.versicolor.length * trainingPerc),
        };
        let qtyEv = {
            virginica : parseInt(data.virginica.length * evaluatePerc),
            setosa : parseInt(data.setosa.length * evaluatePerc),
            versicolor : parseInt(data.versicolor.length * evaluatePerc),
        };
        let seed = gen.create(seedString);

        try {
            let tr = get_rand_z (data, qtyTr, seed);
            let ev = get_rand_z (data, qtyEv, seed);
            let ts = data.setosa.concat(data.virginica).concat(data.versicolor);
            return resolve ({
                tr : tr, ev : ev, ts : ts
            });
        } catch (err) {
            return reject (err);
        }
    });
}

function get_rand_z (data, qtty, seed) {
    let z = [];
    var pos = 0;
    var iris = null;
    for (var className in qtty) {
        if (data[className].length == 0) {
            throw "invalid z";
        }

        for(var j = 0; j < qtty[className]; j++) {
            pos = seed.intBetween(0, data[className].length - 1);
            iris = data[className].splice(pos, 1)[0];
            if (!iris) {
                j--;
                continue;
            }

            z.push(iris);
        }
    }

    return z;
}

