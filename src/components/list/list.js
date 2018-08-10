const options = {};

export default {
    name: 'List',
    data() {
        return {
            lists: [{
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
            }],
            iberList: [],
            page: 1
        }
    },
    mounted: function () {
        document.title = '生日賀卡列表';
        this.getList();
    },
    methods: {
        getList: function () {
            this.$http.jsonp('https://mp.iberhk.com/news/website-list?page=' + this.page + '&language=zh_tw').then(function (res) {
                console.log(res.data.data);
                // this.$set('iberList', res.data.data);
                this.iberList = this.iberList.concat(res.data.data);
                if (res.data.data.length === 7) {
                    this.page += 1;
                    this.getList();
                }

            }, function (res) {
                alert(res.status)
            });
        }
    }
}