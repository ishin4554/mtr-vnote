const STATE = {
  SUCCESS: {
    message: 'success',
  },
  FAIL: {
    DB_ERR: {
      name: 'DB_ERR',
      message: '待補：執行過程的錯誤',
    },
    PASSWORD_ERR: {
      name: 'PASSWORD_ERR',
      message: '錯誤 Email 密碼',
    },
    EMAIL_ERR: {
      name: 'EMAIL_ERR',
      message: '錯誤 Email',
    },
    NOLOGIN_ERR: {
      name: 'NOLOGIN_ERR',
      message: '沒有此 Email',
    },
    AUTH_ERR: {
      name: 'AUTH_ERR',
      message: '驗證錯誤',
    }
  },
};
module.exports = STATE;
