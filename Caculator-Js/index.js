var screen = '0';
var input1 = 0;
var input2 = null;
var operator ='';

function initialize(){
	updateScreen();
}
function number(num) {
	if(operator) {
		input2 = input2 * 10 + num;
	} else {
		input1 = input1 * 10 + num;
	}
	if(screen === '0') screen = num;
	else screen += num;
	updateScreen();
}
function operation(oper) {
	if(operator && input2!==null) calculate();
	operator = oper; 
	updateScreen();			
}
function calculate() {
	addLog();
	switch(operator) {
		case '+':
			input1=input1+input2;
			break;
		case '-':
			input1=input1-input2;
			break;
		case 'x':
			input1=input1*input2;
			break;
		case ':':
			if(input2===0) 
				{
					alert('Error: Divide by zero');
					clearScreen();
				}
			else {
				input1=input1/input2;
			}
			break;
		default: 
			break;
	}
	input2 = null;
	operator = '';
	updateScreen();
}
function clearScreen() {
	input1 = 0;
	operator = '';
	input2 = null;
	updateScreen();
}
function updateScreen() {
	screen = input1.toString().concat(operator);
	if(operator && input2!==null) {
		screen = screen.concat(input2);
	}
	document.getElementById('screen').innerHTML = screen;
}
function addLog() {
	var newLog = input1.toString().concat(operator, input2);
	var listItem = document.createElement('li');
	var node = document.createTextNode(newLog);
	listItem.appendChild(node);
	document.getElementById('loglist').appendChild(listItem);
}