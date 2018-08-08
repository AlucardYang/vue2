<template>
  <section id="appCardTemplate" class="card-template-box">
    <router-link class="go-back" :to="{path:'/list'}">返回</router-link>
    <div class="card-template">
      <transition name="fade-in">
        <div v-show="showHappy">
          <img class="card-video-happy-bg" src="/static/images/card/birthday/video1happybg.png" alt="">
          <img class="card-video-happy" src="/static/images/card/birthday/video1happy.png" alt="">
        </div>
      </transition>
      <transition name="fade-in">
        <div class="card-main-content" v-show="show">
          <img class="card-video-blue-ng" src="/static/images/card/birthday/video1bluebg.png" alt="">
          <div class="head-from-box">
            <div class="head-from-center">
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
            </div>
          </div>
          <div class="card-tv-image">
            <img class="full-content" src="/static/images/card/birthday/tv.png" alt="">
            <div class="video-content">
              <img class="full-content" src="/static/images/card/birthday/videodefault.png" alt="">
              <div v-show="showMask" class="video-mask" :class="{'video-mask-light': videoSrc}"></div>
              <video id="videoPlayer" v-if="videoSrc" class="video-area video-js vjs-big-play-centered" webkit-playsinline playsinline controlslist="nodownload" :poster="videoPosterUrl" @loadstart="setPoster()">
                <source :src="videoSrc" type='video/mp4'>
                <source :src="videoWebmSrc" type="video/webm">
              </video>
              <div v-show="!videoSrc" class="video-tip">視頻</div>
              <span v-show="!videoSrc" class="video-max-time">5:00</span>
            </div>
            <a v-if="videoSrc" id="cardThanks" class="thank-reply-button" href="javascript:void(0);" @click="goiBerH5()">
              感謝他/她的祝福
            </a>
          </div>
        </div>
      </transition>
    </div>
  </section>
</template>

<script src="./videobirthdaycard1.js"></script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="video.js/dist/video-js.css"></style>
<style src="../../../static/css/videohack.css"></style>
<style scoped src="./videobirthdaycard1.css"></style>

