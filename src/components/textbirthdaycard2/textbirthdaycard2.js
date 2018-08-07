const options = {};

document.title = options['share'] && options['share']['title'] && !options['in_app'] ? options['share']['title'] : '生日賀卡';
options['share'] = options['share'] ? options['share'] : {
    title: 1
};
options['type'] = 'text';
options['bgImageUrl'] = '/static/images/card/birthday/textbirthdaybg2.png';
options['text'] = '親愛的安妮兒，今天是你的生日，在此給你我特別的祝福，願它每分每秒都帶給你健康、好運和幸福。希望這是你度過的最美好的生日！祝福你永遠健康快樂！親愛的安妮兒，今天是你的生日，在此給你我特別的祝福，願它每分每秒都帶給你健康、好運和幸福。希望這是你度過的最美好的生日！祝福你永遠健康快樂！';

export default {
    name: 'TextBirthdayCard2',
    data() {
        return {
            blessing_url: options['blessing_url'],
            information_url: options['information_url'],
            uuid: options['uuid'],
            isApp: options['in_app'] === 1,
            time: 1,
            show: false,
            showHappy: false,
            type: options['type'] ? options['type'] : 'text',
            bgImageUrl: options['bgImageUrl'] ? 'url(' + options['bgImageUrl'] + ')' : '',
            userName: options['userName'] ? options['userName'] : '匿名',
            avatar: options['avatar'] ? 'url(' + options['avatar'] + ')' : '',
            text: options['text'] ? options['text'] : '',
            showThankBtn: false,
            c_user_name: options['c_user_name'],
            c_user_avatar: options['c_user_avatar'],
            timer: {}
        }
    },
    mounted: function () {
        this.initCard();
    },
    destroy: function () {
        clearInterval(this.timer);
    },
    methods: {
        initCard: function () {
            let cardCompnent = this;
            setTimeout(function () {
                cardCompnent.showHappy = true;
            }, 800);
            setTimeout(function () {
                cardCompnent.show = true;
                if (cardCompnent.type === 'text' && cardCompnent.text) {
                    // 文字逐行显示和向上滑动效果
                    setTimeout(function () {
                        $('.card-text').css('display', 'block');
                        var height = $('.card-text-span').height(),
                            speed = 1500,
                            scrollSpeed = 10,
                            lineHeight = 28,
                            time = height / lineHeight * speed;
                        // console.log(height);
                        $('.card-text-span').css('height', 0);
                        $('.card-text-span').animate({
                            height: height + 'px'
                        }, time);
                        cardCompnent.timer = setInterval(function () {
                            var cardTextContent = document.getElementById('cardTextContent');
                            cardTextContent && (cardTextContent.scrollTop = 100000000);
                            cardCompnent.time += 1;
                            if (cardCompnent.time * scrollSpeed > time) {
                                console.log('stopScroll');
                                clearInterval(cardCompnent.timer);
                                cardCompnent.showThankBtn = true;
                            }
                        }, scrollSpeed);
                    });
                }
            }, 1600);
        },
        getObjInfo: function (type) {
            var $this = this;
            var info = ['width', 'height', 'top', 'bottom', 'left', 'right'];
            $.each(info, function (index, item) {
                var attr = options[type][item];
                if (typeof (attr) === 'string') {
                    (attr || attr === 0) && $this.$set($this[type], item, attr);
                } else {
                    (attr || attr === 0) && $this.$set($this[type], item, attr / 200 + 'rem');
                }
            });
        },
        openBless: function () {
            let cardCompnent = this;
            $.ajax({
                type: 'get',
                url: cardCompnent.blessing_url,
                success: function (res) {
                    var result = JSON.parse(res);
                    console.log(result['code']);
                }
            });
        },
        goiBerH5: function () {
            let cardCompnent = this;
            if (!cardCompnent.isApp) {
                cardCompnent.openBless();
            }
            if (isOnTheMini) {
                _czc.push(["_trackEvent", "港澳財富訊息", "立即諮詢", "用戶開始諮詢"]);
                wx.miniProgram.navigateTo({
                    url: '/pages/chat/chat?id=' + cardCompnent.uuid
                });
            } else {
                var cookies = getCookie('isLogin') * 1;
                if (cookies) {
                    var url = cardCompnent.information_url;
                    if (url.indexOf('?') === -1) {
                        url += "?from_ib_url=" + encodeURIComponent(window.location.href);
                    } else {
                        url += "&from_ib_url=" + encodeURIComponent(window.location.href);
                    }
                    window.location.href = url;
                } else if (isWeiXin) {
                    window.location.href = wxAuthUrlForContact;
                } else {
                    mainRegister();
                }
            }
        }
    }
}