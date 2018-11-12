class Calculator {
	constructor(id) {
		this.el = document.getElementById(id);
		this.el.innerHTML = this.constructor.template;
		this.screen = this.el.querySelector('.screen');
		this.log = this.el.querySelector('.loglist');
		this.el.addEventListener('click', this.handleClick.bind(this))

		this.input = '0';
		this.operator = '';
		this.num1 = 0;
		this.num2 = '';
		this.isDecimal = false;

		this.updateScreen();
	}
	handleClick(e) {
		if (e.target.matches('button')) {
			const val = e.target.innerText
			if (val.match(/[0-9]/)) {
				this.addNumber(val)
			} else if(val === '.') {
				if(this.isDecimal) return;
				this.isDecimal = true;
				this.addNumber(val);	
			} else if(val.match(/[+|\-|x|:]/)) {
				if(!this.operator) {
					this.num1 = Number(this.input);
					this.isDecimal = false;
					this.operator = val;
				} else {
					if(!this.num2) {
						this.operator = val;
						this.input = this.input.slice(0, this.input.length-1);
					} else {
						this.calculate();
						this.operator = val;
					}
				}
				this.input += this.operator;
				this.updateScreen();
				
			} else if(val === '=') {
				this.calculate();
			} else if(val === 'C') {
				this.clearScreen();
			}

		console.log('clicked', this.el.id,  e.target.innerText)
		}
		
	}
	addNumber(number) {
		if(this.operator) this.num2 = (this.num2 == '0' && number!== '.') ? number : this.num2.toString().concat(number);
		this.input = (this.input == '0' && number!== '.') ? number : this.input.toString().concat(number);

		this.updateScreen();
	}
	calculate() {
		if(!this.num2) {
			return;
		}
		this.num2 = Number(this.num2);
		let newLog = this.num1.toString().concat(' ',this.operator,' ',this.num2,' = ');
		switch(this.operator) {
			case '+':
				this.num1=this.num1+this.num2;
				this.addLog(newLog.concat(this.num1));
				break;
			case '-':
				this.num1=this.num1-this.num2;
				this.addLog(newLog.concat(this.num1));
				break;
			case 'x':
				this.num1=this.num1*this.num2;
				this.addLog(newLog.concat(this.num1));
				break;
			case ':':
				if(this.num2===0) 
					{
						alert('Error: Divide by zero');
						this.clearScreen();
					}
				else {
					this.num1=this.num1/this.num2;
					this.addLog(newLog.concat(this.num1));
				}
				break;
			default: 
				break;
		}
		this.num2 = '';
		this.operator = '';
		this.input = this.num1.toString();
		this.updateScreen();
	}
	addLog(newLog) {
		var listItem = document.createElement('li');
		var node = document.createTextNode(newLog);
		listItem.appendChild(node);
		this.log.appendChild(listItem);
	}
	updateScreen() {
		this.screen.innerHTML = this.input;
	}
	clearScreen() {
		this.num2 = '';
		this.operator = '';
		this.input = '0';
		this.updateScreen();
	}
}
Calculator.template = `
	<div class="app">
		<div class="calculator">
			<table>
				<tr>
					<td><button class="btn">=</button></td>
					<td colspan="3"><div class="screen"></div></td>
				</tr>
				<tr>
					<td><button class="btn">1</button></td>
					<td><button class="btn">2</button></td>
					<td><button class="btn">3</button></td>
					<td><button class="btn">+</button></td>
				</tr>
				<tr>
					<td><button class="btn" >4</button></td>
					<td><button class="btn">5</button></td>
					<td><button class="btn">6</button></td>
					<td><button class="btn">-</button></td>
				</tr>
				<tr>
					<td><button class="btn">7</button></td>
					<td><button class="btn">8</button></td>
					<td><button class="btn">9</button></td>
					<td><button class="btn">x</button></td>
				</tr>
				<tr>
					<td><button class="btn">0</button></td>
					<td><button class="btn">.</button></td>
					<td><button class="btn">C</button></td>
					<td><button class="btn">:</button></td>
				</tr>
			</table>
		</div>
		<div class="log">
			<h5 style="text-align: center">Log</h5>
			<hr>
			<ul class='loglist'>
			</ul>
		</div>
	</div>
	
`;
new Calculator('calc1');
new Calculator('calc2');
new Calculator('calc3');