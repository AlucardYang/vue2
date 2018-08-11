
<template>
  <section id="calculator" class="calculator-page" :style="{'padding-bottom': inApp ? 0 : '.94rem'}">
    <router-link class="go-back" :to="{path:'/list'}">返回</router-link>
    <div class="top-main-content">
      <img class="top-main-bg" :src="bannerSrc" alt="">
      <div class="rich-age-box">
        <span class="rich-age">{{richAge}}歲</span><br>
        <span class="rich-age-text">您將成為千萬富翁</span>
      </div>
    </div>
    <div class="bottom-main-content" :class="{'loose': inIphoneX}">
      <div class="bottom-main-tip" :class="{'loose': inIphoneX}">拖動按鈕查看您幾時成為千萬富翁</div>
      <div class="row-block" :class="{'loose': inIphoneX}">
        <div class="input-box">
          <span class="input-box-left">現在年齡：</span>
          <div class="input-box-right max">
            <input id="ageInput" class="input-box-right-input" type="number" pattern="[0-9]*" v-model="age" name="age" :min="ageMin" :max="ageMax" :step="ageStep" :placeholder="ageMin + '-' + ageMax" @input="inputChange('age')" @blur="inputChange('age', 'blur')">
            <span class="input-box-right-unit">歲</span>
          </div>
        </div>
        <div class="drag-progress-box">
          <input id="ageSlider" type="text">
          <span v-for="(item, index) in ageValues" class="owner-grid-text" v-text="item" :style="{left: parseInt(item) * 1.427 + 0.4 + '%'}"></span>
          <span v-for="(item, index) in ageValues" class="irs-grid-pol" :style="{left: 100 / 7 * index + '%'}"></span>
          <span v-for="(item, index) in ageValues" class="irs-grid-pol small" :class="{'display-none': index === 7}" :style="{left: 100 / 7 * (index + 0.5) + '%'}"></span>
        </div>
      </div>
      <div class="row-block" :class="{'loose': inIphoneX}">
        <div class="input-box">
          <span class="input-box-left">每月投資：</span>
          <div class="input-box-right max">
            <input id="moneyInput" class="input-box-right-input" type="number" pattern="[0-9]*" v-model="money" name="money" :min="moneyMin" :max="moneyMax" :step="moneyStep" :placeholder="moneyMin + '-' + moneyMax" :style="{'top': moneyInputTop, 'z-index': 1, right: '.1rem'}" @input="inputChange('money')" @blur="inputChange('money', 'blur')">
            <div class="input-box-right-input" @click="inputFocus()" style="right: .1rem">{{moneyString}}</div>
            <span class="input-box-right-unit">$</span>
          </div>
        </div>
        <div class="drag-progress-box">
          <input id="moneySlider" type="text">
          <span v-for="(item, index) in moneyValues" class="owner-grid-text" v-text="item" :style="{left: parseInt(item) * 0.5 + 0.4 + '%'}"></span>
          <span v-for="(item, index) in moneyValues" class="irs-grid-pol" :style="{left: 100 / 5 * index + '%'}"></span>
          <span v-for="(item, index) in moneyValues" class="irs-grid-pol small" :class="{'display-none': index === 5}" :style="{left: 100 / 5 * (index + 0.5) + '%'}"></span>
        </div>
      </div>
      <div class="row-block" :class="{'loose': inIphoneX}">
        <div class="input-box">
          <span class="input-box-left">每年回報率：</span>
          <div class="input-box-right">
            <input id="rateInput" class="input-box-right-input" type="number" v-model="rate" name="rate" :min="rateMin" :max="rateMax" :step="rateStep" :placeholder="rateMin + '-' + rateMax" @input="inputChange('rate')" @blur="inputChange('rate', 'blur')" @keydown="preventNotNumber($event)" style="right: .14rem">
            <span class="input-box-right-unit">%</span>
          </div>
        </div>
        <div class="drag-progress-box">
          <input id="rateSlider" type="text">
          <span v-for="(item, index) in rateValues" class="owner-grid-text" v-text="item" :style="{left: parseInt(item) * 5 + 0.4 + '%'}"></span>
          <span v-for="(item, index) in rateValues" class="irs-grid-pol" :style="{left: 100 / 5 * index + '%'}"></span>
          <span v-for="(item, index) in rateValues" class="irs-grid-pol small" :class="{'display-none': index === 5}" :style="{left: 100 / 5 * (index + 0.5) + '%'}"></span>
        </div>
      </div>
    </div>
    <div v-if="!inApp" class="calc-footer-tip">諮詢財富顧問，成就您的千萬富翁</div>
    <footer v-if="!inApp" class="calc-footer">
      <div class="head-image">
        <img class="head-image-avatar" :src="avatar" alt="">
        <img v-if="is_realname_verified" class="head-image-vip" src="../../../static/images/calculator/realnameauth.png">
      </div>
      <div class="name-number-box overflow-ellipsis">
        <span>{{name}}</span><br>
        <span>(+{{mobile_pre}})&nbsp;{{mobile}}</span>
      </div>
      <img class="qrcode-box" :src="qr_code_src" alt="">
    </footer>
  </section>
</template>

<script src="./apptenmillioncalc.js"></script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="../../../static/css/ion.rangeSlider.css"></style>
<style src="../../../static/css/ion-range-slider-hack.css"></style>
<style scoped src="./apptenmillioncalc.css"></style>

