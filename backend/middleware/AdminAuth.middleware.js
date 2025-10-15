import jwt from 'jsonwebtoken';

export const isAuthenticated = async (req, res, next) => {
  const token = req.cookies?.["jwt-token"]; // ✅ same name as you used in signin
  console.log('Admin-token', token);

  if (!token) {
    return res.status(401).json({ message: 'You are not authenticated.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("+++++", decoded);
     req.user = decoded;

    next();
  } catch (err) {
    console.error('JWT verification failed:', err.message);
    return res.status(403).json({ message: 'Invalid or expired token.' });
  }
};

export const isAuthorized = (req, res, next) => {
  return null;
};
