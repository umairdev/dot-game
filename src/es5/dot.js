"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Dot =
/*#__PURE__*/
function () {
  function Dot(parent, id) {
    _classCallCheck(this, Dot);

    this.parent = parent;
    this.container = this.parent.ctx;
    this.item = document.createElement(this.parent.nodeName);
    this.width = this.container.offsetWidth;
    this.randomNumber;
    this.height = this.container.offsetHeight;
    this.position;
    this.speed = 50;
    this.move;
    this.active = true;
    this.id = id;
    this.pos = 0;
    this.randomSize();
    this.randomPosition();
    this.item.setAttribute('id', this.id);
    this.item.style.cssText = "height: " + this.randomNumber + "px;width: " + this.randomNumber + "px;background-color: #bbb;border-radius: 50%;display: inline-block;position: absolute; left:" + this.position + "px; top: 0;";
    this.ctx = this.container.appendChild(this.item);
    this.animate();
  }

  _createClass(Dot, [{
    key: "randomSize",
    value: function randomSize() {
      this.randomNumber = Math.floor(Math.random() * 90) + 10;
    }
  }, {
    key: "randomPosition",
    value: function randomPosition() {
      var randomColumn = Math.floor(Math.random() * this.parent.dotLocationColumns),
          randomPos = this.parent.dotLocationMap[randomColumn];

      if (this.parent.collisionArray.length == this.parent.collisionLimit) {
        this.parent.collisionArray.pop();
      }

      if (this.parent.collisionArray.includes(randomColumn)) {
        this.randomPosition();
      } else {
        this.parent.collisionArray.unshift(randomColumn);
        this.position = randomPos;
      } // if ((this.width - this.position) < this.randomNumber) {
      // 	this.position = this.position - this.randomNumber;
      // }

    }
  }, {
    key: "animate",
    value: function animate() {
      var move,
          self = this,
          ctx = this.ctx,
          height = this.height,
          dotHeight = this.randomNumber,
          container = this.container;
      move = this.move = setTimeout(function moving() {
        if (!window.gameCanvas.paused) {
          if (self.pos > height + dotHeight) {
            clearInterval(move);
            self.remove();
          } else {
            self.pos++;
            self.ctx.style.top = self.pos + 'px';
            move = setTimeout(moving, 1000 / self.parent.fallingSpeed);
          }
        } else {
          clearInterval(self.move);
        }
      }, 100);
    }
  }, {
    key: "remove",
    value: function remove() {
      this.active = false;
      this.ctx.remove();
    }
  }]);

  return Dot;
}();