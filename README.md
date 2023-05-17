# Welcome to the responder

This is a REST API that uses express.js for simple question and answer submissions. The application is designed to be run in both development and production environments.

To get started with the application:

In your code editor's console, run the command: 'npm install' - this will install the project dependencies.
Then, start the application by running either 'npm run start:dev' or 'npm run start:prod' command, depending on which environment you want to run.
To run the tests, use the command: 'npm run test'.

The application provides the following methods:

-Get all questions
-Get a single question by ID
-Add a new question and save it to a file
-Get all answers for a given question ID
-Get a single answer by ID for a given question
-Add a new answer to an existing question and save it to a file

Data validation is performed using packages such as 'express-validation' and 'joi'.
Error handling in the application is handled by the 'express-async-errors' package.
The 'nodemon' package allows for automatic restarting of the Node.js application upon detecting file changes.
The 'uuid' package is used to generate unique identifiers for questions and answers.
Unit tests have been implemented using the 'jest' package.

