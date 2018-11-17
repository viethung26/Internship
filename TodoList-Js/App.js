class App {
	constructor(id) {
		this.el = document.getElementById(id);
		this.id = 0; // for creating new List
		this.el.addEventListener('click', this.handleClick.bind(this));
		this.el.innerHTML = this.constructor.template;
		this.container = this.el.querySelector('.container');
		this.modal = this.el.querySelector('.modal');
		this.input = this.modal.querySelector('.listname');
		this.plEl = document.querySelector('.placeholder');
	}
	// add event for new List by listID
	addEvent(listId) {
		let list = document.getElementById(listId);
		let listcard = list.querySelector('.listcard');
		listcard.addEventListener('dragstart', this.handleDragStart.bind(this))
		listcard.addEventListener('dragover', this.handleDragOver.bind(this))
		listcard.addEventListener('dragend', this.handleDragEnd.bind(this))			
	}
	handleClick(e) {
		// specify button or inner of button
		if(e.target.closest('button')) {
			if(e.target.matches('.btnShowModal, .btnShowModal *')) {
				this.toggleModal(true);
				this.input.value = '';
			}
			// handle when click OK button in modal
			else if(e.target.matches('.createbtn, .createbtn *')) {
				this.toggleModal(false);
				let newName = this.input.value.trim();
				if(newName) this.addList(newName);
			}
		} else if(e.target.className === 'modal') {
			this.toggleModal(false);
		}
	}
	toggleModal(status) {
		this.modal.style.display = status ? 'block' : 'none';
	}
	addList(name) {
		let newList = document.createElement('div');
		// newList.className = 'list';
		newList.id = this.el.id + '.' + this.id++;
		this.container.appendChild(newList);
		new List(newList.id, name);
		this.addEvent(newList.id);
	}
	handleDragStart(event) {
		if(event.target.getAttribute('draggable')) {
			console.log("start: ", event.target.id);
			event.dataTransfer.effectAllowed = "move";
			this.movingEl = event.target;
			this.plElRect = this.movingEl.getBoundingClientRect();	
					
		}
	}
	handleDragOver(event) {
		// Set cursor displays move effect
		event.preventDefault();
		event.dataTransfer.dropEffect = 'move';
		// Check to only drag in App
		if(!this.movingEl) return;
		// set attributes for place holder
		this.plEl.style.top = this.plElRect.top + "px"
		this.plEl.style.left = this.plElRect.left + "px"
		this.plEl.style.width =  this.plElRect.width + "px"
		this.plEl.style.display = 'block'

		let parent = event.currentTarget;// list bounds this target
		let target = event.target;

		if(target !== this.movingEl) {
			//when over card
			if(target.classList.contains('card')) {
				if(this.movingEl.getBoundingClientRect().top<target.getBoundingClientRect().top) {
					parent.insertBefore(this.movingEl,target.nextElementSibling)
				} else {
					parent.insertBefore(this.movingEl,target);
				}
			// when over empty space of list
			} else if(target.classList.contains('listcard')) {
				parent.appendChild(this.movingEl)
			}
			//set position for place holder 
			this.plEl.style.top = this.movingEl.getBoundingClientRect().top + "px"
			this.plEl.style.left = this.movingEl.getBoundingClientRect().left + "px"
		}
		
	}
	handleDragEnd(event) {
		// hide place holder // reset value of movingEl to check only in this App
		this.plEl.style.display = 'none';
		this.movingEl = null;
	}
}

App.template = `
	<div class="header">
		<h3><i class="far fa-calendar-check"></i> To-Do list</h3>
		<button class="btn btnShowModal"><i class="fa fa-plus-square"></i></button>
	</div>
	<div class="modal">
		<div class="addlist center">
			<input type="text" class="listname" autofocus="true" placeholder="Type new list title ..." />
			<button class="btn createbtn bordered"><b>OK</b> <i class="fa fa-check-circle"></i></button>
		</div>
	</div>
	<div class="container">
		<div class="placeholder">Drop here ...</div>
	</div>
`
let app1 = new App('todo1');
app1.addList('Demo');
app1.addList('Demo 2');
new App('todo2');