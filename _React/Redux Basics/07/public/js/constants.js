import keyMirror from 'keymirror';

export var ActionTypes = keyMirror({
  // UI CHANGES
  CHANGE_ORIGIN_AMOUNT: null,
  CHANGE_DESTINATION_AMOUNT: null,
  CHANGE_ORIGIN_CURRENCY: null,
  CHANGE_DESTINATION_CURRENCY: null,

  // AJAX Calls
  REQUEST_CONVERSION_RATE: null,
  RECEIVED_CONVERSION_RATE_SUCCESS: null,
  RECEIVED_CONVERSION_RATE_FAILURE: null,

  REQUEST_FEES: null,
  RECEIVED_FEES_SUCCESS: null,

  RECEIVED_AJAX_CALL_FAILURE: null,

})

console.log('ActionTypes', ActionTypes);
