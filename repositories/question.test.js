const { writeFile, rm } = require('fs/promises')
const { faker } = require('@faker-js/faker')
const { makeQuestionRepository } = require('./question')

describe('question repository', () => {
  const TEST_QUESTIONS_FILE_PATH = 'test-questions.json'
  let questionRepo

  beforeAll(async () => {
    await writeFile(TEST_QUESTIONS_FILE_PATH, JSON.stringify([]))

    questionRepo = makeQuestionRepository(TEST_QUESTIONS_FILE_PATH)
  })

  afterAll(async () => {
    await rm(TEST_QUESTIONS_FILE_PATH)
  })

  test('should return a list of 0 questions', async () => {
    expect(await questionRepo.getQuestions()).toHaveLength(0)
  })

  test('should return a list of 2 questions', async () => {
    const testQuestions = [
      {
        id: faker.datatype.uuid(),
        summary: 'What is my name?',
        author: 'Jack London',
        answers: []
      },
      {
        id: faker.datatype.uuid(),
        summary: 'Who are you?',
        author: 'Tim Doods',
        answers: []
      }
    ]

    await writeFile(TEST_QUESTIONS_FILE_PATH, JSON.stringify(testQuestions))

    expect(await questionRepo.getQuestions()).toHaveLength(2)
  })

  test('should return the question object if the id exists', async () => {
    const testQuestions = [
      {
        id: faker.datatype.uuid(),
        author: 'Jack London',
        summary: 'What is my name?',
        answers: []
      },
      {
        id: faker.datatype.uuid(),
        author: 'Tim Doods',
        summary: 'Who are you?',
        answers: []
      }
    ]

    await writeFile(TEST_QUESTIONS_FILE_PATH, JSON.stringify(testQuestions))

    const questionId = testQuestions[0].id
    const question = await questionRepo.getQuestionById(questionId)

    expect(question.id).toEqual(questionId)

  })

  test('should return undefined if the given question ID does not exist', async () => {
    const testQuestions = [
      {
        id: faker.datatype.uuid(),
        author: 'Jack London',
        summary: 'What is my name?',
        answers: []
      },
      {
        id: faker.datatype.uuid(),
        author: 'Tim Doods',
        summary: 'Who are you?',
        answers: []
      }
    ]

    await writeFile(TEST_QUESTIONS_FILE_PATH, JSON.stringify(testQuestions))

    const questionId = faker.datatype.uuid()
    const question = await questionRepo.getQuestionById(questionId)

    expect(question).toBeUndefined()

  })

  test('should add a new question to file', async () => {
    const newQuestion = {
      author: 'Jack London',
      summary: 'What is my name?',
    }

    const addQuestion = await questionRepo.addQuestion(newQuestion)

    expect(addQuestion).toEqual(expect.objectContaining({
      id: expect.any(String),
      author: 'Jack London',
      summary: 'What is my name?',
      answers: []
    }))

    const question = await questionRepo.getQuestionById(addQuestion.id)

    expect(question).toEqual(addQuestion)

  })

  test('should return a list of answers', async () => {
    const testQuestions = [
      {
        id: faker.datatype.uuid(),
        author: 'Jack London',
        summary: 'What is my name?',
        answers: [
          {
            id: faker.datatype.uuid(),
            author: "Sarah Nickle",
            summary: "Jack",
          },
          {
            id: faker.datatype.uuid(),
            author: "John McKenzie",
            summary: "I don't know",
          },
        ]
      },
      {
        id: faker.datatype.uuid(),
        author: 'Tim Doods',
        summary: 'Who are you?',
        answers: [
          {
            id: faker.datatype.uuid(),
            author: "John Nickle",
            summary: "John",
          },
          {
            id: faker.datatype.uuid(),
            author: "Daniel London",
            summary: "I'am Daniel",
          },
        ]
      },
    ]

    await writeFile(TEST_QUESTIONS_FILE_PATH, JSON.stringify(testQuestions))

    const questionId = testQuestions[0].id
    const answers = await questionRepo.getAnswers(questionId)

    expect(answers).toEqual(expect.arrayContaining([
      {
        id: expect.any(String),
        author: "Sarah Nickle",
        summary: "Jack",
      },
      {
        id: expect.any(String),
        author: "John McKenzie",
        summary: "I don't know",
      },
    ]))
  })

  test('should return a list of 0 answers', async () => {
    const testQuestions = [
      {
        id: faker.datatype.uuid(),
        author: 'Jack London',
        summary: 'What is my name?',
        answers: []
      },
      {
        id: faker.datatype.uuid(),
        author: 'Tim Doods',
        summary: 'Who are you?',
        answers: []
      },
    ]

    await writeFile(TEST_QUESTIONS_FILE_PATH, JSON.stringify(testQuestions))

    const questionId = testQuestions[0].id
    const answers = await questionRepo.getAnswers(questionId)
    
    expect(answers).toHaveLength(0)
  })

  test('should return undefined if the given question ID does not exist', async () => {

    const questionId = faker.datatype.uuid()

    const answers = await questionRepo.getAnswers(questionId)

    expect(answers).toBeUndefined()
  })

  test('should return the answer object if the id exists', async () => {
    const testQuestions = [
      {
        id: faker.datatype.uuid(),
        author: 'Jack London',
        summary: 'What is my name?',
        answers: [
          {
            id: faker.datatype.uuid(),
            author: "Sarah Nickle",
            summary: "Jack",
          },
          {
            id: faker.datatype.uuid(),
            author: "John McKenzie",
            summary: "I don't know",
          },
        ]
      },
      {
        id: faker.datatype.uuid(),
        author: 'Tim Doods',
        summary: 'Who are you?',
        answers: [
          {
            id: faker.datatype.uuid(),
            author: "John Nickle",
            summary: "John",
          },
          {
            id: faker.datatype.uuid(),
            author: "Daniel London",
            summary: "I'am Daniel",
          },
        ]
      },
    ]

    await writeFile(TEST_QUESTIONS_FILE_PATH, JSON.stringify(testQuestions))

    const questionId = testQuestions[1].id
    const answerId = testQuestions[1].answers[1].id

    const answers = await questionRepo.getAnswer(questionId, answerId)

    expect(answers).toEqual(expect.objectContaining({
      id: expect.any(String),
      author: "Daniel London",
      summary: "I'am Daniel",
    },
    ))
  })

  test('should return undefined if the given question ID does not exist', async () => {
    const testQuestions = [
      {
        id: faker.datatype.uuid(),
        summary: 'What is my name?',
        author: 'Jack London',
        answers: [
          {
            id: faker.datatype.uuid(),
            author: "Sarah Nickle",
            summary: "Jack",
          },
          {
            id: faker.datatype.uuid(),
            author: "John McKenzie",
            summary: "I don't know",
          },
        ]
      },
      {
        id: faker.datatype.uuid(),
        summary: 'Who are you?',
        author: 'Tim Doods',
        answers: [
          {
            id: faker.datatype.uuid(),
            author: "John Nickle",
            summary: "John",
          },
          {
            id: faker.datatype.uuid(),
            author: "Daniel London",
            summary: "I'am Daniel",
          },
        ]
      },
    ]

    await writeFile(TEST_QUESTIONS_FILE_PATH, JSON.stringify(testQuestions))

    const questionId = faker.datatype.uuid()
    const answerId = testQuestions[1].answers[1].id

    const answers = await questionRepo.getAnswer(questionId, answerId)

    expect(answers).toBeUndefined()
  })

  test('should return undefined if the given answer ID does not exist', async () => {
    const testQuestions = [
      {
        id: faker.datatype.uuid(),
        summary: 'What is my name?',
        author: 'Jack London',
        answers: [
          {
            id: faker.datatype.uuid(),
            author: "Sarah Nickle",
            summary: "Jack",
          },
          {
            id: faker.datatype.uuid(),
            author: "John McKenzie",
            summary: "I don't know",
          },
        ]
      },
      {
        id: faker.datatype.uuid(),
        summary: 'Who are you?',
        author: 'Tim Doods',
        answers: [
          {
            id: faker.datatype.uuid(),
            author: "John Nickle",
            summary: "John",
          },
          {
            id: faker.datatype.uuid(),
            author: "Daniel London",
            summary: "I'am Daniel",
          },
        ]
      },
    ]

    await writeFile(TEST_QUESTIONS_FILE_PATH, JSON.stringify(testQuestions))

    const questionId = testQuestions[1].id
    const answerId = faker.datatype.uuid()

    const answers = await questionRepo.getAnswer(questionId, answerId)

    expect(answers).toBeUndefined()
  })

  test('should add a new anwser to the question', async () => {
    const testQuestions = [
      {
        id: faker.datatype.uuid(),
        author: 'Jack London',
        summary: 'What is my name?',
        answers: [
          {
            id: faker.datatype.uuid(),
            author: "Sarah Nickle",
            summary: "Jack",
          },
          {
            id: faker.datatype.uuid(),
            author: "John McKenzie",
            summary: "I don't know",
          },
        ]
      },
    ]

    const answer = {
      author: "Noah Thompson",
      summary: "The time is 6:48 PM."
    };

    await writeFile(TEST_QUESTIONS_FILE_PATH, JSON.stringify(testQuestions))

    const questionId = testQuestions[0].id
    const newAnswer = await questionRepo.addAnswer(questionId, answer)

    expect(newAnswer).toEqual(expect.objectContaining({
      id: expect.any(String),
      author: "Noah Thompson",
      summary: "The time is 6:48 PM.",
    }))
  })

  test('should return null if the given question ID does not exist', async () => {
    const answer = {
      author: "Noah Thompson",
      summary: "The time is 6:48 PM."
    }

    const questionId = faker.datatype.uuid()
    const newAnswer = await questionRepo.addAnswer(questionId, answer)

    expect(newAnswer).toBeNull()
  })
})
