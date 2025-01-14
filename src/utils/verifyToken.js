export const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"];
  
    if (!token) {
      return res.status(401).send("Access denied. No token provided.");
    }
  
    // verify-Methode überprüft Token auf Richtigkeit
    // jwt.verify(token, secretKey, (error, decoded) => {...})
    jwt.verify(token, secretKey, (error, decoded) => {
      if (error) {
        return res.sendStatus(403);
      }
      req.user = decoded;
      next();
    });
  }