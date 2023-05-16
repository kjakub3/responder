const { appError } = require('./error-app')

const notFoundError = message => {
    const error = appError(message)
    error.statusCode = 404
    return error
}

module.exports = { notFoundError }