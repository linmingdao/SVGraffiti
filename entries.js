var path = require('path');
var fs = require('fs');

let entries = {};

function each_file(dir) {
    try {
        fs.readdirSync(dir).forEach(function (file) {
            const file_path = dir + '/' + file;
            const fname = path.basename(file, '.js');
            entries[fname] = `${file_path}/${fname}.js`;
        });
    } catch (e) {
        console.log(e);
    }
}
each_file('./pages');

console.log(entries);

module.exports = entries;