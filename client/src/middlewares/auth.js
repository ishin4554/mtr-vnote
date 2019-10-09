import jwtDecode from "jwt-decode";
import storage from "../utlis/storage";

const authListener = () => next => action => next(action)
  // const token = storage.getCookie('token');
  // if (!token) {
  //   return next(action);
  // }

  // const { exp } = jwtDecode(token);
  // const isExpired = Date.now() / 1000 > exp;
  // if (!isExpired) {
    
  // }

export default authListener;
