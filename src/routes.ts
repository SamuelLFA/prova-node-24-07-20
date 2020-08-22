import { Router } from 'express';
import UserController from './controllers/UserController';
import BodyValidator from './middlewares/BodyValidator';

const router = Router();

router.get('/users', UserController.getAll);
router.get('/users/:id', UserController.get);
router.post('/users', BodyValidator, UserController.create);
router.put('/users/:id', BodyValidator, UserController.update);
router.delete('/users/:id', UserController.delete);

export default router;
