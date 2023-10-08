const validateRequest = (Schema) => async (req, res, next) => {
  try {
    await Schema.validate({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (err) {
    res.json([
      {
        message: err.message,
        success: false,
        isOperational: true,
      },
    ]);
  }
};
module.exports = validateRequest;
