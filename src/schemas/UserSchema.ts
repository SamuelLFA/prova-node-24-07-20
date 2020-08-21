import Joi from '@hapi/joi';

export default Joi.object({
    name: Joi.string().min(1).max(50).required(),
    username: Joi.string().min(5).max(30).required(),
    email: Joi.string().email({ tlds: { allow: false } }).required()
}).options({ abortEarly: false });