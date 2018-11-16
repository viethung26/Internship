const dnd = (el) => {
	el.addEventListener('dragstart',_start);

	let movingEl;
	let plEl; // placeholder Element
	let plElRect;
	function _start(event) {
		if(event.target.getAttribute('draggable')) {
			console.log("start: ", event.target.id)
			event.dataTransfer.effectAllowed = "move"
			event.dataTransfer.setData('text/plain', event.target.id)
			movingEl = event.target;
			plElRect = movingEl.getBoundingClientRect();
			el.querySelectorAll('.area').forEach(el => el.addEventListener('dragover', _over))
			el.querySelectorAll('.area').forEach(el => el.addEventListener('dragend', _end))
			plEl = document.querySelector(".placeholder")
		}
	}
	function _over(event) {

		plEl.style.top = plElRect.top + "px"
		plEl.style.left = plElRect.left + "px"
		plEl.style.display = 'block'
		let parent = event.currentTarget;
		let target = event.target;
		if(target !== movingEl) {
			if(target.classList.contains('card')) {
				if(movingEl.getBoundingClientRect().top<target.getBoundingClientRect().top) {
					parent.insertBefore(movingEl,target.nextElementSibling)
				} else {
					parent.insertBefore(movingEl,target);
				}
					plEl.style.top = movingEl.getBoundingClientRect().top + "px"
					plEl.style.left = movingEl.getBoundingClientRect().left + "px"
			} else if(target.classList.contains('area')) {
				parent.appendChild(movingEl)
				plEl.style.top = movingEl.getBoundingClientRect().top + "px"
				plEl.style.left = movingEl.getBoundingClientRect().left + "px"
			}
		}
		event.dataTransfer.dropEffect = 'move';
	}
	function _end(event) {
		plEl.style.display = 'none'
	}
}
dnd(document.querySelector(".container"));