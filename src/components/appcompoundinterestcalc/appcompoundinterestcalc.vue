
<template>
  <section id="calculator" class="calculator-page" :style="{'padding-bottom': inApp ? 0 : '.94rem'}">
    <router-link class="go-back" :to="{path:'/list'}">返回</router-link>
    <ul class="calc-tab-nav">
      <li :class="{'current': type === 'final'}" @click="changeType('final')">複利終值</li>
      <li :class="{'current': type === 'capital'}" @click="changeType('capital')">本金</li>
    </ul>
    <div class="top-main-content">
      <img class="top-main-bg" v-show="type === 'final'" :src="finalBannerSrc" alt="">
      <img class="top-main-bg" v-show="type === 'capital'" :src="capitalBannerSrc" alt="">
      <div class="rich-age-box" :class="{'capital': type === 'capital'}">
        <span class="rich-age">{{moneyTitle}}</span><br>
        <span class="rich-age-text">{{type === 'final'?'複利終值':'本金'}}</span>
      </div>
    </div>
    <div class="bottom-main-content" :class="{'loose': inIphoneX}">
      <div class="bottom-main-tip" :class="{'loose': inIphoneX}">拖動按鈕查看你的{{type === 'final'?'複利終值':'本金'}}</div>
      <div class="row-block" :class="{'loose': inIphoneX}">
        <div class="input-box">
          <span class="input-box-left">{{type === 'final'? '本金':'複利終值'}}：</span>
          <div class="input-box-right" :class="{'max': type === 'final'}">
            <input id="moneyInput" class="input-box-right-input" type="number" pattern="[0-9]*" v-model="money" name="money" :min="moneyMin" :max="moneyMax" :step="moneyStep" :style="{'top': moneyInputTop, 'z-index': 1, right: '.1rem'}" :placeholder="moneyMin + '-' + moneyMax" @input="inputChange('money')" @blur="inputChange('money', 'blur')">
            <div class="input-box-right-input" @click="inputFocus()" style="right: .1rem">{{moneyString}}</div>
            <span class="input-box-right-unit">$</span>
          </div>
        </div>
        <div class="drag-progress-box">
          <input id="moneySlider" type="text">
          <span v-for="(item, index) in moneyValues" class="owner-grid-text" v-text="item" :style="{left: parseInt(item) * 0.1 + 0.4 + '%'}"></span>
          <span v-for="(item, index) in moneyValues" class="irs-grid-pol" :style="{left: 100 / 5 * index + '%'}"></span>
          <span v-for="(item, index) in moneyValues" class="irs-grid-pol small" :class="{'display-none': index === 5}" :style="{left: 100 / 5 * (index + 0.5) + '%'}"></span>
        </div>
      </div>
      <div class="row-block" :class="{'loose': inIphoneX}">
        <div class="input-box">
          <span class="input-box-left">年利率比：</span>
          <div class="input-box-right">
            <input id="rateInput" class="input-box-right-input" type="number" v-model="rate" name="rate" :min="rateMin" :max="rateMax" :step="rateStep" :placeholder="rateMin + '-' + rateMax" @input="inputChange('rate')" @blur="inputChange('rate', 'blur')" @keydown="preventNotNumber($event)" style="right: .14rem">
            <span class="input-box-right-unit">%</span>
          </div>
        </div>
        <div class="drag-progress-box">
          <input id="rateSlider" type="text">
          <span v-for="(item, index) in rateValues" class="owner-grid-text" v-text="item" :style="{left: parseInt(item) * 3.33 + 0.4 + '%'}"></span>
          <span v-for="(item, index) in rateValues" class="irs-grid-pol" :style="{left: 100 / 6 * index + '%'}"></span>
          <span v-for="(item, index) in rateValues" class="irs-grid-pol small" :class="{'display-none': index === 6}" :style="{left: 100 / 6 * (index + 0.5) + '%'}"></span>
        </div>
      </div>
      <div class="row-block" :class="{'loose': inIphoneX}">
        <div class="input-box">
          <span class="input-box-left">存入年限：</span>
          <div class="input-box-right">
            <input id="yearInput" class="input-box-right-input" type="number" pattern="[0-9]*" v-model="year" name="year" :min="yearMin" :max="yearMax" :step="yearStep" :placeholder="yearMin + '-' + yearMax" @input="inputChange('year')" @blur="inputChange('year', 'blur')">
            <span class="input-box-right-unit">年</span>
          </div>
        </div>
        <div class="drag-progress-box">
          <input id="yearSlider" type="text">
          <span v-for="(item, index) in yearValues" class="owner-grid-text" v-text="item" :style="{left: parseInt(item) * 1 + 0.4 + '%'}"></span>
          <span v-for="(item, index) in yearValues" class="irs-grid-pol" :style="{left: 100 / 5 * index + '%'}"></span>
          <span v-for="(item, index) in yearValues" class="irs-grid-pol small" :class="{'display-none': index === 5}" :style="{left: 100 / 5 * (index + 0.5) + '%'}"></span>
        </div>
      </div>
    </div>
    <div v-if="!inApp" class="calc-footer-tip">諮詢財富顧問，讓您的財富穩步增長</div>
    <footer v-if="!inApp" class="calc-footer">
      <div class="head-image">
        <img class="head-image-avatar" :src="avatar" alt="">
        <img v-if="is_realname_verified" class="head-image-vip" src="/static/images/calculator/realnameauth.png">
      </div>
      <div class="name-number-box overflow-ellipsis">
        <span>{{name}}</span><br>
        <span>(+{{mobile_pre}})&nbsp;{{mobile}}</span>
      </div>
      <img class="qrcode-box" :src="qr_code_src" alt="">
    </footer>
  </section>
</template>

<script src="./appcompoundinterestcalc.js"></script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="../../../static/css/ion.rangeSlider.css"></style>
<style src="../../../static/css/ion-range-slider-hack.css"></style>
<style scoped src="./appcompoundinterestcalc.css"></style>

