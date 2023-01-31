const jwt = require("jsonwebtoken");

exports.verifyToken = async (req, res, next) => {
  // Lay quyen truy cap tu req header
  const Authorization = req.header("Authorization");
  if (!Authorization) {
    res.status(400).json({message:"Unauthorized"})
    return next();
  }
  // get token
  const token = Authorization.replace("Bearer ", "");
  try {
    // Verify token
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    console.log("User Id : ", userId);
    req.body.userId = userId;
    req.params.userIdS3 = userId;
    next();
  } catch (error) {
    console.log("Error : ", error.message);
    if (error.message === "jwt expired") {
      return res.status(400).json({ message: error.message });
    } else {
      return res.status(400).json({ message: "failure" });
    }
  }
};