const fs = require('node:fs/promises')
const path = require('node:path')

const myfs = {}

myfs.getAllFilePaths = async (targetDir) => {
  const files = []
  const children = await fs
    .readdir(targetDir, { withFileTypes: true })
    .catch((e) => {
      // targetDir がディレクトリでなければ files に追加してそのまま終了
      if (e.message.match(/^ENOTDIR: not a directory/)) {
        files.push(targetDir)
        return []
      }
      throw e
    })
  for (const child of children) {
    const childPath = path.join(targetDir, child.name)
    if (child.isDirectory()) {
      files.push(...(await myfs.getAllFilePaths(childPath)))
    } else {
      files.push(childPath)
    }
  }
  return files
}

myfs.filterExt = (filePaths, targetExts) => {
  if (!Array.isArray(targetExts)) {
    targetExts = [targetExts]
  }
  const regexes = targetExts.map((targetExt) => new RegExp(targetExt, 'i'))
  return filePaths
    .map((filePath) => [filePath, path.extname(filePath)])
    .filter(([, ext]) => regexes.some((regex) => ext.match(regex)))
    .map(([filePath]) => filePath)
}

myfs.mightMkdir = async (targetPath) => {
  if (await fs.stat(targetPath).catch(() => null)) {
    return
  }
  await fs.mkdir(targetPath, { recursive: true })
}

myfs.evacuate = async (root, target, shelter) => {
  const dir = path.resolve(shelter, path.dirname(path.relative(root, target)))
  await myfs.mightMkdir(dir)
  const dest = path.join(dir, path.basename(target))
  await fs.rename(target, dest)
}

myfs.join = path.join

myfs.rename = fs.rename

module.exports = {
  ...myfs,
}
