const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");

const emailRegexp = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;


const userSchema = new Schema({
    
        password: {
          type: String,
          required: [true, 'Set password for user'],
        },
        email: {
          type: String,
          required: [true, 'Email is required'],
          unique: true,
          match: emailRegexp,
        },
        subscription: {
          type: String,
          enum: ["starter", "pro", "business"],
          default: "starter"
        },
        token: {
          type: String,
          default: null,
        },
        avatarURL: String,
        
          verify: {
            type: Boolean,
            default: false,
          },
          verificationToken: {
            type: String,
            required: [true, 'Verify token is required'],
          },
        
      
      }, {versionKey: false})

userSchema.post('save', handleMongooseError);

const registerSchema = Joi.object({
  email: Joi.string().required().pattern(emailRegexp),
    password: Joi.string().min(6).required(),
    
  token: Joi.string().default(null),
  });


  const emailSchema = Joi.object({
    email: Joi.string().required().pattern(emailRegexp),

  });

  const loginSchema = Joi.object({
    email: Joi.string().required().pattern(emailRegexp),
    password: Joi.string().min(6).required(),
    token: Joi.string().default(null),
  });
 
 const schemas = {
    registerSchema,
    loginSchema,
    emailSchema,
 }


 const User = model("user", userSchema);

 module.exports = {
  schemas,
    User,
    
 }