import { take, put, call, apply } from 'redux-saga/effects'
import fetch from 'isomorphic-fetch'; // neco jako jQuery ajax

import {
    GET_CURRENT_USER_INFO,
    setCurrentUser
} from './../actions'

export function* currentUserSaga () {
    const { id } = yield take(GET_CURRENT_USER_INFO); // take odchyti action ktera se vola z app.jsx
    // zavolame server
    const response = yield call(fetch,`http://localhost:8081/user/${id}`);
    // musime zavolat response.json, ale response,json je bind to response, prtoo pouzijeme apply to bind response scope
    // pokud to neudelame dostaneme error
    const data = yield apply(response, response.json);
    // pomoci put dispatchneme setCurrentUser a predame mu data
    yield put(setCurrentUser(data));
}