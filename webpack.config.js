
console.log(__dirname+'/build');
console.log(process.cwd())
entry={
  components: './js/pages/components/init.js',
  index : './js/pages/index/init.js',
  prompt: './js/pages/prompt/init.js',
  transition: './js/pages/transition/init.js'
}

module.exports = {
  entry: entry,
  output: {
    filename: "[name].js",
    path: __dirname+'/build'
  },
  module: {
    loaders: [
       //.css 文件使用 style-loader 和 css-loader 来处理
      { test: /\.css$/, loader: "style!css" },
      //.js 文件使用 jsx-loader 来编译处理
      { test: /\.js$/,    loader: "jsx-loader" }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    root: [process.cwd()+'/js'],
    alias: {
            'jquery': 'libs/jquery-1.8.3',
            'ept': 'libs/ept_all',
            'lodash': 'libs/lodash',
            'ko': 'libs/knockout-3.2.0',
            'juicer': 'libs/juicer'
    },
  },
  plugins: []
};