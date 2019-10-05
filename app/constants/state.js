const STATE = {
  SUCCESS: {
    message: 'success',
  },
  FAIL: {
    PASSWORD_ERR: {
      message: 'ProblemPassword',
    },
    EMAIL_ERR: {
      message: 'ProblemEmail',
    },
    NOLOGIN_ERR: {
      message: 'ProblemNoEmail',
    },
    AUTH_ERR: {
      message: 'ProblemToken',
    }
  },
};
module.exports = STATE;
