/**
 * Created by jyq on 2017/10/10.
 */
const path = require("path");
const pagesDir = path.resolve(__dirname, "./src");
let pageArr = [
    'index/login',
    'index/index',
    'alert/index'
];
let configEntry = {};
pageArr.forEach((page) => {
    configEntry[page] = path.resolve(pagesDir, page + '/page');
});
module.exports = configEntry;