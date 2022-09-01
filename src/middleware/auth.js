import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    let decode = jwt.verify(token, process.env.SECRET);
    if (token) {
      decode = jwt.verify(token, process.env.SECRET);
      req.userId = decode?.id;
    } else {
      // decode=jwt.decode(token);
      // req.userId=decode?.sub;
    }
    next();
  } catch (error) {
    console.log("error: ", error);
  }
};
export default auth;