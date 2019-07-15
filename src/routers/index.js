import PageHome from '../components/page/Home.vue'
import PageAbout from '../components/page/About.vue'
import PageLogin from '../components/page/Login.vue'
import PageArticleDetail from '../components/page/article/Index.vue'
import PageProfile from '../components/page/profile/Index.vue'

var routes = [
  {
    path: '/',
    component: PageHome
  },
  {
    path: '/about',
    component: PageAbout
  },
  {
    path: '/article/:articleId',
    component: PageArticleDetail
  },
  {
    path: '/profile',
    component: PageProfile
  },
  {
    path: '/profile/:userId',
    component: PageProfile
  },
  {
    path: '/login',
    component: PageLogin
  }
]

export default routes
