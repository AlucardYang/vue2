import videojs from '../../../static/js/ion.rangeSlider.min.js';

const options = {};

Number.prototype.formatMoney = function (places, symbol, thousand, decimal) {
    places = !isNaN(places = Math.abs(places)) ? places : 2;
    symbol = symbol !== undefined ? symbol : "$";
    thousand = thousand || ",";
    decimal = decimal || ".";
    var number = this,
        negative = number < 0 ? "-" : "",
        i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
    return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
};

export default {
    name: 'AppFutureCalc',
    data() {
        return {
            inApp: options['in_app'] === 1,
            inIphoneX: false,
            bannerSrc: '',
            name: options['name'] ? options['name'] : '',
            avatar: options['avatar'] ? options['avatar'] : '',
            mobile_pre: options['mobile_pre'] ? options['mobile_pre'] : '',
            mobile: options['mobile'] ? options['mobile'] : '',
            qr_code_src: options['qr_code_src'] ? options['qr_code_src'] : '',
            is_realname_verified: options['is_realname_verified'],
            money: 5000,
            moneyString: '5,000',
            moneyMin: 0,
            moneyMax: 200000,
            moneyStep: 1000,
            moneyGridNum: 5,
            moneyValues: ['0', '40K', '80k', '120k', '160k', '200k'],
            moneyInputTop: '-10000rem',
            moneyTips: {
                empty: '投資不可為空',
                get: '投資不可大於200k',
                let: '投資不可小於0'
            },
            year: 20,
            yearMin: 0,
            yearMax: 30,
            yearStep: 1,
            yearGridNum: 6,
            yearValues: ['0', '5年', '10年', '15年', '20年', '25年', '30年'],
            yearTips: {
                empty: '年期不可為空',
                get: '年期不可大於30年',
                let: '年期不可小於0'
            },
            rate: 10,
            rateMin: 0,
            rateMax: 20,
            rateStep: 0.1,
            rateGridNum: 5,
            rateValues: ['0', '4%', '8%', '12%', '16%', '20%'],
            rateTips: {
                empty: '回報率不可為空',
                get: '回報率不可大於20%',
                let: '回報率不可小於0'
            },
            futureMoney: '$3,780,150'
        }
    },
    mounted: function () {
        this.init('money');
        this.init('year');
        this.init('rate');
        this.iphoneXLayout();
    },
    methods: {
        init: function (type) {
            document.title = '未來值計算器';
            let calculator = this;
            setTimeout(function () {
                $("#" + type + "Slider").ionRangeSlider({
                    min: calculator[type + 'Min'],
                    max: calculator[type + 'Max'],
                    from: calculator[type],
                    step: calculator[type + 'Step'],
                    grid: false,
                    grid_margin: false,
                    // grid_num: calculator[type + 'GridNum'],
                    keyboard: true,
                    hide_min_max: true,
                    prettify_enabled: false,
                    onChange: function (data) {
                        calculator[type] = data['from'];
                        calculator.calcRichAge(type);
                        if (type === 'money') {
                            calculator['moneyString'] = calculator[type].formatMoney(0, '');
                        }
                    }
                });
            });
        },
        inputChange: function (type, handle) {
            let calculator = this;
            var input = document.getElementById(type + 'Input');
            if (calculator[type] > calculator[type + 'Max']) {
                calculator[type] = calculator[type + 'Max'];
                layer.msg(calculator[type + 'Tips']['get']);
            } else if (calculator[type] < calculator[type + 'Min']) {
                calculator[type] = calculator[type + 'Min'];
                layer.msg(calculator[type + 'Tips']['let']);
            } else if (!calculator[type]) {
                handle && (calculator[type] = calculator[type + 'Min']);
                !input.validity.valid && (calculator[type] = input['_value']);
            } else if (calculator[type] <= calculator[type + 'Max'] && calculator[type] >= calculator[type + 'Min']) {
                if (type === 'year' || type === 'money') {
                    calculator[type] = parseFloat(calculator[type]);
                    type === 'money' && (calculator['moneyString'] = parseInt(calculator[type]).formatMoney(0, ''));
                }
            }
            if (handle) {
                calculator['moneyInputTop'] = '-10000rem';
            }
            calculator.updateAgeSlider(type);
            calculator.calcRichAge(type);
        },
        inputFocus: function () {
            let calculator = this;
            calculator['moneyInputTop'] = '48%';
            $('#moneyInput').focus();
            $(document).scrollTop(100);
        },
        updateAgeSlider: function (type) {
            let calculator = this;
            var slider = $("#" + type + "Slider").data("ionRangeSlider");
            slider.update({
                from: calculator[type]
            });
        },
        calcRichAge: function () {
            let calculator = this;
            if (calculator.money && calculator.money >= calculator.moneyMin && calculator.money <= calculator.moneyMax
                && calculator.year && calculator.year >= calculator.yearMin && calculator.year <= calculator.yearMax
                && (calculator.rate === 0 || (calculator.rate && calculator.rate >= calculator.rateMin && calculator.rate <= calculator.rateMax))) {
                var n = 1 + calculator.rate * 0.01;
                n > 1 && (calculator.futureMoney = Math.round(calculator.money * 12 * n * (1 - Math.pow(n, calculator.year)) / (1 - n)).formatMoney(0));
                n === 1 && (calculator.futureMoney = (calculator.money * 12 * calculator.year).formatMoney(0));
            } else {
                calculator.futureMoney = '$0';
            }
        },
        iphoneXLayout: function () {
            let calculator = this;
             // 兼容iphoneX布局
             if (window.screen.height >= 812) {
                calculator.inIphoneX = true;
                calculator.bannerSrc = '/static/images/calculator/futurebannerbig.png';
            } else {
                calculator.bannerSrc = '/static/images/calculator/futurebanner.png';
            }
        },
        isBackspace(keyValue) {
            return keyValue === 'Backspace';
        },
        isDot(keyValue) {
            return keyValue === '.';
        },
        isNumber(keyValue) {
            return (keyValue >= 0 && keyValue <= 9);
        },
        preventNotNumber(event) {
            let calculator = this;
            var keyValue = event.key;
            if (!calculator.isBackspace(keyValue) && !calculator.isDot(keyValue) && !calculator.isNumber(keyValue)) {
                // 其他按键
                event.preventDefault();
                event.stopPropagation();
                return false;
            }
        }
    }
}