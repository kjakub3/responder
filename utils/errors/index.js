const { appError } = require('./error-app')
const { badRequestError } = require('./error-badRequest')
const { notFoundError } = require('./error-not-found')

module.exports = {
    appError,
    badRequestError,
    notFoundError,
}