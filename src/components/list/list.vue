<template>
  <ul class="card-list">
    <li v-for="(item, index) in lists">
      <span class="card-list-num">{{index+1}}</span><router-link :to="{path:item.link}">{{item.name}}</router-link>
    </li>
    <li v-for="(item, index) in iberList">
      <span class="card-list-num">{{lists.length + index + 1}}</span><span>{{item.title}}</span>
    </li>
  </ul>
</template>

<script src="./list.js"></script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./list.css"></style>
