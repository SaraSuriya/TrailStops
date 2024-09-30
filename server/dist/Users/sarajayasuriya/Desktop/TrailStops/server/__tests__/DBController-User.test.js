var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import supertest from 'supertest';
import mockingoose from 'mockingoose';
import createServer from '../server';
import { User } from '../models/schema';
import { addUser } from '../controllers/DBController';
const request = supertest;
const app = createServer();
const mockResponse = () => {
    const res = {}; // Use Partial to allow optional properties
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
};
describe('POST /user', () => {
    beforeEach(() => {
        mockingoose.resetAll();
    });
    describe('given a name, email, and password', () => {
        const req = {
            body: {
                name: 'tester',
                email: 'tester@testing.com',
                password: 'test',
            },
        };
        test('should respond with a 200 status code', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = mockResponse();
            yield addUser(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
        }));
        test('should save user to the database', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = mockResponse();
            mockingoose(User).toReturn(req.body, 'save');
            yield addUser(req, res);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            }));
        }));
        test('should not save user if the email already exists', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = mockResponse();
            mockingoose(User).toReturn(req.body, 'findOne'); // Mock findOne and simulate existing user
            yield addUser(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'User with this email already exists' });
            mockingoose(User).toReturn(req.body, 'save'); // Ensure that save is not called again
            yield addUser(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'User with this email already exists' });
        }));
    });
    describe('given no name, email, or password', () => {
        const req = { body: {} };
        test('should respond with a 400 status code', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = mockResponse();
            yield addUser(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
        }));
        test('should not save anything to the database', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = mockResponse();
            mockingoose(User).toReturn(req.body, 'save');
            yield addUser(req, res);
            expect(res.json).not.toHaveBeenCalledWith(expect.objectContaining({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            }));
        }));
    });
});
describe('GET /user', () => {
    beforeEach(() => {
        mockingoose.resetAll();
    });
    describe('given valid user credentials', () => {
        test('should access all associated markers', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = mockResponse();
            const req = {
                body: { name: 'tester', email: 'tester@testing.com', password: 'test' },
            };
            mockingoose(User).toReturn(req.body, 'save');
            yield addUser(req, res);
        }));
    });
    describe('given invalid user credentials', () => {
        test('should respond with a 400 status code', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = mockResponse();
            const req = {
                body: {
                    name: '',
                    email: '',
                    password: ''
                }
            };
            yield addUser(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
        }));
    });
});
