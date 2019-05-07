// 第三方依赖
import 'core-js';
// import '@babel/polyfill';
import 'es6-shim';
import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

// 初始化以及依赖
import 'normalize.css';
import '@/assets/styles';
import '@/utils/logger';
import store from '@/store';
import history from '@/utils/history';

// 页面
import BasicLayout from './layouts/BasicLayout';


// 报错相关
import NotFound from '@/containers/Errors/NotFound';

/* 404 页面显示 */
/* 参考: https://github.com/ReactTraining/react-router/issues/4698#issuecomment-314419439 */
const RouteNotFound = () => <Redirect to={{ state: { notFoundError: true } }} />;
const CaptureRouteNotFound = withRouter(({ children, location }) => {
  return location && location.state && location.state.notFoundError ? <NotFound /> : children;
});

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <CaptureRouteNotFound>
            <Switch>
              <Route path='/' component={BasicLayout} />
              <RouteNotFound />
            </Switch>
          </CaptureRouteNotFound>
        </Router>
      </Provider>
    );
  }
}

ReactDom.render( <App /> , document.getElementById('app'));