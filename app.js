
// Get Flat Number from API
const url = 'https://next.json-generator.com/api/json/get/41_QW6ze5';

function validateCall() {
  fetch(url)
  .then(res => res.json())
  .then(res => {
    let flatNumbers = [];
    let dial = screenPhone.textContent;
    let numDial = parseInt(dial);
    for (let i = 0; i < res.length; i++) {
      flatNumbers.push(res[i].number)
    };
    let indxNumber = flatNumbers.indexOf(numDial)
    

    if (screenPhone.textContent == '') {
      AlertMessage('Ingrese el numero de un apartamento', 'error');
    } else {
      if (flatNumbers.includes(numDial)){
        AlertMessage('Marcando', 'dialing');
        let flatOwner = res[indxNumber].owner
        
        if (res[indxNumber].status == 'ANSWERED')
          setTimeout(()=>{AlertMessage(`${flatOwner.firstName} ${flatOwner.lastName} ha permitido su entrada `, 'succes')}, 3000);
          
        else {
          setTimeout(()=>{AlertMessage('Sin respuesta, no puede ingresar', 'error')}, 3000);
        }
      } else {
        AlertMessage('No es posible llamar, el apartamento no existe', 'error')
      };
    }
  }) 
};


// Alerts
function AlertMessage(message, className) {
  const div = document.createElement('div');
  div.className = `alert ${className}`;
  div.appendChild(document.createTextNode(message));
  const container = document.querySelector('.container');
  const form = document.querySelector('.keyboard');
  container.insertBefore(div, form);
  setTimeout(function() {
    document.querySelector('.alert').remove();
  }, 5000);
}


// DOM elements
const callButton = document.querySelector('.call');
const screenPhone = document.getElementById('screen');
const deleteButton = document.querySelector('.delete');
const screen = document.getElementById('screen');
const tableKeys =document.getElementById('keys');


tableKeys.addEventListener('click', (e) => {
  const targetKey = e.target;
  const keyData = targetKey.dataset;
  if(keyData.number) writeScreen(keyData.number)
});

// Add numbers to screen
function writeScreen(numberKey) {
  screen.textContent += numberKey 
};

// Clean screen
deleteButton.addEventListener('click', (e) => {
  const text = screen.textContent;
  screen.textContent = text.slice(0, -1);
});

// Making a call function
callButton.addEventListener('click', validateCall); 



