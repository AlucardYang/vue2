<template>
  <section id="appCardTemplate" class="card-template-box" :style="{'background-image': bgImageUrl}">
    <router-link class="go-back" :to="{path:'/list'}">返回</router-link>
    <div class="card-template">
      <transition name="fade-in">
        <div v-show="showHappy">
          <img class="card-text-happy" src="../../../static/images/card/birthday/text2happy.png" alt="">
          <img class="card-text-cake" src="../../../static/images/card/birthday/text2cake.png" alt="">
        </div>
      </transition>
      <transition name="fade-in">
        <div v-show="show">
          <div class="card-from">
            <div class="head-image-box">
              <span class="head-image" :style="{'background-image': avatar}"></span>
            </div>
            <span class="from-wish">
              <span>這是一份來自</span>
              <!--
                                    -->
              <span class="from-user-name overflow-ellipsis" v-text="userName" :title="userName"></span>
              <!--
                                     -->
              <span>的生日祝福</span>
            </span>
          </div>

          <div v-if="type === 'text'" class="card-text">
            <div class="dear-user">親愛的
              <span v-if="!isApp">{{c_user_name}}</span>：</div>
            <div id="cardTextContent" class="card-text-content">
              <span class="card-text-span" v-text="text"></span>
            </div>
          </div>
          <div v-if="!text" class="text-tip">快來寫下您對她/他的祝福吧！</div>
        </div>
      </transition>
      <transition name="fade-in">
        <a id="cardThanks" v-show="showThankBtn" class="thank-reply-button" href="javascript:void(0);" @click="goiBerH5()">
          感謝他/她的祝福
        </a>
      </transition>
    </div>
  </section>
</template>

<script src="./textbirthdaycard2.js"></script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./textbirthdaycard2.css"></style>
