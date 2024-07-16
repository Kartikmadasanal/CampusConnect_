import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  // Retrieve token from the Authorization header
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json("You are not authenticated!");
  }

  // Extract the token from the "Bearer <token>" format
  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(403).json("Token is not valid!");
    }

    // Attach user information to the request object
    req.userId = user._id;

    next();
  });
};

export default verifyToken;
