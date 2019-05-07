// 控制模块初始信息显示

import assign from 'lodash.assign';

const storage = window.localStorage;
let initState = {};
try {
  const tmpStr = storage.getItem('sectionModal');
  if (tmpStr) initState = JSON.parse(tmpStr);
} catch {
  initState = {};
}

const initialState = assign({}, initState);

// action.type action.key
export const sectionModal = function (state = initialState, action) {
  if (action.type === 'HIDE_MODAL') {
    return assign({}, state, { [action.key]: 1 });
  }
  return state;
};
