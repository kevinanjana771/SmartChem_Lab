const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;

    res.status(statusCode);
    res.json({
        message: err.message,
        // Only show stack trace in development
        stack: process.env.NODE_ENV === "development" ? err.stack : null
    });
};

export default errorHandler;