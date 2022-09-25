// CARDHOLDER NAME

const nameCard = document.querySelector('.card-credit-front__details-name');
const nameInput = document.querySelector('#cardHolder');
const nameError = document.querySelector('.form__cardholder--error');

// CARD NUMBER

const numberCard = document.querySelector('.card-credit-front__number');
const numberInput = document.querySelector('#cardnumber');
const numberError = document.querySelector('.form__inputNumber--error');


//CARD Month
const monthCard = document.querySelector('.card-credit-front__month');
const monthInput = document.querySelector('#cardMonth');
const monthError = document.querySelector('.form__input-mm--error');

//CARD Year
const yearCard = document.querySelector('.card-credit-front__year');
const yearInput = document.querySelector('#cardYear');
const yearError = document.querySelector('.form__input-yy--error');

//CARD CVC
const cvcCard = document.querySelector('.card-credit-back__cvc');
const cvcInput = document.querySelector('#cardCVC');
const cvcError = document.querySelector('.form_input-cvc--error');


//Boton 
const button = document.querySelector('.form__submit');

//Form
const form = document.querySelector('.form');

//Thanks
const thankSection = document.querySelector('.thanks-section');



//Ingreso Dinamico del nombre

nameInput.addEventListener('input', () => {
    hideError(nameInput, nameError);
    if (nameInput.value == '') {
        nameCard.innerText = 'felipe bastidas';
    } else {
        nameCard.innerText = nameInput.value;
    }
});



//Ingreso Dinamico del numero

numberInput.addEventListener('input', event => {
    hideError(numberInput, numberError);
    let inputValue = event.target.value;
    numberInput.value = inputValue.replace(/\s/g, '');
    // Buscar si solo son numeros 
    let valoresAceptados = /^[0-9]+$/;
    if (!valoresAceptados.test(numberInput.value) && numberInput.value != '') {
        showError(numberInput, numberError, 'Wrong format, numbers only');
    } else {
        hideError(numberInput, numberError);
        numberCard.innerText = numberInput.value.replace(/([0-9]{4})/g, '$1 ');

    }

    if (numberInput.value == '') {
        numberCard.innerText = '0000 0000 0000 0000';
    }
});


//Ingreso Dinamico del mes

monthInput.addEventListener('input', event => {
    hideError(monthInput, monthError, '');
    let inputValue = event.target.value;
    monthInput.value = inputValue.replace(/\s/g, '');
    // Buscar si solo son numeros 
    let valoresAceptados = /^[0-9]+$/;
    if (!valoresAceptados.test(monthInput.value) && monthInput.value != '') {
        showError(monthInput, monthError, 'Wrong format, numbers only');
    } else {
        hideError(monthInput, monthError, '');
        let mes = monthInput.value;
        if (mes < 10) {
            monthCard.innerText = '0' + Number(mes);
        } else {
            if (mes <= 12) {
                monthCard.innerText = mes;
            } else {
                monthCard.innerText = '00'
                showError(monthInput, monthError, 'Incorrect month');
            }
        }

    }

    if (monthInput.value == '') {
        monthCard.innerText = '00';
    }
});

//Ingreso Dinamico del año

yearInput.addEventListener('input', event => {
    hideError(yearInput, yearError, '');
    let inputValue = event.target.value;
    yearInput.value = inputValue.replace(/\s/g, '');
    // Buscar si solo son numeros 
    let valoresAceptados = /^[0-9]+$/;
    if (!valoresAceptados.test(yearInput.value) && yearInput.value != '') {
        showError(yearInput, yearError, 'Wrong format, numbers only');
    } else {
        let year = yearInput.value;
        if ((year > 22 && year <= 27) || year == '') {
            yearCard.innerText = year;
            hideError(yearInput, yearError, '');
        } else {
            yearCard.innerText = '00'
            showError(yearInput, yearError, 'Incorrect year')
        }

    }

    if (yearInput.value == '') {
        yearCard.innerText = '00';
    }
});


//Ingreso Dinamico del CVC

cvcInput.addEventListener('input', event => {
    hideError(cvcInput, cvcError, '');
    let inputValue = event.target.value;
    cvcInput.value = inputValue.replace(/\s/g, '');
    // Buscar si solo son numeros 
    let valoresAceptados = /^[0-9]+$/;
    if (!valoresAceptados.test(cvcInput.value) && cvcInput.value != '') {
        showError(cvcInput, cvcError, 'Wrong format, numbers only');
    } else {
        let cvc = cvcInput.value;
        cvcCard.innerText = cvc;
        hideError(cvcInput, cvcError, '');
    }

    if (cvcInput.value == '') {
        cvcCard.innerText = '000';
    }
});


button.addEventListener('click', event => {
    let cantidad = 0;
    event.preventDefault();
    if (verifyIsFilled(nameInput, nameError, 'name')) {
        const reglas = /^[A-Z ]+$/i;
        if (reglas.test(nameInput.value)) {
            hideError(nameInput, nameError)
            cantidad += 1;
        } else {
            showError(nameInput, nameError, 'Only letters are accepted');
        }
    }


    if (verifyIsFilled(numberInput, numberError, 'number')) {
        if (numberInput.value.length == 16) {
            hideError(numberInput, numberError)
            cantidad += 1;
        } else {
            showError(numberInput, numberError, 'Wrong number')
        }
    }


    if (verifyIsFilled(monthInput, monthError, 'month')) {
        if (parseInt(monthInput.value) > 0 && parseInt(monthInput.value) < 13) {
            hideError(monthInput, monthError);
            cantidad += 1;
        } else {
            showError(monthInput, monthError, 'Incorrect month')
        }
    }

    if (verifyIsFilled(yearInput, yearError, 'year')) {
        if (parseInt(yearInput.value) > 22 && parseInt(yearInput.value) < 27) {
            hideError(yearInput, yearError);
            cantidad += 1;
        } else {
            showError(yearInput, yearError, 'Incorrect year ')
        }
    }
    if (verifyIsFilled(cvcInput, cvcError, 'CVC')) {
        if (cvcInput.value.length == 3) {
            hideError(cvcInput, cvcError);
            cantidad += 1;
        } else {
            showError(cvcInput, cvcError, 'Incorrect cvc')
        }
    }

    if (cantidad == 5) {
        form.style.display = 'none';
        thankSection.style.display = 'block';
    }


});




function showError(divInput, divError, msgError) {
    divError.innerText = msgError;
    divInput.style.borderColor = '#ff0000';
};

function hideError(divInput, divError) {
    divError.innerText = '';
    divInput.style.borderColor = 'hsl(270, 3%, 87%)';
}

function verifyIsFilled(divInput, divError, input) {
    if (divInput.value.length > 0) {
        hideError(divInput, divError, '');
        return true;
    } else {
        showError(divInput, divError, "Can't be blank " + input);
    }
}
