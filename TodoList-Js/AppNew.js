let data = {}
class App {
    constructor(id) {
        this.el = document.getElementById(id)
        this.filterValues = []
        this.loadData()
        this.render()
    }
    render() {
        console.log('render')
        this.el.innerHTML = `
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
        this.plEl = this.el.querySelector('.placeholder')
        this.el.addEventListener('click', this.handleClick.bind(this))
        this.el.querySelector('.addlist').querySelector('input').addEventListener('keydown',e=>{
            if(e.keyCode === 13) {
                let newTitle = this.el.querySelector('.listname').value.trim()
                this.addList(newTitle)
                this.toggleModal(false)
            }
        })
        let $container = this.el.querySelector('.container')
        data.lists.forEach((list, index)=> {
            $container.appendChild(this.renderList(list))
        })
    }
    renderList(list) {
        let $list = document.createElement('div')
        $list.id = list.id
        $list.innerHTML = `
            <div class="listhead">
                <input class="headername" type="text" readonly value="${list.title}" />
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
        `
        $list.classList.add('list')
        $list.addEventListener('click',this.handleClickList.bind(this))
        $list.addEventListener('keydown', e=>{
            if(e.target.matches('.inputText'))
            if(e.keyCode === 13){
                let cardTitle = e.target.value.trim()
                this.addCard(Number(e.currentTarget.id), cardTitle)
            }
        })
        $list.querySelector('.dropdown').addEventListener('mouseleave', ()=>this.toggleDropdown($list, false))
        let $listcard = $list.querySelector('.listcard')
        $listcard.addEventListener('dragstart',this.handleDragStart.bind(this))
        $listcard.addEventListener('dragover',this.handleDragOver.bind(this))
        $listcard.addEventListener('dragend',this.handleDragEnd.bind(this))
        list.items.forEach((card, index)=> {
            $listcard.appendChild(this.renderCard(card))
        })
        this.pickFilterValue()
        this.filterList($list)
        return $list
    }
    renderCard(card){
        if(!card) return
        let $card = document.createElement('div')
        $card.id = "card."+card.id
        $card.classList.add('card')
        
        $card.draggable = true
        $card.innerHTML = `
            <input class="checkbox" type="checkbox"/>
            <input class="cardtitle" readonly type="text" value="${card.title}"/> 
            <button class="button delCard"><i class="fa fa-trash-o"></i></button>
        `
        if (card.done) {
            $card.classList.add('done')
            let $checkbox = $card.querySelector('.checkbox')
            $checkbox.checked = true
            $checkbox.disabled = true
        }
        return $card
    }
    addList(title){
        if(!title) return;
        data.lists.push({
            id: data.id,
            title,
            items: []
        })
        data.id++
        this.saveData()
        this.render()
    }
    addCard(listId, title) {
        if(!title) return;
        let index = data.lists.findIndex(list=> list.id === listId)
        if(index !== -1) {
            data.lists[index].items.push({id: data.itemId, title, done: false, priority: 0 })
            data.itemId++
            this.saveData()
            this.render()
        }
    }
    handleClick(e) {
        let target = e.target
        // button handler
        if(target.closest('button')) {
            if(target.closest('.btnShowModal')) {
                this.toggleModal(true)
            // button Ok on new list modal
            } else if(target.closest('.createbtn')) {
                let newTitle = this.el.querySelector('.listname').value.trim()
                this.addList(newTitle)
                this.toggleModal(false)
            } 
        } else if(target.classList.contains('modal')) {
            this.toggleModal(false)
        }
    }
    handleClickList(e) {
        // prevents propagation of this.el
        e.stopPropagation()
        let current = e.currentTarget
        let target = e.target
        if(target.closest('button')){
            if(target.closest('.inputButton')){
                this.toggleInput(current, true)
            } else if(target.closest('.inputType')){
                this.toggleInput(current, false)
                // add new card
                let $inputText = current.querySelector('.inputText')
                if(target.closest('.okbtn')){
                    let cardTitle = $inputText.value.trim()
                    this.addCard(Number(current.id), cardTitle)
                }
                $inputText.value = ''
            } else if(target.closest('.remove')){
                this.deleteList(Number(current.id))
            }  else if(target.closest('.delCard')) {
                let parent = target.parentNode
                if(parent.classList.contains('delCard')) parent = parent.parentNode
                let cardId = parent.id.split('.')[1]
                this.deleteCard(Number(current.id), Number(cardId))
            } else if(target.closest('.filter')){
                this.toggleDropdown(current, true)
            }
        } else if(target.matches('input')){
            if(target.matches('.checkbox')) {
                console.log("check")
                let parent = target.parentNode
                let cardId = parent.id.split('.')[1]
                this.checkDone(Number(current.id), Number(cardId))
			}
        } else if(target.matches('a')) {
            this.toggleDropdown(current, false)
            let index = data.lists.findIndex(list=>list.id.toString() === current.id)
            this.filterValues[index] = target.innerText;
            this.pickFilterValue();
            this.filterList(current);
        }
    }
    handleDragStart(event) {
        let target = event.target
        if(target.getAttribute('draggable')) {
			event.dataTransfer.effectAllowed = "move";
			this.movingEl = target;
			this.plElRect = this.movingEl.getBoundingClientRect();
        }        
    }
    handleDragOver(event){
        // Set cursor displays move effect
        event.preventDefault();
        this.areaId = null
		this.iArea = null
		event.dataTransfer.dropEffect = 'move';
		// Check to only drag in App
        if(!this.movingEl) return;
        this.plEl.style.top = this.plElRect.top + "px"
		this.plEl.style.left = this.plElRect.left + "px"
		this.plEl.style.width =  this.plElRect.width + "px"
        this.plEl.style.display = 'block'

		let parent = event.currentTarget;// list bounds this target
        let target = event.target
        this.targetOver = null
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
            this.areaId = parent.parentNode.id
            parent.childNodes.forEach(($element, index)=>{
				if($element === this.movingEl) {
					this.iArea = index-1
				}
            })
			//set position for place holder 
			this.plEl.style.top = this.movingEl.getBoundingClientRect().top + "px"
			this.plEl.style.left = this.movingEl.getBoundingClientRect().left + "px"
		}
    }
    handleDragEnd(event) {
        this.plEl.style.display = 'none'
        if(this.areaId === null) return 
        let id = this.movingEl.id.split('.')[1]
        let areaIndex = data.lists.findIndex(list=>list.id.toString() === this.areaId)
        let movEl = {}
        let newLists = data.lists.map(list=>{
            let newItems = list.items.filter(card=> {
                if(card.id.toString() === id) {
                    movEl = card
                    return false
                }
                return true
            })
            list.items = newItems
            return list
        })
        newLists[areaIndex].items.splice(this.iArea,0,movEl)
        data.lists = newLists
        this.movingEl = null;
        this.saveData()
        this.render()
    }
    toggleModal(status) {
        let $modal = this.el.querySelector('.modal')
        let $titleInput = $modal.querySelector('.listname')
        $titleInput.value = ''
		$modal.style.display = status ? 'block' : 'none';
    }
    toggleInput($list, isEnable) {
        let $cardInput = $list.querySelector('.inputType')
        let $inputButton = $list.querySelector('.inputButton')
        $cardInput.style.display = isEnable ? 'block' : 'none';
        $inputButton.style.display = isEnable ? 'none' : 'block';
    }
    toggleDropdown($list, isEnable) {
        let $dropdown = $list.querySelector('.dropdown')
        $dropdown.style.display = isEnable ? 'block' : 'none'
    }
    deleteList(listId) {
        let index = data.lists.findIndex(list=> list.id===listId)
        data.lists.splice(index,1)
        this.saveData()
        this.render()
    }
    deleteCard(listId, cardId){
        let listIndex = data.lists.findIndex(list=>list.id === listId)
        if(listIndex!==-1){
            let cardIndex = data.lists[listIndex].items.findIndex(card=>cardId === card.id)
            if(cardIndex!==-1) {
                data.lists[listIndex].items.splice(cardIndex,1)
                this.saveData()
                this.render()
            } 
        }
    }
    checkDone(listId, cardId) {
        let listIndex = data.lists.findIndex(list=>list.id === listId)
        if(listIndex!==-1){
            let cardIndex = data.lists[listIndex].items.findIndex(card=>cardId === card.id)
            if(cardIndex!==-1) {
                data.lists[listIndex].items[cardIndex].done = true
                this.saveData()
                this.render()
            } 
        }
    }
    filterList($list) {
        let $cards = $list.querySelectorAll('.card')
        let index = data.lists.findIndex(list=>list.id.toString() === $list.id)
        let filterValue = this.filterValues[index]
		if(filterValue === 'All') {
			$cards.forEach(el => el.style.display = 'inline-flex');
		} else if (filterValue === 'Not Done') {
			$cards.forEach(el => {
				el.style.display = el.classList.contains('done') ? 'none' : 'inline-flex';
			});
		} else if (filterValue === 'Done') {
			$cards.forEach(el => {
				el.style.display = el.classList.contains('done') ? 'inline-flex' : 'none';
			});
		}
    }
    pickFilterValue() {
        let $lists = this.el.querySelectorAll('.list')
        $lists.forEach(($list,index)=> {
            let filterEls = $list.querySelectorAll('.dd-item')
            filterEls.forEach(el => {
                if(el.innerText === this.filterValues[index]) el.style.fontWeight = 'bold';
                else el.style.fontWeight = 'normal';
            });
        })
        return
		
		
	}
    saveData() {
        console.log('Saved data')
        localStorage.setItem('data',JSON.stringify(data))
    }
    loadData() {
        let retrieveData = localStorage.getItem('data')
        if(retrieveData) {
            data = JSON.parse(retrieveData)
            console.log("Loaded data")
        }
        else {
            data = {id: 0, itemId: 0, lists: []}
            console.log("Data not found")
        }
        this.filterValues = new Array(data.lists.length)
        this.filterValues.fill('All',0,data.lists.length)
    }
    
}
let app = new App('todo1')