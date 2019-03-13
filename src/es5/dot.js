"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Dot =
/*#__PURE__*/
function () {
  function Dot(container) {
    _classCallCheck(this, Dot);

    this.item = document.createElement('div');
    this.width = container.offsetWidth;
    this.randomNumber;
    this.height = container.offsetHeight;
    this.position;
    this.speed = 50;
    this.container = container;
    this.move;
    this.randomSize();
    this.randomPosition();
    this.item.style.cssText = "height: " + this.randomNumber + "px;width: " + this.randomNumber + "px;background-color: #bbb;border-radius: 50%;display: inline-block;position: absolute; left:" + this.position + "px; top: 0;";
    this.ctx = container.appendChild(this.item);
    this.animate(this.ctx, this.height);
    this.score();
  }

  _createClass(Dot, [{
    key: "randomSize",
    value: function randomSize() {
      this.randomNumber = Math.floor(Math.random() * 90) + 10;
    }
  }, {
    key: "randomPosition",
    value: function randomPosition() {
      this.position = Math.floor(Math.random() * this.width);

      if (this.width - this.position < this.randomNumber) {
        this.position = this.position - this.randomNumber;
      }
    }
  }, {
    key: "animate",
    value: function animate(ctx, height) {
      var move = this.move = setInterval(frame, 50);
      var pos = 0,
          dotHeight = this.randomNumber,
          container = this.container;

      function frame() {
        if (pos > height + dotHeight) {
          clearInterval(move);
          container.removeChild(ctx);
        } else {
          pos++;
          ctx.style.top = pos + 'px';
        }
      }
    }
  }, {
    key: "score",
    value: function score() {
      var container = this.container,
          move = this.move,
          ctx = this.ctx,
          size = this.randomNumber;
      ctx.addEventListener('click', clickEvent);

      function clickEvent() {
        clearInterval(move);
        container.removeChild(ctx);
        ctx.removeEventListener('click', clickEvent);
        window.gameCanvas.score += Math.round(size / 10);
      }
    }
  }]);

  return Dot;
}();