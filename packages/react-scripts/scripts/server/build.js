const webpack = require('webpack')
const config = require('../../config/webpack.server')

function buildServer () {
  return new Promise((resolve, reject) => {
    if (!process.env.SERVER_RENDER) {
      resolve('不是服务端渲染，不进行服务端打包')
      return
    }
    console.log('   开始服务端打包...\n')
    webpack(config, function (err, stats) {
      if (err) throw err
      process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n\n')

      if (stats.hasErrors()) {
        console.log('   服务端打包失败\n')
        reject({
          message: '  Server Build failed with errors.\n'
        })
        return
      }
      console.log('   服务端打包成功\n')
      resolve('Server 打包成功')
    })
  })
}

module.exports = buildServer