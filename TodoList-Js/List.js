class List {
	constructor(id, name) {
		this.listId = id;
		this.id = 0;
		this.el = document.getElementById(this.listId);
		this.name = name;
		this.el.innerHTML = this.template;
		// find element
		this.listcard = this.el.querySelector('.listcard');
		this.addcard = this.el.querySelector('.addcard');
		this.inputType = this.addcard.querySelector('.inputType');
		this.inputButton = this.addcard.querySelector('.inputButton');
		this.inputText = this.addcard.querySelector('.inputText');
		// add event handle
		this.el.addEventListener('click', this.handleClick.bind(this));
		this.listcard.addEventListener('dragstart', this.handleDragStart.bind(this));
		this.listcard.addEventListener('dragover', this.handleDragOver.bind(this));
		this.listcard.addEventListener('drop', this.handleDrop.bind(this));
	}
	handleClick(event) {
		if(event.target.matches('button, button *')) {
			if(event.target.matches(".inputButton, .inputButton *")) {
				this.toggleInput(true);
			} else if(event.target.matches(".inputType, .inputType *")) {
				this.toggleInput(false);
				if(event.target.matches('.okbtn, .okbtn *')) {
					this.addCard();
				}
				this.inputText.value = '';
			}
		}
	}
	handleDragStart(event) {
		console.log(event.target.id);
		if(event.target.matches('.card')) {
			event.dataTransfer.setData('move', event.target.id);
		}
	}
	handleDragOver(event) {
		event.preventDefault();
	}
	handleDrop(event) {
		event.preventDefault();
		let data = event.dataTransfer.getData('move');
		if(data) {
			// check id of App. Only drop in app
			let moveAppId = data.split('.')[0];
			let recvAppId = this.listId.split('.')[0];
			if(moveAppId === recvAppId)
				this.listcard.appendChild(document.getElementById(data));
		}
	}
	toggleInput(isEnable) {
		this.inputType.style.display = isEnable ? 'block' : 'none';
		this.inputButton.style.display = !isEnable ? 'block' : 'none';
	}
	addCard() {
		let title = this.inputText.value.trim();
		if(title) {
			let newCard = document.createElement('div');
			newCard.id = this.el.id + "." + this.id++;
			newCard.className = 'card';
			newCard.draggable = true;
			newCard.innerText = title;
			this.listcard.appendChild(newCard);
		}
	}
	get template() {
		return `
	<div class="list">
		<div class="listhead"><h4>${this.name}</h4></div>
		<div class="listcard">
		</div>
		<div class="addcard">
			<div class="inputType">
				<input class="inputText" type="text" autofocus="true" placeholder="Enter new card ...">
				<div class="flex center"><button class="btn bordered okbtn">Add <i class="fa fa-check-circle"></i></button>
				<button class="btn bordered">Cancel <i class="fa fa-close"></i></button></div>
			</div>
			<button class="btn inputButton"><icon class="fa fa-plus"></icon> Add card</button>
		</div>
	</div>
`
	}
}