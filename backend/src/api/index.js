import { Router } from 'express';

import users from './users';
import todos from './todos';

const router = Router();

router.use('/users', users);
router.use('/todos', todos);

export default router;
