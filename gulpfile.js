const gulp = require('gulp')
const child_process = require('child_process')
const webpackConfig = require('./webpack.config.js')
const webpack = require('webpack')
const webpackServer = require('webpack-dev-server')
const path = require('path')
const fs = require('fs')

const DEPLOYMENT_PATH = '/home/bruno/projects/personal-website-deployment/ribaricplusplus.github.io'

function lint(done){
  runChildProcess('npx', ['eslint', '--fix', 'src'], done)
  done()
}

function runChildProcess(name, args, done){
  const results = child_process.spawnSync(name, args, {encoding: 'utf8', stdio: 'pipe'})
  console.error(results.stderr)
  console.log(results.stdout)
  if (results.error) {
    done(results.stderr)
  }
  return true;
}

async function createBuildDirectory(){
  fs.rmdirSync(path.join(__dirname, 'build'), {recursive: true})
  await fs.promises.mkdir('build')
}

async function buildProduction(done){
  await createBuildDirectory()
  const compiler = webpack(webpackConfig.prod)
  compiler.run((err, stats) => {
    const statsData = stats.toJson()
    if (stats.hasErrors()){
      done(statsData.errors)
    }
    if (stats.hasWarnings()){
      console.log(statsData.warnings)
    }
    console.log(stats.toString({color: true}))
    done()
  })
}

// Assumes that the website is built
function deploy(done){
  child_process.execSync(`DEPLOYMENT_PATH=${DEPLOYMENT_PATH} ROOT_DIR=${__dirname} ${path.join(__dirname, 'deploy.sh')}`, {stdio: 'inherit'})
  done()
}

function copyStaticFiles(done){
  runChildProcess('ln', ['-s', path.join(__dirname, 'index.html'), [path.join(__dirname, 'build/index.html')]], done)
  runChildProcess('ln', ['-s', path.join(__dirname, 'style.css'), [path.join(__dirname, 'build/style.css')]], done)
  runChildProcess('ln', ['-s', path.join(__dirname, 'img'), [path.join(__dirname, 'build/img')]], done)
}

async function buildDevelopment(done){
  await createBuildDirectory()
  copyStaticFiles(done)
  const compiler = webpack(webpackConfig.dev)
  const server = new webpackServer(compiler, webpackConfig.dev.devServer)
  server.listen(8000, (err) => {
    if (err) {
      done(err)
    }
  })
}

async function buildDevelopmentAdvanced(done){
  await createBuildDirectory()
  const compiler = webpack(webpackConfig.devAdvanced)
  const server = new webpackServer(compiler, webpackConfig.devAdvanced.devServer)
  server.listen(8000, (err) => {
    if (err){
      done(err)
    }
  })
}


exports.prod = buildProduction

exports.dev = buildDevelopment

exports.lint = lint

exports['dev-advanced'] = buildDevelopmentAdvanced

exports.deploy = deploy
