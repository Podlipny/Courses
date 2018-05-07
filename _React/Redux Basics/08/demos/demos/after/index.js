// logger middleware
function logger(store) {

  var getState = store.getState;

  return function (next) {

    return function (action) {
      console.log('will dispatch', action);

      // Call the next dispatch method in the middleware chain.
      var returnValue = next(action);

      console.log('state after dispatch', getState());

      // This will likely be the action itself, unless
      // a middleware further in chain changed it.
      return returnValue;
    };
  };
}



var defaultAppleState = 0;

function apple(state = defaultAppleState, action) {
  if (action.type === 'INCREMENT') {
    return state + 1;
  }

  return state;
}

var defaultOrangeState = 10;

function orange(state = defaultOrangeState, action) {
  if (action.type === 'EAT_ORANGE') {
    return state - 1;
  }

  return state;
}

var rootReducer = combineReducers({
  apple: apple,
  orange: orange
})

var store = createStore(
  rootReducer,
  applyMiddleware(logger)
);

var unsub = store.subscribe(function() {
  console.log('STATE UPDATED', store.getState());
})

console.log('state:before', store.getState());
store.dispatch({type: 'INCREMENT'});
console.log('state:after', store.getState());

unsub();
store.dispatch({type: 'INCREMENT'});



function createStore(reducer, enhancer) {

  if (typeof enhancer === "function") {
    return enhancer(createStore)(reducer);
  }

  var state;
  var subscriptions = [];

  var obj = {
    getState: function() {
      return state;
    },
    dispatch: function(action) {
      // call the reducer
      state = reducer(state, action);
      // call the subscribed fns
      subscriptions.forEach(function(fn){
	fn();
      })

      return action;
    },
    subscribe: function(fn) {
      // subscribe the fn
      subscriptions.push(fn);
      // returns an unsubscribe function
      return function unsubscribe() {
	// find listener fn in sub array and remove it
	var index = subscriptions.indexOf(fn);
	subscriptions.splice(index, 1);
      }
    }
  }

  obj.dispatch({type: 'REDUX_INIT'});
  return obj;
}


function combineReducers(stateTree) {
  var keys = Object.keys(stateTree);

  return function rootReducer(state = {}, action) {
    for (var i=0; i < keys.length; i++) {
      var key = keys[i];
      var reducer = stateTree[key];
      var subState = state[key];

      state[key] = reducer(subState, action);
    }

    return state;
  }
}


function applyMiddleware(...fns) {

  return function(createStore) {

    return function(reducer) {
      var store = createStore(reducer);
      var oldDispatch = store.dispatch;

      // modify dispatch
      store.dispatch = fns.reduceRight(function(prev, curr) {
	return curr(store)(prev); // ie: dispatch = logger(store)(oldDispatch)
      }, oldDispatch)

      return store;
    }
  }

}
