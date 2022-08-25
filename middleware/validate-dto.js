function validateDto(schema) {
  return async (req, resp, next) => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      return resp.status(422).json(error);
    }
  };
}

module.exports = validateDto;
