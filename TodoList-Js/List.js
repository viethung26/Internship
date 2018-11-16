class List {
	constructor(id, name) {
		this.listId = id;
		this.id = 0; // for creating new card
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
	}
	handleClick(event) {
		if(event.target.matches('button, button *')) {
			if(event.target.matches(".inputButton, .inputButton *")) {
				this.toggleInput(true);
			} else if(event.target.matches(".inputType, .inputType *")) {
				this.toggleInput(false);
				if(event.target.matches('.okbtn, .okbtn *')) {
					let title = this.inputText.value.trim();
					if(title)
						this.addCard(title);
				}
				this.inputText.value = '';
			}
		}
	}
	
	toggleInput(isEnable) {
		this.inputType.style.display = isEnable ? 'block' : 'none';
		this.inputButton.style.display = !isEnable ? 'block' : 'none';
	}
	addCard(title) {
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
		<div class="listcard" id="card${this.listId}">
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