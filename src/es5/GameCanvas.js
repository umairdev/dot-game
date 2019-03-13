"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var GameCanvas =
/*#__PURE__*/
function () {
  function GameCanvas(container) {
    _classCallCheck(this, GameCanvas);

    this.ctx = document.getElementsByTagName(container);
    this.speed = 10, this.score = 0, this.input, this.paused = false, this.dots, this.runGame;
    this.init();
  }

  _createClass(GameCanvas, [{
    key: "init",
    value: function init() {
      console.log('Game Initialized'); //this.input = new Input(this.ctx[0]);

      this.startGame();
    }
  }, {
    key: "startGame",
    value: function startGame() {
      var dots = this.dots = new Array(),
          context = this.ctx[0],
          updateScore = this.updateScore;
      this.runGame = setInterval(function () {
        if (!this.paused) {
          dots[dots.length] = new Dot(context);
        } else {
          clearInterval(this.runGame);
        }
      }, 1000);
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
  }]);

  return GameCanvas;
}();