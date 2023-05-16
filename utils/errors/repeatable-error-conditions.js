const { notFoundError } = require("./error-not-found")

const ifDataNotFound = (isTrue, dataType) => {
    if (!isTrue) throw notFoundError(`${dataType} not found`)
}

module.exports = { ifDataNotFound }