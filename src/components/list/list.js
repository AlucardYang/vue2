const options = {};

document.title = '生日賀卡列表';

export default {
    name: 'List',
    data() {
        return {
            lists: [
                {
                    name: 'text-birthday-card1',
                    link: '/textbirthdaycard1'
                }, {
                    name: 'text-birthday-card2',
                    link: '/textbirthdaycard2'
                }, {
                    name: 'video-birthday-card1',
                    link: '/videobirthdaycard1'
                }, {
                    name: 'video-birthday-card2',
                    link: '/videobirthdaycard2'
                }, {
                    name: 'app-ten-million-calc',
                    link: '/apptenmillioncalc'
                }, {
                    name: 'app-future-calc',
                    link: '/appfuturecalc'
                }, {
                    name: 'app-compound-interest-calc',
                    link: '/appcompoundinterestcalc'
                }
            ]
        }
    },
    mounted: function () {
    
    }
}