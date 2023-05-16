const questionController = require('../controllers/questions-controllers')

module.exports = {
    default: questionRouter => {
        questionRouter
            .route('/')
            .get(questionController.getAllQuestions)
            .post(questionController.createQuestion)

        questionRouter
            .route('/:questionId')
            .get(questionController.getQuestionById)

        questionRouter
            .route('/:questionId/answers')
            .get()
            .post()

        questionRouter
            .route('/:questionId/answers/:answerId')
            .get()
    }
}
