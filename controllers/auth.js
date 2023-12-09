const { User } = require("../models/user");
const { ctrlWrapper, HttpError } = require("../helpers");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {SECRET_KEY} = process.env
const register = async(req, res) => {

const {email, password} = req.body;

const user = await User.findOne({email});
if(user) {
    throw HttpError(409, "Email is already in use");
}

const hashPassword = await bcrypt.hash(password, 10);

const newUser = await User.create({...req.body, password: hashPassword});
res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
})
}

const login = async(req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if(!user) {
        throw HttpError(401, "Email or password is wrong")
    }

    const comparePassword = await bcrypt.compare(password, user.password);
    if(!comparePassword) {
        throw HttpError(401, "Email or password is wrong")
    }

    const payload = {
      id: user._id,
    }

    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "23h"});
    await User.findByIdAndUpdate(user._id, {token})
    res.json({
        token,
        user: {
          email: user.email,
          subscription: user.subscription,
        },
      });
    };


const getCurrent = async(req, res) => {
    const {email, subscription} = req.user;

    register.json({
        email,
        subscription,
    })
}

const logout = async (req, res) => {
    const { _id } = req.user;

    await User.findByIdAndUpdate(_id, { token: null });
    
    res.status(204).json();
  };

module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
}
