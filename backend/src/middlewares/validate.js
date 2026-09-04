import { AppError } from "../utils/AppError.js";

const validate = (schema) => (req, res, next) => {
  try {
    // Parse the body against the Zod schema
    const parsedData = schema.parse(req.body);
    // Replace req.body with the sanitized/validated data
    req.body = parsedData;
    next();
  } catch (error) {
    // Collect all Zod error messages
    const errorMessages = error.errors.map((err) => `${err.path.join(".")}: ${err.message}`).join(", ");
    next(new AppError(`Validation failed: ${errorMessages}`, 400));
  }
};

export default validate;
