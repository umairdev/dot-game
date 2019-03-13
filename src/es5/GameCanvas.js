"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var GameCanvas =
/*#__PURE__*/
function () {
  function GameCanvas(container) {
    _classCallCheck(this, GameCanvas);

    var ctx = document.getElementsByTagName(container);
    this.ctx = ctx[0];
    this.speed = 1000, //this is the rate at which new balls show up
    this.fallingSpeed = 100, // this is the rate at which the balls fall
    this.score = 0, this.input, this.nodeName = "DOT", this.dotLocationMap = {}, this.dotLocationColumns, this.collisionArray = [], this.collisionLimit = 5, this.dotMax = 100, this.dotMin = 10, this.height = this.ctx.offsetHeight, this.width = this.ctx.offsetWidth, this.paused = true, this.dots = {}, this.runGame, this.buttonNode = "BUTTON", this.points, this.counter = 0, this.scoreBoard = document.getElementById('score');
    this.actionButton = document.getElementById('actionButton');
    this.init(); //this.scoreBoard.addEventListener('scoreUpdate', this.updateScore);
  }

  _createClass(GameCanvas, [{
    key: "init",
    value: function init() {
      console.log('Game Initialized');
      this.input = new Input(this);
      this.pointsMapping();
      this.spaceMapping();
    }
  }, {
    key: "spaceMapping",
    value: function spaceMapping() {
      var columns = Math.round(this.width / this.dotMax),
          spaceObj = {};
      this.dotLocationColumns = columns;

      for (var i = 0; i < columns; i++) {
        spaceObj[i] = i * this.dotMax;
      }

      this.dotLocationMap = spaceObj;
    }
  }, {
    key: "startGame",
    value: function startGame() {
      var dots = this.dots,
          context = this.ctx[0],
          updateScore = this.updateScore,
          counter = this.counter,
          timer;
      var self = this;

      if (Object.keys(dots).length > 0) {
        for (var item in dots) {
          dots[item].animate();
        }
      }

      timer = this.runGame = setTimeout(function roll() {
        if (!window.gameCanvas.paused) {
          self.dots[self.counter] = new Dot(self, self.counter);
          self.counter++;
          timer = setTimeout(roll, window.gameCanvas.speed);
        } else {
          clearInterval(self.runGame);
        }
      }, window.gameCanvas.speed);
    }
  }, {
    key: "pauseGame",
    value: function pauseGame() {
      console.log('Game Paused');
      this.paused = true;
      clearInterval(this.runGame);
    }
  }, {
    key: "resumeGame",
    value: function resumeGame() {
      console.log('Game Resumed');
      this.paused = false;
    }
  }, {
    key: "pointsMapping",
    value: function pointsMapping() {
      var pointsMap = {
        10: 1,
        9: 2,
        8: 3,
        7: 4,
        6: 5,
        5: 6,
        4: 7,
        3: 8,
        2: 9,
        1: 10
      };
      this.points = pointsMap;
    }
  }, {
    key: "updateScore",
    value: function updateScore(id) {
      var dot = this.dots[id],
          pointKey = Math.round(dot.randomNumber / 10);
      this.score += this.points[pointKey];
      this.scoreBoard.innerText = this.score;
      dot.remove();
    }
  }, {
    key: "buttonAction",
    value: function buttonAction() {
      if (this.paused) {
        this.paused = false;
        this.startGame();
        this.actionButton.innerText = 'Pause';
      } else {
        this.paused = true;
        this.pauseGame();
        this.actionButton.innerText = 'Start';
      }
    }
  }]);

  return GameCanvas;
}();