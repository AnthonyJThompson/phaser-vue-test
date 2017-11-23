<template>
  <div>
    <Game :width="width" :height="height" />
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import Game from './Game.vue'
/* eslint-enable no-unused-vars */

export default {
  name: 'hello',
  components: {
    'Game': Game
  },
  data () {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
