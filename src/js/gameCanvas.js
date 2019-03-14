class GameCanvas {
	constructor(container) {
		let ctx = document.getElementsByTagName(container);

		//instance properties
		this.ctx = ctx[0], //context of this instance
		this.height = this.ctx.offsetHeight, //instance html height
		this.width = this.ctx.offsetWidth, //instance html weight

		//configurations properties
		this.buttonNode = "BUTTON", //specifying button node type
		this.nodeName = "DOT", //specifying child node type
		this.speed = 1000, //rate at which new balls show up
		this.fallingSpeed = 100, //rate at which the balls fall
		this.dotMax = 100, //max dot size
		this.dotMin = 10, //min dot size
		this.collisionLimit = 5, //number of items to main in collision array

		//game engine properties
		this.dotLocationMap = {}, //map of dot positions
		this.dotLocationColumns, //number of columns based on dot Max
		this.collisionArray = [], //to place new items in new locations
		this.points, //point calculation object
		this.imageId = "baloon", //svg image container id for dots
		this.bonusId = "bonus", //svg image container id for bonus score
		this.imageSvg, //template svg
		this.bonusSvg, //bonus dot image svg
		this.colorPalette, //colors for svg
		
		//game runTime properties
		this.score = 0, //game score
		this.input, //instance of input class
		this.paused = true, //state of game
		this.dots = {}, //list of all dots created in game
		this.runGame, //run method which will be assigned setTimeOut
		this.counter = 0, //counter of number of dots in game
		this.scoreBoard, //current score of instance
		this.startButton; //reference to game start button

		this.init();
	}

	//Initialize the instance
	init() {
		this.input = new Input(this);
		this.scoreBoard = document.getElementById('score');
		this.startButton = document.getElementById('startButton');
		
		this.readSvg();
		this.pointsMapping();
		this.spaceMapping();
		this.colorSettings();
	}

	//dividing the screen into columns and setting column map
	spaceMapping() {
		let columns = Math.round(this.width / this.dotMax), //splitting screen into columns to avoid collision
			spaceObj = {}; //creating local column map

		this.dotLocationColumns = columns;

		//setting position based on column
		for (let i=0;i<columns;i++){
			spaceObj[i] = i*this.dotMax;
		}

		this.dotLocationMap = spaceObj;
	}

	//starting and resuming game
	startGame() {
		let dots = this.dots,
			self = this;

		//setting the paused property to false to resume/start game
		this.paused = false;

		//checking if the game was previously started or now
		if (Object.keys(dots).length > 0) {
			for (let item in dots){
				dots[item].animate();
			}
		}

		//based on speed creating news instances of dot class.
		this.runGame = setTimeout(function roll() {
			if (!self.paused) {
			    self.dots[self.counter] = new Dot(self,self.counter);
			    self.counter++;
			    self.runGame = setTimeout(roll, self.speed);
			  } else {
			  	clearInterval(self.runGame);
			  }
		}, self.speed);
	}

	//method to pause game
	pauseGame() {
		//setting the paused property to true to pause game
		this.paused = true;

		//stopping the setTimeOut to loop further
		clearInterval(this.runGame);
	}

	//method to map points
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

	//method to update score and remove instance of DOT when clicked, invoked from Input instance
	updateScore(id) {
		let dot = this.dots[id],
			pointKey = Math.round(dot.randomNumber/10);

		if (dot.randomNumber == 150) {
			this.score += 50;
		} else {
			this.score += this.points[pointKey];
		}

		this.scoreBoard.innerText = this.score;
		dot.remove();
	}

	//action button invoked from Input instance on click
	actionStartPause() {
		if (this.paused) {
			this.startGame();
			this.startButton.innerText = 'Pause';
		} else {
			this.pauseGame();
			this.startButton.innerText = 'Start';
		}
	}

	readSvg() {
		this.imageSvg = document.getElementById(this.imageId).childNodes[1];
		this.bonusSvg = document.getElementById(this.bonusId).childNodes[1];
	}

	colorSettings() {
		this.colorPalette = {
			1: "#ff0000",
			2: "#ff8000",
			3: "#ffff00",
			4: "#00ff00",
			5: "#00bfff",
			6: "#4000ff",
			7: "#bf00ff",
			8: "#ff00bf"
		}
	}

	removeDot(id) {
		delete this.dots[id];
	}

}