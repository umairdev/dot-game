"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Input =
/*#__PURE__*/
function () {
  function Input(container) {
    _classCallCheck(this, Input);

    this.parent = container;
    this.init();
  }

  _createClass(Input, [{
    key: "init",
    value: function init() {
      var self = this,
          slider = document.getElementById("gameSpeed");
      document.addEventListener('click', function (e) {
        self.clickEvent(e);
      });
      self.parent.fallingSpeed = slider.value;

      slider.oninput = function () {
        self.parent.fallingSpeed = slider.value;
      };
    }
  }, {
    key: "clickEvent",
    value: function clickEvent(e) {
      if (e.target.nodeName == this.parent.nodeName) {
        if (!this.parent.paused) {
          this.parent.updateScore(e.target.id);
        }
      }

      if (e.target.nodeName == this.parent.buttonNode) {
        this.parent.buttonAction();
      }
    }
  }]);

  return Input;
}();