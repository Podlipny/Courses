import { createStore } from 'redux'

var defaultState = {
    originAmount: '0.00'
};

function amount(state = defaultState, action) {
  console.log('state', state)
    if (action.type === 'CHANGE_ORIGIN_AMOUNT') {
        return {
            ...state,
            originAmount: action.data.newAmount
        }
    }

    return state;
}

var store = createStore(amount);

export default store;
