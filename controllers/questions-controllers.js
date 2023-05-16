module.exports = {
    getAllQuestions: async (req, res) => {
        const questions = await req.repositories.questionRepo.getQuestions()
        const questionData = questions.map(({ id, author, summary }) => ({ id, author, summary }))
        return res.status(200).json({
            data: questionData,
            questionsCount: questions.length,
        })
    },
    getQuestionById: async (req, res) => {
        const {
            params: { questionId }
        } = req
        const question = await req.repositories.questionRepo.getQuestionById(questionId)
        const { answers, ...questionData } = question
        return res.status(200).json({
            data: questionData,
        })
    },
    createQuestion: async (req, res) => {
        const { body } = req
        const question = await req.repositories.questionRepo.addQuestion(body)
        return res.status(201).json({
            data: question,
        })
    },
    getAnswersByQuestionId: async (req, res) => {
        const {
            params: { questionId }
        } = req
        const answers = await req.repositories.questionRepo.getAnswers(questionId)
        return res.status(200).json({
            data: answers,
            answersCount: answers.length,
        })
    },
    getAnswerByQuestionId: async (req, res) => {
        const {
            params: { questionId, answerId }
        } = req
        const answers = await req.repositories.questionRepo.getAnswer(questionId, answerId)
        return res.status(200).json({
            data: answers,
        })
    },
    createAnswerToQuestion: async (req, res) => {
        const {
            params: { questionId },
            body,
        } = req
        const newAnswer = await req.repositories.questionRepo.addAnswer(questionId, body)
        return res.status(201).json({
            data: newAnswer,
        })
    },
}