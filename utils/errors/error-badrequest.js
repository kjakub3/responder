const { appError } = require('./error-app')

const badRequestError = message => {
    const error = appError(message)
    error.statusCode = 400
    return error
}

module.exports = { badRequestError }