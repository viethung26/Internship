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
	screen = (screen == '0' && num!== '.') ? num : screen.toString().concat(num);
	if(operator) num2 = num2.toString().concat(num);
	updateScreen();
}
function operation(oper) {
	if(!operator) {
		try {
			num1 = Number(screen);
		} catch(err) {
			console.error(err);
		}
		isDecimal = false;
		operator = oper;
		screen += operator;
	} else {
		if(!num2) {
			operator = oper;
			screen = screen.slice(0, screen.length-1);
			screen += operator;
		} else {
			calculate();
			operator = oper;
			screen += oper;
		}
	}
	updateScreen()
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
	let newLog = num1.toString().concat(' ',operator,' ',num2,' = ');
	switch(operator) {
		case '+':
			num1=num1+num2;
			addLog(newLog.concat(num1));
			break;
		case '-':
			num1=num1-num2;
			addLog(newLog.concat(num1));
			break;
		case 'x':
			num1=num1*num2;
			addLog(newLog.concat(num1));
			break;
		case ':':
			if(num2===0) 
				{
					alert('Error: Divide by zero');
					clearScreen();
				}
			else {
				num1=num1/num2;
				addLog(newLog.concat(num1));
			}
			break;
		default: 
			break;
	}
	num2 = '';
	operator = '';
	screen = num1.toString();
	updateScreen();	
}
function addLog(newLog) {
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
	isDecimal = false;
	updateScreen();
}
function updateScreen() {
	document.getElementById('screen').innerHTML = screen;
}