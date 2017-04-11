const file = process.env.STATIC || process.env.NODE_ENV || 'development'
const ENV = process.env.NODE_ENV || 'development'
process.traceDeprecation = true

module.exports = require(`./webpack/${file}.js`)
