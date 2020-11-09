module.exports = {
  presets: [['@babel/preset-env', {targets: {node: 'current'}}]],
  plugins: [
    ['transform-vue-jsx'],
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ['@babel/plugin-proposal-pipeline-operator', { 'proposal': 'minimal' }],
    ['@babel/plugin-proposal-optional-chaining'],
    ["@babel/plugin-transform-runtime", { "helpers": false, "useESModules": false }]
  ]
};