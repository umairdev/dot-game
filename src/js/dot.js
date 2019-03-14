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
		this.svg; //svg content

		this.init();
	}

	//Initialize the instance
	init() {
		//initialize numbers first
		this.randomSize();
		this.randomPosition();
		this.randomColor();

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
		this.item.appendChild(this.svg);
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

	randomColor() {
		let num = Math.floor(Math.random() * Object.keys(this.parent.colorPalette).length) + 1;

		this.colorNumber = num;

		this.color = this.parent.colorPalette[num];
	}

	//remove current instance from DOM and available for GC
	remove() {
		this.active = false;
		this.ctx.remove();
	}

}