// 判断是否为外部资源
export default function (path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
