import { combineReducers, legacy_createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { UsersReducer } from 'reducks/user/reducers';
import { MenuOpenReducer } from 'reducks/menuOpen/reducer';
// デプロイする際は下記のコードを消去する。
// それに伴って、composeWithDevTools(applyMiddleware(thunk))を
// applyMiddleware(thunk)に変更する。
function middleWare() {
  return process.env.NODE_ENV === 'production'
    ? applyMiddleware(thunk)
    : composeWithDevTools(applyMiddleware(thunk));
}

const createStore = (): any => {
  return legacy_createStore(
    combineReducers({
      user: UsersReducer,
      menuOpen: MenuOpenReducer,
    }),
    middleWare()
  );
};
export { createStore };
