const { UserModel } = require('../models');
const STATE = require('../constants/state');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userController = {
  addUser: async (req, res) => {
    if(!req.body.email || !req.body.password) {
      res.status(403)
    }
    const isExist = await UserModel.findOne({email: req.body.email});
    if(isExist) {
      res.status(403).json(STATE.FAIL.EMAIL_ERR);
    } else {
      const user = new UserModel({
        ...req.body,
        password: bcrypt.hashSync(req.body.password, 10),
      });
      await user.save();
      res.status(200).json(STATE.SUCCESS)
    }
  },

  loginUser: async (req, res) => {
    const user = await UserModel.findOne({email: req.body.email});
    if(!user) {
      res.status(403).json(STATE.FAIL.NOLOGIN_ERR);
    } else {
      const result = await bcrypt.compare(req.body.password, user.password);
      if(result) {
        const payload = {
          userId: user.id,
          nicknam: user.nickname
        };
        const token = jwt.sign({
          payload,
          exp: Math.floor(Date.now() / 1000) + (60 * 15),
        }, process.env.SECRET_KEY);
        res.status(200).json({...STATE.SUCCESS, token})
      } else {
        res.status(403).json(STATE.FAIL.PASSWORD_ERR);
      }
    }
  }
}

module.exports = userController;

