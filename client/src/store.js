import { createStore, applyMiddleware } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { createLogger } from "redux-logger";
import AuthListener from "./middlewares/auth";
import reducers from "./reducers";
import { rootEpic } from "./epics";

const logger = createLogger({
  collapsed: true
});

const epicMiddleware = createEpicMiddleware();
const store = createStore(
  reducers,
  applyMiddleware(logger, AuthListener, epicMiddleware)
);

epicMiddleware.run(rootEpic);

export default store;
