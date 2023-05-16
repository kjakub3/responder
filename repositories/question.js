const { writeFile } = require('fs/promises')
const { v4: uuid } = require('uuid')
const { getQuestionsFromFile, getQuestion } = require('../helpers/question-helper')


const makeQuestionRepository = fileName => {

  const getQuestions = async () => {
    const questions = await getQuestionsFromFile(fileName)
    return questions
  }
  const getQuestionById = async questionId => {
    const question = await getQuestion(questionId, fileName)
    return question
  }
  const addQuestion = async question => {
    const questions = await getQuestionsFromFile(fileName)
    const newQuestion = { id: uuid(), ...question, answers: [] }
    questions.push(newQuestion)
    await writeFile(fileName, JSON.stringify(questions, null, 2))
    return newQuestion
  }
  const getAnswers = async questionId => {
    const question = await getQuestion(questionId, fileName)
    return question?.answers
  }
  const getAnswer = async (questionId, answerId) => {
    const question = await getQuestion(questionId, fileName)
    const answer = await question?.answers.find(answer => answer.id === answerId)
    return answer
  }
  const addAnswer = async (questionId, answer) => {
    const questions = await getQuestionsFromFile(fileName)
    const questionIndex = questions.findIndex(question => question.id === questionId)
    const newAnswer = { id: uuid(), ...answer }
    questions[questionIndex].answers.push(newAnswer)
    await writeFile(fileName, JSON.stringify(questions, null, 2))
    return newAnswer
  }

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
