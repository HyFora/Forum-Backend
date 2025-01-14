const logger = (req, res, next) => {
    console.log(`Request-Method: ${req.method}\nRequest-URL: ${req.originalUrl}`);
   
   try {
      const {username, password} = req.body;

      if(username === "admin" && password === "password")
   } catch (error) {
    res.status(500).
    next(error)
   }
}

const invalidRoute = (req, res) => {
    res.send(`Combination of path "${req.originalUrl}" and method "${req.method}" not found.`);
}


export const middleware = {
    log: logger,
    invalid: invalidRoute,
};  