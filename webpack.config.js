const path = require('path')

const buildAbsolutePath = path.join(__dirname, 'build')

exports.prod = {
  mode: 'production',
  target: 'web',
  entry: path.join(__dirname, 'src', 'script.js'),
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'script.js'
  },
  module:{
    rules: [
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
      }
    ]
  }
}

exports.dev = {
  mode: 'development',
  target: 'web',
  entry: path.join(__dirname, 'src', 'script.js'),
  output: {
    path: buildAbsolutePath,
    filename: 'script.js'
  },
  devServer: {
    open: true,
    contentBase: buildAbsolutePath,
    port: 8000,
    watchContentBase: true
  },
  module:{
    rules: [
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
      }
    ]
  }
}

exports.devAdvanced = {
  mode: 'development',
  target: 'web',
  entry: path.join(__dirname, 'src', 'script.js'),
  output: {
    path: buildAbsolutePath,
    filename: 'script.js'
  },
  devServer: {
    open: true,
    contentBase: buildAbsolutePath,
    port: 8000,
    watchContentBase: true
  },
  module:{
    rules: [
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
        test: /\.(html)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name(resourcePath) {
                if (resourcePath.match(/\.(html)$/)){
                  return 'index.html'
                }
                else if(resourcePath.match(/style\.css$/)){
                  return 'style.css'
                } else {
                  return '[contenthash].[ext]'
                }
              }
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              injectType: 'linkTag'
            }
          },
          {
            loader: 'file-loader'
          },
          {
            loader: 'extract-loader'
          },
          {
            loader: 'css-loader'
          }
        ]
      }
    ]
  }
}
