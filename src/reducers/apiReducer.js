import assign from 'lodash.assign';

function toArray(ary) {
  if (Array.isArray(ary)) return ary;
  if (ary == null) return [];
  return [ary];
}

// 提取 ID
function extractIds(items) {
  items = toArray(items);
  let ids = {};
  items.forEach(item => ids[item.id] = items.indexOf(item));
  return ids;
}

// 判断是否还有数据
function checkIfHasMore(action, state, data, page, per_page, overwrite) {
  let newFetchedData = action.data || [];
  let isArray = Array.isArray(newFetchedData);
  let dataLength = newFetchedData.length || 0;

  // 如果是第一页, 数组为 true
  if (page <= 1) return isArray ? per_page <= dataLength : false;

  // 如果是数组, 且为覆盖操作, 返回 true
  if (isArray && overwrite) return true;

  // 如果返回结果为数组且包含数据, 但合并后数组数量未增加, 则返回false , 否则返回true
  if (isArray && dataLength) return data.length !== state.data.length;

  // 其他情况, 返回 false
  return false;
}

// 合并新元素, 并替换重复的旧元素
function smartConcat(state, action, overwrite) {
  let ids = {};

  // 如果是覆盖, 直接返回
  if (overwrite) {
    return { ids: extractIds(action.data), data: action.data };
  }

  ids = assign({}, state.ids);

  // 如果是数组, 则
  if (Array.isArray(state.data)) {

    // 判断新数据是否为空, 如果为空, 则直接返回旧数据
    if (!action.data.length) return { data: state.data, ids: state.ids };

    // 合并原数据
    let data = state.data.slice();

    // 遍历新数据组中是否包含已有数据
    toArray(action.data).forEach(function(item) {
      let index = ids[item.id];
      // 如果数据已存在, 暂存
      if (index != null) {
        data[index] = item;
      }
      // 不存在, 则插入到数组中
      else {
        data.push(item);
        ids[item.id] = data.length - 1;
      }
    });

    return { ids, data };
  }
  // 如果非数组, 直接返回
  else {
    return { ids: {}, data: action.data };
  }
}

export default function(apiConfig = {}) {
  const initialState = assign({
    initial: true,
    isLoading: false,
    ids: {},
    data: [],
    hasMore: true,
    message: '',
    params: {},
    metadata: {},
    status: 0
  }, apiConfig.initialState);

  // let dataType = Array.isArray(initialState.data) ? 'array' : 'object';

  const requestState = `REQUEST_${apiConfig.state}`;
  const receiveState = `RECEIVE_${apiConfig.state}`;

  return function(state, action) {
    let overwrite = (action.params || {})._overwrite;
    let page = (action.metadata || {}).page || 1;
    let per_page = (action.metadata || {}).per_page || 10;
    let result;
    let hasMore;
    let isLoading;
    let ids;
    let data;
    let status;

    let { message, params, metadata } = action || {};

    overwrite = overwrite != null ? overwrite : page === 1;

    if (action.type === requestState) {
      let requestState = { isLoading: true };
      return assign({}, state, requestState);
    }

    /* eslint-disable */
    if (action.type === receiveState) {
      result = smartConcat(state, action, overwrite);
      ids = result.ids;
      data = result.data;
      hasMore = checkIfHasMore(action, state, data, page, per_page, overwrite);
      isLoading = false;
      status = action.status || state.status;
      return { initial: false, isLoading, ids, data, hasMore, message, params, metadata, status };
    }

    return state || initialState;
  };
}
