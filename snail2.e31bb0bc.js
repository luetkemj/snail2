// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/symbol-observable/es/ponyfill.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = symbolObservablePonyfill;

function symbolObservablePonyfill(root) {
  var result;
  var Symbol = root.Symbol;

  if (typeof Symbol === 'function') {
    if (Symbol.observable) {
      result = Symbol.observable;
    } else {
      result = Symbol('observable');
      Symbol.observable = result;
    }
  } else {
    result = '@@observable';
  }

  return result;
}

;
},{}],"node_modules/symbol-observable/es/index.js":[function(require,module,exports) {
var global = arguments[3];
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ponyfill = _interopRequireDefault(require("./ponyfill.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global window */
var root;

if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof global !== 'undefined') {
  root = global;
} else if (typeof module !== 'undefined') {
  root = module;
} else {
  root = Function('return this')();
}

var result = (0, _ponyfill.default)(root);
var _default = result;
exports.default = _default;
},{"./ponyfill.js":"node_modules/symbol-observable/es/ponyfill.js"}],"node_modules/redux/es/redux.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applyMiddleware = applyMiddleware;
exports.bindActionCreators = bindActionCreators;
exports.combineReducers = combineReducers;
exports.compose = compose;
exports.createStore = createStore;
exports.__DO_NOT_USE__ActionTypes = void 0;

var _symbolObservable = _interopRequireDefault(require("symbol-observable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */
var randomString = function randomString() {
  return Math.random().toString(36).substring(7).split('').join('.');
};

var ActionTypes = {
  INIT: "@@redux/INIT" + randomString(),
  REPLACE: "@@redux/REPLACE" + randomString(),
  PROBE_UNKNOWN_ACTION: function PROBE_UNKNOWN_ACTION() {
    return "@@redux/PROBE_UNKNOWN_ACTION" + randomString();
  }
};
/**
 * @param {any} obj The object to inspect.
 * @returns {boolean} True if the argument appears to be a plain object.
 */

exports.__DO_NOT_USE__ActionTypes = ActionTypes;

function isPlainObject(obj) {
  if (typeof obj !== 'object' || obj === null) return false;
  var proto = obj;

  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(obj) === proto;
}
/**
 * Creates a Redux store that holds the state tree.
 * The only way to change the data in the store is to call `dispatch()` on it.
 *
 * There should only be a single store in your app. To specify how different
 * parts of the state tree respond to actions, you may combine several reducers
 * into a single reducer function by using `combineReducers`.
 *
 * @param {Function} reducer A function that returns the next state tree, given
 * the current state tree and the action to handle.
 *
 * @param {any} [preloadedState] The initial state. You may optionally specify it
 * to hydrate the state from the server in universal apps, or to restore a
 * previously serialized user session.
 * If you use `combineReducers` to produce the root reducer function, this must be
 * an object with the same shape as `combineReducers` keys.
 *
 * @param {Function} [enhancer] The store enhancer. You may optionally specify it
 * to enhance the store with third-party capabilities such as middleware,
 * time travel, persistence, etc. The only store enhancer that ships with Redux
 * is `applyMiddleware()`.
 *
 * @returns {Store} A Redux store that lets you read the state, dispatch actions
 * and subscribe to changes.
 */


function createStore(reducer, preloadedState, enhancer) {
  var _ref2;

  if (typeof preloadedState === 'function' && typeof enhancer === 'function' || typeof enhancer === 'function' && typeof arguments[3] === 'function') {
    throw new Error('It looks like you are passing several store enhancers to ' + 'createStore(). This is not supported. Instead, compose them ' + 'together to a single function.');
  }

  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState;
    preloadedState = undefined;
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.');
    }

    return enhancer(createStore)(reducer, preloadedState);
  }

  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.');
  }

  var currentReducer = reducer;
  var currentState = preloadedState;
  var currentListeners = [];
  var nextListeners = currentListeners;
  var isDispatching = false;
  /**
   * This makes a shallow copy of currentListeners so we can use
   * nextListeners as a temporary list while dispatching.
   *
   * This prevents any bugs around consumers calling
   * subscribe/unsubscribe in the middle of a dispatch.
   */

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }
  /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */


  function getState() {
    if (isDispatching) {
      throw new Error('You may not call store.getState() while the reducer is executing. ' + 'The reducer has already received the state as an argument. ' + 'Pass it down from the top reducer instead of reading it from the store.');
    }

    return currentState;
  }
  /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * You may call `dispatch()` from a change listener, with the following
   * caveats:
   *
   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
   * If you subscribe or unsubscribe while the listeners are being invoked, this
   * will not have any effect on the `dispatch()` that is currently in progress.
   * However, the next `dispatch()` call, whether nested or not, will use a more
   * recent snapshot of the subscription list.
   *
   * 2. The listener should not expect to see all state changes, as the state
   * might have been updated multiple times during a nested `dispatch()` before
   * the listener is called. It is, however, guaranteed that all subscribers
   * registered before the `dispatch()` started will be called with the latest
   * state by the time it exits.
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */


  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected the listener to be a function.');
    }

    if (isDispatching) {
      throw new Error('You may not call store.subscribe() while the reducer is executing. ' + 'If you would like to be notified after the store has been updated, subscribe from a ' + 'component and invoke store.getState() in the callback to access the latest state. ' + 'See https://redux.js.org/api-reference/store#subscribe(listener) for more details.');
    }

    var isSubscribed = true;
    ensureCanMutateNextListeners();
    nextListeners.push(listener);
    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      if (isDispatching) {
        throw new Error('You may not unsubscribe from a store listener while the reducer is executing. ' + 'See https://redux.js.org/api-reference/store#subscribe(listener) for more details.');
      }

      isSubscribed = false;
      ensureCanMutateNextListeners();
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
    };
  }
  /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param {Object} action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */


  function dispatch(action) {
    if (!isPlainObject(action)) {
      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
    }

    if (typeof action.type === 'undefined') {
      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
    }

    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.');
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    var listeners = currentListeners = nextListeners;

    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      listener();
    }

    return action;
  }
  /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */


  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.');
    }

    currentReducer = nextReducer; // This action has a similiar effect to ActionTypes.INIT.
    // Any reducers that existed in both the new and old rootReducer
    // will receive the previous state. This effectively populates
    // the new state tree with any relevant data from the old one.

    dispatch({
      type: ActionTypes.REPLACE
    });
  }
  /**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/tc39/proposal-observable
   */


  function observable() {
    var _ref;

    var outerSubscribe = subscribe;
    return _ref = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function subscribe(observer) {
        if (typeof observer !== 'object' || observer === null) {
          throw new TypeError('Expected the observer to be an object.');
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }

        observeState();
        var unsubscribe = outerSubscribe(observeState);
        return {
          unsubscribe: unsubscribe
        };
      }
    }, _ref[_symbolObservable.default] = function () {
      return this;
    }, _ref;
  } // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.


  dispatch({
    type: ActionTypes.INIT
  });
  return _ref2 = {
    dispatch: dispatch,
    subscribe: subscribe,
    getState: getState,
    replaceReducer: replaceReducer
  }, _ref2[_symbolObservable.default] = observable, _ref2;
}
/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */


function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */


  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
  } catch (e) {} // eslint-disable-line no-empty

}

function getUndefinedStateErrorMessage(key, action) {
  var actionType = action && action.type;
  var actionDescription = actionType && "action \"" + String(actionType) + "\"" || 'an action';
  return "Given " + actionDescription + ", reducer \"" + key + "\" returned undefined. " + "To ignore an action, you must explicitly return the previous state. " + "If you want this reducer to hold no value, you can return null instead of undefined.";
}

function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
  var reducerKeys = Object.keys(reducers);
  var argumentName = action && action.type === ActionTypes.INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';

  if (reducerKeys.length === 0) {
    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
  }

  if (!isPlainObject(inputState)) {
    return "The " + argumentName + " has unexpected type of \"" + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + "\". Expected argument to be an object with the following " + ("keys: \"" + reducerKeys.join('", "') + "\"");
  }

  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
  });
  unexpectedKeys.forEach(function (key) {
    unexpectedKeyCache[key] = true;
  });
  if (action && action.type === ActionTypes.REPLACE) return;

  if (unexpectedKeys.length > 0) {
    return "Unexpected " + (unexpectedKeys.length > 1 ? 'keys' : 'key') + " " + ("\"" + unexpectedKeys.join('", "') + "\" found in " + argumentName + ". ") + "Expected to find one of the known reducer keys instead: " + ("\"" + reducerKeys.join('", "') + "\". Unexpected keys will be ignored.");
  }
}

function assertReducerShape(reducers) {
  Object.keys(reducers).forEach(function (key) {
    var reducer = reducers[key];
    var initialState = reducer(undefined, {
      type: ActionTypes.INIT
    });

    if (typeof initialState === 'undefined') {
      throw new Error("Reducer \"" + key + "\" returned undefined during initialization. " + "If the state passed to the reducer is undefined, you must " + "explicitly return the initial state. The initial state may " + "not be undefined. If you don't want to set a value for this reducer, " + "you can use null instead of undefined.");
    }

    if (typeof reducer(undefined, {
      type: ActionTypes.PROBE_UNKNOWN_ACTION()
    }) === 'undefined') {
      throw new Error("Reducer \"" + key + "\" returned undefined when probed with a random type. " + ("Don't try to handle " + ActionTypes.INIT + " or other actions in \"redux/*\" ") + "namespace. They are considered private. Instead, you must return the " + "current state for any unknown actions, unless it is undefined, " + "in which case you must return the initial state, regardless of the " + "action type. The initial state may not be undefined, but can be null.");
    }
  });
}
/**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 *
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one. One handy way to obtain
 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */


function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers);
  var finalReducers = {};

  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];

    if ("development" !== 'production') {
      if (typeof reducers[key] === 'undefined') {
        warning("No reducer provided for key \"" + key + "\"");
      }
    }

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }

  var finalReducerKeys = Object.keys(finalReducers); // This is used to make sure we don't warn about the same
  // keys multiple times.

  var unexpectedKeyCache;

  if ("development" !== 'production') {
    unexpectedKeyCache = {};
  }

  var shapeAssertionError;

  try {
    assertReducerShape(finalReducers);
  } catch (e) {
    shapeAssertionError = e;
  }

  return function combination(state, action) {
    if (state === void 0) {
      state = {};
    }

    if (shapeAssertionError) {
      throw shapeAssertionError;
    }

    if ("development" !== 'production') {
      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);

      if (warningMessage) {
        warning(warningMessage);
      }
    }

    var hasChanged = false;
    var nextState = {};

    for (var _i = 0; _i < finalReducerKeys.length; _i++) {
      var _key = finalReducerKeys[_i];
      var reducer = finalReducers[_key];
      var previousStateForKey = state[_key];
      var nextStateForKey = reducer(previousStateForKey, action);

      if (typeof nextStateForKey === 'undefined') {
        var errorMessage = getUndefinedStateErrorMessage(_key, action);
        throw new Error(errorMessage);
      }

      nextState[_key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }

    return hasChanged ? nextState : state;
  };
}

function bindActionCreator(actionCreator, dispatch) {
  return function () {
    return dispatch(actionCreator.apply(this, arguments));
  };
}
/**
 * Turns an object whose values are action creators, into an object with the
 * same keys, but with every function wrapped into a `dispatch` call so they
 * may be invoked directly. This is just a convenience method, as you can call
 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
 *
 * For convenience, you can also pass an action creator as the first argument,
 * and get a dispatch wrapped function in return.
 *
 * @param {Function|Object} actionCreators An object whose values are action
 * creator functions. One handy way to obtain it is to use ES6 `import * as`
 * syntax. You may also pass a single function.
 *
 * @param {Function} dispatch The `dispatch` function available on your Redux
 * store.
 *
 * @returns {Function|Object} The object mimicking the original object, but with
 * every action creator wrapped into the `dispatch` call. If you passed a
 * function as `actionCreators`, the return value will also be a single
 * function.
 */


function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }

  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error("bindActionCreators expected an object or a function, instead received " + (actionCreators === null ? 'null' : typeof actionCreators) + ". " + "Did you write \"import ActionCreators from\" instead of \"import * as ActionCreators from\"?");
  }

  var boundActionCreators = {};

  for (var key in actionCreators) {
    var actionCreator = actionCreators[key];

    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }

  return boundActionCreators;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    keys.push.apply(keys, Object.getOwnPropertySymbols(object));
  }

  if (enumerableOnly) keys = keys.filter(function (sym) {
    return Object.getOwnPropertyDescriptor(object, sym).enumerable;
  });
  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(source, true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(source).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}
/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */


function compose() {
  for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(function (a, b) {
    return function () {
      return a(b.apply(void 0, arguments));
    };
  });
}
/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */


function applyMiddleware() {
  for (var _len = arguments.length, middlewares = new Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  return function (createStore) {
    return function () {
      var store = createStore.apply(void 0, arguments);

      var _dispatch = function dispatch() {
        throw new Error('Dispatching while constructing your middleware is not allowed. ' + 'Other middleware would not be applied to this dispatch.');
      };

      var middlewareAPI = {
        getState: store.getState,
        dispatch: function dispatch() {
          return _dispatch.apply(void 0, arguments);
        }
      };
      var chain = middlewares.map(function (middleware) {
        return middleware(middlewareAPI);
      });
      _dispatch = compose.apply(void 0, chain)(store.dispatch);
      return _objectSpread2({}, store, {
        dispatch: _dispatch
      });
    };
  };
}
/*
 * This is a dummy function to check if the function name has been altered by minification.
 * If the function has been minified and NODE_ENV !== 'production', warn the user.
 */


function isCrushed() {}

if ("development" !== 'production' && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
  warning('You are currently using minified code outside of NODE_ENV === "production". ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or setting mode to production in webpack (https://webpack.js.org/concepts/mode/) ' + 'to ensure you have the correct code for your production build.');
}
},{"symbol-observable":"node_modules/symbol-observable/es/index.js"}],"../../../.nvm/versions/node/v10.16.3/lib/node_modules/parcel-bundler/node_modules/process/browser.js":[function(require,module,exports) {

// shim for using process in browser
var process = module.exports = {}; // cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}

function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}

(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }

  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();

function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  } // if setTimeout wasn't available but was latter defined


  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}

function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  } // if clearTimeout wasn't available but was latter defined


  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}

var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }

  draining = false;

  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }

  if (queue.length) {
    drainQueue();
  }
}

function drainQueue() {
  if (draining) {
    return;
  }

  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;

  while (len) {
    currentQueue = queue;
    queue = [];

    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }

    queueIndex = -1;
    len = queue.length;
  }

  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}

process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);

  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }

  queue.push(new Item(fun, args));

  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
}; // v8 likes predictible objects


function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}

Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};

process.title = 'browser';
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues

process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
  return [];
};

process.binding = function (name) {
  throw new Error('process.binding is not supported');
};

process.cwd = function () {
  return '/';
};

process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};

process.umask = function () {
  return 0;
};
},{}],"node_modules/immer/dist/immer.module.js":[function(require,module,exports) {
var process = require("process");
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isDraft = isDraft;
exports.isDraftable = isDraftable;
exports.original = original;
exports.setUseProxies = exports.setAutoFreeze = exports.produceWithPatches = exports.produce = exports.nothing = exports.immerable = exports.finishDraft = exports.createDraft = exports.applyPatches = exports.Immer = exports.default = void 0;
var obj;
var NOTHING = typeof Symbol !== "undefined" ? Symbol("immer-nothing") : (obj = {}, obj["immer-nothing"] = true, obj);
exports.nothing = NOTHING;
var DRAFTABLE = typeof Symbol !== "undefined" && Symbol.for ? Symbol.for("immer-draftable") : "__$immer_draftable";
exports.immerable = DRAFTABLE;
var DRAFT_STATE = typeof Symbol !== "undefined" && Symbol.for ? Symbol.for("immer-state") : "__$immer_state";

function isDraft(value) {
  return !!value && !!value[DRAFT_STATE];
}

function isDraftable(value) {
  if (!value) {
    return false;
  }

  return isPlainObject(value) || !!value[DRAFTABLE] || !!value.constructor[DRAFTABLE];
}

function isPlainObject(value) {
  if (!value || typeof value !== "object") {
    return false;
  }

  if (Array.isArray(value)) {
    return true;
  }

  var proto = Object.getPrototypeOf(value);
  return !proto || proto === Object.prototype;
}

function original(value) {
  if (value && value[DRAFT_STATE]) {
    return value[DRAFT_STATE].base;
  } // otherwise return undefined

}

var assign = Object.assign || function assign(target, value) {
  for (var key in value) {
    if (has(value, key)) {
      target[key] = value[key];
    }
  }

  return target;
};

var ownKeys = typeof Reflect !== "undefined" && Reflect.ownKeys ? Reflect.ownKeys : typeof Object.getOwnPropertySymbols !== "undefined" ? function (obj) {
  return Object.getOwnPropertyNames(obj).concat(Object.getOwnPropertySymbols(obj));
} : Object.getOwnPropertyNames;

function shallowCopy(base, invokeGetters) {
  if (invokeGetters === void 0) invokeGetters = false;

  if (Array.isArray(base)) {
    return base.slice();
  }

  var clone = Object.create(Object.getPrototypeOf(base));
  ownKeys(base).forEach(function (key) {
    if (key === DRAFT_STATE) {
      return; // Never copy over draft state.
    }

    var desc = Object.getOwnPropertyDescriptor(base, key);
    var value = desc.value;

    if (desc.get) {
      if (!invokeGetters) {
        throw new Error("Immer drafts cannot have computed properties");
      }

      value = desc.get.call(base);
    }

    if (desc.enumerable) {
      clone[key] = value;
    } else {
      Object.defineProperty(clone, key, {
        value: value,
        writable: true,
        configurable: true
      });
    }
  });
  return clone;
}

function each(value, cb) {
  if (Array.isArray(value)) {
    for (var i = 0; i < value.length; i++) {
      cb(i, value[i], value);
    }
  } else {
    ownKeys(value).forEach(function (key) {
      return cb(key, value[key], value);
    });
  }
}

function isEnumerable(base, prop) {
  var desc = Object.getOwnPropertyDescriptor(base, prop);
  return !!desc && desc.enumerable;
}

function has(thing, prop) {
  return Object.prototype.hasOwnProperty.call(thing, prop);
}

function is(x, y) {
  // From: https://github.com/facebook/fbjs/blob/c69904a511b900266935168223063dd8772dfc40/packages/fbjs/src/core/shallowEqual.js
  if (x === y) {
    return x !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
}

function clone(obj) {
  if (!isDraftable(obj)) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(clone);
  }

  var cloned = Object.create(Object.getPrototypeOf(obj));

  for (var key in obj) {
    cloned[key] = clone(obj[key]);
  }

  return cloned;
}

function deepFreeze(obj) {
  if (!isDraftable(obj) || isDraft(obj) || Object.isFrozen(obj)) {
    return;
  }

  Object.freeze(obj);

  if (Array.isArray(obj)) {
    obj.forEach(deepFreeze);
  } else {
    for (var key in obj) {
      deepFreeze(obj[key]);
    }
  }
}
/** Each scope represents a `produce` call. */


var ImmerScope = function ImmerScope(parent) {
  this.drafts = [];
  this.parent = parent; // Whenever the modified draft contains a draft from another scope, we
  // need to prevent auto-freezing so the unowned draft can be finalized.

  this.canAutoFreeze = true; // To avoid prototype lookups:

  this.patches = null;
};

ImmerScope.prototype.usePatches = function usePatches(patchListener) {
  if (patchListener) {
    this.patches = [];
    this.inversePatches = [];
    this.patchListener = patchListener;
  }
};

ImmerScope.prototype.revoke = function revoke$1() {
  this.leave();
  this.drafts.forEach(revoke);
  this.drafts = null; // Make draft-related methods throw.
};

ImmerScope.prototype.leave = function leave() {
  if (this === ImmerScope.current) {
    ImmerScope.current = this.parent;
  }
};

ImmerScope.current = null;

ImmerScope.enter = function () {
  return this.current = new ImmerScope(this.current);
};

function revoke(draft) {
  draft[DRAFT_STATE].revoke();
} // but share them all instead


var descriptors = {};

function willFinalize(scope, result, isReplaced) {
  scope.drafts.forEach(function (draft) {
    draft[DRAFT_STATE].finalizing = true;
  });

  if (!isReplaced) {
    if (scope.patches) {
      markChangesRecursively(scope.drafts[0]);
    } // This is faster when we don't care about which attributes changed.


    markChangesSweep(scope.drafts);
  } // When a child draft is returned, look for changes.
  else if (isDraft(result) && result[DRAFT_STATE].scope === scope) {
      markChangesSweep(scope.drafts);
    }
}

function createProxy(base, parent) {
  var isArray = Array.isArray(base);
  var draft = clonePotentialDraft(base);
  each(draft, function (prop) {
    proxyProperty(draft, prop, isArray || isEnumerable(base, prop));
  }); // See "proxy.js" for property documentation.

  var scope = parent ? parent.scope : ImmerScope.current;
  var state = {
    scope: scope,
    modified: false,
    finalizing: false,
    // es5 only
    finalized: false,
    assigned: {},
    parent: parent,
    base: base,
    draft: draft,
    copy: null,
    revoke: revoke$1,
    revoked: false // es5 only

  };
  createHiddenProperty(draft, DRAFT_STATE, state);
  scope.drafts.push(draft);
  return draft;
}

function revoke$1() {
  this.revoked = true;
}

function source(state) {
  return state.copy || state.base;
} // Access a property without creating an Immer draft.


function peek(draft, prop) {
  var state = draft[DRAFT_STATE];

  if (state && !state.finalizing) {
    state.finalizing = true;
    var value = draft[prop];
    state.finalizing = false;
    return value;
  }

  return draft[prop];
}

function get(state, prop) {
  assertUnrevoked(state);
  var value = peek(source(state), prop);

  if (state.finalizing) {
    return value;
  } // Create a draft if the value is unmodified.


  if (value === peek(state.base, prop) && isDraftable(value)) {
    prepareCopy(state);
    return state.copy[prop] = createProxy(value, state);
  }

  return value;
}

function set(state, prop, value) {
  assertUnrevoked(state);
  state.assigned[prop] = true;

  if (!state.modified) {
    if (is(value, peek(source(state), prop))) {
      return;
    }

    markChanged(state);
    prepareCopy(state);
  }

  state.copy[prop] = value;
}

function markChanged(state) {
  if (!state.modified) {
    state.modified = true;

    if (state.parent) {
      markChanged(state.parent);
    }
  }
}

function prepareCopy(state) {
  if (!state.copy) {
    state.copy = clonePotentialDraft(state.base);
  }
}

function clonePotentialDraft(base) {
  var state = base && base[DRAFT_STATE];

  if (state) {
    state.finalizing = true;
    var draft = shallowCopy(state.draft, true);
    state.finalizing = false;
    return draft;
  }

  return shallowCopy(base);
}

function proxyProperty(draft, prop, enumerable) {
  var desc = descriptors[prop];

  if (desc) {
    desc.enumerable = enumerable;
  } else {
    descriptors[prop] = desc = {
      configurable: true,
      enumerable: enumerable,
      get: function get$1() {
        return get(this[DRAFT_STATE], prop);
      },
      set: function set$1(value) {
        set(this[DRAFT_STATE], prop, value);
      }
    };
  }

  Object.defineProperty(draft, prop, desc);
}

function assertUnrevoked(state) {
  if (state.revoked === true) {
    throw new Error("Cannot use a proxy that has been revoked. Did you pass an object from inside an immer function to an async process? " + JSON.stringify(source(state)));
  }
} // This looks expensive, but only proxies are visited, and only objects without known changes are scanned.


function markChangesSweep(drafts) {
  // The natural order of drafts in the `scope` array is based on when they
  // were accessed. By processing drafts in reverse natural order, we have a
  // better chance of processing leaf nodes first. When a leaf node is known to
  // have changed, we can avoid any traversal of its ancestor nodes.
  for (var i = drafts.length - 1; i >= 0; i--) {
    var state = drafts[i][DRAFT_STATE];

    if (!state.modified) {
      if (Array.isArray(state.base)) {
        if (hasArrayChanges(state)) {
          markChanged(state);
        }
      } else if (hasObjectChanges(state)) {
        markChanged(state);
      }
    }
  }
}

function markChangesRecursively(object) {
  if (!object || typeof object !== "object") {
    return;
  }

  var state = object[DRAFT_STATE];

  if (!state) {
    return;
  }

  var base = state.base;
  var draft = state.draft;
  var assigned = state.assigned;

  if (!Array.isArray(object)) {
    // Look for added keys.
    Object.keys(draft).forEach(function (key) {
      // The `undefined` check is a fast path for pre-existing keys.
      if (base[key] === undefined && !has(base, key)) {
        assigned[key] = true;
        markChanged(state);
      } else if (!assigned[key]) {
        // Only untouched properties trigger recursion.
        markChangesRecursively(draft[key]);
      }
    }); // Look for removed keys.

    Object.keys(base).forEach(function (key) {
      // The `undefined` check is a fast path for pre-existing keys.
      if (draft[key] === undefined && !has(draft, key)) {
        assigned[key] = false;
        markChanged(state);
      }
    });
  } else if (hasArrayChanges(state)) {
    markChanged(state);
    assigned.length = true;

    if (draft.length < base.length) {
      for (var i = draft.length; i < base.length; i++) {
        assigned[i] = false;
      }
    } else {
      for (var i$1 = base.length; i$1 < draft.length; i$1++) {
        assigned[i$1] = true;
      }
    }

    for (var i$2 = 0; i$2 < draft.length; i$2++) {
      // Only untouched indices trigger recursion.
      if (assigned[i$2] === undefined) {
        markChangesRecursively(draft[i$2]);
      }
    }
  }
}

function hasObjectChanges(state) {
  var base = state.base;
  var draft = state.draft; // Search for added keys and changed keys. Start at the back, because
  // non-numeric keys are ordered by time of definition on the object.

  var keys = Object.keys(draft);

  for (var i = keys.length - 1; i >= 0; i--) {
    var key = keys[i];
    var baseValue = base[key]; // The `undefined` check is a fast path for pre-existing keys.

    if (baseValue === undefined && !has(base, key)) {
      return true;
    } // Once a base key is deleted, future changes go undetected, because its
    // descriptor is erased. This branch detects any missed changes.
    else {
        var value = draft[key];
        var state$1 = value && value[DRAFT_STATE];

        if (state$1 ? state$1.base !== baseValue : !is(value, baseValue)) {
          return true;
        }
      }
  } // At this point, no keys were added or changed.
  // Compare key count to determine if keys were deleted.


  return keys.length !== Object.keys(base).length;
}

function hasArrayChanges(state) {
  var draft = state.draft;

  if (draft.length !== state.base.length) {
    return true;
  } // See #116
  // If we first shorten the length, our array interceptors will be removed.
  // If after that new items are added, result in the same original length,
  // those last items will have no intercepting property.
  // So if there is no own descriptor on the last position, we know that items were removed and added
  // N.B.: splice, unshift, etc only shift values around, but not prop descriptors, so we only have to check
  // the last one


  var descriptor = Object.getOwnPropertyDescriptor(draft, draft.length - 1); // descriptor can be null, but only for newly created sparse arrays, eg. new Array(10)

  if (descriptor && !descriptor.get) {
    return true;
  } // For all other cases, we don't have to compare, as they would have been picked up by the index setters


  return false;
}

function createHiddenProperty(target, prop, value) {
  Object.defineProperty(target, prop, {
    value: value,
    enumerable: false,
    writable: true
  });
}

var legacyProxy =
/*#__PURE__*/
Object.freeze({
  willFinalize: willFinalize,
  createProxy: createProxy
});

function willFinalize$1() {}

function createProxy$1(base, parent) {
  var scope = parent ? parent.scope : ImmerScope.current;
  var state = {
    // Track which produce call this is associated with.
    scope: scope,
    // True for both shallow and deep changes.
    modified: false,
    // Used during finalization.
    finalized: false,
    // Track which properties have been assigned (true) or deleted (false).
    assigned: {},
    // The parent draft state.
    parent: parent,
    // The base state.
    base: base,
    // The base proxy.
    draft: null,
    // Any property proxies.
    drafts: {},
    // The base copy with any updated values.
    copy: null,
    // Called by the `produce` function.
    revoke: null
  };
  var ref = Array.isArray(base) ? // [state] is used for arrays, to make sure the proxy is array-ish and not violate invariants,
  // although state itself is an object
  Proxy.revocable([state], arrayTraps) : Proxy.revocable(state, objectTraps);
  var revoke = ref.revoke;
  var proxy = ref.proxy;
  state.draft = proxy;
  state.revoke = revoke;
  scope.drafts.push(proxy);
  return proxy;
}

var objectTraps = {
  get: get$1,
  has: function has(target, prop) {
    return prop in source$1(target);
  },
  ownKeys: function ownKeys(target) {
    return Reflect.ownKeys(source$1(target));
  },
  set: set$1,
  deleteProperty: deleteProperty,
  getOwnPropertyDescriptor: getOwnPropertyDescriptor,
  defineProperty: function defineProperty() {
    throw new Error("Object.defineProperty() cannot be used on an Immer draft"); // prettier-ignore
  },
  getPrototypeOf: function getPrototypeOf(target) {
    return Object.getPrototypeOf(target.base);
  },
  setPrototypeOf: function setPrototypeOf() {
    throw new Error("Object.setPrototypeOf() cannot be used on an Immer draft"); // prettier-ignore
  }
};
var arrayTraps = {};
each(objectTraps, function (key, fn) {
  arrayTraps[key] = function () {
    arguments[0] = arguments[0][0];
    return fn.apply(this, arguments);
  };
});

arrayTraps.deleteProperty = function (state, prop) {
  if (isNaN(parseInt(prop))) {
    throw new Error("Immer only supports deleting array indices"); // prettier-ignore
  }

  return objectTraps.deleteProperty.call(this, state[0], prop);
};

arrayTraps.set = function (state, prop, value) {
  if (prop !== "length" && isNaN(parseInt(prop))) {
    throw new Error("Immer only supports setting array indices and the 'length' property"); // prettier-ignore
  }

  return objectTraps.set.call(this, state[0], prop, value);
}; // returns the object we should be reading the current value from, which is base, until some change has been made


function source$1(state) {
  return state.copy || state.base;
} // Access a property without creating an Immer draft.


function peek$1(draft, prop) {
  var state = draft[DRAFT_STATE];
  var desc = Reflect.getOwnPropertyDescriptor(state ? source$1(state) : draft, prop);
  return desc && desc.value;
}

function get$1(state, prop) {
  if (prop === DRAFT_STATE) {
    return state;
  }

  var drafts = state.drafts; // Check for existing draft in unmodified state.

  if (!state.modified && has(drafts, prop)) {
    return drafts[prop];
  }

  var value = source$1(state)[prop];

  if (state.finalized || !isDraftable(value)) {
    return value;
  } // Check for existing draft in modified state.


  if (state.modified) {
    // Assigned values are never drafted. This catches any drafts we created, too.
    if (value !== peek$1(state.base, prop)) {
      return value;
    } // Store drafts on the copy (when one exists).


    drafts = state.copy;
  }

  return drafts[prop] = createProxy$1(value, state);
}

function set$1(state, prop, value) {
  if (!state.modified) {
    var baseValue = peek$1(state.base, prop); // Optimize based on value's truthiness. Truthy values are guaranteed to
    // never be undefined, so we can avoid the `in` operator. Lastly, truthy
    // values may be drafts, but falsy values are never drafts.

    var isUnchanged = value ? is(baseValue, value) || value === state.drafts[prop] : is(baseValue, value) && prop in state.base;

    if (isUnchanged) {
      return true;
    }

    markChanged$1(state);
  }

  state.assigned[prop] = true;
  state.copy[prop] = value;
  return true;
}

function deleteProperty(state, prop) {
  // The `undefined` check is a fast path for pre-existing keys.
  if (peek$1(state.base, prop) !== undefined || prop in state.base) {
    state.assigned[prop] = false;
    markChanged$1(state);
  } else if (state.assigned[prop]) {
    // if an originally not assigned property was deleted
    delete state.assigned[prop];
  }

  if (state.copy) {
    delete state.copy[prop];
  }

  return true;
} // Note: We never coerce `desc.value` into an Immer draft, because we can't make
// the same guarantee in ES5 mode.


function getOwnPropertyDescriptor(state, prop) {
  var owner = source$1(state);
  var desc = Reflect.getOwnPropertyDescriptor(owner, prop);

  if (desc) {
    desc.writable = true;
    desc.configurable = !Array.isArray(owner) || prop !== "length";
  }

  return desc;
}

function markChanged$1(state) {
  if (!state.modified) {
    state.modified = true;
    state.copy = assign(shallowCopy(state.base), state.drafts);
    state.drafts = null;

    if (state.parent) {
      markChanged$1(state.parent);
    }
  }
}

var modernProxy =
/*#__PURE__*/
Object.freeze({
  willFinalize: willFinalize$1,
  createProxy: createProxy$1
});

function generatePatches(state, basePath, patches, inversePatches) {
  Array.isArray(state.base) ? generateArrayPatches(state, basePath, patches, inversePatches) : generateObjectPatches(state, basePath, patches, inversePatches);
}

function generateArrayPatches(state, basePath, patches, inversePatches) {
  var assign, assign$1;
  var base = state.base;
  var copy = state.copy;
  var assigned = state.assigned; // Reduce complexity by ensuring `base` is never longer.

  if (copy.length < base.length) {
    assign = [copy, base], base = assign[0], copy = assign[1];
    assign$1 = [inversePatches, patches], patches = assign$1[0], inversePatches = assign$1[1];
  }

  var delta = copy.length - base.length; // Find the first replaced index.

  var start = 0;

  while (base[start] === copy[start] && start < base.length) {
    ++start;
  } // Find the last replaced index. Search from the end to optimize splice patches.


  var end = base.length;

  while (end > start && base[end - 1] === copy[end + delta - 1]) {
    --end;
  } // Process replaced indices.


  for (var i = start; i < end; ++i) {
    if (assigned[i] && copy[i] !== base[i]) {
      var path = basePath.concat([i]);
      patches.push({
        op: "replace",
        path: path,
        value: copy[i]
      });
      inversePatches.push({
        op: "replace",
        path: path,
        value: base[i]
      });
    }
  }

  var replaceCount = patches.length; // Process added indices.

  for (var i$1 = end + delta - 1; i$1 >= end; --i$1) {
    var path$1 = basePath.concat([i$1]);
    patches[replaceCount + i$1 - end] = {
      op: "add",
      path: path$1,
      value: copy[i$1]
    };
    inversePatches.push({
      op: "remove",
      path: path$1
    });
  }
}

function generateObjectPatches(state, basePath, patches, inversePatches) {
  var base = state.base;
  var copy = state.copy;
  each(state.assigned, function (key, assignedValue) {
    var origValue = base[key];
    var value = copy[key];
    var op = !assignedValue ? "remove" : key in base ? "replace" : "add";

    if (origValue === value && op === "replace") {
      return;
    }

    var path = basePath.concat(key);
    patches.push(op === "remove" ? {
      op: op,
      path: path
    } : {
      op: op,
      path: path,
      value: value
    });
    inversePatches.push(op === "add" ? {
      op: "remove",
      path: path
    } : op === "remove" ? {
      op: "add",
      path: path,
      value: origValue
    } : {
      op: "replace",
      path: path,
      value: origValue
    });
  });
}

var applyPatches = function (draft, patches) {
  for (var i$1 = 0, list = patches; i$1 < list.length; i$1 += 1) {
    var patch = list[i$1];
    var path = patch.path;
    var op = patch.op;
    var value = clone(patch.value); // used to clone patch to ensure original patch is not modified, see #411

    if (!path.length) {
      throw new Error("Illegal state");
    }

    var base = draft;

    for (var i = 0; i < path.length - 1; i++) {
      base = base[path[i]];

      if (!base || typeof base !== "object") {
        throw new Error("Cannot apply patch, path doesn't resolve: " + path.join("/"));
      } // prettier-ignore

    }

    var key = path[path.length - 1];

    switch (op) {
      case "replace":
        // if value is an object, then it's assigned by reference
        // in the following add or remove ops, the value field inside the patch will also be modifyed
        // so we use value from the cloned patch
        base[key] = value;
        break;

      case "add":
        if (Array.isArray(base)) {
          // TODO: support "foo/-" paths for appending to an array
          base.splice(key, 0, value);
        } else {
          base[key] = value;
        }

        break;

      case "remove":
        if (Array.isArray(base)) {
          base.splice(key, 1);
        } else {
          delete base[key];
        }

        break;

      default:
        throw new Error("Unsupported patch operation: " + op);
    }
  }

  return draft;
};

function verifyMinified() {}

var configDefaults = {
  useProxies: typeof Proxy !== "undefined" && typeof Proxy.revocable !== "undefined" && typeof Reflect !== "undefined",
  autoFreeze: typeof process !== "undefined" ? "development" !== "production" : verifyMinified.name === "verifyMinified",
  onAssign: null,
  onDelete: null,
  onCopy: null
};

var Immer = function Immer(config) {
  assign(this, configDefaults, config);
  this.setUseProxies(this.useProxies);
  this.produce = this.produce.bind(this);
};

exports.Immer = Immer;

Immer.prototype.produce = function produce(base, recipe, patchListener) {
  var this$1 = this; // curried invocation

  if (typeof base === "function" && typeof recipe !== "function") {
    var defaultBase = recipe;
    recipe = base;
    var self = this;
    return function curriedProduce(base) {
      var this$1 = this;
      if (base === void 0) base = defaultBase;
      var args = [],
          len = arguments.length - 1;

      while (len-- > 0) args[len] = arguments[len + 1];

      return self.produce(base, function (draft) {
        return recipe.call.apply(recipe, [this$1, draft].concat(args));
      }); // prettier-ignore
    };
  } // prettier-ignore


  {
    if (typeof recipe !== "function") {
      throw new Error("The first or second argument to `produce` must be a function");
    }

    if (patchListener !== undefined && typeof patchListener !== "function") {
      throw new Error("The third argument to `produce` must be a function or undefined");
    }
  }
  var result; // Only plain objects, arrays, and "immerable classes" are drafted.

  if (isDraftable(base)) {
    var scope = ImmerScope.enter();
    var proxy = this.createProxy(base);
    var hasError = true;

    try {
      result = recipe(proxy);
      hasError = false;
    } finally {
      // finally instead of catch + rethrow better preserves original stack
      if (hasError) {
        scope.revoke();
      } else {
        scope.leave();
      }
    }

    if (result instanceof Promise) {
      return result.then(function (result) {
        scope.usePatches(patchListener);
        return this$1.processResult(result, scope);
      }, function (error) {
        scope.revoke();
        throw error;
      });
    }

    scope.usePatches(patchListener);
    return this.processResult(result, scope);
  } else {
    result = recipe(base);

    if (result === NOTHING) {
      return undefined;
    }

    if (result === undefined) {
      result = base;
    }

    this.maybeFreeze(result, true);
    return result;
  }
};

Immer.prototype.produceWithPatches = function produceWithPatches(arg1, arg2, arg3) {
  var this$1 = this;

  if (typeof arg1 === "function") {
    return function (state) {
      var args = [],
          len = arguments.length - 1;

      while (len-- > 0) args[len] = arguments[len + 1];

      return this$1.produceWithPatches(state, function (draft) {
        return arg1.apply(void 0, [draft].concat(args));
      });
    };
  } // non-curried form


  if (arg3) {
    throw new Error("A patch listener cannot be passed to produceWithPatches");
  }

  var patches, inversePatches;
  var nextState = this.produce(arg1, arg2, function (p, ip) {
    patches = p;
    inversePatches = ip;
  });
  return [nextState, patches, inversePatches];
};

Immer.prototype.createDraft = function createDraft(base) {
  if (!isDraftable(base)) {
    throw new Error("First argument to `createDraft` must be a plain object, an array, or an immerable object"); // prettier-ignore
  }

  var scope = ImmerScope.enter();
  var proxy = this.createProxy(base);
  proxy[DRAFT_STATE].isManual = true;
  scope.leave();
  return proxy;
};

Immer.prototype.finishDraft = function finishDraft(draft, patchListener) {
  var state = draft && draft[DRAFT_STATE];

  if (!state || !state.isManual) {
    throw new Error("First argument to `finishDraft` must be a draft returned by `createDraft`"); // prettier-ignore
  }

  if (state.finalized) {
    throw new Error("The given draft is already finalized"); // prettier-ignore
  }

  var scope = state.scope;
  scope.usePatches(patchListener);
  return this.processResult(undefined, scope);
};

Immer.prototype.setAutoFreeze = function setAutoFreeze(value) {
  this.autoFreeze = value;
};

Immer.prototype.setUseProxies = function setUseProxies(value) {
  this.useProxies = value;
  assign(this, value ? modernProxy : legacyProxy);
};

Immer.prototype.applyPatches = function applyPatches$1(base, patches) {
  // If a patch replaces the entire state, take that replacement as base
  // before applying patches
  var i;

  for (i = patches.length - 1; i >= 0; i--) {
    var patch = patches[i];

    if (patch.path.length === 0 && patch.op === "replace") {
      base = patch.value;
      break;
    }
  }

  if (isDraft(base)) {
    // N.B: never hits if some patch a replacement, patches are never drafts
    return applyPatches(base, patches);
  } // Otherwise, produce a copy of the base state.


  return this.produce(base, function (draft) {
    return applyPatches(draft, patches.slice(i + 1));
  });
};
/** @internal */


Immer.prototype.processResult = function processResult(result, scope) {
  var baseDraft = scope.drafts[0];
  var isReplaced = result !== undefined && result !== baseDraft;
  this.willFinalize(scope, result, isReplaced);

  if (isReplaced) {
    if (baseDraft[DRAFT_STATE].modified) {
      scope.revoke();
      throw new Error("An immer producer returned a new value *and* modified its draft. Either return a new value *or* modify the draft."); // prettier-ignore
    }

    if (isDraftable(result)) {
      // Finalize the result in case it contains (or is) a subset of the draft.
      result = this.finalize(result, null, scope);
      this.maybeFreeze(result);
    }

    if (scope.patches) {
      scope.patches.push({
        op: "replace",
        path: [],
        value: result
      });
      scope.inversePatches.push({
        op: "replace",
        path: [],
        value: baseDraft[DRAFT_STATE].base
      });
    }
  } else {
    // Finalize the base draft.
    result = this.finalize(baseDraft, [], scope);
  }

  scope.revoke();

  if (scope.patches) {
    scope.patchListener(scope.patches, scope.inversePatches);
  }

  return result !== NOTHING ? result : undefined;
};
/**
 * @internal
 * Finalize a draft, returning either the unmodified base state or a modified
 * copy of the base state.
 */


Immer.prototype.finalize = function finalize(draft, path, scope) {
  var this$1 = this;
  var state = draft[DRAFT_STATE];

  if (!state) {
    if (Object.isFrozen(draft)) {
      return draft;
    }

    return this.finalizeTree(draft, null, scope);
  } // Never finalize drafts owned by another scope.


  if (state.scope !== scope) {
    return draft;
  }

  if (!state.modified) {
    this.maybeFreeze(state.base, true);
    return state.base;
  }

  if (!state.finalized) {
    state.finalized = true;
    this.finalizeTree(state.draft, path, scope);

    if (this.onDelete) {
      // The `assigned` object is unreliable with ES5 drafts.
      if (this.useProxies) {
        var assigned = state.assigned;

        for (var prop in assigned) {
          if (!assigned[prop]) {
            this.onDelete(state, prop);
          }
        }
      } else {
        var base = state.base;
        var copy = state.copy;
        each(base, function (prop) {
          if (!has(copy, prop)) {
            this$1.onDelete(state, prop);
          }
        });
      }
    }

    if (this.onCopy) {
      this.onCopy(state);
    } // At this point, all descendants of `state.copy` have been finalized,
    // so we can be sure that `scope.canAutoFreeze` is accurate.


    if (this.autoFreeze && scope.canAutoFreeze) {
      Object.freeze(state.copy);
    }

    if (path && scope.patches) {
      generatePatches(state, path, scope.patches, scope.inversePatches);
    }
  }

  return state.copy;
};
/**
 * @internal
 * Finalize all drafts in the given state tree.
 */


Immer.prototype.finalizeTree = function finalizeTree(root, rootPath, scope) {
  var this$1 = this;
  var state = root[DRAFT_STATE];

  if (state) {
    if (!this.useProxies) {
      // Create the final copy, with added keys and without deleted keys.
      state.copy = shallowCopy(state.draft, true);
    }

    root = state.copy;
  }

  var needPatches = !!rootPath && !!scope.patches;

  var finalizeProperty = function (prop, value, parent) {
    if (value === parent) {
      throw Error("Immer forbids circular references");
    } // In the `finalizeTree` method, only the `root` object may be a draft.


    var isDraftProp = !!state && parent === root;

    if (isDraft(value)) {
      var path = isDraftProp && needPatches && !state.assigned[prop] ? rootPath.concat(prop) : null; // Drafts owned by `scope` are finalized here.

      value = this$1.finalize(value, path, scope); // Drafts from another scope must prevent auto-freezing.

      if (isDraft(value)) {
        scope.canAutoFreeze = false;
      } // Preserve non-enumerable properties.


      if (Array.isArray(parent) || isEnumerable(parent, prop)) {
        parent[prop] = value;
      } else {
        Object.defineProperty(parent, prop, {
          value: value
        });
      } // Unchanged drafts are never passed to the `onAssign` hook.


      if (isDraftProp && value === state.base[prop]) {
        return;
      }
    } // Unchanged draft properties are ignored.
    else if (isDraftProp && is(value, state.base[prop])) {
        return;
      } // Search new objects for unfinalized drafts. Frozen objects should never contain drafts.
      else if (isDraftable(value) && !Object.isFrozen(value)) {
          each(value, finalizeProperty);
          this$1.maybeFreeze(value);
        }

    if (isDraftProp && this$1.onAssign) {
      this$1.onAssign(state, prop, value);
    }
  };

  each(root, finalizeProperty);
  return root;
};

Immer.prototype.maybeFreeze = function maybeFreeze(value, deep) {
  if (deep === void 0) deep = false;

  if (this.autoFreeze && !isDraft(value)) {
    if (deep) {
      deepFreeze(value);
    } else {
      Object.freeze(value);
    }
  }
};

var immer = new Immer();
/**
 * The `produce` function takes a value and a "recipe function" (whose
 * return value often depends on the base state). The recipe function is
 * free to mutate its first argument however it wants. All mutations are
 * only ever applied to a __copy__ of the base state.
 *
 * Pass only a function to create a "curried producer" which relieves you
 * from passing the recipe function every time.
 *
 * Only plain objects and arrays are made mutable. All other objects are
 * considered uncopyable.
 *
 * Note: This function is __bound__ to its `Immer` instance.
 *
 * @param {any} base - the initial state
 * @param {Function} producer - function that receives a proxy of the base state as first argument and which can be freely modified
 * @param {Function} patchListener - optional function that will be called with all the patches produced here
 * @returns {any} a new state, or the initial state if nothing was modified
 */

var produce = immer.produce;
/**
 * Like `produce`, but `produceWithPatches` always returns a tuple
 * [nextState, patches, inversePatches] (instead of just the next state)
 */

exports.produce = produce;
var produceWithPatches = immer.produceWithPatches.bind(immer);
/**
 * Pass true to automatically freeze all copies created by Immer.
 *
 * By default, auto-freezing is disabled in production.
 */

exports.produceWithPatches = produceWithPatches;
var setAutoFreeze = immer.setAutoFreeze.bind(immer);
/**
 * Pass true to use the ES2015 `Proxy` class when creating drafts, which is
 * always faster than using ES5 proxies.
 *
 * By default, feature detection is used, so calling this is rarely necessary.
 */

exports.setAutoFreeze = setAutoFreeze;
var setUseProxies = immer.setUseProxies.bind(immer);
/**
 * Apply an array of Immer patches to the first argument.
 *
 * This function is a producer, which means copy-on-write is in effect.
 */

exports.setUseProxies = setUseProxies;
var applyPatches$1 = immer.applyPatches.bind(immer);
/**
 * Create an Immer draft from the given base state, which may be a draft itself.
 * The draft can be modified until you finalize it with the `finishDraft` function.
 */

exports.applyPatches = applyPatches$1;
var createDraft = immer.createDraft.bind(immer);
/**
 * Finalize an Immer draft from a `createDraft` call, returning the base state
 * (if no changes were made) or a modified copy. The draft must *not* be
 * mutated afterwards.
 *
 * Pass a function as the 2nd argument to generate Immer patches based on the
 * changes that were made.
 */

exports.createDraft = createDraft;
var finishDraft = immer.finishDraft.bind(immer);
exports.finishDraft = finishDraft;
var _default = produce;
exports.default = _default;
},{"process":"../../../.nvm/versions/node/v10.16.3/lib/node_modules/parcel-bundler/node_modules/process/browser.js"}],"node_modules/reselect/es/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultMemoize = defaultMemoize;
exports.createSelectorCreator = createSelectorCreator;
exports.createStructuredSelector = createStructuredSelector;
exports.createSelector = void 0;

function defaultEqualityCheck(a, b) {
  return a === b;
}

function areArgumentsShallowlyEqual(equalityCheck, prev, next) {
  if (prev === null || next === null || prev.length !== next.length) {
    return false;
  } // Do this in a for loop (and not a `forEach` or an `every`) so we can determine equality as fast as possible.


  var length = prev.length;

  for (var i = 0; i < length; i++) {
    if (!equalityCheck(prev[i], next[i])) {
      return false;
    }
  }

  return true;
}

function defaultMemoize(func) {
  var equalityCheck = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultEqualityCheck;
  var lastArgs = null;
  var lastResult = null; // we reference arguments instead of spreading them for performance reasons

  return function () {
    if (!areArgumentsShallowlyEqual(equalityCheck, lastArgs, arguments)) {
      // apply arguments instead of spreading for performance.
      lastResult = func.apply(null, arguments);
    }

    lastArgs = arguments;
    return lastResult;
  };
}

function getDependencies(funcs) {
  var dependencies = Array.isArray(funcs[0]) ? funcs[0] : funcs;

  if (!dependencies.every(function (dep) {
    return typeof dep === 'function';
  })) {
    var dependencyTypes = dependencies.map(function (dep) {
      return typeof dep;
    }).join(', ');
    throw new Error('Selector creators expect all input-selectors to be functions, ' + ('instead received the following types: [' + dependencyTypes + ']'));
  }

  return dependencies;
}

function createSelectorCreator(memoize) {
  for (var _len = arguments.length, memoizeOptions = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    memoizeOptions[_key - 1] = arguments[_key];
  }

  return function () {
    for (var _len2 = arguments.length, funcs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      funcs[_key2] = arguments[_key2];
    }

    var recomputations = 0;
    var resultFunc = funcs.pop();
    var dependencies = getDependencies(funcs);
    var memoizedResultFunc = memoize.apply(undefined, [function () {
      recomputations++; // apply arguments instead of spreading for performance.

      return resultFunc.apply(null, arguments);
    }].concat(memoizeOptions)); // If a selector is called with the exact same arguments we don't need to traverse our dependencies again.

    var selector = memoize(function () {
      var params = [];
      var length = dependencies.length;

      for (var i = 0; i < length; i++) {
        // apply arguments instead of spreading and mutate a local list of params for performance.
        params.push(dependencies[i].apply(null, arguments));
      } // apply arguments instead of spreading for performance.


      return memoizedResultFunc.apply(null, params);
    });
    selector.resultFunc = resultFunc;
    selector.dependencies = dependencies;

    selector.recomputations = function () {
      return recomputations;
    };

    selector.resetRecomputations = function () {
      return recomputations = 0;
    };

    return selector;
  };
}

var createSelector = createSelectorCreator(defaultMemoize);
exports.createSelector = createSelector;

function createStructuredSelector(selectors) {
  var selectorCreator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : createSelector;

  if (typeof selectors !== 'object') {
    throw new Error('createStructuredSelector expects first argument to be an object ' + ('where each property is a selector, instead received a ' + typeof selectors));
  }

  var objectKeys = Object.keys(selectors);
  return selectorCreator(objectKeys.map(function (key) {
    return selectors[key];
  }), function () {
    for (var _len3 = arguments.length, values = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      values[_key3] = arguments[_key3];
    }

    return values.reduce(function (composition, value, index) {
      composition[objectKeys[index]] = value;
      return composition;
    }, {});
  });
}
},{}],"node_modules/redux-devtools-extension/index.js":[function(require,module,exports) {
"use strict";

var compose = require('redux').compose;

exports.__esModule = true;
exports.composeWithDevTools = (
  typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ :
    function() {
      if (arguments.length === 0) return undefined;
      if (typeof arguments[0] === 'object') return compose;
      return compose.apply(null, arguments);
    }
);

exports.devToolsEnhancer = (
  typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ ?
    window.__REDUX_DEVTOOLS_EXTENSION__ :
    function() { return function(noop) { return noop; } }
);

},{"redux":"node_modules/redux/es/redux.js"}],"node_modules/redux-thunk/es/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function createThunkMiddleware(extraArgument) {
  return function (_ref) {
    var dispatch = _ref.dispatch,
        getState = _ref.getState;
    return function (next) {
      return function (action) {
        if (typeof action === 'function') {
          return action(dispatch, getState, extraArgument);
        }

        return next(action);
      };
    };
  };
}

var thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;
var _default = thunk;
exports.default = _default;
},{}],"node_modules/invariant/browser.js":[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';
/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function (condition, format, a, b, c, d, e, f) {
  if ("development" !== 'production') {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;

    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame

    throw error;
  }
};

module.exports = invariant;
},{}],"node_modules/json-stringify-safe/stringify.js":[function(require,module,exports) {
exports = module.exports = stringify
exports.getSerialize = serializer

function stringify(obj, replacer, spaces, cycleReplacer) {
  return JSON.stringify(obj, serializer(replacer, cycleReplacer), spaces)
}

function serializer(replacer, cycleReplacer) {
  var stack = [], keys = []

  if (cycleReplacer == null) cycleReplacer = function(key, value) {
    if (stack[0] === value) return "[Circular ~]"
    return "[Circular ~." + keys.slice(0, stack.indexOf(value)).join(".") + "]"
  }

  return function(key, value) {
    if (stack.length > 0) {
      var thisPos = stack.indexOf(this)
      ~thisPos ? stack.splice(thisPos + 1) : stack.push(this)
      ~thisPos ? keys.splice(thisPos, Infinity, key) : keys.push(key)
      if (~stack.indexOf(value)) value = cycleReplacer.call(this, key, value)
    }
    else stack.push(value)

    return replacer == null ? value : replacer.call(this, key, value)
  }
}

},{}],"node_modules/redux-immutable-state-invariant/dist/isImmutable.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = isImmutableDefault;
function isImmutableDefault(value) {
  return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object' || value === null || typeof value === 'undefined';
}
},{}],"node_modules/redux-immutable-state-invariant/dist/trackForMutations.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = trackForMutations;
function trackForMutations(isImmutable, ignore, obj) {
  var trackedProperties = trackProperties(isImmutable, ignore, obj);
  return {
    detectMutations: function detectMutations() {
      return _detectMutations(isImmutable, ignore, trackedProperties, obj);
    }
  };
}

function trackProperties(isImmutable) {
  var ignore = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var obj = arguments[2];
  var path = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

  var tracked = { value: obj };

  if (!isImmutable(obj)) {
    tracked.children = {};

    for (var key in obj) {
      var childPath = path.concat(key);
      if (ignore.length && ignore.indexOf(childPath.join('.')) !== -1) {
        continue;
      }

      tracked.children[key] = trackProperties(isImmutable, ignore, obj[key], childPath);
    }
  }
  return tracked;
}

function _detectMutations(isImmutable) {
  var ignore = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var trackedProperty = arguments[2];
  var obj = arguments[3];
  var sameParentRef = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  var path = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : [];

  var prevObj = trackedProperty ? trackedProperty.value : undefined;

  var sameRef = prevObj === obj;

  if (sameParentRef && !sameRef && !Number.isNaN(obj)) {
    return { wasMutated: true, path: path };
  }

  if (isImmutable(prevObj) || isImmutable(obj)) {
    return { wasMutated: false };
  }

  // Gather all keys from prev (tracked) and after objs
  var keysToDetect = {};
  Object.keys(trackedProperty.children).forEach(function (key) {
    keysToDetect[key] = true;
  });
  Object.keys(obj).forEach(function (key) {
    keysToDetect[key] = true;
  });

  var keys = Object.keys(keysToDetect);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var childPath = path.concat(key);
    if (ignore.length && ignore.indexOf(childPath.join('.')) !== -1) {
      continue;
    }

    var result = _detectMutations(isImmutable, ignore, trackedProperty.children[key], obj[key], sameRef, childPath);

    if (result.wasMutated) {
      return result;
    }
  }
  return { wasMutated: false };
}
},{}],"node_modules/redux-immutable-state-invariant/dist/index.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = immutableStateInvariantMiddleware;

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _jsonStringifySafe = require('json-stringify-safe');

var _jsonStringifySafe2 = _interopRequireDefault(_jsonStringifySafe);

var _isImmutable = require('./isImmutable');

var _isImmutable2 = _interopRequireDefault(_isImmutable);

var _trackForMutations = require('./trackForMutations');

var _trackForMutations2 = _interopRequireDefault(_trackForMutations);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BETWEEN_DISPATCHES_MESSAGE = ['A state mutation was detected between dispatches, in the path `%s`.', 'This may cause incorrect behavior.', '(http://redux.js.org/docs/Troubleshooting.html#never-mutate-reducer-arguments)'].join(' ');

var INSIDE_DISPATCH_MESSAGE = ['A state mutation was detected inside a dispatch, in the path: `%s`.', 'Take a look at the reducer(s) handling the action %s.', '(http://redux.js.org/docs/Troubleshooting.html#never-mutate-reducer-arguments)'].join(' ');

function immutableStateInvariantMiddleware() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _options$isImmutable = options.isImmutable,
      isImmutable = _options$isImmutable === undefined ? _isImmutable2.default : _options$isImmutable,
      ignore = options.ignore;

  var track = _trackForMutations2.default.bind(null, isImmutable, ignore);

  return function (_ref) {
    var getState = _ref.getState;

    var state = getState();
    var tracker = track(state);

    var result = void 0;
    return function (next) {
      return function (action) {
        state = getState();

        result = tracker.detectMutations();
        // Track before potentially not meeting the invariant
        tracker = track(state);

        (0, _invariant2.default)(!result.wasMutated, BETWEEN_DISPATCHES_MESSAGE, (result.path || []).join('.'));

        var dispatchedAction = next(action);
        state = getState();

        result = tracker.detectMutations();
        // Track before potentially not meeting the invariant
        tracker = track(state);

        result.wasMutated && (0, _invariant2.default)(!result.wasMutated, INSIDE_DISPATCH_MESSAGE, (result.path || []).join('.'), (0, _jsonStringifySafe2.default)(action));

        return dispatchedAction;
      };
    };
  };
}
},{"invariant":"node_modules/invariant/browser.js","json-stringify-safe":"node_modules/json-stringify-safe/stringify.js","./isImmutable":"node_modules/redux-immutable-state-invariant/dist/isImmutable.js","./trackForMutations":"node_modules/redux-immutable-state-invariant/dist/trackForMutations.js"}],"node_modules/redux-starter-kit/dist/redux-starter-kit.esm.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  configureStore: true,
  createAction: true,
  createReducer: true,
  createSerializableStateInvariantMiddleware: true,
  createSlice: true,
  findNonSerializableValue: true,
  getDefaultMiddleware: true,
  getType: true,
  isPlain: true,
  createNextState: true,
  createSelector: true
};
exports.configureStore = configureStore;
exports.createAction = createAction;
exports.createReducer = createReducer;
exports.createSerializableStateInvariantMiddleware = createSerializableStateInvariantMiddleware;
exports.createSlice = createSlice;
exports.findNonSerializableValue = findNonSerializableValue;
exports.getDefaultMiddleware = getDefaultMiddleware;
exports.getType = getType;
exports.isPlain = isPlain;
Object.defineProperty(exports, "createNextState", {
  enumerable: true,
  get: function () {
    return _immer.default;
  }
});
Object.defineProperty(exports, "createSelector", {
  enumerable: true,
  get: function () {
    return _reselect.createSelector;
  }
});

var _redux = require("redux");

Object.keys(_redux).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _redux[key];
    }
  });
});

var _immer = _interopRequireDefault(require("immer"));

var _reselect = require("reselect");

var _reduxDevtoolsExtension = require("redux-devtools-extension");

var _reduxThunk = _interopRequireDefault(require("redux-thunk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}
/**
 * Returns true if the passed value is "plain" object, i.e. an object whose
 * protoype is the root `Object.prototype`. This includes objects created
 * using object literals, but not for instance for class instances.
 *
 * @param {any} value The value to inspect.
 * @returns {boolean} True if the argument appears to be a plain object.
 */


function isPlainObject(value) {
  if (typeof value !== 'object' || value === null) return false;
  var proto = value;

  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(value) === proto;
}
/**
 * Returns true if the passed value is "plain", i.e. a value that is either
 * directly JSON-serializable (boolean, number, string, array, plain object)
 * or `undefined`.
 *
 * @param val The value to check.
 */


function isPlain(val) {
  return typeof val === 'undefined' || val === null || typeof val === 'string' || typeof val === 'boolean' || typeof val === 'number' || Array.isArray(val) || isPlainObject(val);
}

var NON_SERIALIZABLE_STATE_MESSAGE =
/*#__PURE__*/
['A non-serializable value was detected in the state, in the path: `%s`. Value: %o', 'Take a look at the reducer(s) handling this action type: %s.', '(See https://redux.js.org/faq/organizing-state#can-i-put-functions-promises-or-other-non-serializable-items-in-my-store-state)'].join('\n');
var NON_SERIALIZABLE_ACTION_MESSAGE =
/*#__PURE__*/
['A non-serializable value was detected in an action, in the path: `%s`. Value: %o', 'Take a look at the logic that dispatched this action:  %o.', '(See https://redux.js.org/faq/actions#why-should-type-be-a-string-or-at-least-serializable-why-should-my-action-types-be-constants)'].join('\n');

function findNonSerializableValue(value, path, isSerializable, getEntries) {
  if (path === void 0) {
    path = [];
  }

  if (isSerializable === void 0) {
    isSerializable = isPlain;
  }

  var foundNestedSerializable;

  if (!isSerializable(value)) {
    return {
      keyPath: path.join('.') || '<root>',
      value: value
    };
  }

  if (typeof value !== 'object' || value === null) {
    return false;
  }

  var entries = getEntries != null ? getEntries(value) : Object.entries(value);

  for (var _iterator = entries, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
    var _ref;

    if (_isArray) {
      if (_i >= _iterator.length) break;
      _ref = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done) break;
      _ref = _i.value;
    }

    var _ref2 = _ref,
        property = _ref2[0],
        nestedValue = _ref2[1];
    var nestedPath = path.concat(property);

    if (!isSerializable(nestedValue)) {
      return {
        keyPath: nestedPath.join('.'),
        value: nestedValue
      };
    }

    if (typeof nestedValue === 'object') {
      foundNestedSerializable = findNonSerializableValue(nestedValue, nestedPath, isSerializable, getEntries);

      if (foundNestedSerializable) {
        return foundNestedSerializable;
      }
    }
  }

  return false;
}
/**
 * Creates a middleware that, after every state change, checks if the new
 * state is serializable. If a non-serializable value is found within the
 * state, an error is printed to the console.
 *
 * @param options Middleware options.
 */


function createSerializableStateInvariantMiddleware(options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      _options$isSerializab = _options.isSerializable,
      isSerializable = _options$isSerializab === void 0 ? isPlain : _options$isSerializab,
      getEntries = _options.getEntries,
      _options$ignoredActio = _options.ignoredActions,
      ignoredActions = _options$ignoredActio === void 0 ? [] : _options$ignoredActio;
  return function (storeAPI) {
    return function (next) {
      return function (action) {
        if (ignoredActions.length && ignoredActions.indexOf(action.type) !== -1) {
          return next(action);
        }

        var foundActionNonSerializableValue = findNonSerializableValue(action, [], isSerializable, getEntries);

        if (foundActionNonSerializableValue) {
          var keyPath = foundActionNonSerializableValue.keyPath,
              value = foundActionNonSerializableValue.value;
          console.error(NON_SERIALIZABLE_ACTION_MESSAGE, keyPath, value, action);
        }

        var result = next(action);
        var state = storeAPI.getState();
        var foundStateNonSerializableValue = findNonSerializableValue(state, [], isSerializable, getEntries);

        if (foundStateNonSerializableValue) {
          var _keyPath = foundStateNonSerializableValue.keyPath,
              _value = foundStateNonSerializableValue.value;
          console.error(NON_SERIALIZABLE_STATE_MESSAGE, _keyPath, _value, action.type);
        }

        return result;
      };
    };
  };
}

function isBoolean(x) {
  return typeof x === 'boolean';
}
/**
 * Returns any array containing the default middleware installed by
 * `configureStore()`. Useful if you want to configure your store with a custom
 * `middleware` array but still keep the default set.
 *
 * @return The default middleware used by `configureStore()`.
 */


function getDefaultMiddleware(options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      _options$thunk = _options.thunk,
      thunk = _options$thunk === void 0 ? true : _options$thunk,
      _options$immutableChe = _options.immutableCheck,
      immutableCheck = _options$immutableChe === void 0 ? true : _options$immutableChe,
      _options$serializable = _options.serializableCheck,
      serializableCheck = _options$serializable === void 0 ? true : _options$serializable;
  var middlewareArray = [];

  if (thunk) {
    if (isBoolean(thunk)) {
      middlewareArray.push(_reduxThunk.default);
    } else {
      middlewareArray.push(_reduxThunk.default.withExtraArgument(thunk.extraArgument));
    }
  }

  if ("development" !== 'production') {
    /* START_REMOVE_UMD */
    if (immutableCheck) {
      var createImmutableStateInvariantMiddleware = require('redux-immutable-state-invariant')["default"];

      var immutableOptions = {};

      if (!isBoolean(immutableCheck)) {
        immutableOptions = immutableCheck;
      }

      middlewareArray.unshift(createImmutableStateInvariantMiddleware(immutableOptions));
    }
    /* STOP_REMOVE_UMD */


    if (serializableCheck) {
      var serializableOptions = {};

      if (!isBoolean(serializableCheck)) {
        serializableOptions = serializableCheck;
      }

      middlewareArray.push(createSerializableStateInvariantMiddleware(serializableOptions));
    }
  }

  return middlewareArray;
}

var IS_PRODUCTION = "development" === 'production';
/**
 * A friendly abstraction over the standard Redux `createStore()` function.
 *
 * @param config The store configuration.
 * @returns A configured Redux store.
 */

function configureStore(options) {
  var _ref = options || {},
      _ref$reducer = _ref.reducer,
      reducer = _ref$reducer === void 0 ? undefined : _ref$reducer,
      _ref$middleware = _ref.middleware,
      middleware = _ref$middleware === void 0 ? getDefaultMiddleware() : _ref$middleware,
      _ref$devTools = _ref.devTools,
      devTools = _ref$devTools === void 0 ? true : _ref$devTools,
      _ref$preloadedState = _ref.preloadedState,
      preloadedState = _ref$preloadedState === void 0 ? undefined : _ref$preloadedState,
      _ref$enhancers = _ref.enhancers,
      enhancers = _ref$enhancers === void 0 ? undefined : _ref$enhancers;

  var rootReducer;

  if (typeof reducer === 'function') {
    rootReducer = reducer;
  } else if (isPlainObject(reducer)) {
    rootReducer = (0, _redux.combineReducers)(reducer);
  } else {
    throw new Error('"reducer" is a required argument, and must be a function or an object of functions that can be passed to combineReducers');
  }

  var middlewareEnhancer = _redux.applyMiddleware.apply(void 0, middleware);

  var finalCompose = _redux.compose;

  if (devTools) {
    finalCompose = (0, _reduxDevtoolsExtension.composeWithDevTools)(_extends({
      // Enable capture of stack traces for dispatched Redux actions
      trace: !IS_PRODUCTION
    }, typeof devTools === 'object' && devTools));
  }

  var storeEnhancers = [middlewareEnhancer];

  if (Array.isArray(enhancers)) {
    storeEnhancers = [middlewareEnhancer].concat(enhancers);
  } else if (typeof enhancers === 'function') {
    storeEnhancers = enhancers(storeEnhancers);
  }

  var composedEnhancer = finalCompose.apply(void 0, storeEnhancers);
  return (0, _redux.createStore)(rootReducer, preloadedState, composedEnhancer);
}

function createAction(type, prepareAction) {
  function actionCreator() {
    if (prepareAction) {
      var prepared = prepareAction.apply(void 0, arguments);

      if (!prepared) {
        throw new Error('prepareAction did not return an object');
      }

      return _extends({
        type: type,
        payload: prepared.payload
      }, 'meta' in prepared && {
        meta: prepared.meta
      }, {}, 'error' in prepared && {
        error: prepared.error
      });
    }

    return {
      type: type,
      payload: arguments.length <= 0 ? undefined : arguments[0]
    };
  }

  actionCreator.toString = function () {
    return "" + type;
  };

  actionCreator.type = type;

  actionCreator.match = function (action) {
    return action.type === type;
  };

  return actionCreator;
}
/**
 * Returns the action type of the actions created by the passed
 * `createAction()`-generated action creator (arbitrary action creators
 * are not supported).
 *
 * @param action The action creator whose action type to get.
 * @returns The action type used by the action creator.
 */


function getType(actionCreator) {
  return "" + actionCreator;
}
/**
 * A utility function that allows defining a reducer as a mapping from action
 * type to *case reducer* functions that handle these action types. The
 * reducer's initial state is passed as the first argument.
 *
 * The body of every case reducer is implicitly wrapped with a call to
 * `produce()` from the [immer](https://github.com/mweststrate/immer) library.
 * This means that rather than returning a new state object, you can also
 * mutate the passed-in state object directly; these mutations will then be
 * automatically and efficiently translated into copies, giving you both
 * convenience and immutability.
 *
 * @param initialState The initial state to be returned by the reducer.
 * @param actionsMap A mapping from action types to action-type-specific
 *   case redeucers.
 */


function createReducer(initialState, actionsMap) {
  return function (state, action) {
    if (state === void 0) {
      state = initialState;
    } // @ts-ignore createNextState() produces an Immutable<Draft<S>> rather
    // than an Immutable<S>, and TypeScript cannot find out how to reconcile
    // these two types.


    return (0, _immer.default)(state, function (draft) {
      var caseReducer = actionsMap[action.type];
      return caseReducer ? caseReducer(draft, action) : undefined;
    });
  };
}

function getType$1(slice, actionKey) {
  return slice + "/" + actionKey;
} // internal definition is a little less restrictive


function createSlice(options) {
  var name = options.name,
      initialState = options.initialState;

  if (!name) {
    throw new Error('`name` is a required option for createSlice');
  }

  var reducers = options.reducers || {};
  var extraReducers = options.extraReducers || {};
  var reducerNames = Object.keys(reducers);
  var sliceCaseReducersByName = {};
  var sliceCaseReducersByType = {};
  var actionCreators = {};
  reducerNames.forEach(function (reducerName) {
    var maybeReducerWithPrepare = reducers[reducerName];
    var type = getType$1(name, reducerName);
    var caseReducer;
    var prepareCallback;

    if (typeof maybeReducerWithPrepare === 'function') {
      caseReducer = maybeReducerWithPrepare;
    } else {
      caseReducer = maybeReducerWithPrepare.reducer;
      prepareCallback = maybeReducerWithPrepare.prepare;
    }

    sliceCaseReducersByName[reducerName] = caseReducer;
    sliceCaseReducersByType[type] = caseReducer;
    actionCreators[reducerName] = prepareCallback ? createAction(type, prepareCallback) : createAction(type);
  });

  var finalCaseReducers = _extends({}, extraReducers, {}, sliceCaseReducersByType);

  var reducer = createReducer(initialState, finalCaseReducers);
  return {
    name: name,
    reducer: reducer,
    actions: actionCreators,
    caseReducers: sliceCaseReducersByName
  };
}
},{"redux":"node_modules/redux/es/redux.js","immer":"node_modules/immer/dist/immer.module.js","reselect":"node_modules/reselect/es/index.js","redux-devtools-extension":"node_modules/redux-devtools-extension/index.js","redux-thunk":"node_modules/redux-thunk/es/index.js","redux-immutable-state-invariant":"node_modules/redux-immutable-state-invariant/dist/index.js"}],"store/action-types.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MOVE_ENTITY = void 0;
var MOVE_ENTITY = "MOVE_ENTITY";
exports.MOVE_ENTITY = MOVE_ENTITY;
},{}],"store/reducers/entities.reducer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _redux = require("redux");

var _actionTypes = require("../action-types");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  0: {
    x: 10,
    y: 10
  }
};

function _default() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _actionTypes.MOVE_ENTITY:
      {
        var _action$payload = action.payload,
            id = _action$payload.id,
            x = _action$payload.x,
            y = _action$payload.y;

        var entity = _objectSpread({}, state[id], {
          x: x,
          y: y
        });

        return _objectSpread({}, state, _defineProperty({}, id, entity));
      }

    default:
      return state;
  }
}
},{"redux":"node_modules/redux/es/redux.js","../action-types":"store/action-types.js"}],"store/reducers/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _redux = require("redux");

var _entities = _interopRequireDefault(require("./entities.reducer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// rootReducer.js
var rootReducer = (0, _redux.combineReducers)({
  entities: _entities.default
});
var _default = rootReducer;
exports.default = _default;
},{"redux":"node_modules/redux/es/redux.js","./entities.reducer":"store/reducers/entities.reducer.js"}],"store/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reduxStarterKit = require("redux-starter-kit");

var _reducers = _interopRequireDefault(require("./reducers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var store = (0, _reduxStarterKit.configureStore)({
  reducer: _reducers.default
});
var _default = store;
exports.default = _default;
},{"redux-starter-kit":"node_modules/redux-starter-kit/dist/redux-starter-kit.esm.js","./reducers":"store/reducers/index.js"}],"store/actions/entity.actions.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.moveEntity = void 0;

var _actionTypes = require("../action-types");

var moveEntity = function moveEntity(_ref) {
  var id = _ref.id,
      x = _ref.x,
      y = _ref.y;
  return {
    type: _actionTypes.MOVE_ENTITY,
    payload: {
      id: id,
      x: x,
      y: y
    }
  };
};

exports.moveEntity = moveEntity;
},{"../action-types":"store/action-types.js"}],"node_modules/overprint/overprint/char.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const Char = {};
Char.WHITE_SMILING_FACE = '☺';
Char.BLACK_SMILING_FACE = '☻';
Char.BLACK_HEART_SUIT = '♥';
Char.BLACK_DIAMOND_SUIT = '♦';
Char.BLACK_CLUB_SUIT = '♣';
Char.BLACK_SPADE_SUIT = '♠';
Char.BULLET = '•';
Char.INVERSE_BULLET = '◘';
Char.WHITE_CIRCLE = '○';
Char.INVERSE_WHITE_CIRCLE = '◙';
Char.MALE_SIGN = '♂';
Char.FEMALE_SIGN = '♀';
Char.EIGHTH_NOTE = '♪';
Char.BEAMED_EIGHTH_NOTES = '♫';
Char.WHITE_SUN_WITH_RAYS = '☼';
Char.NULL = ' ';
Char.SPACE = ' ';
Char.AMPERSAND = '&';
Char.DOT = '.';
Char.FULL_STOP = '.';
Char.PLUS = '+';
Char.MINUS = '-';
Char.HASH = '#';
Char.DOLLAR = '$';
Char.PERCENT = '%';
Char.CARET = '^';
Char.ASTERISK = '*';
Char.TILDE = '~';
Char.LEFT_PARENS = '(';
Char.RIGHT_PARENS = ')';
Char.LEFT_BRACKET = '[';
Char.RIGHT_BRACKET = ']';
Char.AT = '@';
var _default = Char;
exports.default = _default;
},{}],"node_modules/overprint/overprint/font.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const Font = function (family, weight, size) {
  return {
    family: family || 'monospace',
    weight: weight || 'normal',
    size: size || 16,
    toCSS: function () {
      return this.weight + ' ' + this.size + 'px ' + this.family;
    }
  };
};

var _default = Font;
exports.default = _default;
},{}],"node_modules/overprint/overprint/color.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const Color = {
  BLACK: '#000',
  WHITE: '#fff'
};
var _default = Color;
exports.default = _default;
},{}],"node_modules/overprint/overprint/glyph.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _char = _interopRequireDefault(require("./char"));

var _color = _interopRequireDefault(require("./color"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Glyph = function (character, color, bgColor) {
  return {
    char: character || _char.default.NULL,
    color: color || _color.default.WHITE,
    bgColor: bgColor || _color.default.BLACK
  };
};

var _default = Glyph;
exports.default = _default;
},{"./char":"node_modules/overprint/overprint/char.js","./color":"node_modules/overprint/overprint/color.js"}],"node_modules/overprint/overprint/cell.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _char = _interopRequireDefault(require("./char"));

var _color = _interopRequireDefault(require("./color"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Cell = function (character, foregroundColor, backgroundColor) {
  return {
    character: character || _char.default.NULL,
    foregroundColor: foregroundColor || _color.default.WHITE,
    backgroundColor: backgroundColor || _color.default.BLACK
  };
};

Cell.blank = function (backgroundColor) {
  return Cell(false, false, backgroundColor);
};

var _default = Cell;
exports.default = _default;
},{"./char":"node_modules/overprint/overprint/char.js","./color":"node_modules/overprint/overprint/color.js"}],"node_modules/overprint/overprint/display-state.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function fillArray2D(width, height, fill) {
  const list = new Array(width);

  for (let col = 0; col < width; col++) {
    list[col] = new Array(height);

    for (let row = 0; row < height; row++) {
      list[col][row] = fill;
    }
  }

  return list;
}

class DisplayState {
  constructor(width, height) {
    this._width = width;
    this._height = height;
    this._renderedCells = fillArray2D(width, height, null);
    this._updatedCells = fillArray2D(width, height, null);
    this._dirty = true;
  }

  setCharacter(x, y, character) {
    if (x < 0) return;
    if (x >= this._width) return;
    if (y < 0) return;
    if (y >= this._height) return;
    if (!character) return;

    if (this._renderedCells[x][y].character != character) {
      const foregroundColor = this._updatedCells[x][y].foregroundColor || this._renderedCells[x][y].foregroundColor;
      const backgroundColor = this._updatedCells[x][y].backgroundColor || this._renderedCells[x][y].backgroundColor;
      this._updatedCells[x][y] = {
        character,
        foregroundColor,
        backgroundColor
      };
      this._dirty = true;
    } else {
      this._updatedCells[x][y] = null;
    }
  }

  setCell(x, y, cell) {
    if (x < 0) return;
    if (x >= this._width) return;
    if (y < 0) return;
    if (y >= this._height) return;

    if (this._renderedCells[x][y] !== cell) {
      this._updatedCells[x][y] = cell;
      this._dirty = true;
    } else {
      this._updatedCells[x][y] = null;
    }
  }

  getCell(x, y) {
    if (x < 0) return;
    if (x >= this._width) return;
    if (y < 0) return;
    if (y >= this._height) return;
    return this._updatedCells[x][y] || this._renderedCells[x][y];
  }

  render(callback) {
    if (!this._dirty) return;
    let cell;

    for (let col = 0; col < this._width; col++) {
      for (let row = 0; row < this._height; row++) {
        cell = this._updatedCells[col][row];
        if (cell == null) continue;
        callback(col, row, cell);
        this._renderedCells[col][row] = cell;
        this._updatedCells[col][row] = null;
      }
    }
  }

}

var _default = DisplayState;
exports.default = _default;
},{}],"node_modules/overprint/overprint/text-grid.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _char = _interopRequireDefault(require("./char"));

var _font = _interopRequireDefault(require("./font"));

var _glyph = _interopRequireDefault(require("./glyph"));

var _cell = _interopRequireDefault(require("./cell"));

var _displayState = _interopRequireDefault(require("./display-state"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const defaultSettings = {
  width: 40,
  height: 30,
  font: (0, _font.default)(),
  emptyCell: (0, _cell.default)(),
  isResponsive: false,
  forceSquare: true
};

class TextGrid {
  constructor(canvas, settings) {
    const _settings = Object.assign(defaultSettings, { ...settings
    });

    this._width = _settings.width;
    this._height = _settings.height;
    this._font = _settings.font;
    this._responsive = _settings.isResponsive;
    this._squared = _settings.forceSquare;
    this._emptyCell = _settings.emptyCell;
    this._canvas = canvas;
    this._context = this._canvas.getContext('2d');
    this._context.font = this._font.toCSS();
    this._ratio = window.devicePixelRatio || 1;
    this._display = new _displayState.default(this._width, this._height);
    this.resetLayout();
    this.clear();
  }

  resetLayout() {
    if (this._responsive) {
      // Calculates the dimensions of the containing element first
      if (!this._canvas.style.width) this._canvas.style.width = 640;
      if (!this._canvas.style.height) this._canvas.style.height = 480;

      const elementWidth = parseInt(this._canvas.style.width, 10) * this._ratio;

      const elementHeight = parseInt(this._canvas.style.height, 10) * this._ratio; // Calculates cell width and height based on the containing element


      this._cellWidth = Math.floor(elementWidth / this._width);
      this._cellHeight = Math.floor(elementHeight / this._height); // Force square aspect ratio

      if (this._squared) {
        this._cellWidth = this._cellHeight = Math.max(this._cellWidth, this._cellHeight);
      }

      this._canvas.width = elementWidth;
      this._canvas.height = elementHeight;
    } else {
      // Measure text width from canvas context
      const textMeasure = this._context.measureText("M"); // Canvas measure text with direct multiple of font size


      let textWidth = Math.ceil(textMeasure.width);
      let textHeight = this._font.size; // Force square aspect ratio

      if (this._squared) {
        textWidth = textHeight = Math.max(textWidth, textHeight);
      }

      this._cellWidth = textWidth * this._ratio;
      this._cellHeight = textHeight * this._ratio;
      const drawWidth = textWidth * this._width;
      const drawHeight = textHeight * this._height;
      this._canvas.width = drawWidth * this._ratio;
      this._canvas.height = drawHeight * this._ratio;
      this._canvas.style.width = `${drawWidth}px`;
      this._canvas.style.height = `${drawHeight}px`;
    }

    this._font.size = this._font.size * this._ratio;
    this._context.font = this._font.toCSS();
    this._context.textAlign = 'center';
    this._context.textBaseline = 'middle';
  }

  get width() {
    return this._width;
  }

  get height() {
    return this._height;
  }

  clear() {
    this.fill(this._emptyCell);
  }

  fill(cell) {
    for (let col = 0; col < this._width; col++) {
      for (let row = 0; row < this._height; row++) {
        this._display.setCell(col, row, cell);
      }
    }
  }

  readCell(x, y) {
    return this._display.getCell(x, y);
  }

  writeCell(x, y, cell) {
    this._display.setCell(x, y, cell);
  }

  writeCharacter(x, y, character) {
    this._display.setCharacter(x, y, character);
  }

  render() {
    this._display.render((x, y, cell) => {
      const cellWidth = this._cellWidth;
      const cellHeight = this._cellHeight;
      this._context.fillStyle = cell.backgroundColor;

      this._context.fillRect(x * cellWidth, y * cellHeight, cellWidth, cellHeight);

      if (cell.character == _char.default.NULL) return;
      this._context.fillStyle = cell.foregroundColor;
      const xPos = x * cellWidth + cellWidth / 2;
      const yPos = y * cellHeight + cellHeight / 2;

      this._context.fillText(cell.character, xPos, yPos);
    });
  }

  pxToCell(ev) {
    const bounds = this._canvas.getBoundingClientRect();

    const relativeX = ev.clientX - bounds.left;
    const relativeY = ev.clientY - bounds.top;
    const colPos = Math.trunc(relativeX / this._cellWidth * this._ratio);
    const rowPos = Math.trunc(relativeY / this._cellHeight * this._ratio);
    return [colPos, rowPos];
  }

  onClick(handler) {
    this._canvas.addEventListener('click', ev => {
      const cell = this.pxToCell(ev);
      handler(cell[0], cell[1]);
    });
  }

  onMouseMove(handler) {
    this._canvas.addEventListener('mousemove', ev => {
      const cell = this.pxToCell(ev);
      handler(cell[0], cell[1]);
    });
  }

}

var _default = TextGrid;
exports.default = _default;
},{"./char":"node_modules/overprint/overprint/char.js","./font":"node_modules/overprint/overprint/font.js","./glyph":"node_modules/overprint/overprint/glyph.js","./cell":"node_modules/overprint/overprint/cell.js","./display-state":"node_modules/overprint/overprint/display-state.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _store = _interopRequireDefault(require("./store"));

var _entity = require("./store/actions/entity.actions");

var _textGrid = _interopRequireDefault(require("overprint/overprint/text-grid"));

var _font = _interopRequireDefault(require("overprint/overprint/font"));

var _cell = _interopRequireDefault(require("overprint/overprint/cell"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var canvas = document.querySelector("#game");
var width = 80;
var height = 50; // Create a default text grid from the canvas element

var grid = new _textGrid.default(canvas, {
  width: width,
  height: height,
  font: (0, _font.default)("Menlo", false, 15)
});

var renderScreen = function renderScreen(player) {
  // Predefine a map of cell objects representing text characters
  // with foreground and background colors
  var Cells = {
    Grass: (0, _cell.default)(".", "#37CC63", "#2F3D33"),
    // Sapling: Cell("^", "#A09A2C", "#2F3D33"),
    // Tree: Cell("¥", "#337C22", "#2F3D33"),
    Player: (0, _cell.default)("@", "#aaa", "#2F3D33")
  }; // Fill the entire grid

  grid.fill(Cells.Grass); // Render the filled cells to the canvas

  grid.render(); // write player

  grid.writeCell(player.x, player.y, Cells.Player); // Re-render the cells that changed since the previous render

  grid.render();
};

var action;

function input(key) {
  switch (key) {
    case "ArrowUp":
      action = {
        x: 0,
        y: -1
      };
      break;

    case "ArrowDown":
      action = {
        x: 0,
        y: 1
      };
      break;

    case "ArrowLeft":
      action = {
        x: -1,
        y: 0
      };
      break;

    case "ArrowRight":
      action = {
        x: 1,
        y: 0
      };
      break;
  }
}

document.addEventListener("keydown", function (ev) {
  return input(ev.key);
});

function handleAction(action) {
  var player = _store.default.getState().entities[0];

  console.log({
    player: player,
    action: action
  });
  var mx = Math.min(width - 1, Math.max(0, player.x + action.x));
  var my = Math.min(height - 1, Math.max(0, player.y + action.y));
  var payload = {
    id: 0,
    x: mx,
    y: my
  };
  console.log({
    payload: payload
  });

  _store.default.dispatch((0, _entity.moveEntity)(payload));

  console.log({
    state: _store.default.getState()
  });
}

var playerTurn = true;

function update() {
  if (action && playerTurn) {
    handleAction(action);
    action = null;
    playerTurn = false;
  }

  if (!playerTurn) {
    console.log("not your turn"); // for (let entity of stage.entities) {
    //   if (entity.hasVolition()) {
    //     entity.takeTurn(stage);
    //   }
    // }

    playerTurn = true;
  }
} // const screen = new Screen(canvas, width, height);


function gameLoop() {
  update();
  renderScreen(_store.default.getState().entities[0]);
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
},{"./store":"store/index.js","./store/actions/entity.actions":"store/actions/entity.actions.js","overprint/overprint/text-grid":"node_modules/overprint/overprint/text-grid.js","overprint/overprint/font":"node_modules/overprint/overprint/font.js","overprint/overprint/cell":"node_modules/overprint/overprint/cell.js"}],"../../../.nvm/versions/node/v10.16.3/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "54631" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../.nvm/versions/node/v10.16.3/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/snail2.e31bb0bc.js.map