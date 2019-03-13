"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Input = function Input(container) {
  _classCallCheck(this, Input);

  container.addEventListener('click', function (e) {
    console.log(e);
    console.log('the canvas was clicked');
  });
};