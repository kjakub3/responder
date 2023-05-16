const express = require('express')
const { urlencoded, json } = require('body-parser')
require('express-async-errors')
const makeRepositories = require('./middleware/repositories')
const { ENVIRONMENT } = require('./utils/constans')

const STORAGE_FILE_PATH = 'questions.json'
const PORT = 3000

const app = express()

app.use(urlencoded({ extended: true }))
app.use(json())
app.use(makeRepositories(STORAGE_FILE_PATH))

app.get('/', (_, res) => {
  res.json({ message: 'Welcome to responder!' })
})

app.get('/questions', async (req, res) => {
  const questions = await req.repositories.questionRepo.getQuestions()
  res.json(questions)
})

app.get('/questions/:questionId', (req, res) => {})

app.post('/questions', (req, res) => {})

app.get('/questions/:questionId/answers', (req, res) => {})

app.post('/questions/:questionId/answers', (req, res) => {})

app.get('/questions/:questionId/answers/:answerId', (req, res) => { })

if(!process.env.NODE_ENV) process.env.NODE_ENV = ENVIRONMENT.PRODUCTION

console.log(`Environment: ${process.env.NODE_ENV}`) 

app.listen(process.env.PORT || PORT, (error) => {
  if(error){
    console.error(error)
    process.exit(-1)
  }
  console.log(`Responder app listening on port ${process.env.PORT || PORT}`)
})
