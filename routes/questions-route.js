const { validate } = require('express-validation')
const { validation } = require('../utils/question-utils')
const questionController = require('../controllers/questions-controllers')

module.exports = {
    default: questionRouter => {
        questionRouter
            .route('/')
            .get(questionController.getAllQuestions)
            .post(validate(validation.createQuestion), questionController.createQuestion)

        questionRouter
            .route('/:questionId')
            .get(validate(validation.getQuestion), questionController.getQuestionById)

        questionRouter
            .route('/:questionId/answers')
            .get(validate(validation.getQuestion), questionController.getAnswersByQuestionId)
            .post(validate(validation.createAnswer), questionController.createAnswerToQuestion)

        questionRouter
            .route('/:questionId/answers/:answerId')
            .get(validate(validation.getAnswer), questionController.getAnswerByQuestionId)
    }
}
