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
                name: "app",
                library: {type: "var", name: "app"},
                filename: "remoteEntry.js",
                exposes: {
                    "./App": "./src/App",
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
                },
                remotes: {
                    search: `search@http://localhost:3001/search.js`,
                }
            }
        }
    ]
};
