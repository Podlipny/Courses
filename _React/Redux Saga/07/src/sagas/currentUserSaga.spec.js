import fetch from 'isomorphic-fetch';
import { take, call, put, apply } from 'redux-saga/effects'

import {
    GET_CURRENT_USER_INFO,
    setCurrentUser
} from './../actions'

import { currentUserSaga } from './currentUserSaga'

describe("The current user saga",()=>{
    test("It fetches and puts the current user's data",()=>{
        const id = `NCC1701`;
        const user = {name:"Jean Luc"};
        const json = ()=>{};
        const response = {json};
        const gen = currentUserSaga();

        // timto mockujeme API
        expect(gen.next().value).toEqual(take(GET_CURRENT_USER_INFO));
        expect(gen.next({id}).value).toEqual(call(fetch,`http://localhost:8081/user/${id}`));
        // cekame ze se nam v currentUserSaga vrati response, proto ji pomoci next podstrcime
        expect(gen.next(response).value).toEqual(apply(response,json));
        // cekame ze pokud predame v next usera, tak dojde k PUT put(setCurrentUser(user))
        expect(gen.next(user).value).toEqual(put(setCurrentUser(user))); 

    });
});