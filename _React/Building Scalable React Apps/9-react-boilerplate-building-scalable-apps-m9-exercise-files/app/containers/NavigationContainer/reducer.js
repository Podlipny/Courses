/*
 *
 * NavigationContainer reducer
 *
 */

import { fromJS } from 'immutable';
import {
  REQUEST_TOPICS_SUCCEEDED,
  SELECT_TOPIC,
  TOGGLE_DRAWER,
} from './constants';

// jelikoz pouzivame immutableJS, tak muzeme State nastavovat pomoci methody set
const initialState = fromJS({
  topics: [],
  isDrawerOpen: false,
});

function navigationContainerReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_TOPICS_SUCCEEDED:
      return state.set('topics', action.topics);
    case '@@router/LOCATION_CHANGE':
      return state.set('routerLocation', action.payload.pathname);
    case TOGGLE_DRAWER:
      return state.set('isDrawerOpen', !state.get('isDrawerOpen'));
    case SELECT_TOPIC:
      return state.set('selectedTopic', action.topic).set('isDrawerOpen', false);
    default:
      return state;
  }
}

export default navigationContainerReducer;
