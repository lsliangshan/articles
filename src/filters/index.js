export function time (text) {
  let date = new Date()
  let now = date.getTime()
  let targetTime = Number(text)
  let outStr = ''
  if (now - targetTime < 60 * 1000) {
    // 刚刚， 小于1min
    outStr = '刚刚'
  } else if (now - targetTime < 60 * 60 * 1000) {
    // xx分钟前  小于1小时
    outStr = Math.ceil((now - targetTime) / (60 * 1000)) + '分钟前'
  } else if (now - targetTime < 24 * 60 * 60 * 1000) {
    // xx小时前 小于24小时
    outStr = Math.ceil((now - targetTime) / (60 * 60 * 1000)) + '小时前'
  } else if (now - targetTime < 28 * 24 * 60 * 60 * 1000) {
    // xx天之前  小于28天
    outStr = Math.ceil((now - targetTime) / (24 * 60 * 60 * 1000)) + '天之前'
  } else {
    outStr = dateFormat(text, 'YYYY-MM-DD hh:mm:ss', true)
  }
  return outStr
}

export function dateFormat (text, formatStr, outAMonth) {
  let format = formatStr || 'YYYY-MM-DD hh:mm:ss'
  let date = new Date()
  if (!outAMonth && (date.getTime() - Number(text) < 28 * 24 * 60 * 60 * 1000)) {
    return time(text)
  }
  date.setTime(Number(text))
  let _year = date.getFullYear()
  let _month = ((date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1))
  let _day = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())
  let _hour = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours())
  let _minute = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
  let _second = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
  return format.replace('YYYY', _year)
    .replace('MM', _month)
    .replace('M', (date.getMonth() + 1))
    .replace('DD', _day)
    .replace('D', date.getDate())
    .replace('hh', _hour)
    .replace('h', date.getHours())
    .replace('mm', _minute)
    .replace('m', date.getMinutes())
    .replace('ss', _second)
    .replace('s', date.getSeconds())
}

export function findTextByValue (text, arr) {
  let a = arr.filter(item => String(item.value) === String(text))
  if (a.length > 0) {
    return a[0].text
  } else {
    return ''
  }
}