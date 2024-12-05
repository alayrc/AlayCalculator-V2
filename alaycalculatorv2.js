
const calculatorContainer = document.createElement('div');
calculatorContainer.style.position = 'fixed';
calculatorContainer.style.top = '50%';
calculatorContainer.style.left = '50%';
calculatorContainer.style.transform = 'translate(-50%, -50%)';
calculatorContainer.style.width = '250px';
calculatorContainer.style.padding = '10px';
calculatorContainer.style.border = '2px solid #444';
calculatorContainer.style.borderRadius = '10px';
calculatorContainer.style.backgroundColor = '#333';
calculatorContainer.style.textAlign = 'center';
calculatorContainer.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.3)';
calculatorContainer.style.zIndex = '1000';
calculatorContainer.style.cursor = 'move';


const display = document.createElement('input');
display.type = 'text';
display.disabled = true;
display.style.width = '100%';
display.style.padding = '10px';
display.style.marginBottom = '10px';
display.style.fontSize = '20px';
display.style.textAlign = 'right';
display.style.border = '1px solid #444';
display.style.borderRadius = '5px';
display.style.backgroundColor = '#222';
display.style.color = '#fff';
calculatorContainer.appendChild(display);


const buttons = [
    ['7', '8', '9', '/'],
    ['4', '5', '6', '*'],
    ['1', '2', '3', '-'],
    ['0', '.', '=', '+'],
    ['C']
];


buttons.forEach(row => {
    const rowContainer = document.createElement('div');
    rowContainer.style.display = 'flex'; 
    row.forEach(button => {
        const buttonElement = document.createElement('button');
        buttonElement.textContent = button;
        buttonElement.style.width = '50px';
        buttonElement.style.height = '50px';
        buttonElement.style.margin = '5px';
        buttonElement.style.fontSize = '18px';
        buttonElement.style.cursor = 'pointer';
        buttonElement.style.border = '1px solid #444';
        buttonElement.style.borderRadius = '5px';
        buttonElement.style.backgroundColor = '#555';
        buttonElement.style.color = '#fff';
        buttonElement.style.transition = 'background-color 0.2s ease';
        buttonElement.addEventListener('click', () => handleButtonClick(button));
        buttonElement.addEventListener('mouseenter', () => {
            buttonElement.style.backgroundColor = '#666';
        });
        buttonElement.addEventListener('mouseleave', () => {
            buttonElement.style.backgroundColor = '#555';
        });
        rowContainer.appendChild(buttonElement);
    });
    calculatorContainer.appendChild(rowContainer);
});


document.body.appendChild(calculatorContainer);


let currentInput = '';
let operator = '';
let firstOperand = null;

function handleButtonClick(button) {
    if (button === '=') {

        if (firstOperand !== null && operator && currentInput) {
            const result = calculate(firstOperand, operator, parseFloat(currentInput));
            display.value = result;
            firstOperand = result;
            operator = '';
            currentInput = '';
        }
    } else if (['+', '-', '*', '/'].includes(button)) {

        if (firstOperand === null) {
            firstOperand = parseFloat(currentInput);
            currentInput = '';
        }
        operator = button;
    } else if (button === '.') {
  
        if (!currentInput.includes('.')) {
            currentInput += button;
            display.value = currentInput;
        }
    } else if (button === 'C') {
       
        currentInput = '';
        operator = '';
        firstOperand = null;
        display.value = '';
    } else {
       
        currentInput += button;
        display.value = currentInput;
    }
}


function calculate(a, op, b) {
    switch (op) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            return a / b;
        default:
            return b;
    }
}


let isDragging = false;
let offsetX = 0, offsetY = 0;


calculatorContainer.addEventListener('mousedown', (e) => {
   
    offsetX = e.clientX - calculatorContainer.offsetLeft;
    offsetY = e.clientY - calculatorContainer.offsetTop;

    isDragging = true;
    document.body.style.userSelect = 'none';
});


document.addEventListener('mousemove', (e) => {
    if (isDragging) {

        calculatorContainer.style.left = `${e.clientX - offsetX}px`;
        calculatorContainer.style.top = `${e.clientY - offsetY}px`;
    }
});


document.addEventListener('mouseup', () => {
    isDragging = false;
    document.body.style.userSelect = '';
});


let isVisible = true; 

document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'k') { 
        isVisible = !isVisible;
        calculatorContainer.style.display = isVisible ? 'block' : 'none';
    }
});
