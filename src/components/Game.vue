<template>
  <div id='gameScreen'></div>
</template>

<script>
  /* eslint-disable no-unused-vars */
  import 'pixi'
  import 'p2'
  import Phaser from 'phaser'
  var ruinTileset = require('../assets/classical_ruin_tiles.png')
  console.log(ruinTileset)
  var ruinTilemap = require('../assets/tester.csv')
  console.log(ruinTilemap)
  var map
  var layer
/* eslint-enable no-unused-vars */
  var Game = {}

  Game.Boot = function (game) { }
  Game.Preloader = function (game) { }
  Game.MainGame = function (game) { }

  Game.Boot.prototype = {
    init: function () {
      this.input.maxPointers = 1
      this.stage.disableVisibiliyChange = true
    },
    preload: function () {
      console.log('boot')
      // TODO: add loading bar
    },
    create: function () {
      this.state.start('Preloader')
    }
  }

  Game.Preloader.prototype = {
    preload: function () {
      console.log('preload')
      this.time.advancedTiming = true
      // TODO: load assets
      this.load.image('ruinTileset', ruinTileset)
      this.load.tilemap('ruinTilemap', '../assets/tester.csv', null, Phaser.Tilemap.CSV)
    },
    create: function () {
      this.state.start('MainGame')
    }
  }

  Game.MainGame.prototype = {
    create: function () {
      console.log('maingame')
      this.stage.backgroundColor = '#3A5963'
      // map = this.add.tilemap('ruinTilemap', 16, 16)
      // map.addTilesetImage('ruinTileset')
      // layer = map.createLayer(0)
      // layer.resizeWorld()
    },
    update: function () {

    }
  }

  export default{
    name: 'game',
    props: {
      width: Number,
      height: Number
    },
    mounted () {
      if (this.game == null) {
        this.game = new Phaser.Game(this.width, this.height, Phaser.AUTO, this.$el)
        this.game.state.add('Boot', Game.Boot)
        this.game.state.add('Preloader', Game.Preloader)
        this.game.state.add('MainGame', Game.MainGame)
        this.game.state.start('Boot')
      }
    },
    destroyed () {
      this.game.destroy()
    },
    data () {
      return {
        game: null
      }
    }
  }
</script>

<style>
  #gameScreen {
    margin: 0 auto;
  }

  #gameScreen canvas {
    display: block;
    margin: 0 auto;
  }
</style>
