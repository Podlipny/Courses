// import { take, call, put, select } from 'redux-saga/effects';
import { ADD_LINK, ADD_LINK_CANCELLED } from './constants';
import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { addLinkSuccess, addLinkFailed } from './actions';
import { createLink } from '../../api';
import { goBack } from 'react-router-redux';

function* addLink(action) {
  try {
    const serverLink = yield call(createLink, action.link);
    yield put(addLinkSuccess(serverLink));
    yield put(goBack());
  } catch (e) {
    yield put(addLinkFailed(action.link, e.message));
  }
}

export function* addLinkCancelSaga() {
  yield* takeLatest(ADD_LINK_CANCELLED, () => put(goBack()));
}

// Individual exports for testing
export function* addLinkSaga() {
  yield* takeLatest(ADD_LINK, addLink);
}

// All sagas to be loaded
export default [
  addLinkSaga,
  addLinkCancelSaga,
];
