const appError = message => {
    const error = new Error(message)
    error.name = "AppError"
    error.status = 'fail'
    return error
}

module.exports = { appError }