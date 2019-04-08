import { delay } from 'redux-saga'
import { call, put, takeEvery, select, take  } from 'redux-saga/effects'

export function* helloSaga() {
  console.log('Hello Saga!')
}

export function* incrementAsync() {
  yield call(delay, 1000)
  yield put({type: 'INCREMENT'})
}

export function* watchIncrementAsync() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}

export function* watchAndLog1() {
  yield takeEvery('*', function* logger(action){
    const state = yield select()
    console.log('action1', action)
    console.log('state after1', state)
  })
}

export function* watchAndLog2() {
  while(true) {
    const action = yield take('*')
    const state = yield select()
    console.log('action2', action)
    console.log('state after2', state)
  }
}

export function* watchFirstThreeTodosCreation() {
  for (let i = 0; i<3;i++) {
    const action = yield take('TODO_CREATED')
  }
  yield put({ type: 'SHOW_CONGRATULATION'})
}

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield [
    helloSaga(),
    watchAndLog1(),
    watchIncrementAsync(),
    watchAndLog2(),
  ]
}
