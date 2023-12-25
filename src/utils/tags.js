const whiteList = ['/login', '/import', '401', '404']

// 判断需不需要保存到tagsview中
export function isTags(path) {
  return !whiteList.includes(path)
}
