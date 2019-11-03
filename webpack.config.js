const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

const createElectronReloadWebpackPlugin = require('electron-reload-webpack-plugin');


const common = {
    mode: "development",
    output: {
        path: path.resolve(__dirname + "/build/"),
        filename: "[name].js"
    },
    externals: [{
        'electron-config': 'electron-config'
    }],
    node: {
        __dirname: false
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
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
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
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
        plugins: [

        ],
        target: "electron-main"
    }),
    Object.assign({}, common, {
        entry: {
            renderer: path.resolve(__dirname + "/src/renderer.ts")
        },
        plugins: [
            new CopyPlugin([
                { from: __dirname + '/src/index.html', to: __dirname + '/build/index.html' },
                { from: __dirname + '/src/assets', to: __dirname + '/build/assets' },
            ]),
            createElectronReloadWebpackPlugin({
                // Path to `package.json` file with main field set to main process file path, or just main process file path
                path: path.join(__dirname, './build/main.js'),
                // or just `path: './'`,
                // Other 'electron-connect' options
                logLevel: 0
            })()
        ],
        target: "electron-renderer"
    })
];