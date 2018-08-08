import '../../../static/js/common.js';
import enableInlineVideo from 'iphone-inline-video';
import videojs from 'video.js';

const options = {};

document.title = options['share'] && options['share']['title'] && !options['in_app'] ? options['share']['title'] : '生日賀卡';
options['share'] = options['share'] ? options['share'] : {
    title: 1
};
options['type'] = 'video';
options['videoSrc'] = 'https://static.iberhk.com/agent-article/video/2018/2/8/1533199687000.mp4';

export default {
    name: 'VideoBirthdayCard2',
    data() {
        return {
            blessing_url: options['blessing_url'],
            information_url: options['information_url'],
            uuid: options['uuid'],
            isApp: options['in_app'] === 1,
            show: false,
            showHappy: false,
            showMask: true,
            type: options['type'],
            userName: options['userName'] ? options['userName'] : '匿名',
            avatar: options['avatar'] ? 'url(' + options['avatar'] + ')' : '',
            videoSrc: options['videoSrc'] ? options['videoSrc'] : '',
            videoWebmSrc: options['videoSrc'] ? options['videoSrc'].substr(0, options['videoSrc'].lastIndexOf('.')) + '.webm' : '',
            videoPosterUrl: '',
            c_user_name: options['c_user_name'],
            c_user_avatar: options['c_user_avatar']
        }
    },
    mounted: function () {
        this.initCard();
    },
    methods: {
        initCard: function () {
            let cardCompnent = this;
            setTimeout(function () {
                cardCompnent.showHappy = true;
            }, 800);
            setTimeout(function () {
                cardCompnent.show = true;
                // 设置视频背景图
                if (cardCompnent.videoSrc) {
                    cardCompnent.setPoster();
                }
                setTimeout(function () {
                    if (cardCompnent.videoSrc) {
                        var videoObj = document.getElementById('videoPlayer');
                        // 兼容iphone全屏问题
                        enableInlineVideo(videoObj);
                        videojs('videoPlayer', {
                            controls: true,
                            autoplay: false,
                            preload: 'auto',
                            playsinline: true,
                            'webkit-playsinline': true
                        });
                    }
                }, 10);
            }, 1500);
        },
        setPoster: function () {
            // 设置视频背景图
            let video = document.getElementById('videoPlayer');
            if (video) {
                this.videoPosterUrl =
                    this.videoSrc + '?x-oss-process=video/snapshot,t_0,f_png,w_' + video['videoWidth'] + ',h_' + video['videoHeight'] + ',m_fast';
            }
        },
        openBless: function () {
            let cardCompnent = this;
            // 祝福数接口
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