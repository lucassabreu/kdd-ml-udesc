const distance = require('euclidean-distance/squared');

module.exports = (model, k, ts) => {
    let minMax = calcMinMaxZ(ts);
    model = normalize(model, minMax);
    ts = ts.map ((t) => normalize(t, minMax));

    let getPos = (model) => {
        return [ 
            model.normalized.sepalLength,
            model.normalized.sepalWidth,
            model.normalized.petalLength,
            model.normalized.petalWidth
        ]
    };

    let modelPos = getPos(model);

    let distances = ts.map ((t) => {
        return {
            distance : distance (modelPos, getPos(t)),
            model : t,
        }
    }).sort((p, c) => p.distance - c.distance);

    let knn = distances.slice(0, k).reduce (
        (total, curr) => {
            if (total[curr.model.className]) {
                total[curr.model.className].count++;
                return total;
            }

            total[curr.model.className] = {
                className : curr.model.className,
                count : 1,
            };
            return total;
        },
        []
    );

    let className = "";
    let max = null;

    for(var c in knn) {
        if (max == null || max < knn[c].count) {
            max = knn[c].count;
            className = knn[c].className;
        }
    }

    return className;
};

function normalize (model, minMax) {

    let normFn = (value, min, max) => {
        return parseInt(((value - min) / (max - min)) * 1000);
    };

    model.normalized = {
        sepalLength : normFn (
            model.sepalLength,
            minMax.sepalLength.min,
            minMax.sepalLength.max
        ),
        sepalWidth : normFn (
            model.sepalWidth,
            minMax.sepalWidth.min,
            minMax.sepalWidth.max
        ),
        petalLength : normFn (
            model.petalLength,
            minMax.petalLength.min,
            minMax.petalLength.max
        ),
        petalWidth : normFn (
            model.petalWidth,
            minMax.petalWidth.min,
            minMax.petalWidth.max
        ),
    };

    return model;
}

function calcMinMaxZ (z) {
    return z.reduce (
        (total, curr) => {
            if (total.sepalLength.min == null ||
                total.sepalLength.min > curr.sepalLength) {
                total.sepalLength.min = curr.sepalLength;
            }

            if (total.sepalLength.max == null ||
                total.sepalLength.max < curr.sepalLength) {
                total.sepalLength.max = curr.sepalLength;
            }

            if (total.sepalWidth.min == null ||
                total.sepalWidth.min > curr.sepalWidth) {
                total.sepalWidth.min = curr.sepalWidth;
            }

            if (total.sepalWidth.max == null ||
                total.sepalWidth.max < curr.sepalWidth) {
                total.sepalWidth.max = curr.sepalWidth;
            }

            if (total.petalLength.min == null ||
                total.petalLength.min > curr.petalLength) {
                total.petalLength.min = curr.petalLength;
            }

            if (total.petalLength.max == null ||
                total.petalLength.max < curr.petalLength) {
                total.petalLength.max = curr.petalLength;
            }

            if (total.petalWidth.min == null ||
                total.petalWidth.min > curr.petalWidth) {
                total.petalWidth.min = curr.petalWidth;
            }

            if (total.petalWidth.max == null ||
                total.petalWidth.max < curr.petalWidth) {
                total.petalWidth.max = curr.petalWidth;
            }

            return total;
        },
        {
            sepalLength : { min : null, max : null },
            sepalWidth : { min : null, max : null },
            petalLength : { min : null, max : null },
            petalWidth : { min : null, max : null },
        }
    );
}
