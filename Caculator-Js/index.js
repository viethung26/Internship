var screen = '0';
var operator = '';
var num1 = 0;
var num2 = '';
var isDecimal = false;
function initialize(){
	updateScreen();
}
function number(num) {
	if(num === '.') {
		if(isDecimal) return;
		isDecimal = true;
	}
	screen = (screen === '0' && num!== '.') ? num : screen.toString().concat(num);
	if(operator) num2 = num2.toString().concat(num);
	updateScreen();
}
function operation(oper) {
	if(!operator) {
		num1 = Number(screen);
		isDecimal = false;
		num2 = '0';
		operator = oper;
		screen += operator;
		updateScreen();
	} else {
		if(!num2) {
			operator = oper;
			screen = screen.slice(0, screen.length-1);
			screen += operator;
			updateScreen();
		} else calculate();
	}
}
function calculate() {
	if(!num2) {
		return;
	}
	try{
		num2 = Number(num2);
	} catch(err) {
		console.error(err);
	}
	addLog();
	switch(operator) {
		case '+':
			num1=num1+num2;
			break;
		case '-':
			num1=num1-num2;
			break;
		case 'x':
			num1=num1*num2;
			break;
		case ':':
			if(num2===0) 
				{
					alert('Error: Divide by zero');
					clearScreen();
				}
			else {
				num1=num1/num2;
			}
			break;
		default: 
			break;
	}
	num2 = '';
	operator = '';
	screen = num1;
	updateScreen();	
}
function addLog() {
	var newLog = num1.toString().concat(operator, num2);
	var listItem = document.createElement('li');
	var node = document.createTextNode(newLog);
	listItem.appendChild(node);
	document.getElementById('loglist').appendChild(listItem);
}
function clearScreen() {
	screen = '0';
	operator = '';
	num1 = 0;
	num2 = 0;
	updateScreen();
}
function updateScreen() {
	document.getElementById('screen').innerHTML = screen;
}