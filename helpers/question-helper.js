const { readFile } = require('fs/promises')

module.exports = {
    getQuestionsFromFile: async (fileName) => {
        const fileContent = await readFile(fileName, { encoding: 'utf-8' })
        return JSON.parse(fileContent)
    },
    getQuestion: async (questionId, fileName) => {
        const questions = await module.exports.getQuestionsFromFile(fileName)
        return questions?.find(question => question.id === questionId)
    },
}