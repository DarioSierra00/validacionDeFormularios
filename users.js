const url = "http://localhost:3000/users";
const lista = document.getElementById('lista');


function createListItem(user){
    let li = document.createElement('li');
    let info = document.createTextNode(`${user.user} : ${user.date} : ${user.dni1} : ${user.aTlf} : ${user.telefono1} :`)
    let buttonEdit = document.createElement('button');
    let buttonDelete = document.createElement('button');
    let a = document.createElement('a');

    buttonDelete.classList.add('del');
    buttonEdit.classList.add('mod');
    buttonDelete.setAttribute('id',user.id);
    buttonEdit.setAttribute('id', user.id)
    buttonDelete.textContent = "Borrar";
    buttonEdit.textContent = "Editar";

    a.setAttribute('href',"editUser.html?id="+user.id);
    a.appendChild(buttonEdit)

    li.appendChild(info);
    li.appendChild(a)
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