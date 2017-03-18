const fs = require('fs');

module.exports = (filename, z) => {
    fs.writeFileSync(filename, JSON.stringify(z));
}

