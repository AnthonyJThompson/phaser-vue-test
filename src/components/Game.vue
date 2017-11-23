<template>
  <div id='gameScreen'></div>
</template>

<script>
  /* eslint-disable no-unused-vars */
  import 'pixi'
  import 'p2'
  import Phaser from 'phaser'
  var ruinTiles = require('../assets/classical_ruin_tiles.png')
  var testerCsv = require('../assets/tester.csv')
  var bear = require('../assets/bear.png')

  var map
  var layer
  var player
  var cursors
  var scale
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
      this.physics.startSystem(Phaser.Physics.ARCADE)
      // TODO: load assets
      this.load.image('tiles', ruinTiles)
      this.load.image('bear', bear)
      this.load.tilemap('map', testerCsv, null, Phaser.Tilemap.CSV)
    },
    create: function () {
      this.state.start('MainGame')
    }
  }

  Game.MainGame.prototype = {
    create: function () {
      // init tilemap and layer
      console.log('maingame')
      this.stage.backgroundColor = '#3A5963'
      map = this.add.tilemap('map', 16, 16)
      map.addTilesetImage('tiles')
      map.setCollisionBetween(0, 79)
      layer = map.createLayer(0, 240, 240)
      layer.fixedToCamera = false
      var w = document.documentElement.clientWidth
      var h = document.documentElement.clientHeight
      scale = (w > h ? h / 240 : w / 240)
      layer.setScale(scale)
      layer.bottom = h

      // init player
      player = this.add.sprite(0, 0, 'bear')
      player.scale.set(0.1 * scale)

      // physics
      this.physics.arcade.enable(player)
      player.body.gravity.y = 400 * scale
      player.body.collideWorldBounds = true

      // init controls
      cursors = this.input.keyboard.createCursorKeys()
      var help = this.add.text(16, 16, 'Arrows to move', { font: '14px Arial', fill: '#ffffff' })
      help.fixedToCamera = true

      // scale everything if window is resized
      window.addEventListener('resize', function () {
        w = document.documentElement.clientWidth
        h = document.documentElement.clientHeight
        scale = (w > h ? h / 240 : w / 240)
        layer.setScale(scale)
        layer.bottom = h
        player.body.gravity.y = 400 * scale
        player.scale.set(0.1 * scale)
      })
    },
    update: function () {
      this.physics.arcade.collide(player, layer)

      player.body.velocity.x = player.body.velocity.x * 0.9

      if (cursors.left.isDown) {
        player.body.velocity.x += -10 * scale
      }
      if (cursors.right.isDown) {
        player.body.velocity.x += 10 * scale
      }
      if (cursors.up.isDown && player.body.onFloor()) {
        player.body.velocity.y = -150 * scale
      }
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
        this.game = new Phaser.Game({ renderer: Phaser.AUTO, scaleMode: Phaser.ScaleManager.RESIZE })
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
