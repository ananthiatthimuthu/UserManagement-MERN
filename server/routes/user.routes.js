import { Router } from 'express';
import * as UserController from '../controllers/user.controller';
const router = new Router();

// Get all Users
router.route('/users').get(UserController.getUsers);

// Get one user by cuid
router.route('/users/:_id').get(UserController.getUser);

// Add a new User
router.route('/users').post(UserController.addUser);

// Delete a user by cuid
router.route('/users/:_id').delete(UserController.deleteUser);

export default router;
