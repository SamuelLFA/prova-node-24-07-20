import { Router } from 'express';
import UserController from './controllers/UserController';
import BodyValidator from './middlewares/BodyValidator';

const router = Router();

router.get('/users', UserController.getAll);
router.get('/users/:id', UserController.get);
router.post('/users', BodyValidator, UserController.create);

export default router;