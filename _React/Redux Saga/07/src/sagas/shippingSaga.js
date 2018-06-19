import { select, put, takeLatest } from 'redux-saga/effects'
import fetch from 'isomorphic-fetch';

import {
    SET_CART_ITEMS,
    INCREASE_ITEM_QUANTITY,
    DECREASE_ITEM_QUANTITY,
    FETCHED,
    FETCHING,
    setShippingFetchStatus,
    setShippingCost
} from './../actions'

import {
    cartItemsSelector
} from '../selectors'

function* shipping() {
    // rekneme ze fetching shipping status
    yield put(setShippingFetchStatus(FETCHING));
    // vybereme vsechny itemy v kosiku
    const items = yield select(cartItemsSelector);

    // sestavime list ID zaznamu v kosiku
    const itemRequestString = items.reduce((string, item) => {
        for (let i = 0; i < item.get(`quantity`); i++) {
            string += item.get(`id`) + ",";
        }
        return string;
    }, "").replace(/,\s*$/, '');

    console.info("Made item request string", itemRequestString);

    const response = yield fetch(`http://localhost:8081/shipping/${itemRequestString}`);
    // ziskame totalni soucet hodnot v kosiku
    const {total} = yield response.json();
    // nastavime total cenu
    yield put(setShippingCost(total));
    // nastavime FETCHED a tim zmizi busy indicatory (pouze u shipping)
    yield put(setShippingFetchStatus(FETCHED));
}

export function* shippingSaga(){
    // pokud je jedna jedna z akci dispatchnuta dojde k nastartovani shipping procesu,
    // pokud dojde ale k tomu, ze jedna z akci je zavolana a predesla bezi, tak dojde k ukonceni predesle
    // a nastartovani noveho shipping procesu
    yield takeLatest([SET_CART_ITEMS, INCREASE_ITEM_QUANTITY, DECREASE_ITEM_QUANTITY],shipping);
}