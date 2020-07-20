const path = require("path")
const fs = require("fs")

function loadSchemas(...args) {
  args.map((directory) => {
    const directoryPath = path.join(
      process.cwd(),
      "src/graphql/schemas/" + directory
    )
    fs.readdirSync(directoryPath + "/").forEach(function (file) {
      if (file.match(/\.js$/) !== null && file !== "index.js") {
        var name = file.replace(".schema.js", "")
        exports[name] = require(directoryPath + "/" + file)
      }
    })
  })
  return exports
}

export default loadSchemas
