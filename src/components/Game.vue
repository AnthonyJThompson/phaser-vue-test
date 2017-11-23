<template>
  <div id='gameScreen'></div>
</template>

<script>
  /* eslint-disable no-unused-vars */
  import 'pixi'
  import 'p2'
  import Phaser from 'phaser'
<<<<<<< HEAD
  var ruinTileset = require('../assets/classical_ruin_tiles.png')
  console.log(ruinTileset)
  var ruinTilemap = require('../assets/tester.csv')
  console.log(ruinTilemap)
  var map
  var layer
/* eslint-enable no-unused-vars */
=======
  import logo from '../assets/logo.png'
  /* eslint-enable no-unused-vars */
>>>>>>> 8aa2781b032efb3ff0dd0b86268240721a22615b
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
<<<<<<< HEAD
      this.load.image('ruinTileset', ruinTileset)
      this.load.tilemap('ruinTilemap', '../assets/tester.csv', null, Phaser.Tilemap.CSV)
=======
      this.load.image('logo', logo)
>>>>>>> 8aa2781b032efb3ff0dd0b86268240721a22615b
    },
    create: function () {
      this.state.start('MainGame')
    }
  }

  Game.MainGame.prototype = {
    create: function () {
      console.log('maingame')
      this.stage.backgroundColor = '#3A5963'
<<<<<<< HEAD
      // map = this.add.tilemap('ruinTilemap', 16, 16)
      // map.addTilesetImage('ruinTileset')
      // layer = map.createLayer(0)
      // layer.resizeWorld()
=======
      this.add.sprite(0, 0, 'logo')
>>>>>>> 8aa2781b032efb3ff0dd0b86268240721a22615b
    },
    update: function () {

    }
  }

  export default{
    name: 'game',
    data () {
      return {
        game: null
      }
    },
    mounted () {
      if (this.game == null) {
        this.game = new Phaser.Game({ renderer: Phaser.CANVAS, scaleMode: Phaser.ScaleManager.RESIZE })
        this.game.state.add('Boot', Game.Boot)
        this.game.state.add('Preloader', Game.Preloader)
        this.game.state.add('MainGame', Game.MainGame)
        this.game.state.start('Boot')
      }
    },
    computed: {
      canvasWidth: function () {
        return document.documentElement.clientWidth
      },
      canvasHeight: function () {
        return document.documentElement.clientHeight
      }
    },
    destroyed () {
      this.game.destroy()
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
