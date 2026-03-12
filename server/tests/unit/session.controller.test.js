const SessionController = require('../../controllers/sessionController');
const SessionService = require('../../services/sessionService');
const httpMocks = require('node-mocks-http');
const userLogin = require('../mock-data/new-user-session.json');

SessionService.create = jest.fn();

let req, res;
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
});

describe('Session Controller - Create Session', () => {
  describe('Happy Path', () => {
    beforeEach(() => {
      req.body = userLogin;

      SessionService.create.mockResolvedValue({
        token: 'fakeToken',
        user: { id: 1, username: 'user1' }
      });
    })
    it('should have a createSession function', () => {
      expect(typeof SessionController.createSession).toBe('function');
    });

    it('should call SessionService.create', async () => {
      await SessionController.createSession(req, res);
      expect(SessionService.create)
        .toHaveBeenCalledWith(userLogin.username, userLogin.password);
    });

    it('should return a 201 response code', async () => {
      await SessionController.createSession(req, res);
      expect(res.statusCode).toBe(201);
      expect(res._isEndCalled()).toBeTruthy();
    });

    it('should return a JSON body in response', async () => {
      SessionService.create.mockReturnValue(userLogin);
      await SessionController.createSession(req, res);
      expect(res._getJSONData()).toStrictEqual({"message": "Sign in successful"});
    });
  });

  describe('Sad Path', () => {
    it('should return 401 when SessionService.create throws', async () => {
      SessionService.create.mockRejectedValue(new Error('Invalid credentials'));
      await SessionController.createSession(req, res);
      expect(res.statusCode).toBe(401);
    });

    it('should return error message in JSON response', async () => {
      const errorMessage = 'Invalid credentials';
      SessionService.create.mockRejectedValue(new Error(errorMessage));
      await SessionController.createSession(req, res);
      expect(res._getJSONData()).toStrictEqual({
        message: errorMessage
      });
    });

    it('should still call SessionService.create with username and password on failure', async () => {
      SessionService.create.mockRejectedValue(new Error('Invalid credentials'));
      await SessionController.createSession(req, res);
      expect(SessionService.create).toHaveBeenCalledWith(
        userLogin.username,
        userLogin.password
      );
    });
  });
});

describe('Session Controller - Logout', () => {
  it('should have a logout function', () => {
    expect(typeof SessionController.logout).toBe('function');
  });

  it('should return a 200 response code', async () => {
    await SessionController.logout(req, res);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it('should return a JSON body in response', async () => {
    await SessionController.logout(req, res);
    expect(res._getJSONData()).toStrictEqual({"message": "Sign out successful"});
  });
});