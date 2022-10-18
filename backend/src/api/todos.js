import { Router } from 'express';
import Joi from 'joi';
import Todos from '../model/Todos';

// validate schema
const todosSchema = Joi.object({
  title: Joi.string().trim().required().min(1),
});

const router = Router();

// Read All
router.get('/', async (req, res, next) => {
  try {
    const todos = await Todos.find();
    res.json(todos);
  } catch (error) {
    next(error);
  }
});

// Read One
router.get('/:id', async (req, res, next) => {
  try {
    const todo = await Todos.findById(req.params.id);
    res.json(todo);
  } catch (error) {
    next(error);
  }
});

// Create One
router.post('/', async (req, res, next) => {
  const { error } = todosSchema.validate(req.body);
  if (error) return res.json(error.details[9].message);
  const saveTodo = new Todos(req.body);
  try {
    const savedTodo = await saveTodo.save();
    res.json(savedTodo);
  } catch (error) {
    next(error);
  }
});

// Update One
router.put('/:id', async (req, res, next) => {
  try {
    const updatedTodo = await Todos.updateOne(
      {
        _id: req.params.id,
      },
      {
        $set: req.body,
      },
    );
    res.json(updatedTodo);
  } catch (error) {
    next(error);
  }
});

// Delete One
router.delete('/:id', async (req, res, next) => {
  try {
    const deletedTodo = await Todos.deleteOne({
      _id: req.params.id,
    });
    res.json(deletedTodo);
  } catch (error) {
    next(error);
  }
});

export default router;
