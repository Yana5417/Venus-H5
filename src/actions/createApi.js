import fetch from 'isomorphic-fetch';
import sweetAlert from 'sweetalert';
import assign from 'lodash.assign';
import map from 'lodash.map';
import { API_BASE, TEST_AUTHORIZATION, AK, SK, HOST_NAME } from '@/constants';
import Cookie from '@/utils/cookie';
import debug from 'debug';
const log = debug('actions:createApi');

//  🔐 api 加密
import Secure from '@bmw-modules/secure';
import qs from 'query-string';

const sfcc = String.fromCharCode;
const sqrt = Math.sqrt;

function unpack(s) {
  return s.split('|').map(v => sfcc(sqrt(parseInt(v, 32)))).join('');
}

let secure = new Secure({
  publicKey: unpack(AK),
  privateKey: unpack(SK)
});

// 去除无效的键值对
function removeEmptyPair(obj) {
  obj = obj || {};
  let _obj = {};
  map(obj, (val, key) => {
    if (val !== undefined &&
        val !== '' &&
        val !== null
    ) _obj[key] = val;
  });
  return _obj;
}

// 用于替换接口 url 中的参数，比如：
//   path = '/category/:id/posts'
//   params = { id: 5, tag: 'kid' }
//   => '/category/5/posts?tag=kid'
//   => {}
function assembleUrl(path = '', params = {}, method = 'GET') {
  path = path || '';
  params = params || {};
  params = removeEmptyPair(params);
  method = method.toLowerCase();

  map(params, (val, key) => {
    let _path = path.replace(`:${key}`, val);

    if (_path === path) {
      if (method === 'get') {
        if (_path.indexOf('?') === -1) {
          _path = `${_path}?${key}=${val}`;
        } else {
          _path = `${_path}&${key}=${val}`;
        }
        delete params[key];
      }
    } else {
      delete params[key];
    }

    path = _path;
  });

  return path.indexOf(API_BASE) !== -1 ? path : `${API_BASE}${path}`;
}

// 接口辅助方法, 返回 接口 操作 action
// _state 将会覆盖默认的 state
export default function createApi(options = {}) {

  // 接口数据解析
  function formatter(data = {}) {
    return {
      status: data.status || 0,
      data: data.data || {},
      message: data.message || '',
      metadata: data.metadata || {}
    };
  }

  // 请求数据
  function request(params = {}) {
    return {
      message: `${options.message || '数据加载'}中...`,
      type: `REQUEST_${params._state || options.state}`,
      params
    };
  }

  // 收到数据
  function receive(params = {}, data = {}) {
    let res = assign({
      type: `RECEIVE_${params._state || options.state}`,
      params,
      receivedAt: new Date()
    }, formatter(data));

    // 覆盖接口信息
    if (options.message && res.status <= 0) {
      if (res.status === 0) {
        res.message = `${options.message}成功！`;
      } else {
        res.message = `${options.message}失败！`;
      }
    }

    return res;
  }

  // 登出用户操作
  function signOutUser() {
    return receive({
      _state: 'USER_SIGN_OUT',
      status: 2,
      message: '未登录或登录已超时'
    });
  }

  // 接口逻辑
  return function (params = {}, headers = {}, settings = {}) {
    // 返回 dispatcher
    return async function (dispatch) {

      // 处理接口状态返回
      function handleStatus(status, message) {
        switch (status) {
          case 401:
            dispatch(signOutUser());
            break;
          case 422:
            sweetAlert({
              title: '出错啦',
              text: message || '参数错误',
              type: 'error'
            });
            break;
          case 1:
            sweetAlert({
              title: '成功',
              text: message || '请求成功',
              type: 'success',
              buttons: false,
              timer: 1000
            });
            break;
          case 2:
            sweetAlert({
              title: '出错啦',
              text: message || '请求失败',
              type: 'error',
              buttons: false,
              timer: 2000
            });
            break;
        }
      }

      // 解析接口请求结果
      async function asJSON(res) {
        if (!res) return;

        if (res.status === 401 || res.status === 418) {
          dispatch(signOutUser());
          return {
            status: 401,
            message: '登陆信息已过期'
          };
        }

        if (res.status === 204 && res.statusText === 'No Content') {
          return {
            status: 204,
            message: '数据获取成功'
          };
        }

        return await res.json();
      }

      // 请求数据
      dispatch(request(params));

      const isFormData = window.FormData && params instanceof window.FormData;
      const method = (options.method || 'get').toUpperCase();
      const Authorization = Cookie.get('access_token') || TEST_AUTHORIZATION || '';
      let _headers = assign({}, options.headers, headers);

      let data = params;

      // 处理加密
      let accessToken = Cookie.get('access_token');

      // 拼接接口地址
      let url = assembleUrl(options.url, data, method);

      if (accessToken) {
        headers = assign({
          'Authorization': accessToken,
          'Access-Token': accessToken
        }, headers);
      }

      if (!(data instanceof FormData)) {
        headers['Content-Type'] = 'application/json';
      }

      let ajaxSettings = assign({}, settings, {
        method: method,
        credentials: 'include',
        headers: headers
      });
      if (method !== 'GET' && method !== 'HEAD') {
        ajaxSettings.body = data instanceof FormData ? data : JSON.stringify(data);
      }

      let timestamp = (new Date()).toISOString();

      let qs_search = {};
      let path = url.replace(HOST_NAME, '');
      let index = path.indexOf('?');

      if (~index) path = path.substring(0, index);

      let search = url.substring(url.indexOf('?'));
      if (~index) qs_search = qs.parse(search);
      let ajaxbody = ajaxSettings.body || '{}';
      if (data instanceof FormData) {
        qs_search = Object.assign({}, qs_search);
      } else {
        qs_search = Object.assign({}, qs_search, JSON.parse(ajaxbody));
      }


      if (Authorization) _headers = assign({ Authorization }, _headers);
      if (!isFormData) _headers['Content-Type'] = 'application/json';
      _headers['X-Timestamp'] = timestamp;
      _headers['X-Signature'] = secure.sign(method, path, timestamp, qs_search);

      // 添加 csrf 支持
      let csrfParam = Cookie.get('csrf_param');
      let csrfToken = Cookie.get('csrf_token');
      if (csrfParam) {
        if (~['PUT', 'POST', 'DELETE'].indexOf(method)) {
          // 表单数据
          if (isFormData) {
            params.append(csrfParam, csrfToken);
          }
          // JSON 数据
          else {
            params = assign({ [csrfParam]: csrfToken }, params);
          }
        }
      }

      // Ajax 请求配置
      let _settings = assign({}, settings, {
        method,
        credentials: 'include',
        headers: _headers
      });

      // 请求参数
      if (method !== 'GET' && method !== 'HEAD') {
        _settings.body = isFormData ? params : JSON.stringify(params);
      }

      try {
        // 执行请求
        let res = await fetch(url, _settings);
        let data = await asJSON(res);

        dispatch(receive(params, data));
        handleStatus(data.status, data.message);

        return data;
      } catch (e) {
        log(e, e.stack);
        dispatch(receive(params, {
          status: 500,
          data: {},
          message: '请求错误',
          metadata: {}
        }));
      }
    };
  };
}
