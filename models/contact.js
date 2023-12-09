const {Schema, model} = require('mongoose');
const {handleMongooseError} = require('../helpers');
const Joi = require("joi");

const contactSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
      },
      email: {
        type: String,
      },
      phone: {
        type: String,
      },
      favorite: {
        type: Boolean,
        default: false,
      },
      owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
      }
}, {versionKey: false});

contactSchema.post('save', handleMongooseError);

const addSchema = Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().required(),
    email: Joi.string().required(),
    favorite: Joi.boolean().default(false),

  });
 
  const favoriteSchema = Joi.object({
    favorite: Joi.boolean().required().error(new Error("Missing field favorite")),
  })

const schemas = {
    addSchema,
    favoriteSchema,
}
const Contact = model('contact', contactSchema);

module.exports = {
    Contact,
    schemas,
};