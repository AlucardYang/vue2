import Vue from 'vue'
import Router from 'vue-router'
import List from '@/components/list/list.vue'
import TextBirthdayCard1 from '@/components/textbirthdaycard1/textbirthdaycard1.vue'
import TextBirthdayCard2 from '@/components/textbirthdaycard2/textbirthdaycard2.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'list'
    },{
      path: '/list',
      name: 'list',
      component: List
    },{
      path: '/textbirthdaycard1',
      name: 'textbirthdaycard1',
      component: TextBirthdayCard1
    },{
      path: '/textbirthdaycard2',
      name: 'textbirthdaycard2',
      component: TextBirthdayCard2
    }
  ]
})