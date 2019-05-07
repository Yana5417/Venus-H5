import createApi from './createApi';

// 上传图片
export const uploadImage = createApi({
  method: 'post',
  url: '/resources/upload_image',
  state: 'UPLOAD_IMAGE'
});

// 用户登录
export const userSignIn = createApi({
  method: 'post',
  url: '/users/sign_in/',
  state: 'USER_SIGN_IN'
});

// 用户登出
export const userSignOut = createApi({
  method: 'delete',
  url: '/users/sign_out/',
  state: 'USER_SIGN_OUT'
});

// 用户信息
export const fetchMyInfo = createApi({
  method: 'get',
  url: '/users/me/',
  state: 'FETCH_MY_INFO'
});

// 用户信息更新
export const updateMyInfo = createApi({
  method: 'put',
  url: '/users/me/',
  state: 'UPDATE_MY_INFO'
});

// 获取扫码登录二维码及登录 code
export const fetchQRCode = createApi({
  method: 'post',
  url: '/scan_sign_in',
  state: 'FETCH_QR_CODE'
});

// 根据 code 查询是否扫码登录，如登录，返回用户 id 及 token 相关信息
export const fetchQRCodeSignIn = createApi({
  method: 'post',
  url: '/scan_sign_in_callback',
  state: 'FETCH_QR_CODE_SIGN_IN'
});

// 判断当前宝贝简历模块状态
export const fetchBabySection = createApi({
  method: 'get',
  url: '/baby_resume/baby_resumes/section/',
  state: 'FETCH_BABY_SECTION'
});

// 判断当前宝贝简历模块状态
export const updateBabySection = createApi({
  method: 'put',
  url: '/baby_resume/baby_resumes/status/',
  state: 'UPDATE_BABY_SECTION'
});

/* 兴趣模块相关接口 */

// 创建我的兴趣模块
export const createBabyInterest = createApi({
  method: 'post',
  url: '/baby_resume/baby_interests/',
  state: 'CREADTE_BABY_INTERESTS'
});

// 更新我的兴趣模块
export const updateBabyInterest = createApi({
  method: 'put',
  url: '/baby_resume/baby_interests/',
  state: 'UPDATE_BABY_INTEREST'
});

// 获取兴趣模块详情
export const fetchBabyInterestDetail = createApi({
  method: 'get',
  url: '/baby_resume/baby_interests/:id',
  state: 'FETCH_BABY_INTEREST_DETAIL'
});

// 获取所有的兴趣标签
export const fetchBabyInterestTags = createApi({
  method: 'get',
  url: '/baby_resume/baby_interests/tags/',
  state: 'FETCH_BABY_INTEREST_TAGS'
});

// 创建兴趣记录
export const createBabyInterestRecords = createApi({
  method: 'post',
  url: '/baby_resume/baby_interest_records/',
  state: 'CREADTE_BABY_INTERESTS_RECOTD'
});

// 更新兴趣记录
export const updateBabyInterestRecords = createApi({
  method: 'put',
  url: '/baby_resume/baby_interest_records/',
  state: 'UPDATE_BABY_INTERESTS_RECOTD'
});

// 删除兴趣记录
export const deleteBabyInterestRecords = createApi({
  method: 'delete',
  url: '/baby_resume/baby_interest_records/',
  state: 'DELETE_BABY_INTERESTS_RECOTD'
});

/*  我的阅读相关接口  */

// 获取童书库中所有童书
export const fetchBooks = createApi({
  method: 'get',
  url: '/books/',
  state: 'FETCH_BOOKS'
});

// 童书初始筛选项
export const fetchBabyReadInfo = createApi({
  method: 'get',
  url: '/baby_resume/baby_reads/info',
  state: 'FETCH_BASE_BABY_READS'
});

// 创建我的阅读模块
export const createBabyRead = createApi({
  method: 'post',
  url: '/baby_resume/baby_reads/',
  state: 'CREADTE_BABY_READS'
});

// 更新我的阅读模块
export const updateBabyRead = createApi({
  method: 'put',
  url: '/baby_resume/baby_reads/',
  state: 'UPDATE_BABY_READS'
});

// 获取阅读模块详情
export const fetchBabyRead = createApi({
  method: 'get',
  url: '/baby_resume/baby_reads/:id',
  state: 'FETCH_BABY_READS'
});

// 从用户书单同步数据，只增加，不删除
export const updateBabyReadSynn = createApi({
  method: 'get',
  url: '/baby_resume/baby_reads/synn_from/',
  state: 'UPDATE_BABY_READS_SYNN'
});

// 同步书至用户书单，只增加，不删除
export const updateBabyReadSync = createApi({
  method: 'get',
  url: '/baby_resume/baby_reads/sync_to/',
  state: 'UPDATE_BABY_READS_SYNC'
});

/*     我的家庭     */

// 创建我的家庭模块
export const createBabyFamily = createApi({
  method: 'post',
  url: '/baby_resume/baby_families/',
  state: 'CREATE_BABY_FAMILY'
});

// 更新我的家庭模块
export const updateBabyFamily = createApi({
  method: 'put',
  url: '/baby_resume/baby_families/',
  state: 'UPDATE_BABY_FAMILY'
});

// 获取家庭模块详情
export const fetchBabyFamilyDetail = createApi({
  method: 'get',
  url: '/baby_resume/baby_families/:id',
  state: 'FETCH_BABY_FAMILY_DETAIL'
});

/* 我的足迹 */

// 创建我的简历足迹模块
// child = 孩子id & title=自定义标题 & regions=地区id数组 & category=china / world
export const createBabyFootprint = createApi({
  method: 'post',
  url: '/baby_resume/baby_footprints',
  state: 'CREATE_BABY_FOOTPRINT'
});

// 更新我的简历足迹模块
// child=孩子id &title=自定义标题 &regions=地区id数组 &id=足迹模块id
export const updateBabyFootprint = createApi({
  method: 'put',
  url: '/baby_resume/baby_footprints',
  state: 'UPDATE_BABY_FOOTPRINT'
});

// 获取足迹模块详情
export const fetchBabyFootprintDomesticDetail = createApi({
  method: 'get',
  url: '/baby_resume/baby_footprints/:id',
  state: 'FETCH_BABY_Footprint_DOMESTIC_DETAIL'
});

// 获取足迹模块详情
export const fetchBabyFootprintOverseasDetail = createApi({
  method: 'get',
  url: '/baby_resume/baby_footprints/:id',
  state: 'FETCH_BABY_Footprint_OVERSEAS_DETAIL'
});

// 获取全部地区
// category=china / world  parent = parentId  level = parent / 不传参  source = mobile / pc
export const fetchBabyFootprintInfo = createApi({
  method: 'get',
  url: '/baby_resume/baby_footprints/info',
  state: 'FETCH_BABY_Footprint_INFO'
});

/*   我的性格   */

// 创建我的性格模块
export const createBabyCharacter = createApi({
  method: 'post',
  url: '/baby_resume/baby_characters/',
  state: 'CREATE_BABY_CHARACTER'
});

// 更新我的性格模块
export const updateBabyCharacter = createApi({
  method: 'put',
  url: '/baby_resume/baby_characters/',
  state: 'UPDATE_BABY_CHARACTER'
});

// 获取性格模块详情
export const fetchBabyCharacterDetail = createApi({
  method: 'get',
  url: '/baby_resume/baby_characters/:id',
  state: 'FETCH_BABY_CHARACTER_DETAIL'
});

/*    别人对我的印象模块    */

// 获取所有好友关系
export const fetchRelationShips = createApi({
  method: 'get',
  url: '/baby_resume/baby_impressions/relations/',
  state: 'FETCH_RELATIONSHIPS'
});

// 获取印象模块详情
export const fetchBabyEvaluate = createApi({
  method: 'get',
  url: '/baby_resume/baby_impressions/:id',
  state: 'FETCH_BABY_EVALUATE'
});

// 创建我的印象模块模块
export const createBabyEvaluate = createApi({
  method: 'post',
  url: '/baby_resume/baby_impressions/',
  state: 'CREATE_BABY_EVALUATE'
});

// 更新我的印象模块模块
export const updateBabyEvaluate = createApi({
  method: 'put',
  url: '/baby_resume/baby_impressions/',
  state: 'UPDATE_BABY_EVALUATE'
});

// 用户创建对别人孩子印象模块的印象记录
export const createBabyEvaluateRecords = createApi({
  method: 'post',
  url: '/baby_resume/baby_impression_records/',
  state: 'CREATE_BABY_EVALUATE_RECORDS'
});

// 删除印象记录
export const deleteBabyEvaluateRecords = createApi({
  method: 'delete',
  url: '/baby_resume/baby_impression_records/',
  state: 'DELETE_BABY_EVALUATE_RECORDS'
});

// 隐藏印象记录
export const hideBabyEvaluates = createApi({
  method: 'put',
  url: '/baby_resume/baby_impression_records/hide',
  state: 'HIDE_BABY_EVALUATES'
});

// 隐藏关系
export const hideRelation = createApi({
  method: 'put',
  url: '/baby_resume/baby_impressions/hide_relation',
  state: 'HIDE_BABY_RELATION'
});

/* 扫描二维码跳转到微信小程序指定页面 */
export const fetchWxaCode = createApi({
  method: 'get',
  url: '/qr_codes/wxa_code/',
  state: 'FETCH_WXA_CODE'
});

/* 扫描二维码跳转到微信小程序指定页面 */
export const fetchBabyResume = createApi({
  method: 'get',
  url: '/baby_resume/baby_resumes/',
  state: 'FETCH_BABY_RESUME'

});

/* 简历预览 孩子信息(不需要登录) */
export const fetchUserInfo = createApi({
  method: 'get',
  url: '/baby_resume/baby_resumes/',
  state: 'FETCH_USER_INFO'
});

/* 简历预览 孩子信息(不需要登录) */
export const downloadResume = createApi({
  method: 'get',
  url: '/baby_resume/baby_resumes/to_img/',
  state: 'DOWNLOAD'
});

/* 更新简历模块标题 */
export const updateModuleTitle = createApi({
  method: 'put',
  url: '/baby_resume/baby_resumes/title/',
  state: 'UPDATE_MODULE_TITLE'
});


/* 魔法学院分享页 */
// 查询当前章节的推荐内容
export const fetchSectionRecommend = createApi({
  method: 'get',
  url: '/magic_school/sections/detail/:id',
  state: 'FETCH_SECTION_RECOMMEND'
});