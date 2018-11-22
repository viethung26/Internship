class List {
	constructor(id, name) {
		this.listId = id;
		this.id = 0; // for creating new card
		this.el = document.getElementById(this.listId);
		this.name = name;
		this.filterValue = 'All';
		this.el.innerHTML = this.template;
		// find element
		this.listcard = this.el.querySelector('.listcard');
		this.addcard = this.el.querySelector('.addcard');
		this.inputType = this.addcard.querySelector('.inputType');
		this.inputButton = this.addcard.querySelector('.inputButton');
		this.inputText = this.addcard.querySelector('.inputText');
		this.listName = this.el.querySelector('.headername');
		this.dropdown = this.el.querySelector('.dropdown');
		// add event handle
		this.el.addEventListener('click', this.handleClick.bind(this));
		this.el.addEventListener('dblclick', this.handleDblClick.bind(this));
		this.listName.addEventListener('blur', this.listBlur.bind(this)); 
		this.dropdown.addEventListener('mouseleave', ()=>this.toggleDropdown(false));
		this.pickFilterValue();
		this.listcard.addEventListener('dragend', ()=>this.filterList());
		//for test
		this.addCard("test "+ id);
		this.addCard("test 2 "+ id);
	}
	destroy() {
		let parent = this.el.parentNode;
		parent.removeChild(this.el);
	}
	handleDblClick(event) {
		let target = event.target;
		if(target.matches('.cardtitle')) {
			target.readOnly = false
			target.style.backgroundColor = 'white'
			target.style.cursor = 'text'
			this.cardTitle = target.value;
		}
	}
	listBlur(event) {
		this.listName.readOnly = true;
		this.listName.style.backgroundColor = 'inherit';
		this.listName.style.cursor = 'pointer';
		if(!this.listName.value) this.listName.value = this.name;
		else this.name = this.listName.value;
	}
	cardBlur(event) {
		let target = event.target;
		target.readOnly = true;
		target.style.cursor = 'pointer';
		if(!target.value) target.value = this.cardTitle;
		else this.cardTitle = target.value;
	}
	handleClick(event) {
		const target = event.target;
		if(target.matches('button, button *')) {
			if(target.matches(".inputButton, .inputButton *")) {
				this.toggleInput(true);
			} else if(target.matches(".inputType, .inputType *")) {
				this.toggleInput(false);
				if(target.matches('.okbtn, .okbtn *')) {
					let title = this.inputText.value.trim();
					if(title) this.addCard(title);
				}
				this.inputText.value = '';
			} else if(target.closest('.remove')) {
				this.destroy();
			} else if(target.closest('.delCard')) {
				let parent = target.parentNode;
				if(parent.matches('.delCard')) parent = parent.parentNode;
				this.listcard.removeChild(parent);
			} else if(target.closest('.filter')) {
				this.toggleDropdown(true);
			}
			// end button matches
		} else if(target.matches('input')) {
			if(target.closest('.headername')) {
				target.readOnly = false
				target.style.backgroundColor = 'white'
				target.style.cursor = 'text'
			} else if(target.matches('.uncheck')) {
				target.classList.remove('uncheck');
				target.disabled = true;
				let parent = target.parentNode;
				parent.style.textDecoration = 'line-through';
				this.filterList();
			}
		} else if(target.matches('a')) {
			this.toggleDropdown(false);
			this.filterValue = target.innerText;
			this.pickFilterValue();
			this.filterList();
		}
	}
	toggleInput(isEnable) {
		this.inputType.style.display = isEnable ? 'block' : 'none';
		this.inputButton.style.display = !isEnable ? 'block' : 'none';
	}
	toggleDropdown(isEnable) {
		this.dropdown.style.display = isEnable ? 'block' : 'none';
	}
	filterList() {
		let cards = this.listcard.querySelectorAll('.card');
		if(this.filterValue === 'All') {
			cards.forEach(el => el.style.display = 'inline-flex');
		} else if (this.filterValue === 'Not Done') {
			cards.forEach(el => {
				el.style.display = el.style.textDecoration === 'line-through' ? 'none' : 'inline-flex';
			});
		} else if (this.filterValue === 'Done') {
			cards.forEach(el => {
				el.style.display = el.style.textDecoration === 'line-through' ? 'inline-flex' : 'none';
			});
		}
	}
	pickFilterValue() {
		let filterEls = this.el.querySelectorAll('.dd-item');
		filterEls.forEach(el => {
			if(el.innerText === this.filterValue) el.style.fontWeight = 'bold';
			else el.style.fontWeight = 'normal';
		});
	}
	addCard(title) {
		if(title) {
			let newCard = document.createElement('div');
			newCard.id = this.el.id + "." + this.id++;
			newCard.className = 'card';
			newCard.draggable = true;
			newCard.innerHTML = `
				<input class="checkbox uncheck" type="checkbox"/>
				<input class="cardtitle" readonly type="text" value="${title}"/> 
				<button class="button delCard"><i class="fa fa-trash-o"></i></button>
			`;
			this.listcard.appendChild(newCard);
			newCard.querySelector('.cardtitle').addEventListener('blur', this.cardBlur.bind(this));
		}
	}
	get template() {
		return `
	<div class="list">
		<div class="listhead">
			<input class="headername" type="text" readonly value="${this.name}" />
			<div class="filter">
				<button class="button"><i class="fa fa-caret-square-o-down"></i></button>
				<div class="dropdown">
					<a class="dd-item pick" href="#">All</a>
					<a class="dd-item" href="#">Done</a>
					<a class="dd-item" href="#">Not Done</a>
				</div>
			</div>
			<button class="button remove"><i class="fa fa-window-close"></i></button>
		</div>
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