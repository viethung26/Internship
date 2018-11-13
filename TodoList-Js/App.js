class App {
	constructor(id) {
		this.id = 0;
		this.el = document.getElementById(id);
		this.el.addEventListener('click', this.handleClick.bind(this));
		this.el.innerHTML = this.constructor.template;
		this.container = this.el.querySelector('.container');
		this.modal = this.el.querySelector('.modal');
		this.input = this.modal.querySelector('.listname');
	}
	handleClick(e) {
		if(e.target.matches('button, button *')) {
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
		
	</div>
`
new App('todo1').addList('Demo');
new App('todo2');