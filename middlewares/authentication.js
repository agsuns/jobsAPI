const UserModel = require('../models/User');
const jwt = require('jsonwebtoken');
const { Unauthorized } = require('../errors');

const auth = async (req, res, next) => {
  // const header = req.headers.authorization;
  const header = req.get('Authorization');
  if (!header || !header.startsWith('Bearer ')) {
    throw new Unauthorized('No authorization provided');
  }

  const token = header.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { userId: payload.userId, name: payload.name };
    next();
  } catch (e) {
    throw new Unauthorized('Invalid token');
  }
};

module.exports = auth;
