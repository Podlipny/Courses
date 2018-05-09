/**
 * Combines all the reducers and exposes them as one data structure.
 */

import { combineReducers } from 'redux';

import amount from './amount';
import error from './error';

export default combineReducers({
    amount: amount,
    error: error
})
