var id = 1;
var idcard = 1;
const modal = document.getElementById('modal1');
// close modal when click out of new list
window.onclick = function(event) {
	if(event.target === modal) modal.style.display = 'none';
}
// handle when click button add list
function showModal() {
	modal.style.display = 'block';
	document.getElementById('listname').value = '';
}
// handle when click button OK in modal 
function createNew() {
	document.getElementById("modal1").style.display = 'none';
	let newName = document.getElementById('listname').value.trim();
	if(newName) {
		addList(newName);
	}
}
function addList(name) {
	let newlist = document.createElement("div");
	newlist.className = 'list';
	newlist.innerHTML = `<div class='listhead'><h4>${name}</h4></div>`;
	let listcard = document.createElement("div");
	listcard.className = 'listcard';
	listcard.id = "list"+id;
	newlist.appendChild(listcard);
	document.getElementsByClassName('container')[0].appendChild(newlist);
	document.getElementById("list"+id).addEventListener("dragover", function(event) {
		event.preventDefault();});
	document.getElementById("list"+id).addEventListener("drop", function(event) {
		event.preventDefault();
		if(event.target.className === "listcard") {
			const data = event.dataTransfer.getData("move");		
			document.getElementById(event.target.id).appendChild(document.getElementById(data));	
		}
	}, true);
	let addButton = document.createElement("div");
	addButton.className = 'addcard';
	let newcardid = "newcard"+id;
	let cardaddid = "cardadd"+id;
	let cardnameid = "cardname"+id;
	addButton.innerHTML = 
			`<div class="hide" id="${cardnameid}">
					<input id="${newcardid}" type="text" autofocus="true" placeholder="Enter new card ..."/>
					<button class="btn bordered" onclick="createCard('${id}')">OK</button>
					<button class="btn bordered" onclick="toggleNewCard('${id}', false)">&times</button>
				</div>
				<div class="show" id="${cardaddid}"><button class="btn" onclick="toggleNewCard('${id}',true)"><icon class="fa fa-plus"></icon> Add card</button></div>
			`;

	newlist.appendChild(addButton);
	console.log("Create new list id: "+"list"+id);
	id++;
}

// Card
function toggleNewCard (listId, isEnable) {
	document.getElementById('newcard'+listId).value = '';
	document.getElementById('cardadd'+listId).style.display = isEnable ? 'none' : 'inline-block'; 
	document.getElementById('cardname'+listId).style.display = isEnable ? 'inline-block' : 'none'; 
} 

function createCard(listId) {
	let name = document.getElementById('newcard'+listId).value.trim();
	if(name) {
		let newCard = document.createElement('div');
		newCard.id = "card"+ idcard;
		newCard.className = "card";
		newCard.draggable = "true";
		newCard.appendChild(document.createTextNode(name));
		document.getElementById("list"+listId).appendChild(newCard);
		document.getElementById(newCard.id).addEventListener("dragstart", function (event) {
			event.dataTransfer.setData("move", event.target.id);
		});
		idcard++;
	}
	toggleNewCard(listId, false);
}
