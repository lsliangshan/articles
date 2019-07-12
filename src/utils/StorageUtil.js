const StorageUtil = (function () {
  const _getItem = function (name) {
    let _value = localStorage.getItem(name) || ''
    try {
      _value = JSON.parse(_value)
    } catch (err) {
    }
    return _value
  }

  const _setItem = function (name, value) {
    let _value = value
    if (typeof value !== 'string') {
      _value = JSON.stringify(value)
    }
    localStorage.setItem(name, _value)
  }

  const _removeItem = function (name) {
    if (localStorage.hasOwnProperty(name)) {
      localStorage.removeItem(name)
    }
  }

  const _clear = function () {
    localStorage.clear()
  }

  return {
    getItem: _getItem,
    setItem: _setItem,
    removeItem: _removeItem,
    clear: _clear
  }
})()

export default StorageUtil