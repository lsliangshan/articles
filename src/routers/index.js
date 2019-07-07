import PageHome from '../components/page/Home.vue'
import PageAbout from '../components/page/About.vue'
import PageArticleDetail from '../components/page/article/index.vue'

var routes = [
  {
    path: '/',
    component: PageHome
  },
  {
    path: '/about/',
    component: PageAbout
  },
  {
    path: '/article/:articleId',
    component: PageArticleDetail
  }
]

export default routes
