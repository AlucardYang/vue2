import Vue from 'vue'
import Router from 'vue-router'
import List from '@/components/list/list.vue'
import TextBirthdayCard1 from '@/components/textbirthdaycard1/textbirthdaycard1.vue'
import TextBirthdayCard2 from '@/components/textbirthdaycard2/textbirthdaycard2.vue'
import VideoBirthdayCard1 from '@/components/videobirthdaycard1/videobirthdaycard1.vue'
import VideoBirthdayCard2 from '@/components/videobirthdaycard2/videobirthdaycard2.vue'
import AppTenMillionCalc from '@/components/apptenmillioncalc/apptenmillioncalc.vue'
import AppFutureCalc from '@/components/appfuturecalc/appfuturecalc.vue'
import AppCompoundInterestCalc from '@/components/appcompoundinterestcalc/appcompoundinterestcalc.vue'

Vue.use(Router)

export default new Router({
  mode: 'history', 
  // base: '/iber',
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
    },{
      path: '/videobirthdaycard1',
      name: 'videobirthdaycard1',
      component: VideoBirthdayCard1
    },{
      path: '/videobirthdaycard2',
      name: 'videobirthdaycard2',
      component: VideoBirthdayCard2
    },{
      path: '/apptenmillioncalc',
      name: 'apptenmillioncalc',
      component: AppTenMillionCalc
    },{
      path: '/appfuturecalc',
      name: 'appfuturecalc',
      component: AppFutureCalc
    },{
      path: '/appcompoundinterestcalc',
      name: 'appcompoundinterestcalc',
      component: AppCompoundInterestCalc
    }
  ]
})

console.log(Vue.$router);
