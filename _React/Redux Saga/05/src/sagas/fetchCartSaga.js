import { take, put } from 'redux-saga/effects'
import fetch from 'isomorphic-fetch';

import {
    SET_CURRENT_USER,
    setCartItems
} from './../actions';

export function* fetchCartSaga(){
    // cekame dokud neni SET_CURRENT_USER dispatchnuto - pote teprve pokracujeme v tomto threadu
    const { user } = yield take(SET_CURRENT_USER);
    const { id } = user;
    // cekam dokud neni card data nacteno
    const response = yield fetch(`http://localhost:8081/cart/${id}`);
    const { items } = yield response.json();
    // setCartItems("SET_CART_ITEMS","items")(items) -  nejdrive predavame name pomoci action creatoru
    // potom samotna data - action creator je za nas spoji do objektu
    // {type: "SET_CART_ITEMS", items: items(objekt)}
    yield put(setCartItems(items));
    console.info("Set cart items,",items);
}