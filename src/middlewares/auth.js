import jwt from "jsonwebtoken";

const validateToken = (req, res, next) => {
  let result;
  const token = req.headers.authorization.split("Bearer ")[1];
  if (token) {
    const options = {
      expiresIn: "2d",
    };
    try {
      result = jwt.verify(token, process.env.JWT_SECRET, options);
      req.decoded = result;
      next();
    } catch (err) {
      res.sendStatus(401);
    }
  } else {
    res.sendStatus(401);
  }
};
export default validateToken;
