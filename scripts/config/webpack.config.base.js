/**
 * @description webpack 打包配置
 */
const paths = require('./paths');

/**
 * 编译排除的文件
 * @type {RegExp}
 */
const excludeRegex = /(node_modules|bower_modules)/;

/**
 * 获取模型规则
 * @return {*[]}
 */
const getModuleRules = () => {
    return [

        // 添加babel转换解决js兼容性问题
        {
            loader: 'babel-loader',
            exclude: [ excludeRegex ],
            test: /\.jsx?$/,
            options: {
                cacheDirectory: true,
                presets: [
                    ['@babel/preset-env', {
                        loose: true,
                        targets: {
                            // 根据browserslist来分析支持情况， 具体的配置参照： https://github.com/ai/browserslist
                            browsers: [
                                // "last 2 versions",
                                // "ie >= 8",
                                "last 2 Chrome versions"
                            ],
                        },
                        modules: false,         // modules预先将es6模块转成"amd" | "umd" | "systemjs" | "commonjs", 值为false则不转换
                        useBuiltIns: "usage",   // 按需动态加载polyfills
                        debug: process.env.NODE_ENV === "production" ? false :true
                    }],
                ],
                plugins: []
            }
        }
    ]
};

/**
 * 获取优化配置
 * @returns {{splitChunks: {cacheGroups: {styles: {name: string, test: RegExp, chunks: string, minChunks: number, reuseExistingChunk: boolean, enforce: boolean}}}}}
 */
const getOptimization = () => ({
    // 代码分割策略配置
    splitChunks: {
        cacheGroups: {
            // 合并多个css到一个css文件中
            // styles: {
            //     name: 'vis_screen',
            //     test: /\.scss|css|less$/,
            //     chunks: 'all',    // merge all the css chunk to one file
            //     minChunks: 1,
            //     reuseExistingChunk: true,
            //     enforce: true
            // }
        }
    },
});


const baseWebpackConf = {
    // 用于生成源代码的mapping
    devtool: 'cheap-module-source-map',	// cheap-module-source-map,cheap-source-map
    mode: 'development',
    optimization: getOptimization(),

    entry: {
        enter: [paths.enterJS],
    },

    // 指定模块目录名称
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: ['node_modules'],
        alias: {}
    },

    node: {
        net: 'empty',
    },

    output: {
        // 公网发布的目录
        publicPath: paths.webpackPublicPath,
        // 编译的目录
        // path: paths.webContentPath,
        path: paths.buildPath,
        filename: '[name].js',
        chunkFilename: '[name].[chunkhash:8].bundle.js',
    },

    module: {
        // rules: getModuleRules()
    },

    plugins: []
};

module.exports = {
    baseWebpackConf,
};
