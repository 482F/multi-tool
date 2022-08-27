const jimp = require('jimp')
const path = require('path')

const images = {}
images.convert = async (target, toExt) => {
  const image = await jimp.read(target)
  const withoutExt = target.replace(new RegExp(path.extname(target) + '$'), '')
  await image.write(withoutExt + '.' + toExt)
}

module.exports = {
  ...images,
}
