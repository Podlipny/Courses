// IN CONVERSION.js (4.2)

1) Let's show redux in the most simple way possible
    - Reducer Fn
    - Store (state)
    - Action

2) State

// start with just a digit
var defaultState = {
    originAmount: '0.00'
};

3) Reducer
// start with just an increment, no switch statements...

// explain default params
// explain the reducer name. Name doesn't matter...
function amount(state = defaultState, action) { }

//  if we return we don't need a break...
function amount(state = defaultState, action) {
    switch (action.type) {
    case 'CHANGE_ORIGIN_AMOUNT':
    default:
        return state
    }
}

function amount(state = defaultState, action) {
    switch (action.type) {
    case 'CHANGE_ORIGIN_AMOUNT':
	// WRONG WAY
	state.originAmount = action.data.amount; // Show this, then explain that this BREAKS redux, because it'll do ===

	// then show this one
	return Object.assign({}, state, {originAmount: action.data.amount}  )

	// this one last... Object spread...
	return { ...state, originAmount: action.data.amount } // add es7 obj spread?
	// console.log('defaultState === state', defaultState === state) // GOOD STUFF ***

	// console.log('defaultState === state', defaultState === state) // GOOD STUFF ***
	// console.log('same?', Object.assign({}, state, {originAmount: action.data.amount}) === state)
	// this is the the same
    default:
        return state
    }
}


4) Store
var store = createStore(amount);

5) Q: How do we update ?
// store.dispatch({type: 'CHANGE_ORIGIN_AMOUNT', data: {amount: '300'}})

6) How do we listen to updates? get?

store.subscribe(function() {
    console.log('store.getState()', store.getState())
})

//
// Q: Does this even help? Or is it just way more confusing?
//
// Q: What's the simplest way we can show this in this file? THEN we need to move it to another file

// same as createStore = redux.createStore
// roughly the same as var createStore = require('redux').createStore;
// import { createStore } from 'redux';
//
//
// should we consider starting in the same file, then moving it out, then using react-redux?
// We could start with no abstraction, then slowly add one layer at a time, instead of jumping up 4 levels...
// Which is less confusing? Let's try both...

// state could just be a string. Or a number. Doesn't have to be an object...
// Q: Show that first?
// A:  Yes. Show it with no options first...
var defaultState = {
    originAmount: '0.00'
};

// do we care that this isn't immutable?
// We should pause and explain that here...

function amount(state = defaultState, action) {
    console.log('state', state)


    switch (action.type) {
    case 'CHANGE_ORIGIN_AMOUNT':
        console.log('action', action)

        // WRONG WAY
        // state.originAmount = action.data.amount; // Show this, then explain that this BREAKS redux, because it'll do ===
        // console.log('defaultState === state', defaultState === state) // GOOD STUFF ***

        // console.log('defaultState === state', defaultState === state) // GOOD STUFF ***
        // console.log('same?', Object.assign({}, state, {originAmount: action.data.amount}) === state)
        // this is the the same
        return { ...state, originAmount: action.data.amount } // add es7 obj spread?
        // return Object.assign({}, state, {originAmount: action.data.amount}  )
        // return state
    case 'DECREMENT':
        return state - 1
    default:
        return state
    }
}

// use this . This is great. Show it really close to the original. Side by side...
// store.dispatch({type: 'CHANGE_ORIGIN_AMOUNT', data: {amount: '300'}})

var store = createStore(counter);

// whenever dispatch get's called? YEP
store.subscribe(function() {
    console.log('store.getState()', store.getState())
})


// in packages.json
// "babel-preset-stage-3": "^6.24.1", (explain stage 0-4)
// https://babeljs.io/docs/plugins/#presets-stage-x-experimental-presets-


// 4.3  //////////////////////////////////////////////////
// in Main.js

In this section, we'll move 1 state property entirely over to redux...

We want to share the same redux store across many different components. Since it'll
be shared, we should move one level higher, and pass in the redux state as
properties instead of local state...

1) So let's move the redux store 1 level higher. Should it be here? Hm.
Let's create a new file for this.

Explain redux convention. But it isn't required. Nice thing with convention...


DO: Create /store/configureStore.js, and import it...

// Q: how do we read the originAmount from the store, and show it in the UI?

2) in main.js Add store.getState().originAmount to the prop... (for now...)


3) in conversion.js, this.state.originAmount -> this.props.originAmount

Now we see it show up properly...
Q: What about updates?


4) change this.setState(originAmount) to store.dispatch(CHANGE_ORIGIN_AMOUNT)

Q: Does it work? Why not? Open the devtools...

5) We're not subscribing to updates...
ADD the subscribe...

  Then what do we do?

Q: How do we cause the child components to re-render? The best way in React
is to call setState().

So let's call setState() any time there's a change to this redux state...

we can use the parent state, but we don't have to... (let's try both ways)

6) Verify everything works...


  Q: you think this is messy? That's because it is... This subscription is handled
very nicely by react-redux. in the next section we'll swap it out...

  constructor(props) {
    super(props);
    this.state = {
      originAmount: store.getState().originAmount
    }
  }

  componentDidMount() {
    // whenever dispatch get's called? YEP
    store.subscribe(() => {
      console.log('store.getState()', store.getState())
      // calling setState will re-render the child components
      this.setState({originAmount: store.getState().originAmount});
    })

  }

  render() {
    return (
      <div>
        <Conversion originAmount={this.state.originAmount} />
      </div>
    )
  }


2) change state.originAmount to props.originAmount

////////////////////////////////////////////////////////////////////
// 4.4 React-Redux
////////////////////////////////////////////////////////////////////

TODO:
  - Watch the video interview by Dan on React-Redux works?

  High Level
  1) npm install react-redux
  2) Wrap provider with main store in main.js (mention React-Router)
  3) Remove the custom subscription
  4) Wrap with connect
  5) Explain dumb vs smart components
  6) Talk about the docs (VERY END)

"In this section, we will replace our custom redux subscription with the react-redux npm module"

"First, we'll install react-redux"

1) npm install react-redux

"now, let's head over to our main component"

2) Wrap provider with store (show in the devtools what that does)


"first, we need to import what is called a \"provider\"."

"next, we wrap our main component in this provider. Provider is actually a special component, that wraps our \
main components with special functionality. We pass along the store property...".

ReactDOM.render(<Provider store={store}><MainComponent /></Provider>, document.getElementById('container'));
  [in main.js]
  - import provider
    import { Provider } from 'react-redux'
  - add the snippet above

  [browser]
  - show in react tools what this does
    - "Provider is a special component, that wraps MainComponent which additioal functionality"
    - "passes in a dispatch() fn via this.props.dispatch"
    - "tells all the child components what redux store to use. (ref this again later)"

  [in conversion.js]
  - remove 'store' import
  - replace store.dispatch with this.props.dispatch

  [main.js]
3) Remove the custom subscription
  - also remove the originAmount prop

  [browser]
  - show in browser where we are...
  - "we haven't 'connected' the component to redux yet. Let's do that now"

  [conversion.js - TOP]
4) Wrap the export in connect
  - import connect to conversion.js
    import { connect } from 'react-redux'

  [BOTTOM]
  - explain this signature. First is a function that returns a function, that we then call, and pass our component to.
    export default connect()(Conversion);
  - this will "connect" this component to redux.
  - so what arguments do we pass to the first function?

  - connect() first params is a function that if defined will sub you to redux store updates
  - "the fn will be called any time the redux store updates"
  - mapStateToProps(state, [ownProps]): stateProps
    - "bc we wrapped the maincomponent with the provider hoc ( a special component) we now have "state" from the store here"
  - return obj. That will be merged with the components props obj
  - console the 2 params (state, props)
    - add a test prop so it shows up
    - explain why we might want to use the 2nd param...

  [browser] - show it

  - line up mapping
  - add console.log in render for this.props

  [browser] - show it
  "let's head back to the code for some cleanup"

  [conversion.js]
  "now for some cleanup"
  - swap state.originAmount for props.originAmount
  - remove console.log, and fake prop in main.js
  - convert to es6 version

  "just like with our homegrown subscription, we are using this.props.originAmount"

  [browser] - show it all working

  "back to the code"

  x) Q: Why not just use subscribe()?
  - perf etc...
  ```
  "Technically you could write the container components by hand using store.subscribe().
  We don't advise you to do this because React Redux makes many performance optimizations
  that are hard to do by hand.  For this reason, rather than write container components,
  we will generate them using the connect() function provided by React Redux, as you will see below."
  ```



5) Explain dumb vs smart components / Q: Should I connect all my components?

  Q: You may ask yourself: "Should I connect all my components that need redux state?" A: no.

  Q: Should all components be aware of redux? NO. Just the container components...
  Presentation vs container components
  Folder structure? `container/` and `components`?

  - Move the smart component to the container folder
  - Move fees table out to the component folder. (explain that this pays off once you have more... and scales nicely)

6) DOCS: Point people to http://redux.js.org/docs/basics/UsageWithReact.html

  API Explanation:
  https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options

  If you need more... go here...
