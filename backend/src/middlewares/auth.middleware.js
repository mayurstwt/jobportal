const jwt = require("jsonwebtoken");

exports.protect = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
        id: decoded.id,
        role: decoded.role
    };

    next();
  }

  catch (error) {
    console.log("Error verifying token", error);
    res.status(401).json({ message: "Invalid token" });
  }
};

