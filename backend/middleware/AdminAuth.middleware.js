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

export const isAuthorized = (roles = []) => {
  return (req, res, next) => {
    // role ek ya multiple ho sakte hain
    if (typeof roles === "string") roles = [roles];

    // check user exist karta hai (isAuthenticated se)
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated." });
    }

    // check user ka role allowed roles mai hai ya nahi
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "You are not authorized to access this resource." });
    }

    // sab theek → next step
    next();
  };
};

