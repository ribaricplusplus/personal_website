const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const buildAbsolutePath = path.join(__dirname, 'build')

const common = {
  entry:{
    main: path.join(__dirname, 'src', 'script.js'),
    transpiler: path.join(__dirname, 'src', 'projects', 'transpiler', 'script.js'),
    tools: path.join(__dirname, 'src', 'projects', 'tools', 'script.js'),
    extension: path.join(__dirname, 'src', 'projects', 'extension', 'script.js'),
    samplePdf: path.join(__dirname, 'src', 'samples', 'pdf', 'script.js')
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Sample PDF',
      filename: 'samples/pdf/index.html',
      chunks: ['samplePdf']
    }),
    new HtmlWebpackPlugin({title: 'RibaricPlusPlus',
                                   filename: 'index.html',
                                   chunks: ['main'],
                                   meta: {viewport: 'width=device-width, initial-scale=1'}
                                  }),
            new HtmlWebpackPlugin({
              title: 'RibaricPlusPlus',
              filename: 'projects/transpiler/index.html',
              chunks: ['transpiler'],
              meta: {viewport: 'width=device-width, initial-scale=1'}
            }),
            new HtmlWebpackPlugin({
              title: 'RibaricPlusPlus',
              filename: 'projects/tools/index.html',
              chunks: ['tools'],
              meta: {viewport: 'width=device-width, initial-scale=1'}
            }),
            new HtmlWebpackPlugin({
              title: 'RibaricPlusPlus',
              filename: 'projects/extension/index.html',
              chunks: ['extension'],
              meta: {viewport: 'width=device-width, initial-scale=1'}
            })],
  output: {
    path: buildAbsolutePath,
    filename: (pathData) => {
      switch (pathData.chunk.name){
      case 'transpiler': return 'projects/transpiler/[name].[contenthash].js'; break;
      case 'tools': return 'projects/tools/[name].[contenthash].js'; break;
      case 'extension': return 'projects/extension/[name].[contenthash].js'; break;
      case 'samplePdf': return 'samples/pdf/[name].[contenthash].js'; break;
      default: return '[name].[contenthash].js';
      }
    }
  }
}

exports.prod = {
  mode: 'production',
  target: 'web',
  entry: common.entry,
  output: common.output,
  plugins: common.plugins,
  module:{
    rules: [
      {
        test: /(\.svg$|\.png$)/,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ["@babel/preset-react"]
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader'
          }
        ]
      }
    ]
  }
}

exports.devAdvanced = {
  mode: 'development',
  target: 'web',
  entry: common.entry,
  output: common.output,
  plugins: common.plugins,
  devServer: {
    open: true,
    contentBase: buildAbsolutePath,
    contentBasePublicPath: '/',
    port: 8000,
    watchContentBase: true,
    writeToDisk: true,
    publicPath: '/'
    
  },
  module:{
    rules: [
      {
        test: /(\.svg$|\.png$)/,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ["@babel/preset-react"]
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader'
          }
        ]
      }
    ]
  }
}
