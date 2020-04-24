import request from '@/utils/request'
// 登录
export function login (userAccount, password) {
  return request({
    url: '/api/login',
    method: 'post',
    data: {
      userAccount: userAccount,
      password: password
    }
  })
}
// 退出登录
export function logout () {
  return request({
    url: '/api/logout',
    method: 'post'
  })
}
// 注册
export function resgister (userAccount, password, userName) {
  return request({
    url: '/api/resgister',
    method: 'post',
    data: {
      userAccount,
      password,
      userName
    }
  })
}
// 查询当前用户的基本信息
export function searchInfo (data) {
  return request({
    url: '/api/searchinfobyuseraccount',
    method: 'post',
    data: {
      userAccount: data
    }
  })
}
// 查询当前用户历史记录
export function searchhistory (data) {
  return request({
    url: '/api/searchhistory',
    method: 'post',
    data: {
      userAccount: data
    }
  })
}
// 插入&更新历史记录；
export function insertHistory (userAccount, bookId, chapterId) {
  return request({
    url: '/api/insertHistory',
    method: 'post',
    data: {
      userAccount,
      bookId,
      chapterId
    }
  })
}
// 查询当前用户的书架信息
export function searchbookshelf (data) {
  return request({
    url: '/api/searchbookshelf',
    method: 'post',
    data: {
      userAccount: data
    }
  })
}
// 添加书目到书架
export function insertbooktobookshelf (userAccount, bookId) {
  return request({
    url: '/api/insertbooktobookshelf',
    method: 'post',
    data: {
      userAccount,
      bookId
    }
  })
}
// 删除书架的一条记录
export function deleteBookForBookId (userAccount, bookId) {
  return request({
    url: '/api/deletebookforbookid',
    method: 'post',
    data: {
      userAccount,
      bookId
    }
  })
}
// 删除某一条历史记录
export function deleteHistoryForBookId (userAccount, bookId) {
  return request({
    url: '/api/deletehistoryforbookid',
    method: 'post',
    data: {
      userAccount,
      bookId
    }
  })
}
// 随机推荐书目列表
export function randomsearchbook (currentpage) {
  return request({
    url: '/api/randomsearchbook',
    method: 'post',
    data: {
      currentpage: currentpage
    }
  })
}
// 通过评分降序查询书目
export function searchbookbymark (currentpage) {
  return request({
    url: '/api/searchbookbymark',
    method: 'post',
    data: {
      currentpage: currentpage
    }
  })
}
// 通过热度降序查询书目
export function searchbookbyattention (currentpage) {
  return request({
    url: '/api/searchbookbyattention',
    method: 'post',
    data: {
      currentpage: currentpage
    }
  })
}
// 通过上架时间降序查询书目
export function searchbookbyshelftime (currentpage) {
  return request({
    url: '/api/searchbookbyshelftime',
    method: 'post',
    data: {
      currentpage: currentpage
    }
  })
}
// 通过类别查询书目列表
export function searchbookbysort (sort, currentpage) {
  return request({
    url: '/api/searchbookbysort',
    method: 'post',
    data: {
      sort: sort,
      currentpage: currentpage
    }
  })
}

// 模糊查询
export function vaguesearchbook (str, currentpage) {
  return request({
    url: '/api/vaguesearchbook',
    method: 'post',
    data: {
      str: str,
      currentpage: currentpage
    }
  })
}
// 通过id查询书目的基本信息
export function searchbookbyid (bookId) {
  return request({
    url: '/api/searchbookbyid',
    method: 'post',
    data: {
      bookId: bookId
    }
  })
}
// 开始阅读
export function read (bookId, chapterId) {
  return request({
    url: '/api/read',
    method: 'post',
    data: {
      bookId,
      chapterId
    }
  })
}
// 查询章节列表
export function searchchaptertitle (bookId) {
  return request({
    url: '/api/searchchaptertitle',
    method: 'post',
    data: {
      bookId
    }
  })
}
