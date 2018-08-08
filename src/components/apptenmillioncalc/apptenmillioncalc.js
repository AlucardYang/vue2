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
    name: 'AppTenMillionCalc',
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
            age: 18,
            ageMin: 0,
            ageMax: 70,
            ageStep: 1,
            ageGridNum: 7,
            ageValues: ['0', '10歲', '20歲', '30歲', '40歲', '50歲', '60歲', '70歲'],
            ageTips: {
                empty: '年齡不可為空',
                get: '年齡不可大於70歲',
                let: '年齡不可小於0'
            },
            money: 10000,
            moneyString: '10,000',
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
            rate: 10.6,
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
            richAge: 40,
            year: 1
        }
    },
    mounted: function () {
        this.init('age');
        this.init('money');
        this.init('rate');
        this.iphoneXLayout();
    },
    methods: {
        init: function (type) {
            document.title = '成為千萬富翁';
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
                        calculator.calcRichAge();
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
                if (type === 'age' || type === 'money') {
                    calculator[type] = parseFloat(calculator[type]);
                    type === 'money' && (calculator['moneyString'] = parseInt(calculator[type]).formatMoney(0, ''));
                }
            }
            if (handle) {
                calculator['moneyInputTop'] = '-10000rem';
            }
            calculator.updateAgeSlider(type);
            calculator.calcRichAge();
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
            if ((calculator.age === 0 || calculator.age && calculator.age >= calculator.ageMin && calculator.age <= calculator.ageMax) &&
                calculator.money && calculator.money >= calculator.moneyMin && calculator.money <= calculator.moneyMax &&
                (calculator.rate === 0 || calculator.rate && calculator.rate >= calculator.rateMin && calculator.rate <= calculator.rateMax)) {
                var n = 1 + calculator.rate * 0.01;
                if (n > 1 && calculator.money * 12 * n * (1 - Math.pow(n, calculator.year)) / (1 - n) <= 10000000) {
                    calculator.year++;
                    calculator.calcRichAge();
                } else if (n === 1) {
                    calculator.richAge = Math.ceil(calculator.age + 10000000 / (calculator.money * 12));
                } else {
                    calculator.richAge = parseInt(calculator.age + calculator.year);
                    calculator.year = 1;
                }
            } else {
                calculator.year = 1;
                calculator.richAge = 0;
            }
        },
        iphoneXLayout: function () {
            let calculator = this;
            // 兼容iphoneX布局
            if (window.screen.height >= 812) {
                calculator.inIphoneX = true;
                calculator.bannerSrc = '/static/images/calculator/tenmillionbannerbig.png';
            } else {
                calculator.bannerSrc = '/static/images/calculator/tenmillionbanner.png';
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