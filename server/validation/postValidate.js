const Joi = require('@hapi/joi');

const validateCreatePost = data => {
     
        const schema = Joi.object({
            movieName: Joi.string().min(1).required(),
            description: Joi.string().min(6).required(),
            rating: Joi.number().min(0).required()
        });
        return schema.validate(data);
    
 }


 module.exports.validateCreatePost = validateCreatePost;