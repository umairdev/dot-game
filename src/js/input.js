class Input {
	constructor(container) {
		container.addEventListener('click', (e) => {
			console.log(e);
			console.log('the canvas was clicked');
		});
	}
}