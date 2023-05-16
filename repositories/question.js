const { writeFile } = require('fs/promises')
const { v4: uuid } = require('uuid')
const { getQuestionsFromFile } = require('../helpers/question-helper')


const makeQuestionRepository = fileName => {

  const getQuestions = async () => {
    const questions = await getQuestionsFromFile(fileName)
    return questions
  }

  const getQuestionById = async questionId => {
    const questions = await getQuestionsFromFile(fileName)
    const question = await questions.find(question => question.id === questionId)
    return question
  }

  const addQuestion = async question => {
    const questions = await getQuestionsFromFile(fileName)
    const newQuestion = { id: uuid(), ...question, answers: [] }
    questions.push(newQuestion)
    await writeFile(fileName, JSON.stringify(questions, null, 2))
    return newQuestion
  }
  const getAnswers = async questionId => { }
  const getAnswer = async (questionId, answerId) => { }
  const addAnswer = async (questionId, answer) => { }

  return {
    getQuestions,
    getQuestionById,
    addQuestion,
    getAnswers,
    getAnswer,
    addAnswer
  }
}

module.exports = { makeQuestionRepository }
