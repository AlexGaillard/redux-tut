const {
  createStore,
  compose,
  applyMiddleware,
  bindActionCreators
} = require('./node_modules/redux/dist/redux.js');

const reducer = (state = {count: 1}) => state;

const logEnhancer = (createStore) => (reducer, initialState, enhancer) => {
  const loggedEnhancer = (state, action) => {
    console.log(state, action)
    const newState = reducer(state, action);
    console.log(newState, action)

    return newState;
  };

  return createStore(loggedEnhancer, initialState, enhancer);
};

const store = createStore(reducer, logEnhancer);

store.dispatch({type: 'Hello'});

const monitorMiddleware = (store) => (next) => (action) => {
  const start = performance.now();
  next(action);
  const end = performance.now();
  const diff = end - start;
  console.log(diff);
}

const store = createStore(reducer, applyMiddleware(logMiddleware, monitorMiddleware));