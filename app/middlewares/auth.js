const jwt = require('jsonwebtoken');
const STATE = require('../constants/state');
const { UserModel } = require('../models');

const checkAuth = async (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    try {
      const result = await jwt.verify(token, process.env.SECRET_KEY);
      const { payload } = result;
      if(payload) {
        const user = await UserModel.findOne({id: payload.userId});
        if(user) {
          req.user = { 
            id: user.id
          };
          next();
        } else {
          res.status(403).json(STATE.FAIL.AUTH_ERR).end();
        }
      }
    } catch(err) {
      console.log(err.name)
      res.status(403).json(STATE.FAIL.AUTH_ERR).end();
    }
  } else {
    res.status(403).json(STATE.FAIL.NOLOGIN_ERR).end();
  }
};

module.exports = { checkAuth };
