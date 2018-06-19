import { take, actionChannel, put } from 'redux-saga/effects';

import {
    SET_SHIPPING_FETCH_STATUS,
    setCanCheckOut,
    FETCHED
} from './../actions';

export function* checkoutAvailabilitySaga(){
    // action channel je tu kvuli tomu ze chceme odchtit vsechny action
    const checkoutAvailabilityChannel = yield actionChannel(SET_SHIPPING_FETCH_STATUS);
    while (true) {
        // status se nacte pokazde kdyz se SET_SHIPPING_FETCH_STATUS dispatchne
        // - SET_SHIPPING_FETCH_STATUS dispatchneme pokazde kdyz menime quantity nebo delame cokoliv jineho
        const { status } = yield take(checkoutAvailabilityChannel);
        // podle toho nastavime zda user muse zmacknout checkout button
        yield put(setCanCheckOut(status === FETCHED));
    }
}