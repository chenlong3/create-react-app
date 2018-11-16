const fs = require('fs');
const path = require('path')
function getAlias (folderSrc, defaultAlias) { // 获取src目录下所有文件，进行重命名；如：/src/http重命名为@http
  const alias = {}
  for (let key in defaultAlias) {
    alias[key] = defaultAlias[key]
  }

  const files = fs.readdirSync(folderSrc)
  files.forEach(file => {
    const isDirectory = fs.lstatSync(path.resolve(folderSrc, file)).isDirectory()
    if (isDirectory) {
      alias['@' + file] = path.resolve(folderSrc, file)
    }
  });
  return alias
}

module.exports = {
  getAlias: getAlias
}