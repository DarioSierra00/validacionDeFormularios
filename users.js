const url = "http://localhost:3000/usuarioAjierro";
const lista = document.getElementById('lista');

function createListItem(user){
    let li = document.createElement('li');
    let info = document.createTextNode(`${user.username} : ${user.dateOfBirth} : ${user.dni} : ${user.areaTlf} : ${user.telefono} :`)
    let buttonEdit = document.createElement('button');
    let buttonDelete = document.createElement('button');

    buttonDelete.classList.add('del');
    buttonEdit.classList.add('mod');
    buttonDelete.setAttribute('id',user.id);
    buttonEdit.setAttribute('id', user.id)
    buttonDelete.textContent = "Borrar";
    buttonEdit.textContent = "Editar"

    li.appendChild(info);
    li.appendChild(buttonEdit);
    li.appendChild(buttonDelete);

    lista.appendChild(li)
}

async function getUsersApi(){
    const response = await fetch(url);
    const data = await response.json();
    let arrayUsers = Array.from(data)

    arrayUsers.forEach(user => {
        createListItem(user)
    });
}

getUsersApi()