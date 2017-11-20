<template>
  <div id='gameScreen'></div>
</template>

<script>
  /* eslint-disable no-unused-vars */
  import 'pixi'
  import 'p2'
  import Phaser from 'phaser'
  import logo from '../assets/logo.png'
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
      // TODO: add loading bar
    },
    create: function () {
      this.state.start('Preloader')
    }
  }

  Game.Preloader.prototype = {
    preload: function () {
      this.time.advancedTiming = true
      // TODO: load assets
      this.load.image('logo', logo)
    },
    create: function () {
      this.state.start('MainGame')
    }
  }

  Game.MainGame.prototype = {
    create: function () {
      this.stage.backgroundColor = '#3A5963'
      this.add.sprite(0, 0, 'logo')
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
