import { take, all, fork, put, call } from 'redux-saga/effects'
import fetch from 'isomorphic-fetch';

import {
    SET_CART_ITEMS,
    SET_CURRENT_USER,
    SET_ITEM_DETAILS,
    setItemPrice
} from '../actions'

function* fetchItemPrice(id,currency){
    const response = yield fetch(`http://localhost:8081/prices/${currency}/${id}`);
    const json = yield response.json();
    const price = json[0].price;
    // updatujeme price v application state
    yield put(setItemPrice(id,price));
}
export function* itemPriceSaga(){
    // musi byt splneny obe podminky v all
    // vystup je ulozen v array
    const [{user},{items}] = yield all([
        take(SET_CURRENT_USER),
        take(SET_CART_ITEMS)
    ]);
    // por kazdou item chceme ziskat jeji price
    yield items.map(item=>call(fetchItemPrice,item.id,user.country));
}