const UserController = require('../../controllers/userController');
const UserService = require('../../services/userService');
const httpMocks = require('node-mocks-http');
const userInfo = require('../mock-data/user-info.json');

// UserService.show = jest.fn();
jest.mock('../../services/userService');

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

describe('User Controller - Create Action', () => {
  describe('Happy Path', () => {

    const newUser = {
      "username": "newuser",
      "first_name": "Jane",
      "last_name": "Doe",
      "password": "Password123",
      "email": "email@test.com"
    };

    beforeEach(() => {
      req.body = newUser;

      UserService.create.mockResolvedValue({
        insertId: 99
      });
    });

    it('should have a createUser function', () => {
      expect(typeof UserController.createUser).toBe('function');
    });

    it('should call UserService.create', async () => {
      await UserController.createUser(req, res);

      expect(UserService.create).toHaveBeenCalledWith(
        newUser.username,
        newUser.first_name,
        newUser.last_name,
        newUser.password,
        newUser.email
      );
    });

    it('should return 201 response code', async () => {
      await UserController.createUser(req, res);

      expect(res.statusCode).toBe(201);
      expect(res._isEndCalled()).toBeTruthy();
    });

    it('should return a JSON body in response', async () => {
      await UserController.createUser(req, res);

      expect(res._getJSONData()).toStrictEqual({
        message: 'User created successfully',
        userId: 99
      });
    });
  });

  describe('Sad Path', () => {
    const newUser = {
      "username": "newuser",
      "first_name": "Jane",
      "last_name": "Doe",
      "password": "Password123",
      "email": "email@test.com"
    };

    beforeEach(() => {
      req.body = newUser;
    });

    it('should return a 422 when required fields are missing', async () => {
      req.body = {};

      await UserController.createUser(req, res);

      expect(res.statusCode).toBe(422);
      expect(res._isEndCalled()).toBeTruthy();
      expect(res._getJSONData()).toStrictEqual({
        message: 'All fields are required'
      });
    });

    it('should return 409 when username/email already exists', async () => {
      UserService.create.mockRejectedValue({ code: 'ER_DUP_ENTRY' });

      await UserController.createUser(req, res);

      expect(res.statusCode).toBe(409);
      expect(res._isEndCalled()).toBeTruthy();
      expect(res._getJSONData()).toStrictEqual({
        message: 'Username or email already exists'
      });
    });

    it('should return 500 for other server errors', async () => {
      UserService.create.mockRejectedValue(new Error('Database failure'));

      await UserController.createUser(req, res);

      expect(res.statusCode).toBe(500);
      expect(res._isEndCalled()).toBeTruthy();
      expect(res._getJSONData()).toStrictEqual({
        message: 'Server error',
        error: 'Database failure'
      });
    });

  });
});