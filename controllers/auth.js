const { BadRequest, Unauthorized } = require('../errors');
const { StatusCodes } = require('http-status-codes');
const UserModel = require('../models/User');
const jwt = require('jsonwebtoken');

const getAllUsers = async (req, res) => {
  const allUsers = await UserModel.find({});

  res.status(StatusCodes.OK).json(allUsers);
};

const register = async (req, res) => {
  const user = await UserModel.create({ ...req.body });
  const token = await jwt.sign(
    { userId: user._id, username: user.name },
    'jwtSecretKey',
    { expiresIn: '2d' },
  );

  res.status(StatusCodes.OK).json({ msg: 'user created', token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequest('Please provide an email and a password');
  }

  //checks if user exists in database
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new Unauthorized('Invalid credentials');
  }

  //checks if given password is correct
  const isAMatch = await user.comparePassword(password);
  if (!isAMatch) {
    throw new Unauthorized('Invalid credentials');
  }

  //returns the user name and signed token to client
  const token = user.createJWT();
  console.log('token', token);
  res.status(StatusCodes.OK).json({
    user: {
      name: user.name,
    },
    token,
  });
};

module.exports = {
  register,
  login,
  getAllUsers,
};
