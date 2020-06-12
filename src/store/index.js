import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import combineReducers from '../reducer';
import rootSaga from '../sagas';

export default function configureStore() {
  // saga 미들웨어를 생성합니다.
  const sagaMiddleware = createSagaMiddleware();
  // 스토어를 만들기 및 개발자 도구 적용
  let store;
  store = createStore(
    combineReducers,
    compose(applyMiddleware(sagaMiddleware)),
  );

  sagaMiddleware.run(rootSaga);
  return store;
}
