const CracoLessPlugin = require('craco-less');
const {ModuleFederationPlugin} = require("webpack").container;
const path = require("path");
const deps = require("./package.json").dependencies;
module.exports = {
    output: {
        publicPath: 'auto',
    },
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {'@primary-color': '#1DA57A'},
                        javascriptEnabled: true,
                    },
                },
            },
        },
        {
            plugin: ModuleFederationPlugin,
            options: {
                name: "search",
                library: {type: "var", name: "search"},
                filename: "remoteEntry.js",
                exposes: {
                    "./SearchApp": "./src/SearchApp",
                },
                remotes: {
                    app: "app"
                },
                shared: {
                    ...deps,
                    react: {
                        singleton: true,
                        requiredVersion: deps.react,
                    },
                    "react-dom": {
                        singleton: true,
                        requiredVersion: deps["react-dom"],
                    },
                }
            }
        }
    ],
};
