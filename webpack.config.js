const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

const createElectronReloadWebpackPlugin = require('electron-reload-webpack-plugin');


const common = {
    mode: "development",
    externals: [{
        'electron-config': 'electron-config'
    }],
    node: {
        __dirname: false
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.svg$/,
                exclude: /node_modules/,
                use: {
                    loader: "svg-loader"
                }
            },
            {
                test: /.scss$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].css",
                            outputPath: "/css/",
                            filename: "master.css"
                        }
                    },
                    {
                        loader: "extract-loader"
                    },
                    {
                        loader: "css-loader",
                        options: { importLoaders: 1 }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: () => [require("autoprefixer")()]
                        }
                    },
                    {
                        loader: "sass-loader"
                    }
                ]
            }
        ]
    },
    stats: {
        colors: true
    },
    devtool: "source-map"
}

module.exports = [
    Object.assign({}, common, {
        entry: {
            main: path.resolve(__dirname + "/src/main.ts")
        },
        output: {
            path: path.resolve(__dirname + "/build/"),
            filename: "main.js"
        },
        plugins: [
            createElectronReloadWebpackPlugin({
                // Path to `package.json` file with main field set to main process file path, or just main process file path
                path: path.join(__dirname, './build/main.js'),
                // or just `path: './'`,
                // Other 'electron-connect' options
                logLevel: 0
            })()
        ],
        target: "electron-main"
    }),
    Object.assign({}, common, {
        entry: {
            renderer: path.resolve(__dirname + "/src/renderer.ts")
        },
        plugins: [
            new CopyPlugin([
                { from: __dirname + '/src/index.html', to: __dirname + '/build/index.html' }
            ])
        ],
        output: {
            path: path.resolve(__dirname + "/build/"),
            filename: "renderer.js"
        },
        target: "electron-renderer"
    })
];