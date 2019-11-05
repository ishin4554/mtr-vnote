const { UserModel } = require('../models');
const STATE = require('../constants/state');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userController = {
  getUsers: async (req, res) => {
    try{
      const query = Object.keys(req.query).reduce((acc, key) => {
        if(req.query[key]) {
          acc[key] = req.query[key];
        } 
        return acc;
      }, {})
      const users = await UserModel.find({
        email: {
          $regex: query.search,
          $options: 'i'
        }
      },['id','nickname','url'],)
      res.json(users);
    } catch(err) {
      console.log(err)
      res.status(500).json(STATE.FAIL);
    }   
  },

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

  updateUser: async (req, res) => {
    try{
      await UserModel.update(
        {id: req.params.id}, 
        req.body);
      res.json(STATE.SUCCESS);
    } catch(err) {
      console.log(err)
      res.status(500).json(STATE.FAIL);
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
          nickname: user.nickname,
          url: user.url
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

