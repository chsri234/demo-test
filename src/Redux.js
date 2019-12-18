import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

const GET_USERS_STARTED = "GET_USERS_STARTED";
const GET_USERS_SUCCESS = "GET_USERS_SUCCESS";
const GET_USERS_FAILED = "GET_USERS_FAILED";

export function getUsersStarted() {
  return {
    type: GET_USERS_STARTED
  };
}

export function getUsersSuccess(users) {
  return {
    type: GET_USERS_SUCCESS,
    users
  };
}

export function getUsersFailed(error) {
  return {
    type: GET_USERS_FAILED,
    error
  };
}

let userInitialState = { loaded: false, error: false, users: [] };

const users = (state = userInitialState, action) => {
  switch (action.type) {
    case GET_USERS_STARTED:
      return {
        loading: true,
        error: false,
        users: []
      };
    case GET_USERS_SUCCESS:
      return {
        loading: false,
        error: false,
        users: action.users
      };
    case GET_USERS_FAILED:
      return {
        loading: false,
        error: true,
        users: []
      };
    default:
      return state;
  }
};

// Thunk action
export function getUsers() {
  return dispatch => {
    dispatch(getUsersStarted());
    fetch("http://localhost:3000/Users")
      .then(response => response.json())
      .then(users => {
        dispatch(getUsersSuccess(users));
      })
      .catch(err => {
        dispatch(getUsersFailed(err));
      });
  };
}

const LOGIN_STARTED = "LOGIN_STARTED";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_FAILED = "LOGIN_FAILED";

export function loginStarted() {
  return {
    type: LOGIN_STARTED
  };
}

export function loginSuccess(loginStatus) {
  return {
    type: LOGIN_SUCCESS,
    loginStatus
  };
}

export function loginFailed(error) {
  return {
    type: LOGIN_FAILED,
    error
  };
}

let loginInitialState = { loaded: false, error: false, loginStatus: false };

const login = (state = loginInitialState, action) => {
    console.log(action)
  switch (action.type) {
    case LOGIN_STARTED:
      return {
        loading: true,
        error: false,
        loginStatus: false
      };
    case LOGIN_SUCCESS:
      return {
        loading: false,
        error: false,
        loginStatus: action.loginStatus
       
      };
    case LOGIN_FAILED:
      return {
        loading: false,
        error: true,
        loginStatus: false
        
      };
    default:
      return state;
  }
};

// Thunk action
export function verifyLogin(username,password) {
  return dispatch => {
    dispatch(loginStarted());
    fetch("http://localhost:3000/Login", {

        method: 'GET', // This must be POST in real
        // headers: {
        //   'Accept': 'application/json',
        //   'Content-Type': 'application/json'
        // },
        // body: JSON.stringify({username: username, password: password})
      })
      .then(response => response.json())
      .then(user => {
          if(user.username == username && user.password == password) {
              dispatch(loginSuccess(true));
          } else {
              dispatch(loginFailed('Error'));
          }
      })
      .catch(err => {
        dispatch(loginFailed(err));
      });
  };
}


export const store = createStore(combineReducers({users, login}), applyMiddleware(thunk));
