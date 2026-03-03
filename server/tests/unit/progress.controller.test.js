const ProgressController = require('../../controllers/progressController');
const ProgressService = require('../../services/progressService');
const httpMocks = require('node-mocks-http');

jest.mock('../../services/progressService.js');

let req, res;
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
});

describe('Progress Controller - Update XP', () => {
  describe('Happy Path', () => {
    const userId = '99';
    const xpValue = 70;
    const serviceResult = { id: userId, experience_points: 150 };

    beforeEach(() => {
      req.params.id = userId;
      req.body = { value: xpValue};

      ProgressService.updateXP.mockResolvedValue(serviceResult);
    });

    it('should have a updateXP function', () => {
      expect(typeof ProgressController.updateXP).toBe('function');
    });

    it('should call ProgressService.updateXP', async () => {
      await ProgressController.updateXP(req, res);

      expect(ProgressService.updateXP)
        .toHaveBeenCalledWith(xpValue, userId);
    });

    it('should return 200 response code', async () => {
      await ProgressController.updateXP(req, res);

      expect(res.statusCode).toBe(200);
      expect(res._isEndCalled()).toBeTruthy();
    });

    it('should return JSON body in response', async () => {
      await ProgressController.updateXP(req, res);

      expect(res._getJSONData()).toStrictEqual({
        message: 'Update Successful',
        data: serviceResult,
      });
    });

  });

  describe('Sad Path', () => {
    const userId = '99';
    const xpValue = 70;

    beforeEach(() => {
      req.params.id = userId;
      req.body = { value: xpValue};
    });

    it('should return 404 if no update is performed', async () => {
      ProgressService.updateXP.mockResolvedValue(null);

      await ProgressController.updateXP(req, res);

      expect(res.statusCode).toBe(404);
      expect(res._isEndCalled()).toBeTruthy();
      expect(res._getJSONData()).toStrictEqual({
        message: 'User not found or no update performed',
      });
    });

    it('should return 500 if service throws error', async () => {
      ProgressService.updateXP.mockRejectedValue(new Error('Database failure'));

      await ProgressController.updateXP(req, res);

      expect(res.statusCode).toBe(500);
      expect(res._isEndCalled()).toBeTruthy();
      expect(res._getJSONData()).toStrictEqual({
        message: 'Server error',
        error: 'Database failure',
      });
    });

  });
});

describe('Progress Controller - Update Streak', () => {
  describe('Happy Path', () => {
    const userId = '99';
    const serviceResult = { id: userId, streak: 5 };

    beforeEach(() => {
      req.params.id = userId;

      ProgressService.updateStreak.mockResolvedValue(serviceResult);
    });

    it('should have a updateStreak function', () => {
      expect(typeof ProgressController.updateStreak).toBe('function');
    });

    it('should call ProgressService.updateStreak', async () => {
      await ProgressController.updateStreak(req, res);

      expect(ProgressService.updateStreak)
        .toHaveBeenCalledWith(userId);
    });

    it('should return 200 response code', async () => {
      await ProgressController.updateStreak(req, res);

      expect(res.statusCode).toBe(200);
      expect(res._isEndCalled()).toBeTruthy();
    });

    it('should return JSON body in response', async () => {
      await ProgressController.updateStreak(req, res);

      expect(res._getJSONData()).toStrictEqual({
        message: 'Streak Update Successful',
        data: serviceResult,
      });
    });
  });

  describe('Sad Path', () => {
    const userId = '99';

    beforeEach(() => {
      req.params.id = userId;
    });

    it('should return 404 if no update is performed', async () => {
      ProgressService.updateStreak.mockResolvedValue(null);

      await ProgressController.updateStreak(req, res);

      expect(res.statusCode).toBe(404);
      expect(res._isEndCalled()).toBeTruthy();
      expect(res._getJSONData()).toStrictEqual({
        message: 'User not found or no update performed',
      });
    });

     it('should return 500 if service throws error', async () => {
      ProgressService.updateStreak.mockRejectedValue(
        new Error('Database failure')
      );

      await ProgressController.updateStreak(req, res);

      expect(res.statusCode).toBe(500);
      expect(res._isEndCalled()).toBeTruthy();
      expect(res._getJSONData()).toStrictEqual({
        message: 'Server error',
        error: 'Database failure',
      });
    });

  });
});