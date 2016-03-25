var nunjucks = require('nunjucks')
var through2 = require('through2')


function template ( path ) {
  var tmpl = nunjucks.configure(path)
  return function(data) {
    return through2.obj(function(file, enc, next) {
      tmpl.render(file.path, data, function(err, html) {
        if(err) {
          return next(err)
        } else {
          file.contents = new Buffer(html)
          return next(null, file)
        }
      })
    })
  }
}

module.exports = template
