<template>
  <section id="appCardTemplate" class="card-template-box">
    <router-link class="go-back" :to="{path:'/list'}">返回</router-link>
    <div class="card-template">
      <transition name="fade-in">
        <div v-show="showHappy">
          <img class="card-left-flower" src="/static/images/card/birthday/video2leftflower.png" alt="">
          <img class="card-right-flower" src="/static/images/card/birthday/video2rightflower.png" alt="">
          <img class="card-leaf" src="/static/images/card/birthday/video2leaf.png" alt="">
        </div>
      </transition>
      <transition name="fade-in">
        <div class="card-main-content" v-show="show">
          <div class="head-image-box">
            <span class="head-image" :style="{'background-image': avatar}"></span>
          </div>
          <div class="from-wish">
            <span>這是一份來自</span>
            <!--
                                -->
            <span class="from-user-name overflow-ellipsis" v-text="userName" :title="userName"></span>
            <!--
                                -->
            <span>的生日祝福</span>
          </div>
          <div class="video2-happy-box">
            <img class="video2-happy" src="/static/images/card/birthday/video2happy.png" alt="">
          </div>
          <div class="video-image">
            <img class="full-content" src="/static/images/card/birthday/video2film.png" alt="">
            <div class="video-content">
              <img class="full-content" :class="{'opacity-0': videoSrc}" src="/static/images/card/birthday/videodefault.png" alt="">
              <div v-show="!videoSrc && showMask" class="video-mask" :class="{'video-mask-light': videoSrc}"></div>
              <video id="videoPlayer" v-if="videoSrc" class="video-area video-js vjs-big-play-centered" webkit-playsinline playsinline controlslist="nodownload" :poster="videoPosterUrl" @loadstart="setPoster()">
                <source :src="videoSrc" type='video/mp4'>
                <source :src="videoWebmSrc" type="video/webm">
              </video>
              <div v-show="!videoSrc" class="video-tip">視頻</div>
              <span v-show="!videoSrc" class="video-max-time">5:00</span>
            </div>
          </div>
          <a id="cardThanks" class="thank-reply-button" href="javascript:void(0);" v-if="videoSrc" @click="goiBerH5()">
            感謝他/她的祝福
          </a>
        </div>
      </transition>
    </div>
  </section>
</template>

<script src="./videobirthdaycard2.js"></script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="video.js/dist/video-js.css"></style>
<style src="../../../static/css/videohack.css"></style>
<style scoped src="./videobirthdaycard2.css"></style>

