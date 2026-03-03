const QuizController = require('../../controllers/quizController');
const QuizService = require('../../services/quizService');
const httpMocks = require('node-mocks-http');
const quizInfo = require('../mock-data/quizzes-data.json');

jest.mock('../../services/quizService.js');

let req, res;
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
});

describe('Quiz Controller - Show Action', () => {
  describe('Happy Path', () => {
    const userId = 21;

    beforeEach(() => {
      req.params.id = userId;

      QuizService.show.mockResolvedValue({ 
        id: 1, 
        username: 'test' 
      });
    });

    it('should have a showQuizzes function', () => {
      expect(typeof QuizController.showQuizzes).toBe('function');
    });

    it('should call the QuizService.show function', async () => {
      await QuizController.showQuizzes(req, res);

      expect(QuizService.show).toHaveBeenCalledWith(userId);
    });

    it('should return 200 response code', async () => {
      await QuizController.showQuizzes(req, res);

      expect(res.statusCode).toBe(200);
      expect(res._isEndCalled()).toBeTruthy();
    });

    it('should return a JSON body in response', async () => {
      QuizService.show.mockReturnValue(quizInfo);

      await QuizController.showQuizzes(req, res);
      expect(res._getJSONData()).toStrictEqual({
        data: quizInfo
      });
    });

  });

  describe('Sab Path', () => {
    it('should return 404 response code and an error message', async () => {
      QuizService.show.mockResolvedValue(null);

      await QuizController.showQuizzes(req, res);
      expect(res.statusCode).toBe(404);
      expect(res._isEndCalled()).toBeTruthy();
      expect(res._getJSONData()).toStrictEqual({
        message: 'User not found'
      });
    });

    it('should return 500 response code and an error message', async () => {
      QuizService.show.mockRejectedValue(new Error('Database error'));

      await QuizController.showQuizzes(req, res);
      expect(res.statusCode).toBe(500);
      expect(res._isEndCalled()).toBeTruthy();
      expect(res._getJSONData()).toStrictEqual({
        "error": "Database error",
        "message": "Server error",
      })
    });

  });
});

describe('Quiz Controller - Create Action', () => {
  const userId = 101
  const newQuiz = {
    "title": "Quiz Name",
    "difficulty": "Beginner"
  }
  beforeEach(() => {
    req.params.id = userId;
    req.body = newQuiz;

    jest.clearAllMocks();
  });
  describe('Happy Path', () => {

    beforeEach(() => {      
      QuizService.create.mockResolvedValue({
        affectedRows: 1
      });

      QuizService.show.mockResolvedValue([
        {
          id: 99,
          title: 'Quiz Name',
          difficulty: 'Beginner',
        },
      ]);
    });

    it('should have a saveQuiz function', () => {
      expect(typeof QuizController.saveQuiz).toBe('function');
    });

    it('should call QuizService.create', async () => {
      await QuizController.saveQuiz(req, res);
      
      expect(QuizService.create).toHaveBeenCalledWith(
        newQuiz.title,
        newQuiz.difficulty,
        userId
      );
    });

    it('should call QuizService.show after successful create', async () => {
      await QuizController.saveQuiz(req, res);

      expect(QuizService.show).toHaveBeenCalledWith(userId);
    });

    it('should return 201 and quiz data', async () => {
      await QuizController.saveQuiz(req, res);

      expect(res.statusCode).toBe(201);
      expect(res._getJSONData()).toStrictEqual({
        data: [
          {
            id: 99,
            title: 'Quiz Name',
            difficulty: 'Beginner',
          },
        ],
      });
    });
  });

  describe('Sad Path', () => {
    it('should return a 422 when required fields are missing', async () => {
      req.body = {};

      await QuizController.saveQuiz(req, res);

      expect(res.statusCode).toBe(422);
      expect(res._isEndCalled()).toBeTruthy();
      expect(res._getJSONData()).toStrictEqual({
        message: 'All fields are required'
      });
    });

    it('should return 404 when affectedRows is 0', async () => {
      QuizService.create.mockResolvedValue({
        affectedRows: 0,
      });

      await QuizController.saveQuiz(req, res);

      expect(res.statusCode).toBe(404);
      expect(res._getJSONData()).toStrictEqual({
        message: 'Unable to save to the database',
      });
    });

    it('should return 500 if service throws error', async () => {
      QuizService.create.mockRejectedValue(new Error('DB crashed'));

      await QuizController.saveQuiz(req, res);

      expect(res.statusCode).toBe(500);
      expect(res._getJSONData()).toStrictEqual({
        message: 'Server error',
        error: 'DB crashed',
      });
    });
  });
});