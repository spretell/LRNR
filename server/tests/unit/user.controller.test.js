const UserController = require('../../controllers/userController');
const UserService = require('../../services/userService');
const httpMocks = require('node-mocks-http');
const userInfo = require('../mock-data/user-info.json');

UserService.show = jest.fn();

let req, res;
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
});

describe('User Controller - Show Action', () => {
  describe('Happy Path', () => {
    const userId = 21;

    beforeEach(() => {
      req.params.id = userId;

      UserService.show.mockResolvedValue({ 
        id: 1, 
        username: 'test' 
      });
    });

    it('should have a showUser function', () => {
      expect(typeof UserController.showUser).toBe('function');
    });

    it('should call UserService.show', async () => {
      await UserController.showUser(req, res);
      expect(UserService.show).toHaveBeenCalledWith(userId);
    });

    it('should return 200 response code', async () => {
      await UserController.showUser(req, res);
      expect(res.statusCode).toBe(200);
      expect(res._isEndCalled()).toBeTruthy();
    });

    it('should return a JSON body in response', async () => {
      UserService.show.mockReturnValue(userInfo);
      await UserController.showUser(req, res);
      expect(res._getJSONData()).toStrictEqual({
        data: userInfo
      });
    });

    describe('Sad Path', () => {
      const userId = 1;

      beforeEach(() => {
        req.params.id = userId;
      });

      it('should return 404 response code and an error message', async () => {
        UserService.show.mockResolvedValue(null);

        await UserController.showUser(req, res);
        expect(res.statusCode).toBe(404);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual({
          message: 'User not found'
        });
      });

      it('should return 500 response code and an error message', async () => {
        UserService.show.mockRejectedValue(new Error('Database error'));

        await UserController.showUser(req, res);
        expect(res.statusCode).toBe(500);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual({
          "error": "Database error",
          "message": "Server error",
        })
      });

    });
  });
});