const fs = require('fs');
const csv = require('fast-csv');

let fileData = {
    setosa : [],
    versicolor : [],
    virginica : [],
    length : 0,
};

function read_file (filename) {
    return new Promise(function (resolve, reject) {
        fs.createReadStream(filename).pipe(csv()
            .on("data", (data) => covert_line (data))
            .on("end", () => resolve (fileData))
        );
    });
}

function covert_line (line) {
    if (line.length == 0) {
        return;
    }

    fileData.length++;

    let iris = {
        className : null,
        sepalLength : parseFloat(line[0]),
        sepalWidth  : parseFloat(line[1]),
        petalLength : parseFloat(line[2]),
        petalWidth  : parseFloat(line[3]),
    };

    if (line[4] == 'Iris-versicolor') {
        iris.className = 'versicolor';
        fileData.versicolor.push(iris);
        return;
    }

    if (line[4] == 'Iris-setosa') {
        iris.className = 'setosa';
        fileData.setosa.push(iris);
        return;
    }

    if (line[4] == 'Iris-virginica') {
        iris.className = 'virginica';
        fileData.virginica.push(iris);
        return;
    }
}

module.exports = read_file;

