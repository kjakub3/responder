const { readFile } = require('fs/promises')

module.exports = {
    getQuestionsFromFile: async (fileName) => {
        const fileContent = await readFile(fileName, { encoding: 'utf-8' })
        return JSON.parse(fileContent)
    }
}