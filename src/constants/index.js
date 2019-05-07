// 通用
export const ENV = process.env.NODE_ENV || 'development';
export const YES = true;
export const NO = false;

export const TEST_AUTHORIZATION = process.env.TEST_AUTHORIZATION;

// 接口地址
const protocol = ENV === 'production' ? location.protocol : 'http:';
export const API_BASE = `${protocol}//${ENV === 'production' ? 'www' : 'test'}.bamaying.com/wechat/api`;

export const mp = ENV === 'production' ? '59a8bbda3725c758a10f256d' : '597b23f98a181021b3119181';

let hostname = '//www.bamaying.com';
if (ENV === 'development') {
  hostname = '//test.bamaying.com';
} else if (ENV === 'staging') {
  hostname = '//test.bamaying.com';
}
hostname = location.protocol + hostname;

// 接口地址
export const HOST_NAME = hostname;

// 接口密钥
export const AK = 'cf1|4c9|c80|bj9|4gg|320|e9h|6i4|484|520|d4g|4gg|aoh|774|2kg|dqh|4kp|9up|5p9|d4g|a54|4gg|9up|774|bcg|320|56h|d4g';
export const SK = 'd4g|56h|484|680|961|7nh|5p9|2h9|5p9|4th|6d1|4gg|774|2uh|b5p|2b1|4p4|9og|5fp|4gg|2b1|56h|ct9|eh4|eh4|2np|320|cm4|680|5p9|abh|2h9|9up|dqh|4kp|9i9|d4g|4c9|7t4|2h9|71p|a54|4kp|d4g';

export const ArrayWeightRemoval = (arr) => {
  let hash = {};
  arr = arr.reduce((item, next) => {
    hash[next.key] ? '' : hash[next.key] = true && item.push(next);
    return item;
  }, []);
  return arr;
};

// 深拷贝
export const DeepCopy = (o, c) => {
  c = c || {};
  for (var i in o) {
    if (typeof o[i] === 'object') {
      //要考虑深复制问题了
      if (o[i].constructor === Array) {
        //这是数组
        c[i] = [];
      } else {
        //这是对象
        c[i] = {};
      }
      DeepCopy(o[i], c[i]);
    } else {
      c[i] = o[i];
    }
  }
  return c;
};

// 深拷贝数组
export const DeepCopyArray = (o, c) => {
  c = c || [];
  for (var i in o) {
    if (typeof o[i] === 'object') {
      //要考虑深复制问题了
      if (o[i].constructor === Array) {
        //这是数组
        c[i] = [];
      } else {
        //这是对象
        c[i] = {};
      }
      DeepCopy(o[i], c[i]);
    } else {
      c[i] = o[i];
    }
  }
  return c;
};

// 判断字符串字符长度
export const fetchStringLength = (str) => {
  let l = str.length;
  let blen = 0;
  for(let i = 0; i <l; i++) {
    if ((str.charCodeAt(i) & 0xff00) != 0) {
      blen ++;
    }
    blen ++;
  }
  return blen;
};

// 兴趣等级提示语
export const levelWords = ['新手入门','初出茅庐','小试牛刀','崭露头角','小有所成','驾轻就熟','游刃有余','大显身手','炉火纯青','登峰造极'];

export const getBase64Image = (img) => {
  let canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  let ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, img.width, img.height);
  let ext = img.src.substring(img.src.lastIndexOf('.')+1).toLowerCase();
  let dataURL = canvas.toDataURL('image/'+ext);
  return dataURL;
};

// 删除数组的某个元素
export const remove = (arr, val) => {
  var index = arr.indexOf(val);
  if (index > -1) {
    arr.splice(index, 1);
  }
};

export const getScrollTop = () => {
  var scrollTop = 0;
  if (document.documentElement && document.documentElement.scrollTop) {
    scrollTop = document.documentElement.scrollTop;
  } else if (document.body) {
    scrollTop = document.body.scrollTop;
  }
  return scrollTop;
};

export const setScrollTop = (top) => {
  if (!isNaN(top)) document.body.scrollTop = top;
};

export const preventBackgroundScroll = (e) => {
  const target = e.currentTarget;
  if (
    (e.deltaY < 0 && target.scrollTop <= 0) ||
    (e.deltaY > 0 && target.scrollHeight - target.clientHeight - target.scrollTop <= 0)
  ) {
    e.stopPropagation();
    e.preventDefault();
  }
};
