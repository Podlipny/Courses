import { take, put } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { connect } from '../createSocketConnection';
import {
    setCustomerServiceAvailability
} from '../actions';

export function* customerServiceAvailabilitySaga() {
    const socket = connect();
    const chan = new eventChannel(emit=>{
        const enableSupportMessage = ()=>{
            emit(true)
        };

        const disableSupportMessage = ()=>{
            emit(false)
        };

        // toto ziskavame ze socketu
        socket.on(`SUPPORT_AVAILABLE`,enableSupportMessage);
        socket.on(`SUPPORT_NOT_AVAILABLE`,disableSupportMessage);

        return ()=>{
        // zde by jsme meli nastavit close liseneru
        }
    });

    while (true) {
        // pokazde kdyz channer neco emitne tak to zachytime
        let supportAvailable = yield take(chan);
        yield put(setCustomerServiceAvailability(supportAvailable));
    }
}