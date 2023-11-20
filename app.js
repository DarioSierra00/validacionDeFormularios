const usernameEl = document.querySelector('#username');
const emailEl = document.querySelector('#email');
const passwordEl = document.querySelector('#password');
const confirmPasswordEl = document.querySelector('#confirm-password');
const form = document.querySelector('#signup');
const url = "http://localhost:3000/users";

const isRequired = value => value === '' ? false : true;

const isBetween = (length, min, max) => length < min || length > max ? false : true;

const isEmailValid = (email) => {
    const re = /^(([^<>()\].,;:\s@"]+(\.[()\[\\.,;:\s@"]+)*)|(".+"))@(([0−9]1,3\.[0−9]1,3\.[0−9]1,3\.[0−9]1,3)|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const isPasswordSecure = (password) => {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&*])(?=.{8,20})");
    return re.test(password);
  };

  const showError = (input, message) => {
    // Obtener el elemento form-field
    const formField = input.parentElement;
    // Agregar la clase de error
    formField.classList.remove('success');
    formField.classList.add('error');
    // Mostrar el mensaje de error
    const error = formField.querySelector('small');
    error.textContent = message;
  };

  const showSuccess = (input) => {
    // Obtener el elemento form-field
    const formField = input.parentElement;
    // Eliminar la clase de error
    formField.classList.remove('error');
    formField.classList.add('success');
    // Ocultar el mensaje de error
    const error = formField.querySelector('small');
    error.textContent = '';
  };
  const checkUsername = () => {
    let valid = false;
    const min = 3, max = 25;
    const username = usernameEl.value.trim();
    if (!isRequired(username)) {
      showError(usernameEl, 'El nombre de usuario no puede estar en blanco.');
    } else if (!isBetween(username.length, min, max)) {
      showError(usernameEl, `El nombre de usuario debe tener entre ${min} y ${max} caracteres.`);
    } else {
      showSuccess(usernameEl);
      valid = true;
    }
    return valid;
  };

  const checkEmail = async () =>{
    let valid = false;
    const email = emailEl.value.trim();

    const response = await fetch(url+"?email="+ email)
    const data = await response.json();

    if(data.length != 0){
        showError(emailEl, "Este email ya esta registrado en la base de datos");
    }
    else if(!isRequired(email)){
        showError(emailEl, "El email no puede estar en blanco");
    }
    else if(!isEmailValid(email)){
        showError(emailEl, 'El email no es valido');
    }
    else{
        showSuccess(emailEl)
        valid = true
    }
    return valid;
  }

  const checkPassword = () =>{
    let valid = false;
    const min = 8, max = 20;
    const password = passwordEl.value.trim();
    if(!isRequired(password)){
        showError(passwordEl, "El password no puede estar en blanco");
    }
    else if(!isPasswordSecure(password)){
        showError(passwordEl, "La contraseña debe tener una letra minuscula, otra mayuscula, un simbolo especial y un numero");
    }
    else if(!isBetween(password.length, min,max)){
        showError(passwordEl, "La contraseña debe tener entre 8 y 20 caracteres");
    }
    else{
        showSuccess(passwordEl)
        valid = true;
    }
    return valid
  }

  const checkConfirmPassword = () =>{
    let valid = false
    const passwordConfirm = confirmPasswordEl.value.trim();
    const password = passwordEl.value.trim();
    if(password !== passwordConfirm){
        showError(confirmPasswordEl, "Debe ser igual a la password");
    }
    else{
        showSuccess(confirmPasswordEl)
        valid = true;
    }
    return valid
  }

  usernameEl.addEventListener('change', checkUsername)
  emailEl.addEventListener('change', checkEmail)
  passwordEl.addEventListener('change', checkPassword)
  confirmPasswordEl.addEventListener('change', checkConfirmPassword)


  async function addUserApi(user){
    
    const response = await fetch(url,{
        method : 'POST',
        body : JSON.stringify(user),
        headers : {
            "Content-type" : "application/json"
        }
    })
    if(response.ok){
        console.log('bien')
        
    }}

    function borrarClases(){
        let div = document.querySelectorAll('.form-field');
        let arrayDiv = Array.from(div)

        arrayDiv.forEach(div => {
            div.classList.remove('success');
        });
    }

form.addEventListener('submit', function (e) {
    // Prevenir el envío del formulario
    e.preventDefault();
    if(checkUsername() && checkEmail() && checkPassword() && checkConfirmPassword()){
        let name = usernameEl.value;
        let email = emailEl.value;
        let password = passwordEl.value;
        let newUser = {name,email,password}
        addUserApi(newUser)
        form.reset()
        borrarClases()
    }
  });

