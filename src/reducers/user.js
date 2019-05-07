import assign from 'lodash.assign';
import Cookie from '@/utils/cookie';
import history from '@/utils/history';

let signInSignature = function(value) {
  let name = '_webapp_sig';
  if (value === true) {
    Cookie.set(name, '1');
  } else if (value === false) {
    Cookie.set(name, '');
  }
  // bamaying muse sign in flag
  return Cookie.get(name) || '';
};

let isSignedIn = function() {
  return signInSignature() ? true : false;
};

const initialState = assign({
  isLoading: false,
  message: '',
  user: {},
  codeData: {},
  signInData: {},
  isSignedIn: false
});

export const user = function(state, action) {
  switch (action.type) {
    case 'REQUEST_FETCH_MY_INFO':
    case 'REQUEST_USER_SIGN_IN':
      return assign({}, state, { isLoading: true });
    case 'RECEIVE_USER_SIGN_IN':
      if (action.status >= 0 && action.status < 2) {
        if (action.data && action.data.token_type && action.data.access_token) {
          signInSignature(true);
          Cookie.set('access_token', `${action.data.token_type} ${action.data.access_token}`);
        }
        return assign({}, state, {
          message: action.message,
          isLoading: false,
          isSignedIn: isSignedIn(),
          user: action.data
        });
      } else {
        return assign({}, state, {
          message: action.message,
          isLoading: false
        });
      }
    case 'RECEIVE_FETCH_QR_CODE':
      return assign({}, state, {
        message: action.message,
        isLoading: false,
        codeData: action.data || {}
      });
    case 'RECEIVE_FETCH_QR_CODE_SIGN_IN':
      if (action.status >= 0 && action.status < 2) {
        if (action.data && action.data.token_type && action.data.access_token) {
          Cookie.set('access_token', `${action.data.token_type} ${action.data.access_token}`);
        }
        return assign({}, state, {
          message: action.message,
          isLoading: false,
          isSignedIn: true,
          signInData: action.data || {},
        });
      } else {
        return assign({}, state, {
          message: action.message,
          isLoading: false
        });
      }
    case 'RECEIVE_FETCH_MY_INFO':
      var isSignedIn = false;
      if (action.status === 401) {
        Cookie.set('access_token', '');
        isSignedIn = false;
        history.replace('/auth/');
      } else if (action.status === 0){
        isSignedIn = true;
      }
      return assign({}, state, {
        message: action.message,
        isLoading: false,
        isSignedIn,
        user: action.data || {}
      });
    case 'RECEIVE_UPDATE_MY_INFO':
      return assign({}, state, {
        message: action.message,
        isLoading: false
      });
    case 'RECEIVE_USER_SIGN_OUT':
      signInSignature(false);
      Cookie.set('access_token', '');

      return assign({}, state, {
        message: action.message,
        isSignedIn: false
      });
    default:
      return state || initialState;
  }
};
