const sendError = (err, res) => {
    console.error(err)
    return res.status(err.statusCode).json({
        status: err.status,
        name: err.name,
        error: err,
        message: err.message,
        stack: err.stack,
    })
}

module.exports = async (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error'
    return sendError(err, res)
}