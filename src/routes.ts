import { Router } from 'express';
import UserController from './controllers/UserController';
import SessionController from './controllers/SessionController';
import BodyValidator from './middlewares/BodyValidator';
import LoginValidator from './middlewares/LoginValidator';
import VerifyJWT from './middlewares/VerifyJWT';

const router = Router();

router.post('/login', LoginValidator, SessionController.login);
router.use(VerifyJWT);
router.get('/users', UserController.getAll);
router.get('/users/:id', UserController.get);
router.post('/users', BodyValidator, UserController.create);
router.put('/users/:id', BodyValidator, UserController.update);
router.delete('/users/:id', UserController.delete);

export default router;
