class Dot {
	constructor(parent,id) {
		this.parent = parent, 
		this.container = this.parent.ctx, //parent container
		this.width = this.parent.width, //parent container width
		this.height = this.parent.height, //parent container height
		this.nodeName = this.parent.nodeName, //node Name from parent
		this.item, //the item which needs to be created
		this.randomNumber, //random size of item
		this.position, //random position of item
		this.move, //move method which will be assigned setTimeOut
		this.active = true, //state of item
		this.id = id, //id of item from parent
		this.pos = 0, //current position of item
		this.ctx, //current context of item
		this.color, //set random color from pallete
		this.colorNumber, //random color number
		this.svg, //svg content
		this.bonusSvg, //bonus svg content
		this.randomBonusNumber, //generated random number for bonus
		this.isBonus = false; //bonus item flag

		this.init();
	}

	//Initialize the instance
	init() {
		//initialize numbers first
		this.randomSize();
		this.randomPosition();
		this.randomColor();
		this.randomBonus();

		//check if bonus
		if (this.randomBonusNumber == 17) { //any arbitrary number - probability 1 in 20
			this.svg = this.parent.bonusSvg.cloneNode(true);
			this.item = document.createElement(this.nodeName);
			this.item.setAttribute('id',this.id);
			this.randomNumber = 150; //bonus item should be big so override randomNumber
			this.isBonus = true;

			this.item.style.cssText = "height: " + this.randomNumber + 
			"px;width: " + this.randomNumber + 
			"px;border-radius: 50%;display: inline-block;position: absolute; left:" + 
			this.position + "px; bottom: 0;";
		} else {
			//cloning svg node for each Instance
			this.svg = this.parent.imageSvg.cloneNode(true);

			//specifying color for this instance
			this.svg.childNodes[1].setAttribute('fill',this.color);

			//create html element
			this.item = document.createElement(this.nodeName);
			this.item.setAttribute('id',this.id);
			this.item.style.cssText = "height: " + this.randomNumber + 
				"px;width: " + this.randomNumber + 
				"px;border-radius: 50%;display: inline-block;position: absolute; left:" + 
				this.position + "px; bottom: 0;";
		}

		this.item.appendChild(this.svg); //appending svg to node
		this.ctx = this.container.appendChild(this.item); //appending dot(node) to container

		//animate the element
		this.animate();
	}

	//sets the random number for instance
	randomSize() {
		this.randomNumber =  Math.floor(Math.random() * 90) + 10;
	}

	//sets the random position for instance
	randomPosition() {
		let randomColumn =  Math.floor(Math.random() * (this.parent.dotLocationColumns)),
			randomPos = this.parent.dotLocationMap[randomColumn];

		if (this.parent.collisionArray.length == this.parent.collisionLimit) {
			this.parent.collisionArray.pop();
		}

		if (this.parent.collisionArray.includes(randomColumn)) {
			this.randomPosition();
		} else {
			this.parent.collisionArray.unshift(randomColumn);
			this.position = randomPos;
		}
	}

	//animate the current instance
	animate() {
		let self = this,
			height = this.height,
			dotHeight = this.randomNumber;

		if (this.isBonus) {
			this.move = setTimeout(function moving() {
				if (!self.parent.paused) {
					if (self.pos+dotHeight > height){
						clearInterval(self.move);
						self.remove();
					} else {
						self.pos++;
						self.ctx.style.bottom = self.pos + 'px';
						self.move = setTimeout(moving, 1000/250);
					}
				} else {
					clearInterval(self.move);
				} 
			}, 1000/250);
		} else {
			this.move = setTimeout(function moving() {
				if (!self.parent.paused) {
					if (self.pos+dotHeight > height){
						clearInterval(self.move);
						self.remove();
					} else {
						self.pos++;
						self.ctx.style.bottom = self.pos + 'px';
						self.move = setTimeout(moving, 1000/self.parent.fallingSpeed);
					}
				} else {
					clearInterval(self.move);
				} 
			}, 1000/self.parent.fallingSpeed);
		}
	}

	//random color for balloons
	randomColor() {
		let num = Math.floor(Math.random() * Object.keys(this.parent.colorPalette).length) + 1;

		this.colorNumber = num;

		this.color = this.parent.colorPalette[num];
	}

	//generate random number for bonus item
	randomBonus() {
		let num = Math.floor(Math.random() * 20) + 1;

		this.randomBonusNumber = num;
	}

	//remove current instance from DOM and available for GC
	remove() {
		this.active = false;
		this.ctx.remove();
		this.parent.removeDot(this.id);
	}

}