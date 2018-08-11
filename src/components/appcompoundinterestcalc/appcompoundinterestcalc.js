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
    name: 'AppCompoundInterestCalc',
    data() {
        return {
            inApp: options['in_app'] === 1,
            inIphoneX: false,
            finalBannerSrc: '../../../static/images/calculator/finalbanner.png',
            capitalBannerSrc: '../../../static/images/calculator/capitalbanner.png',
            name: options['name'] ? options['name'] : '',
            avatar: options['avatar'] ? options['avatar'] : '',
            mobile_pre: options['mobile_pre'] ? options['mobile_pre'] : '',
            mobile: options['mobile'] ? options['mobile'] : '',
            qr_code_src: options['qr_code_src'] ? options['qr_code_src'] : '',
            is_realname_verified: options['is_realname_verified'],
            type: 'final',
            money: 10000000,
            moneyString: '10,000,000',
            moneyMin: 0,
            moneyMax: 10000000,
            moneyStep: 100,
            moneyGridNum: 5,
            moneyValues: ['0', '200萬', '400萬', '600萬', '800萬', '1000萬'],
            moneyInputTop: '-10000rem',
            moneyTips: {
                empty: '本金不可為空',
                get: '本金不可大於1000萬',
                let: '本金不可小於0'
            },
            rate: 18,
            rateMin: 0,
            rateMax: 30,
            rateStep: 1,
            rateGridNum: 6,
            rateValues: ['0', '5%', '10%', '15%', '20%', '25%', '30%'],
            rateTips: {
                empty: '年利率比不可為空',
                get: '年利率比不可大於30%',
                let: '年利率比不可小於0'
            },
            year: 5,
            yearMin: 0,
            yearMax: 100,
            yearStep: 1,
            yearGridNum: 5,
            yearValues: ['0', '20年', '40年', '60年', '80年', '100年'],
            yearTips: {
                empty: '存入年限不可為空',
                get: '存入年限不可大於100年',
                let: '存入年限不可小於0'
            },
            moneyTitle: '$22,877,578',
        }
    },
    mounted: function () {
        this.init('money');
        this.init('rate');
        this.init('year');
        this.iphoneXLayout();
    },
    methods: {
        changeType: function (type) {
            let calculator = this;
            calculator.type = type;
            calculator.moneyTitle = type === 'final' ? '$22,877,577' : '$4,371,092';
            calculator.money = 10000000;
            calculator.moneyString = '10,000,000';
            calculator.rate = 18;
            calculator.year = 5;
            calculator.updateAgeSlider('money');
            calculator.updateAgeSlider('rate');
            calculator.updateAgeSlider('year');
        },
        init: function (type) {
            document.title = '複利計算';
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
                if (type === 'money' && calculator['type'] === 'capital') {
                    layer.msg('複利終值不可大於1000萬');
                } else {
                    layer.msg(calculator[type + 'Tips']['get']);
                }
            } else if (calculator[type] < calculator[type + 'Min']) {
                calculator[type] = calculator[type + 'Min'];
                !handle && layer.msg(calculator[type + 'Tips']['let']);
                if (type === 'money' && calculator['type'] === 'capital') {
                    layer.msg('複利終值不可小於0');
                } else {
                    layer.msg(calculator[type + 'Tips']['let']);
                }
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
            if (calculator.money && calculator.money >= calculator.moneyMin && calculator.money <= calculator.moneyMax &&
                (calculator.rate === 0 || (calculator.rate && calculator.rate >= calculator.rateMin && calculator.rate <= calculator.rateMax)) &&
                calculator.year && calculator.year >= calculator.yearMin && calculator.year <= calculator.yearMax) {
                if (calculator.type === 'final') {
                    calculator.moneyTitle = Math.round(calculator.money * Math.pow(1 + calculator.rate * 0.01, calculator.year)).formatMoney(0);
                    calculator.resetMoney();
                } else {
                    var money = calculator.money / Math.pow(1 + calculator.rate * 0.01, calculator.year);
                    if (money < 1) {
                        calculator.moneyTitle = parseFloat(parseFloat(money).toFixed(9)).formatMoney(9);
                    } else {
                        calculator.moneyTitle = Math.round(money).formatMoney(0);
                    }
                }
            } else {
                calculator.moneyTitle = '$0';
            }
        },
        iphoneXLayout: function () {
            let calculator = this;
            // 兼容iphoneX布局
            if (window.screen.height >= 812) {
                calculator.inIphoneX = true;
            }
        },
        resetMoney: function () {
            let calculator = this;
            var moneyLength = calculator.moneyTitle.length;
            if (moneyLength === 15 || moneyLength === 16) {
                $('.rich-age-box').css({
                    width: '1.6rem',
                    right: '.2rem'
                });
            } else {
                $('.rich-age-box').css({
                    width: '1.9rem',
                    right: '.1rem'
                });
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