class Dot {
	constructor(container) {
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

		this.animate(this.ctx,this.height);
		this.score();
	}

	randomSize() {
		this.randomNumber =  Math.floor(Math.random() * 90) + 10;
	}

	randomPosition() {
		this.position =  Math.floor(Math.random() * this.width);
		if ((this.width - this.position) < this.randomNumber) {
			this.position = this.position - this.randomNumber;
		}
	}

	animate(ctx,height) {
		let move = this.move = setInterval(frame, 50);
		let pos = 0,
			dotHeight = this.randomNumber,
			container = this.container;

		function frame() {
			if (pos > height+dotHeight){
				clearInterval(move);
				container.removeChild(ctx);

			} else {
				pos++;
				ctx.style.top = pos + 'px';
			}
		}
	}

	score() {
		let container = this.container,
			move = this.move,
			ctx = this.ctx,
			size = this.randomNumber;

		ctx.addEventListener('click', clickEvent)

		function clickEvent() {
			clearInterval(move);
			container.removeChild(ctx);
			ctx.removeEventListener('click',clickEvent);
			window.gameCanvas.score += Math.round(size/10);
		}
	}

}