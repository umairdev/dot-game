class GameCanvas {
	constructor(container) {
		this.ctx = document.getElementsByTagName(container);

		this.speed = 10,
		this.score = 0,
		this.input,
		this.paused = false,
		this.dots,
		this.runGame;

		this.init();
	}

	init() {
		console.log('Game Initialized');

		//this.input = new Input(this.ctx[0]);
		this.startGame()
	}

	startGame() {
		let dots = this.dots = new Array(),
			context = this.ctx[0],
			updateScore = this.updateScore;
		this.runGame = setInterval(function() {
		  if (!this.paused) {
		    dots[dots.length] = new Dot(context);
		  } else {
		  	clearInterval(this.runGame);
		  }
		}, 1000);
	}

	pauseGame() {
		console.log('Game Paused');
		this.paused = true;
		clearInterval(this.runGame);
	}

	resumeGame() {
		console.log('Game Resumed');
		this.paused = false;
	}
}