const username = document.getElementById('name')
const dateOfBirth = document.getElementById('dateOfBirth')
const dni = document.getElementById('dni')
const areaTlf = document.getElementById('codArea')
const telefono = document.getElementById('telefono')
const form = document.querySelector('form')
const url = "http://localhost:3000/usuarioAjierro";

const annioActual = new Date().getFullYear();
const diaActual = new Date().getDay();
const mesActual = new Date().getMonth();

const showError = (input, message) =>{
    const formField = input.parentElement;

    formField.classList.remove('success');
    formField.classList.add('error');
    
    let error = formField.querySelector('small');
    error.textContent = message;
}

const showSuccess = (input) =>{
    const formField = input.parentElement;

    formField.classList.remove('error');
    formField.classList.add('success');
    
    let error = formField.querySelector('small');
    error.textContent = "";
}

const isRequired = value => value === '' ? false : true;

const validateDNI = (dni) =>{
    const regex = /[0-9]{8}[A-Z]{1}/; 
    return regex.test(dni);
}

const validateNumberPhone = (numberPhone) => {
    const regex = /^[9|6|7][0-9]{8}$/;
    return regex.test(numberPhone)
}

const validateAreaPhone = (area) =>{
    const regex = /^\+[0-9]{2}$/
    return regex.test(area);
}

const isBetween = (length,min,max) => length > min && length < max;

const checkUsername = () =>{
    let min = 5
    let max = 20
    let valid = false
    const user = username.value

    if(!isBetween(user.length, min,max)){
        showError(username, "El nombre de usuario debe ser entre 5 y 20 caracteres")
    }
    else if(!isRequired(user)){
        showError(username, "El nombre de usuario es requerido")
    }
    else{
        showSuccess(username)
        valid = true;
    }
    return valid;
}

const checkDni = () =>{
    let dni1 = dni.value;
    let valid = false;

    if(!validateDNI(dni1)){
        showError(dni, "El dni debe tener 8 numeros y una letra al final")
    }
    else if(!isRequired(dni1)){
        showError(dni, "El dni es requerido")
    }
    else{
        showSuccess(dni);
        valid = true;
    }
    return valid;
}

const checkNumberPhone = () =>{
    let nPhone = telefono.value
    let valid = false;

    if(!isRequired(nPhone)){
        showError(telefono, "El telefono es requerido")
    }
    else if(!validateNumberPhone(nPhone)){
        showError(telefono, "El numero de telefono empieza por 6,9 o 7 y debe tener 8 numeros mas")
    }
    else{
        showSuccess(telefono);
        valid = true;
    }
    return valid;
}

const checkAreaPhone = () =>{
    let aPhone = areaTlf.value;
    let valid = false;

    if(!isRequired(aPhone)){
        showError(areaTlf, "El area de telefono es requerido")
    }
    else if(!validateAreaPhone(aPhone)){
        showError(areaTlf, "El area de telefono debe empezar por + y continuar con dos numeros")
    }
    else{
        showSuccess(areaTlf);
        valid = true;
    }
    return valid;
}

const checkDateOfBirth = () =>{
    let date = dateOfBirth.value;
    let valid = false;

    if(Date.parse(date) > Date.now()){
        showError(dateOfBirth, `No has podido nacer mañana}`)
    }
    else{
        showSuccess(dateOfBirth)
        valid = true;
    }
    return valid;
}

async function addUserApi(user){
    const response = await fetch(url+"?dni="+user.dni1)
    const data = await response.json();


    if(data.length == 0){
        const response = await fetch(url, {
            method : 'POST',
            body : JSON.stringify(user),
            headers : {
                "Content-type" : "application/json"
            }
        })
        if(response.ok){
            console.log('ok')
        }
    }
    else{
        alert('Ya existe un usuario con ese dni')
    }
}

username.addEventListener('change', checkUsername)
dateOfBirth.addEventListener('change', checkDateOfBirth)
dni.addEventListener('change', checkDni)
areaTlf.addEventListener('change', checkAreaPhone)
telefono.addEventListener('change', checkNumberPhone)

form.addEventListener('submit', function(event){
    event.preventDefault()
    if(checkUsername() && checkDateOfBirth() && checkDni() && checkAreaPhone() && checkNumberPhone()){
        let user = username.value;
        let date = dateOfBirth.value
        let dni1 = dni.value;
        let aTlf = areaTlf.value;
        let telefono1 = telefono.value;

        let newUser = {user,date,dni1,aTlf,telefono1}
        addUserApi(newUser);
    }
})