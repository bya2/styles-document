const libpath = require('path')
const CWD = process.cwd()

function importOnceFactory() {
  const importedFiles = new Set()
  return function importOnce(file, parent) {
    if (file.charAt(0) === '.') {
      // Determine absolute path
      // if the file doesn't start with "./file-name" then assume it's in node_modules or bower_components
      file = libpath.resolve(libpath.dirname(parent), file)
    }
    if (importedFiles.has(file)) {
      console.error(`omitted duplicate import: ${libpath.relative(CWD, file)}\n  in ${libpath.relative(CWD, parent)}`)
      // This will skip further import handlers as well
      return {contents: ''}
    }

    // continue importing the file
    importedFiles.add(file)
    return null
  }
}

module.exports = [importOnceFactory()]