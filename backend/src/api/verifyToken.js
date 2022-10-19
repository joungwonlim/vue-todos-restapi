import jwt from 'jsonwebtoken';

function verifyToken(req, res, next) {
  const token = req.header('auth-token');
  if (!token) return res.json('Access Denied');

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    next(error);
  }
}

export default verifyToken;
