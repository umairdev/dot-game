class GameCanvas {
	constructor(container) {
		let ctx = document.getElementsByTagName(container);

		this.ctx = ctx[0];
		this.speed = 1000, //this is the rate at which new balls show up
		this.fallingSpeed = 100, // this is the rate at which the balls fall
		this.score = 0,
		this.input,
		this.nodeName = "DOT",
		this.dotLocationMap = {},
		this.dotLocationColumns,
		this.collisionArray = [],
		this.collisionLimit = 5,
		this.dotMax = 100,
		this.dotMin = 10,
		this.height = this.ctx.offsetHeight,
		this.width = this.ctx.offsetWidth,
		this.paused = true,
		this.dots = {},
		this.runGame,
		this.buttonNode = "BUTTON",
		this.points,
		this.counter = 0,
		this.scoreBoard = document.getElementById('score');
		this.actionButton = document.getElementById('actionButton');

		this.init();

		//this.scoreBoard.addEventListener('scoreUpdate', this.updateScore);
	}

	init() {
		console.log('Game Initialized');

		this.input = new Input(this);
		this.pointsMapping();
		this.spaceMapping();
	}

	spaceMapping() {
		let columns = Math.round(this.width / this.dotMax),
			spaceObj = {};

		this.dotLocationColumns = columns;

		for (let i=0;i<columns;i++){
			spaceObj[i] = i*this.dotMax;
		}

		this.dotLocationMap = spaceObj;
	}

	startGame() {
		let dots = this.dots,
			context = this.ctx[0],
			updateScore = this.updateScore,
			counter = this.counter,
			timer;
		let self = this;

		if (Object.keys(dots).length > 0) {
			for (let item in dots){
				dots[item].animate();
			}
		}

		timer = this.runGame = setTimeout(function roll() {
			if (!window.gameCanvas.paused) {
			    self.dots[self.counter] = new Dot(self,self.counter);
			    self.counter++;
			    timer = setTimeout(roll, window.gameCanvas.speed);
			  } else {
			  	clearInterval(self.runGame);
			  }
		}, window.gameCanvas.speed);
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

	pointsMapping() {
		let pointsMap = {
			10	: 1,
			9	: 2,
			8	: 3,
			7	: 4,
			6	: 5,
			5	: 6,
			4	: 7,
			3	: 8,
			2	: 9,
			1	: 10 
		}

		this.points = pointsMap;
	}

	updateScore(id) {
		let dot = this.dots[id],
			pointKey = Math.round(dot.randomNumber/10);

		this.score += this.points[pointKey];
		this.scoreBoard.innerText = this.score;
		dot.remove();
	}


	buttonAction() {
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
}