class Input {
	constructor(container) {

		this.parent = container;

		this.init();
	}

	init() {
		let self = this,
			slider = document.getElementById("gameSpeed");

		document.addEventListener('click', (e) => {
			self.clickEvent(e);
		});

		self.parent.fallingSpeed = slider.value;
		slider.oninput = function() {
			self.parent.fallingSpeed = slider.value;
		}
	}

	clickEvent(e) {
		if (e.target.nodeName == this.parent.nodeName){
			if(!this.parent.paused) {
				this.parent.updateScore(e.target.id);
			}
		}

		if (e.target.nodeName == this.parent.buttonNode) {
			this.parent.buttonAction();
		}
	}
}