const send = document.querySelector('button[type=submit]')
const name = document.getElementById('username')
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');
const url = "http://localhost:3000/users";

send.addEventListener('click', async (event) =>{
    event.preventDefault()
    let name = name.value;
    let email = email.value;
    let password = password.value;
    if(name && email && password){
    let newUser = {name,email,password}
    const response = await fetch(url + "?email=" + user.email);
    const dataEmail = await response.json();

    if(dataEmail.length != 0){
        alert('Ya existe un usuario igual')
    }
    else{
        const response = await fetch(url, {
            method : "POST",
            body : JSON.stringify(newUser),
            headers : {
                "Content-type" : "application/json"
            }
        })
        if(response.ok){
            console.log('flama')
        }
    }
    }
})


email.addEventListener('change', () =>{
    if(email.validity.typeMismatch){
        email.setCustomValidity(
            "Debe ser una direccion de correo electronico"
        );
        email.reportValidity();
    }
    else{
        email.setCustomValidity("")
        return true;
    }
})

password.addEventListener('change',() =>{
    if(!/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(password.value)){
        password.setCustomValidity(
            "Debe tener una mayuscula, una minuscula y un numero"
        )
        password.reportValidity();
    }
    else{
        password.setCustomValidity("");
        return true;
    }
})

confirmPassword.addEventListener('change', () =>{
    if(!(confirmPassword.value === password.value)  ){
        confirmPassword.setCustomValidity(
            "Deben ser iguales las dos contraseñas"
        )
        confirmPassword.reportValidity();
    }
    else{
        confirmPassword.setCustomValidity("");
        return true;
    }
})

// async function addUser(user){

    
// }