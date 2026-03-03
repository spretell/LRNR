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
});