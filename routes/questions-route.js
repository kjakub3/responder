module.exports = {
    default: questionRouter => {
        questionRouter
            .route('/')
            .get()
            .post()

        questionRouter
            .route('/questionId')
            .get()
        questionRouter
            .route('/questionId/answers')
            .get()
            .post()
        questionRouter
            .route('/questionId/answers/:answerId')
            .get()
    }
}
