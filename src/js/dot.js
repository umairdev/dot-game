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
		this.ctx; //current context of item


		this.init();
	}

	//Initialize the instance
	init() {
		//initialize numbers first
		this.randomSize();
		this.randomPosition();

		//create html element
		this.item = document.createElement(this.nodeName);
		this.item.setAttribute('id',this.id);
		this.item.style.cssText = "height: " + this.randomNumber + 
			"px;width: " + this.randomNumber + 
			"px;background-color: #bbb;border-radius: 50%;display: inline-block;position: absolute; left:" + 
			this.position + "px; top: 0;";
		this.ctx = this.container.appendChild(this.item);

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

		this.move = setTimeout(function moving() {
			if (!self.parent.paused) {
				if (self.pos > height+dotHeight){
					clearInterval(self.move);
					self.remove();
				} else {
					self.pos++;
					self.ctx.style.top = self.pos + 'px';
					self.move = setTimeout(moving, 1000/self.parent.fallingSpeed);
				}
			} else {
				clearInterval(self.move);
			} 
		}, 100);
	}

	//remove current instance from DOM and available for GC
	remove() {
		this.active = false;
		this.ctx.remove();
	}

}