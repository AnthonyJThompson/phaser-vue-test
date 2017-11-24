<template>
  <div id='gameScreen'></div>
</template>

<script>
  /* eslint-disable no-unused-vars */
  import 'pixi'
  import 'p2'
  import Phaser from 'phaser'
  var ruinTiles = require('../assets/newtile.png')
  var bTiles = require('../assets/classical_ruin_tiles.png')
  var testerCsv = require('../assets/tester.csv')
  var bCsv = require('../assets/background.csv')
  var mario = require('../assets/mario.png')
  var timer = require('../assets/time.png')

  var map
  var bMap
  var layer
  var bLayer
  var player
  var cursors
  var scale
  var stepsDisplay
  var steps = 0
  var event
  var eventtime = {
    time: 360,
    bar: {}
  }
  var paused = false
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
      this.world.setBounds(0, 0, 9600, 480)
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
      this.scale.refresh()
      // TODO: load assets
      this.load.image('tiles', ruinTiles)
      this.load.image('bTiles', bTiles)
      this.load.image('timer', timer)
      this.load.spritesheet('mario', mario, 16, 28)
      this.load.tilemap('map', testerCsv, null, Phaser.Tilemap.CSV)
      this.load.tilemap('bMap', bCsv, null, Phaser.Tilemap.CSV)
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
      bMap = this.add.tilemap('bMap', 32, 32)
      bMap.addTilesetImage('bTiles')
      bLayer = bMap.createLayer(0, 9600, 480)

      map = this.add.tilemap('map', 96, 96)
      map.addTilesetImage('tiles')
      map.setCollision([0])
      layer = map.createLayer(0, 9600, 480)

      // init player
      player = this.add.sprite(1000, 360, 'mario')
      player.animations.add('idle', [0], 1, false)
      player.animations.add('run', [3, 4], 20, true)
      player.animations.play('idle')
      player.anchor.set(0.5)
      this.camera.follow(player)

      // physics
      this.physics.arcade.enable(player)
      player.body.onCollide = new Phaser.Signal()
      player.body.onCollide.add(this.startMiniGame, this)
      player.body.gravity.y = 400

      // init controls
      cursors = this.input.keyboard.createCursorKeys()
      this.inputEnabled = true

      var help = this.add.text(16, 16, 'right arrow or click to move', { font: '12px Arial', fill: '#ffffff' })
      help.fixedToCamera = true

      stepsDisplay = this.add.text(16, 32, 'Steps:', { font: '12px Arial', fill: '#ffffff' })
      stepsDisplay.fixedToCamera = true

      eventtime.bar = this.add.sprite(60, 60, 'timer')
      eventtime.bar.anchor.set(0.5)
      eventtime.bar.width = eventtime.time / 360 * 100
      eventtime.bar.fixedToCamera = true
    },
    update: function () {
      this.physics.arcade.collide(player, layer)
      this.physics.arcade.collide(player, event)

      player.body.velocity.x = 0

      if (!paused) {
        if (cursors.right.isDown || this.input.activePointer.isDown) {
          player.body.velocity.x = 100
          player.animations.play('run')

          steps = steps + 0.1
          stepsDisplay.text = 'Steps: ' + Math.round(steps)

          if (Math.round(steps) % 50 === 0) {
            steps = 1
            // separate to method
            event = this.add.sprite(player.x + 400, 370, 'mario')
            event.anchor.set(0.5)
            this.physics.arcade.enable(event)
          }
        } else {
          player.animations.play('idle')
        }
      } else {
        eventtime.time--
        eventtime.bar.width = eventtime.time / 360 * 100
        if (eventtime.time <= 0) {
          paused = false
          eventtime.time = 360
          event.destroy()
        }
      }

      this.world.wrap(player, -960, false, true, false)
    },
    startMiniGame: function () {
      paused = true
      event.body.velocity.x = 0
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
        var gameRatio = this.canvasWidth / this.canvasHeight
        this.game = new Phaser.Game({ width: 241 * gameRatio, height: 241, renderer: Phaser.AUTO })
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
