const logger = (req, res, next) => {
    console.log(`Request-Method: ${req.method}\nRequest-URL: ${req.originalUrl}`);
    next();
}

const invalidRoute = (req, res) => {
    res.send(`Combination of path "${req.originalUrl}" and method "${req.method}" not found.`);
}


export const middleware = {
    log: logger,
    invalid: invalidRoute,
};  