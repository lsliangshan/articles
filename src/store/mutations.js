/***
 **                                                          _ooOoo_
 **                                                         o8888888o
 **                                                         88" . "88
 **                                                         (| -_- |)
 **                                                          O\ = /O
 **                                                      ____/`---'\____
 **                                                    .   ' \\| |// `.
 **                                                     / \\||| : |||// \
 **                                                   / _||||| -:- |||||- \
 **                                                     | | \\\ - /// | |
 **                                                   | \_| ''\---/'' | |
 **                                                    \ .-\__ `-` ___/-. /
 **                                                 ___`. .' /--.--\ `. . __
 **                                              ."" '< `.___\_<|>_/___.' >'"".
 **                                             | | : `- \`.;`\ _ /`;.`/ - ` : | |
 **                                               \ \ `-. \_ __\ /__ _/ .-` / /
 **                                       ======`-.____`-.___\_____/___.-`____.-'======
 **                                                          `=---='
 **
 **                                       .............................................
 **                                              佛祖保佑             永无BUG
 **                                      佛曰:
 **                                              写字楼里写字间，写字间里程序员；
 **                                              程序人员写程序，又拿程序换酒钱。
 **                                              酒醒只在网上坐，酒醉还来网下眠；
 **                                              酒醉酒醒日复日，网上网下年复年。
 **                                              但愿老死电脑间，不愿鞠躬老板前；
 **                                              奔驰宝马贵者趣，公交自行程序员。
 **                                              别人笑我忒疯癫，我笑自己命太贱；
 **                                              不见满街漂亮妹，哪个归得程序员？
 */
/**
 * Created by liangshan on 2017/7/13.
 */

import * as types from './mutation-types'
import { StorageUtil } from '../utils'

const CryptoJS = require('crypto-js')

const formatTags = function (tags) {
  let outTags = []

  outTags = tags.filter(item => Number(item.parent) === 0)

  for (let i = 0; i < outTags.length; i++) {
    if (!outTags[i].children) {
      outTags[i].children = []
    }
    outTags[i].children = tags.filter(item => String(item.parent) === String(outTags[i].value))
  }

  return outTags
}

export const mutations = {
  [types.SHOW_POPUP] (state, data) {
    state.popup = Object.assign({}, state.popup, data, {
      shown: true
    })
  },
  [types.CACHE_ALL_ARTICLE_TAGS] (state, data) {
    state.allArticleTags = data.tags
    state.formatArticleTags = formatTags(data.tags)
  },
  [types.CACHE_LOGIN_INFO] (state, data) {
    let localStr = ''
    if (data.hasOwnProperty('localStr')) {
      localStr = data.localStr
    } else {
      localStr = CryptoJS[state.cryptoType].encrypt(JSON.stringify(data.loginInfo), state.privateKey).toString()
    }
    StorageUtil.setItem(state.localStorageKeys.loginInfo, localStr)
    state.loginInfo = JSON.parse(JSON.stringify(data.loginInfo || {}))
  },
  [types.INIT_LOGIN_INFO] (state, data) {
    if (data.loginInfo) {
      state.loginInfo = JSON.parse(JSON.stringify(data.loginInfo))
    }
  },
  [types.CACHE_ACTIVE_THEME_COLOR] (state, data) {
    state.activeThemeColor = data.activeThemeColor
  },
  [types.SET_ACTIVE_THEME_COLOR] (state, data) {
    state.settings.activeThemeColor = data.activeThemeColor
    StorageUtil.setItem(state.localStorageKeys.settings, state.settings)
  },
  [types.SET_THEME_DARK] (state, data) {
    state.settings.themeDark = data.themeDark
    StorageUtil.setItem(state.localStorageKeys.settings, state.settings)
  },
  [types.INIT_SETTINGS] (state, data) {
    state.settings = JSON.parse(JSON.stringify(data.settings))
    StorageUtil.setItem(state.localStorageKeys.settings, state.settings)
  }
}
