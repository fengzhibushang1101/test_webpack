const path = require("path");
const pagesDir = path.resolve(__dirname, "./src");
const buildDir = path.resolve(__dirname, "./build");
const webpack = require("webpack");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
let pageArr = [
    'index/login',
    'index/index',
    'alert/index'
];
let configEntry = {};
pageArr.forEach((page) => {
    configEntry[page] = path.resolve(pagesDir, page + '/page');
});
console.log(configEntry);
console.log(pagesDir);
let eslint = {
    configFile: path.resolve(dirVars.staticRootDir, './.eslintrc'), // 指定eslint的配置文件在哪里
        failOnWarning: true, // eslint报warning了就终止webpack编译
        failOnError: true, // eslint报error了就终止webpack编译
        cache: true, // 开启eslint的cache，cache存在node_modules/.cache目录里
}
module.exports = {
    entry: configEntry,
    output: {
        path: buildDir, // var buildDir = path.resolve(__dirname, './build');
        publicPath: '../../../../build/',
        filename: '[name]/entry.js',    // [name]表示entry每一项中的key，用以批量指定生成后文件的名称
        chunkFilename: '[id].bundle.js',
    },
    preLoaders: [{
        test: /\.js$/, // 只针对js文件
        loader: 'eslint', // 指定启用eslint-loader
        include: dirVars.srcRootDir, // 指定审查范围仅为自己团队写的业务代码
        exclude: [/bootstrap/], // 剔除掉不需要利用eslint审查的文件
    }],
    loaders: [
        {
            test: /\.js$/,
            exclude: /node_modules|vendor|bootstrap/,
            loader: 'babel-loader?presets[]=es2015-loose&cacheDirectory&plugins[]=transform-runtime',
        }, {
            test:   /\.css$/,
            exclude: /node_modules|bootstrap/,
            loader: ExtractTextPlugin.extract('css?minimize&-autoprefixer!postcss'),
        }
    ],
    "plugins": [new webpack.optimize.CommonsChunkPlugin({
        name: 'commons/commons',      // 需要注意的是，chunk的name不能相同！！！
        filename: '[name]/bundle.[chunkhash].js',
        minChunks: 4,
    }),new webpack.ProvidePlugin({ //加载jq
        $: 'jquery'
    }),]
};