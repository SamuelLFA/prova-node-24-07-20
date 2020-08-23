import Joi from '@hapi/joi';

export default Joi.object({
  username: Joi.string().min(5).max(30).required(),
}).options({ abortEarly: false });
