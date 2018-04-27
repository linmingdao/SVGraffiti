const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let pages = [];
let plugins = [];

function each_file(dir) {
    try {
        fs.readdirSync(dir).forEach(function (file) {
            const file_obj = {};
            const file_path = dir + '/' + file;
            const chunk_name = path.basename(file, '.html');
            file_obj['filename'] = file;
            file_obj['template'] = file_path;
            file_obj['chuckName'] = chunk_name;
            pages.push(file_obj);
        });
    } catch (e) {
        console.log(e);
    }
}
each_file('./templates');

pages.forEach(page => {
    plugins.push(new HtmlWebpackPlugin({
        template: page.template,
        filename: page.filename,
        chunks: [page.chuckName],
        minify: {
            removeComments: true,
            collapseWhitespace: false
        }
    }));
});

console.log(...plugins);

module.exports = plugins;