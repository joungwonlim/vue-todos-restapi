import { Router } from 'express';

import users from './users';
import todos from './todos';

const router = Router();

router.use('/account', users);
router.use('/todos', todos);

export default router;
