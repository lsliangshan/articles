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
import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import * as mutations from './mutations'

Vue.use(Vuex)

const store = new Vuex.Store({
  actions: actions.actions,
  mutations: mutations.mutations,
  getters: getters.getters,
  state: {
    localStorageKeys: {
      userInfo: 'user-info'
    },
    eventHub: new Vue(),
    assets: {
      maleAvatar: '/static/images/avatar_male_1.jpg',
      femaleAvatar: '/static/images/avatar_female_1.jpg',
      defaultActivity127x200: '/static/images/127x200.png',
      inigLogo: '/static/images/inig.png',
      articleAlbum: 'https://static.dei2.com/live/images/article.jpeg',
      ads: {
        inig: '/static/images/ads/logo_inig_3.jpg',
        dei2: '/static/images/ads/logo_dei2_2.jpg'
      }
    },
    requestInfo: {
      // baseUrl: PROTOCOL + '//127.0.0.1:3000',
      baseUrl: 'https://talkapi.dei2.com',
      login: '/Zpm/user/login',
      register: '/Zpm/user/register',
      articles: {
        list: '/Zpm/article/getAll',
        detail: '/Zpm/article/content',
        getAllTags: '/Zpm/tag/getAll',
        getAllUsers: ''
      }
    },
    loginInfo: {
    }
  }
})

export default store

global.store = store