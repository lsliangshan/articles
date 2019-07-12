const KitUtil = (function () {
  function S4 () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }
  function _getUUID (prefix) {
    return ((prefix || '') + S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4())
  }

  const _isEmptyObj = function (obj) {
    let t
    for (t in obj) {
      return !1
    }
    return !0
  }

  const _title = function (title) {
    window.document.title = (title || '智愚')
  }

  return {
    getUUID: _getUUID,
    isEmptyObj: _isEmptyObj,
    title: _title
  }
})()

export default KitUtil