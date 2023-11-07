const errorHandler = (err, req, res, next) => {
    // Log the error for debugging purposes
    console.error(err);
  
    // Define a default error response
    const statusCode = err.status || 500;
    const message = err.message || 'Internal Server Error';
  
    // Send the error response to the client
    res.status(statusCode).json({ error: message });
  };
  
module.exports = errorHandler;
  