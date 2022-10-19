import { Router } from 'express';
import Joi from 'joi';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Users from '../model/Users';

// validate register schema
const usersRegisterSchema = Joi.object({
  username: Joi.string().trim().required().min(1),
  email: Joi.string().trim().required().min(1).max(255).email(),
  password: Joi.string().trim().required().min(1).max(1024),
});

// validate login schema
const usersLoginSchema = Joi.object({
  email: Joi.string().trim().required().min(1).max(255).email(),
  password: Joi.string().trim().required().min(1).max(1024),
});

const router = Router();

router.post('/register', async (req, res, next) => {
  // validate schema
  const { error } = usersRegisterSchema.validate(req.body);
  if (error) return res.json(error.details[0].message);

  // Checking if the email already exists in the database
  const emailExist = await Users.findOne({
    email: req.body.email,
  });
  if (emailExist) return res.json('Email already exist');

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  // make user object
  const newUser = new Users({
    username: req.body.username,
    email: req.body.email,
    password: hashPassword,
  });

  // save new user
  try {
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  // validate login schema
  const { error } = usersLoginSchema.validate(req.body);
  if (error) return res.json(error.details[0].message);
  try {
    // checking if the email is exist in the database
    const user = await Users.findOne({
      email: req.body.email,
    });
    if (!user) return res.json('This email is not found');

    // hashed Password compare
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password,
    );
    if (!validPassword) return res.json('This password is not correct');

    // create and assign a token
    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
      },
      process.env.TOKEN_SECRET,
    );
    res.header('auth-token', token).send(token);

    res.json(token);
  } catch (error) {
    next(error);
  }
});

// Read All - Users
router.get('/users', async (req, res, next) => {
  try {
    const users = await Users.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

// Read One - users
router.get('/users:id', async (req, res, next) => {
  try {
    const user = await Users.findById(req.params.id);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

// Create One -users
router.post('/users', async (req, res, next) => {
  // validate schema
  const { error } = usersRegisterSchema.validate(req.body);
  if (error) return res.json(error.details[0].message);

  // Checking if the email already exists in the database
  const emailExist = await Users.findOne({
    email: req.body.email,
  });
  if (emailExist) return res.json('Email already exist');

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  // make user object
  const newUser = new Users({
    username: req.body.username,
    email: req.body.email,
    password: hashPassword,
  });

  // save new user
  try {
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (error) {
    next(error);
  }
});

// Update One - Users
router.put('/users:id', async (req, res, next) => {
  try {
    const updateUser = await Users.updateOne(
      {
        _id: req.body.id,
      },
      {
        username: req.body.username,
        emial: req.body.email,
        status: req.body.status, //[ Active, Inactive, Pending ]
        // exclude password
      },
    );
    res.json(updateUser);
  } catch (error) {
    next(error);
  }
});

router.delete('/users:id', async (req, res, next) => {
  try {
    const deleteUser = await Users.deleteOne({
      _id: req.params.id,
    });
    res.json(deleteUser);
  } catch (error) {
    next(error);
  }
});

export default router;
